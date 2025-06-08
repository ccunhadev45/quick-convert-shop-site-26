
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
import { unifiedCategories as allEnhancedCategories, getGroupedCategories } from "@/data/unifiedCategoriesData";

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

  const filteredGroupedCategories = useMemo(() => {
    if (!searchTerm) return groupedCategories;
    
    const filtered: { [key: string]: any[] } = {};
    Object.keys(groupedCategories).forEach(key => {
      const categoryCards = groupedCategories[key]?.filter(category => 
        filteredCategories.some(filtered => filtered.path === category.path)
      ) || [];
      if (categoryCards.length > 0) {
        filtered[key] = categoryCards;
      }
    });
    return filtered;
  }, [searchTerm, groupedCategories, filteredCategories]);

  const categoryData = [
    {
      key: "converter",
      title: "Conversores de Unidades",
      description: "Converta entre diferentes unidades de medida"
    },
    {
      key: "student",
      title: "Ferramentas para Estudantes",
      description: "Calculadoras acadêmicas e educacionais"
    },
    {
      key: "gaming",
      title: "Gaming & E-sports",
      description: "Performance, FPS, moedas virtuais e estatísticas"
    },
    {
      key: "travel",
      title: "Ferramentas de Viagem",
      description: "Fusos horários, moedas, bagagem e dicas culturais"
    },
    {
      key: "content",
      title: "Criadores de Conteúdo",
      description: "Resoluções, upload, formatos e engajamento"
    },
    {
      key: "culinary",
      title: "Culinária & Gastronomia",
      description: "Receitas, substituições, fornos e nutrição"
    },
    {
      key: "scientific",
      title: "Calculadoras Científicas",
      description: "Física, química, matemática e conversões de base numérica"
    },
    {
      key: "programming",
      title: "Ferramentas de Programação",
      description: "Encoding, cores e outras ferramentas para desenvolvedores"
    },
    {
      key: "productivity",
      title: "Ferramentas de Produtividade",
      description: "Calculadoras práticas para o dia a dia"
    },
    {
      key: "financial",
      title: "Conversores Financeiros",
      description: "Moedas, criptomoedas e índices financeiros básicos"
    },
    {
      key: "investment",
      title: "Investimentos Avançados ⭐",
      description: "Ferramentas premium para investidores e traders"
    },
    {
      key: "health",
      title: "Calculadoras de Saúde",
      description: "Ferramentas básicas para cálculos de saúde"
    },
    {
      key: "health-pro",
      title: "Saúde Profissional ⭐",
      description: "Ferramentas avançadas para profissionais médicos"
    },
    {
      key: "engineering",
      title: "Calculadoras para Arquitetura e Engenharia",
      description: "Ferramentas especializadas para profissionais da construção"
    },
    {
      key: "fashion",
      title: "Moda & Beleza",
      description: "Tamanhos, cores, medidas e conversões de estilo"
    },
    {
      key: "pets",
      title: "Pets & Veterinária",
      description: "Cuidados com animais e cálculos veterinários"
    },
    {
      key: "sustainability",
      title: "Sustentabilidade",
      description: "Pegada de carbono, energia e reciclagem"
    },
    {
      key: "astrology",
      title: "Astrologia",
      description: "Ferramentas para análise astrológica e mapa astral"
    },
    {
      key: "astronomical",
      title: "Astronomia",
      description: "Calculadoras para distâncias espaciais e tempo de viagem"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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

        {/* Renderizar categorias dinamicamente */}
        {categoryData.map((category, index) => {
          const categoryCards = filteredGroupedCategories[category.key] || [];
          
          if (categoryCards.length === 0 && searchTerm) return null;

          return (
            <div key={category.key}>
              {/* Banner do AdSense antes de cada categoria */}
              <AdSpace position="category-top" />
              
              <CategorySection 
                title={category.title}
                description={category.description}
                cards={categoryCards}
              />
            </div>
          );
        })}

        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
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
