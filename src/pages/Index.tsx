
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import QuickConversions from "@/components/QuickConversions";
import QuickFavorites from "@/components/QuickFavorites";
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
    const health = filteredCategories.filter(cat => cat.type === 'health');
    const engineering = filteredCategories.filter(cat => cat.type === 'engineering');
    const scientific = filteredCategories.filter(cat => cat.type === 'scientific');
    const programming = filteredCategories.filter(cat => cat.type === 'programming');
    const productivity = filteredCategories.filter(cat => cat.type === 'productivity');
    const astrology = filteredCategories.filter(cat => cat.type === 'astrology');
    const astronomical = filteredCategories.filter(cat => cat.type === 'astronomical');
    
    return { converters, financial, health, engineering, scientific, programming, productivity, astrology, astronomical };
  }, [filteredCategories]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <HeroSection />

        <QuickFavorites />

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
          description="Ferramentas para cálculos relacionados à saúde e nutrição"
          cards={groupedCategories.health}
        />

        <CategorySection 
          title="Calculadoras para Arquitetura e Engenharia"
          description="Ferramentas especializadas para profissionais da construção"
          cards={groupedCategories.engineering}
        />

        <CategorySection 
          title="Calculadoras Científicas"
          description="Física, química, matemática e conversões de base numérica"
          cards={groupedCategories.scientific}
        />

        <CategorySection 
          title="Ferramentas de Programação"
          description="Encoding, cores e outras ferramentas para desenvolvedores"
          cards={groupedCategories.programming}
        />

        <CategorySection 
          title="Ferramentas de Produtividade"
          description="Calculadoras práticas para o dia a dia"
          cards={groupedCategories.productivity}
        />

        <CategorySection 
          title="Astrologia"
          description="Ferramentas para análise astrológica e mapa astral"
          cards={groupedCategories.astrology}
        />

        <CategorySection 
          title="Astronomia"
          description="Calculadoras para distâncias espaciais e tempo de viagem"
          cards={groupedCategories.astronomical}
        />

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
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
