import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { searchCitiesViaCep, geocodeCityViaCep, CityResult } from "@/services/viaCepService";
import { GeocodingResult } from "@/services/geocodingService";
import { useLoading } from "@/hooks/useLoading";
import LoadingSpinner from "@/components/LoadingSpinner";

interface CityAutocompleteProps {
  value: string;
  onSelect: (city: string, coords?: GeocodingResult) => void;
  placeholder?: string;
}

const CityAutocomplete = ({ value, onSelect, placeholder = "Digite o nome da cidade..." }: CityAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<CityResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, withLoading } = useLoading();
  const [isGeocoding, setIsGeocoding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const searchCitiesDebounced = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError(null);
        return;
      }

      console.log('Buscando cidades para:', inputValue);
      try {
        const results = await withLoading(() => searchCitiesViaCep(inputValue));
        console.log('Resultados encontrados:', results);
        setSuggestions(results);
        setShowSuggestions(true);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        setSuggestions([]);
        setError('Erro ao buscar cidades. Tente novamente.');
      }
    };

    const timeoutId = setTimeout(searchCitiesDebounced, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, withLoading]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setError(null);
    
    if (!newValue) {
      onSelect("");
    }
  };

  const handleSuggestionClick = async (city: CityResult) => {
    console.log('Cidade selecionada:', city);
    setInputValue(city.fullName);
    setShowSuggestions(false);
    setIsGeocoding(true);
    setError(null);

    try {
      const coords = await geocodeCityViaCep(city.name, city.stateCode);
      console.log('Coordenadas:', coords);
      onSelect(city.fullName, coords || undefined);
    } catch (error) {
      console.error('Erro ao geocodificar cidade:', error);
      setError('Erro ao obter coordenadas da cidade');
      onSelect(city.fullName);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && inputValue.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="border-gray-200 pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading || isGeocoding ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : error ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : (
            <MapPin className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {error && (
        <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <Card 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg"
        >
          <div className="p-1">
            {suggestions.map((city) => (
              <Button
                key={city.id}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 hover:bg-gray-50"
                onClick={() => handleSuggestionClick(city)}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.state} ({city.stateCode})</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {showSuggestions && suggestions.length === 0 && !isLoading && !error && inputValue.length >= 2 && (
        <Card className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg">
          <div className="p-4 text-center text-gray-500">
            Nenhuma cidade encontrada
          </div>
        </Card>
      )}

      {isLoading && inputValue.length >= 2 && (
        <Card className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg">
          <div className="p-4">
            <LoadingSpinner size="sm" text="Buscando cidades..." />
          </div>
        </Card>
      )}
    </div>
  );
};

export default CityAutocomplete;
