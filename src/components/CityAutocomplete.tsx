
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { geocodeCity, GeocodingResult } from "@/services/geocodingService";

interface CityAutocompleteProps {
  value: string;
  onSelect: (city: string, coordinates?: GeocodingResult) => void;
  placeholder?: string;
}

const CityAutocomplete = ({ value, onSelect, placeholder = "Digite uma cidade..." }: CityAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<GeocodingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchCities = async () => {
      if (searchValue.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Fazer múltiplas buscas para diferentes variações
        const queries = [
          searchValue,
          `${searchValue}, Brasil`,
          `${searchValue}, Brazil`
        ];

        const searchPromises = queries.map(query =>
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=br`)
            .then(res => res.json())
            .catch(() => [])
        );

        const results = await Promise.all(searchPromises);
        const allResults = results.flat();

        // Remover duplicatas e formatar resultados
        const uniqueResults = allResults
          .filter((item, index, self) => 
            index === self.findIndex(t => t.place_id === item.place_id)
          )
          .slice(0, 8)
          .map(item => ({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            city: item.display_name.split(',')[0],
            country: item.display_name
          }));

        setSuggestions(uniqueResults);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleSelect = async (suggestion: GeocodingResult) => {
    setSearchValue(suggestion.city);
    setSelectedCoordinates(suggestion);
    onSelect(suggestion.city, suggestion);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            {searchValue || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Buscar cidade..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              {isLoading && (
                <CommandEmpty>Buscando cidades...</CommandEmpty>
              )}
              {!isLoading && suggestions.length === 0 && searchValue.length >= 3 && (
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
              )}
              {!isLoading && suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={`${suggestion.lat}-${suggestion.lng}-${index}`}
                      value={suggestion.city}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          searchValue === suggestion.city ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{suggestion.city}</span>
                        <span className="text-xs text-gray-500 truncate">
                          {suggestion.country}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedCoordinates && (
        <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
          <MapPin className="mr-2 h-4 w-4" />
          <span>
            Latitude: {selectedCoordinates.lat.toFixed(6)}, 
            Longitude: {selectedCoordinates.lng.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
