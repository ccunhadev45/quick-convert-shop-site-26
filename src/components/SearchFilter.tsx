
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchFilter = ({ searchTerm, onSearchChange }: SearchFilterProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar conversores e calculadoras..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400"
        />
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["Unidades", "Temperatura", "Moedas", "Saúde", "Engenharia", "Científico"].map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchChange(tag.toLowerCase())}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
