import { useState, useMemo } from "react";
import { Search, Filter, X, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EnhancedSearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTypes?: string[];
  onTypeChange?: (types: string[]) => void;
  showImplementedOnly?: boolean;
  onImplementedOnlyChange?: (value: boolean) => void;
}

const categoryTypes = [
  { value: "converter", label: "Conversores", color: "blue" },
  { value: "financial", label: "Financeiros", color: "green" },
  { value: "health", label: "Saúde", color: "pink" },
  { value: "scientific", label: "Científicas", color: "purple" },
  { value: "engineering", label: "Engenharia", color: "orange" },
  { value: "programming", label: "Programação", color: "indigo" },
  { value: "productivity", label: "Produtividade", color: "teal" },
  { value: "gaming", label: "Gaming", color: "red" },
  { value: "travel", label: "Viagem", color: "cyan" },
  { value: "content", label: "Criadores", color: "yellow" },
  { value: "culinary", label: "Culinária", color: "emerald" },
  { value: "student", label: "Estudantes", color: "blue" },
  { value: "astrology", label: "Astrologia", color: "purple" },
  { value: "astronomical", label: "Astronomia", color: "indigo" },
  { value: "fashion", label: "Moda", color: "pink" },
  { value: "sustainability", label: "Sustentabilidade", color: "green" },
  { value: "pets", label: "Pets", color: "orange" }
];

const EnhancedSearchFilter: React.FC<EnhancedSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedTypes = [],
  onTypeChange = () => {},
  showImplementedOnly = false,
  onImplementedOnlyChange = () => {}
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedTypes.length > 0) count++;
    if (showImplementedOnly) count++;
    return count;
  }, [selectedTypes.length, showImplementedOnly]);

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  const clearAllFilters = () => {
    onTypeChange([]);
    onImplementedOnlyChange(false);
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      {/* Barra de pesquisa principal */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar conversores, calculadoras e ferramentas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => onSearchChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Filtrar por categoria</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {categoryTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type.value}
                    checked={selectedTypes.includes(type.value)}
                    onCheckedChange={() => handleTypeToggle(type.value)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${type.color}-500`} />
                      {type.label}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuCheckboxItem
                  checked={showImplementedOnly}
                  onCheckedChange={onImplementedOnlyChange}
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    Apenas implementadas
                  </div>
                </DropdownMenuCheckboxItem>
                
                {activeFiltersCount > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="w-full"
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Tags de filtros ativos */}
      {(selectedTypes.length > 0 || showImplementedOnly) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          
          {selectedTypes.map((type) => {
            const typeInfo = categoryTypes.find(t => t.value === type);
            return (
              <Badge 
                key={type} 
                variant="secondary" 
                className="flex items-center gap-1"
              >
                {typeInfo?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-3 w-3 p-0 ml-1"
                  onClick={() => handleTypeToggle(type)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            );
          })}
          
          {showImplementedOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Implementadas
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 p-0 ml-1"
                onClick={() => onImplementedOnlyChange(false)}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs"
          >
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchFilter;