
import { useState, useMemo } from "react";
import EnhancedHeader from "@/components/EnhancedHeader";
import SearchFilter from "@/components/SearchFilter";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import QuickConversions from "@/components/QuickConversions";
import QuickFavorites from "@/components/QuickFavorites";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import PWAInstaller from "@/components/PWAInstaller";
import { allEnhancedCategories, getGroupedCategories } from "@/data/enhancedCategoriesData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return allEnhancedCategories;
    
    const searchLower = searchTerm.toLowerCase();
    return allEnhancedCategories.filter(category => 
      category.title.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower) ||
      category.type.toLowerCase().includes(searchLower) ||
      category.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  const groupedCategories = useMemo(() => {
    return getGroupedCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <PWAInstaller />
        
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <HeroSection />

        <QuickFavorites />

        {/* Conversores Básicos */}
        <CategorySection 
          title="Conversores de Unidades"
          description="Converta entre diferentes unidades de medida"
          cards={groupedCategories.converter || []}
        />

        {/* Ferramentas para Estudantes */}
        <CategorySection 
          title="Ferramentas para Estudantes"
          description="Calculadoras acadêmicas e educacionais"
          cards={groupedCategories.student || []}
        />

        {/* Gaming */}
        <CategorySection 
          title="Gaming & E-sports"
          description="Performance, FPS, moedas virtuais e estatísticas"
          cards={groupedCategories.gaming || []}
        />

        {/* Viagem */}
        <CategorySection 
          title="Ferramentas de Viagem"
          description="Fusos horários, moedas, bagagem e dicas culturais"
          cards={groupedCategories.travel || []}
        />

        {/* Criadores de Conteúdo */}
        <CategorySection 
          title="Criadores de Conteúdo"
          description="Resoluções, upload, formatos e engajamento"
          cards={groupedCategories.content || []}
        />

        {/* Culinária */}
        <CategorySection 
          title="Culinária & Gastronomia"
          description="Receitas, substituições, fornos e nutrição"
          cards={groupedCategories.culinary || []}
        />

        {/* Científicas */}
        <CategorySection 
          title="Calculadoras Científicas"
          description="Física, química, matemática e conversões de base numérica"
          cards={groupedCategories.scientific || []}
        />

        {/* Programação */}
        <CategorySection 
          title="Ferramentas de Programação"
          description="Encoding, cores e outras ferramentas para desenvolvedores"
          cards={groupedCategories.programming || []}
        />

        {/* Produtividade */}
        <CategorySection 
          title="Ferramentas de Produtividade"
          description="Calculadoras práticas para o dia a dia"
          cards={groupedCategories.productivity || []}
        />

        {/* Financeiro */}
        <CategorySection 
          title="Conversores Financeiros"
          description="Moedas, criptomoedas e índices financeiros básicos"
          cards={groupedCategories.financial || []}
        />

        {/* Investimentos Premium */}
        <CategorySection 
          title="Investimentos Avançados ⭐"
          description="Ferramentas premium para investidores e traders"
          cards={groupedCategories.investment || []}
        />

        {/* Saúde Básica */}
        <CategorySection 
          title="Calculadoras de Saúde"
          description="Ferramentas básicas para cálculos de saúde"
          cards={groupedCategories.health || []}
        />

        {/* Saúde Profissional Premium */}
        <CategorySection 
          title="Saúde Profissional ⭐"
          description="Ferramentas avançadas para profissionais médicos"
          cards={groupedCategories["health-pro"] || []}
        />

        {/* Engenharia */}
        <CategorySection 
          title="Calculadoras para Arquitetura e Engenharia"
          description="Ferramentas especializadas para profissionais da construção"
          cards={groupedCategories.engineering || []}
        />

        {/* Moda */}
        <CategorySection 
          title="Moda & Beleza"
          description="Tamanhos, cores, medidas e conversões de estilo"
          cards={groupedCategories.fashion || []}
        />

        {/* Pets */}
        <CategorySection 
          title="Pets & Veterinária"
          description="Cuidados com animais e cálculos veterinários"
          cards={groupedCategories.pets || []}
        />

        {/* Sustentabilidade */}
        <CategorySection 
          title="Sustentabilidade"
          description="Pegada de carbono, energia e reciclagem"
          cards={groupedCategories.sustainability || []}
        />

        {/* Astrologia */}
        <CategorySection 
          title="Astrologia"
          description="Ferramentas para análise astrológica e mapa astral"
          cards={groupedCategories.astrology || []}
        />

        {/* Astronomia */}
        <CategorySection 
          title="Astronomia"
          description="Calculadoras para distâncias espaciais e tempo de viagem"
          cards={groupedCategories.astronomical || []}
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
