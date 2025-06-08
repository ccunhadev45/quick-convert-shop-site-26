
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import QuickConversions from "@/components/QuickConversions";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { allCategories } from "@/data/categoriesData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return allCategories;
    
    const searchLower = searchTerm.toLowerCase();
    return allCategories.filter(category => 
      category.title.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower) ||
      category.type.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const groupedCategories = useMemo(() => {
    const converters = filteredCategories.filter(cat => cat.type === 'converter');
    const financial = filteredCategories.filter(cat => cat.type === 'financial');
    const calculators = filteredCategories.filter(cat => cat.type === 'calculator');
    const nutrition = filteredCategories.filter(cat => cat.type === 'nutrition');
    
    return { converters, financial, calculators, nutrition };
  }, [filteredCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <HeroSection />

        <CategorySection 
          title="Conversores de Unidades"
          description="Converta entre diferentes unidades de medida"
          cards={groupedCategories.converters}
        />

        <CategorySection 
          title="Conversores Financeiros"
          description="Converta moedas, criptomoedas e acompanhe índices financeiros"
          cards={groupedCategories.financial}
        />

        <CategorySection 
          title="Calculadoras de Saúde"
          description="Ferramentas para cálculos relacionados à saúde"
          cards={groupedCategories.calculators}
        />

        <CategorySection 
          title="Valores Energéticos"
          description="Calcule calorias e macronutrientes dos alimentos"
          cards={groupedCategories.nutrition}
        />

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum resultado encontrado para "{searchTerm}"
            </p>
          </div>
        )}

        <AdSpace position="middle" />

        <ProductShowcase />

        <QuickConversions />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default Index;
