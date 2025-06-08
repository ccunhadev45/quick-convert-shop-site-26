
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Search } from "lucide-react";

interface FoodItem {
  name: string;
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
}

const CalorieCalculator = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Database básico de alimentos (em produção seria uma API)
  const foodDatabase: FoodItem[] = [
    { name: "Arroz branco cozido", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { name: "Feijão preto cozido", calories: 132, protein: 8.9, carbs: 23, fat: 0.5 },
    { name: "Frango grelhado", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Ovo cozido", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: "Maçã", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: "Aveia", calories: 389, protein: 17, carbs: 66, fat: 6.9 },
    { name: "Leite integral", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
    { name: "Pão integral", calories: 247, protein: 13, carbs: 41, fat: 4.2 },
    { name: "Batata doce", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 }
  ];

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateNutrition = () => {
    if (!selectedFood || !quantity) return null;
    
    const quantityNum = parseFloat(quantity);
    const multiplier = quantityNum / 100;
    
    return {
      calories: (selectedFood.calories * multiplier).toFixed(1),
      protein: (selectedFood.protein * multiplier).toFixed(1),
      carbs: (selectedFood.carbs * multiplier).toFixed(1),
      fat: (selectedFood.fat * multiplier).toFixed(1)
    };
  };

  const nutrition = calculateNutrition();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de Calorias
              </CardTitle>
              <p className="text-gray-600">
                Descubra as calorias e macronutrientes dos alimentos
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Busca de alimentos */}
              <div className="space-y-2">
                <Label htmlFor="search">Buscar alimento</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Digite o nome do alimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Seleção de alimento */}
              <div className="space-y-2">
                <Label>Selecionar alimento</Label>
                <Select onValueChange={(value) => {
                  const food = foodDatabase.find(f => f.name === value);
                  setSelectedFood(food || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um alimento" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredFoods.map((food) => (
                      <SelectItem key={food.name} value={food.name}>
                        {food.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantidade */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade (gramas)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Ex: 100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Resultados */}
              {nutrition && selectedFood && (
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Informações Nutricionais - {selectedFood.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{nutrition.calories}</div>
                      <div className="text-sm text-gray-600">Calorias</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{nutrition.protein}g</div>
                      <div className="text-sm text-gray-600">Proteína</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{nutrition.carbs}g</div>
                      <div className="text-sm text-gray-600">Carboidrato</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{nutrition.fat}g</div>
                      <div className="text-sm text-gray-600">Gordura</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    * Valores para {quantity}g de {selectedFood.name}
                  </div>
                </div>
              )}

              {/* Informações adicionais */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Dica Nutricional</h4>
                <p className="text-sm text-blue-700">
                  Lembre-se de que uma dieta equilibrada deve incluir uma variedade de alimentos. 
                  Consulte sempre um nutricionista para orientação personalizada.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default CalorieCalculator;
