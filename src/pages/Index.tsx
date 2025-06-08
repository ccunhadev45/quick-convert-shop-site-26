
import Header from "@/components/Header";
import ConverterCard from "@/components/ConverterCard";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Ruler, Weight, Beaker, Thermometer, Square, Zap, Clock, Gauge, Calculator, Heart, Apple } from "lucide-react";

const Index = () => {
  const converterCategories = [
    {
      title: "Comprimento",
      description: "Metro, pé, polegada, quilômetro",
      icon: Ruler,
      path: "/length",
      color: "blue"
    },
    {
      title: "Peso",
      description: "Quilograma, libra, onça, tonelada",
      icon: Weight,
      path: "/weight",
      color: "green"
    },
    {
      title: "Volume",
      description: "Litro, galão, mililitro, metro cúbico",
      icon: Beaker,
      path: "/volume",
      color: "purple"
    },
    {
      title: "Temperatura",
      description: "Celsius, Fahrenheit, Kelvin",
      icon: Thermometer,
      path: "/temperature",
      color: "orange"
    },
    {
      title: "Área",
      description: "Metro quadrado, acre, hectare",
      icon: Square,
      path: "/area",
      color: "teal"
    },
    {
      title: "Energia",
      description: "Joule, caloria, watt-hora",
      icon: Zap,
      path: "/energy",
      color: "yellow"
    },
    {
      title: "Tempo",
      description: "Segundo, minuto, hora, dia",
      icon: Clock,
      path: "/time",
      color: "indigo"
    },
    {
      title: "Velocidade",
      description: "km/h, mph, m/s, nó",
      icon: Gauge,
      path: "/speed",
      color: "pink"
    }
  ];

  const calculatorCategories = [
    {
      title: "Calculadora IMC",
      description: "Índice de Massa Corporal",
      icon: Calculator,
      path: "/imc",
      color: "red"
    },
    {
      title: "Taxa Metabólica Basal",
      description: "Calorias diárias necessárias",
      icon: Heart,
      path: "/tmb",
      color: "emerald"
    }
  ];

  const nutritionCategories = [
    {
      title: "Calculadora de Calorias",
      description: "Calorias e macros dos alimentos",
      icon: Apple,
      path: "/calories",
      color: "green"
    }
  ];

  const CategorySection = ({ title, description, cards }: { title: string, description: string, cards: any[] }) => (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((category) => (
          <ConverterCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            path={category.path}
            color={category.color}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Super Conversor de Unidades
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Converta facilmente entre diferentes unidades de medida com precisão e rapidez
          </p>
        </div>

        <CategorySection 
          title="Conversores de Unidades"
          description="Converta entre diferentes unidades de medida"
          cards={converterCategories}
        />

        <CategorySection 
          title="Calculadoras de Saúde"
          description="Ferramentas para cálculos relacionados à saúde"
          cards={calculatorCategories}
        />

        <CategorySection 
          title="Valores Energéticos"
          description="Calcule calorias e macronutrientes dos alimentos"
          cards={nutritionCategories}
        />

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
              <p className="font-semibold text-gray-800 mb-2">Litro → Galão</p>
              <p className="text-sm text-gray-600">1 L = 0.264172 gal</p>
            </div>
          </div>
        </div>
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default Index;
