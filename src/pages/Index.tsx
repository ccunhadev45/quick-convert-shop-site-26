
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import EnhancedConverterCard from "@/components/EnhancedConverterCard";
import SearchFilter from "@/components/SearchFilter";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Ruler, Weight, Beaker, Thermometer, Square, Zap, Clock, Gauge, Calculator, Heart, Apple, DollarSign, TrendingUp, Bitcoin } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories = [
    // Conversores
    {
      title: "Comprimento",
      description: "Metro, pé, polegada, quilômetro",
      icon: Ruler,
      path: "/length",
      color: "blue",
      type: "converter",
      conversionExample: {
        from: "1 metro",
        to: "pés",
        value: "3.28084 ft"
      }
    },
    {
      title: "Peso",
      description: "Quilograma, libra, onça, tonelada",
      icon: Weight,
      path: "/weight",
      color: "green",
      type: "converter",
      conversionExample: {
        from: "1 kg",
        to: "libras",
        value: "2.20462 lb"
      }
    },
    {
      title: "Volume",
      description: "Litro, galão, mililitro, metro cúbico",
      icon: Beaker,
      path: "/volume",
      color: "purple",
      type: "converter",
      conversionExample: {
        from: "1 litro",
        to: "galões",
        value: "0.264172 gal"
      }
    },
    {
      title: "Temperatura",
      description: "Celsius, Fahrenheit, Kelvin",
      icon: Thermometer,
      path: "/temperature",
      color: "orange",
      type: "converter",
      conversionExample: {
        from: "0°C",
        to: "Fahrenheit",
        value: "32°F"
      }
    },
    {
      title: "Área",
      description: "Metro quadrado, acre, hectare",
      icon: Square,
      path: "/area",
      color: "teal",
      type: "converter",
      conversionExample: {
        from: "1 m²",
        to: "pés²",
        value: "10.7639 ft²"
      }
    },
    {
      title: "Energia",
      description: "Joule, caloria, watt-hora",
      icon: Zap,
      path: "/energy",
      color: "yellow",
      type: "converter",
      conversionExample: {
        from: "1 kWh",
        to: "joules",
        value: "3.6e+6 J"
      }
    },
    {
      title: "Tempo",
      description: "Segundo, minuto, hora, dia",
      icon: Clock,
      path: "/time",
      color: "indigo",
      type: "converter",
      conversionExample: {
        from: "1 hora",
        to: "segundos",
        value: "3600 s"
      }
    },
    {
      title: "Velocidade",
      description: "km/h, mph, m/s, nó",
      icon: Gauge,
      path: "/speed",
      color: "pink",
      type: "converter",
      conversionExample: {
        from: "100 km/h",
        to: "mph",
        value: "62.137 mph"
      }
    },
    // Conversores Financeiros
    {
      title: "Moedas Fiduciárias",
      description: "Real, Dólar, Euro, Libra",
      icon: DollarSign,
      path: "/currency",
      color: "cyan",
      type: "financial",
      conversionExample: {
        from: "1 USD",
        to: "BRL",
        value: "R$ 5.20"
      }
    },
    {
      title: "Criptomoedas",
      description: "Bitcoin, Ethereum, BNB, Cardano",
      icon: Bitcoin,
      path: "/crypto",
      color: "amber",
      type: "financial",
      conversionExample: {
        from: "1 BTC",
        to: "USD",
        value: "$42,500.00"
      }
    },
    {
      title: "Índices Financeiros",
      description: "Inflação, juros, taxas",
      icon: TrendingUp,
      path: "/financial-indices",
      color: "emerald",
      type: "financial",
      conversionExample: {
        from: "Taxa Selic",
        to: "Anual",
        value: "11.75%"
      }
    },
    // Calculadoras
    {
      title: "Calculadora IMC",
      description: "Índice de Massa Corporal",
      icon: Calculator,
      path: "/imc",
      color: "red",
      type: "calculator"
    },
    {
      title: "Taxa Metabólica Basal",
      description: "Calorias diárias necessárias",
      icon: Heart,
      path: "/tmb",
      color: "emerald",
      type: "calculator"
    },
    // Nutrição
    {
      title: "Calculadora de Calorias",
      description: "Calorias e macros dos alimentos",
      icon: Apple,
      path: "/calories",
      color: "green",
      type: "nutrition"
    }
  ];

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

  const CategorySection = ({ 
    title, 
    description, 
    cards 
  }: { 
    title: string; 
    description: string; 
    cards: any[] 
  }) => {
    if (cards.length === 0) return null;
    
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((category) => (
            <EnhancedConverterCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
              color={category.color}
              conversionExample={category.conversionExample}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Super Conversor de Unidades
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Converta facilmente entre diferentes unidades de medida, moedas e criptomoedas com precisão e rapidez
          </p>
        </div>

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

        {/* Conversões Rápidas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Conversões Mais Usadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <p className="font-semibold text-gray-800 mb-2">Metro → Pé</p>
              <p className="text-sm text-gray-600">1 m = 3.28084 ft</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <p className="font-semibold text-gray-800 mb-2">°C → °F</p>
              <p className="text-sm text-gray-600">0°C = 32°F</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <p className="font-semibold text-gray-800 mb-2">Kg → Libra</p>
              <p className="text-sm text-gray-600">1 kg = 2.20462 lb</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <p className="font-semibold text-gray-800 mb-2">USD → BRL</p>
              <p className="text-sm text-gray-600">$1 = R$ 5.20</p>
            </div>
          </div>
        </div>
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default Index;
