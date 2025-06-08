
import Header from "@/components/Header";
import ConverterCard from "@/components/ConverterCard";
import { Ruler, Weight, Beaker, Thermometer, Square, Zap, Clock, Gauge } from "lucide-react";

const Index = () => {
  const converterCategories = [
    {
      title: "Comprimento",
      description: "Converta metros, pés, polegadas, quilômetros e mais",
      icon: Ruler,
      path: "/length",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      title: "Peso e Massa",
      description: "Converta quilogramas, libras, onças, toneladas e mais",
      icon: Weight,
      path: "/weight",
      gradient: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      title: "Volume",
      description: "Converta litros, galões, mililitros, metros cúbicos e mais",
      icon: Beaker,
      path: "/volume",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      title: "Temperatura",
      description: "Converta Celsius, Fahrenheit, Kelvin e mais",
      icon: Thermometer,
      path: "/temperature",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Área",
      description: "Converta metros quadrados, acres, hectares e mais",
      icon: Square,
      path: "/area",
      gradient: "bg-gradient-to-br from-teal-500 to-teal-700"
    },
    {
      title: "Energia",
      description: "Converta joules, calorias, watts-hora e mais",
      icon: Zap,
      path: "/energy",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      title: "Tempo",
      description: "Converta segundos, minutos, horas, dias e mais",
      icon: Clock,
      path: "/time",
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    {
      title: "Velocidade",
      description: "Converta km/h, mph, m/s, nós e mais",
      icon: Gauge,
      path: "/speed",
      gradient: "bg-gradient-to-br from-pink-500 to-pink-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Conversor de Unidades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Converta facilmente entre diferentes unidades de medida com nossa ferramenta rápida e precisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {converterCategories.map((category) => (
            <ConverterCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
              gradient={category.gradient}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Conversores Mais Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">Metro para Pé</p>
              <p className="text-sm text-gray-600">1 m = 3.28084 ft</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">Celsius para Fahrenheit</p>
              <p className="text-sm text-gray-600">0°C = 32°F</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">Kg para Libra</p>
              <p className="text-sm text-gray-600">1 kg = 2.20462 lb</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">Litro para Galão</p>
              <p className="text-sm text-gray-600">1 L = 0.264172 gal</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
