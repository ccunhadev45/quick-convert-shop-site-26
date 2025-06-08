
import { Star, Calculator, Thermometer, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const QuickFavorites = () => {
  const favorites = [
    {
      title: "Conversor de Temperatura",
      description: "Celsius, Fahrenheit, Kelvin",
      icon: Thermometer,
      path: "/temperature",
      color: "red"
    },
    {
      title: "Conversor de Peso",
      description: "Kg, gramas, libras",
      icon: Scale,
      path: "/weight",
      color: "green"
    },
    {
      title: "Calculadora de IMC",
      description: "Índice de massa corporal",
      icon: Calculator,
      path: "/imc",
      color: "blue"
    }
  ];

  return (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Star className="h-6 w-6 text-yellow-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ferramentas Mais Usadas
        </h2>
        <Star className="h-6 w-6 text-yellow-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {favorites.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-yellow-300">
              <CardContent className="p-6 text-center">
                <item.icon className={`h-12 w-12 mx-auto mb-4 text-${item.color}-600`} />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickFavorites;
