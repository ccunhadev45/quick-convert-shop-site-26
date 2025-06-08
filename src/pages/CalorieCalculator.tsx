import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Search } from "lucide-react";

interface FoodItem {
  name: string;
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
  fiber: number; // grams per 100g
  category: string;
}

const CalorieCalculator = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Base de dados TACO - Tabela Brasileira de Composição de Alimentos
  const tacoDatabase: FoodItem[] = [
    // Cereais e derivados
    { name: "Arroz branco cozido", calories: 128, protein: 2.5, carbs: 26.2, fat: 0.2, fiber: 1.6, category: "Cereais" },
    { name: "Arroz integral cozido", calories: 124, protein: 2.6, carbs: 25.8, fat: 1.0, fiber: 2.7, category: "Cereais" },
    { name: "Aveia em flocos", calories: 394, protein: 13.9, carbs: 66.6, fat: 8.5, fiber: 9.1, category: "Cereais" },
    { name: "Pão de forma integral", calories: 253, protein: 11.3, carbs: 43.9, fat: 3.5, fiber: 6.9, category: "Cereais" },
    { name: "Pão francês", calories: 300, protein: 9.4, carbs: 58.6, fat: 3.1, fiber: 2.3, category: "Cereais" },
    { name: "Macarrão cozido", calories: 102, protein: 3.4, carbs: 20.3, fat: 0.2, fiber: 1.8, category: "Cereais" },
    
    // Leguminosas
    { name: "Feijão preto cozido", calories: 77, protein: 4.5, carbs: 14.0, fat: 0.5, fiber: 8.4, category: "Leguminosas" },
    { name: "Feijão carioca cozido", calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5, fiber: 8.5, category: "Leguminosas" },
    { name: "Lentilha cozida", calories: 93, protein: 6.3, carbs: 16.3, fat: 0.6, fiber: 7.9, category: "Leguminosas" },
    { name: "Grão de bico cozido", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, category: "Leguminosas" },
    { name: "Soja cozida", calories: 141, protein: 12.3, carbs: 9.9, fat: 6.8, fiber: 5.4, category: "Leguminosas" },
    
    // Carnes e ovos
    { name: "Frango grelhado sem pele", calories: 159, protein: 32.8, carbs: 0, fat: 2.9, fiber: 0, category: "Carnes" },
    { name: "Carne bovina grelhada", calories: 163, protein: 26.4, carbs: 0, fat: 5.8, fiber: 0, category: "Carnes" },
    { name: "Peixe assado", calories: 123, protein: 26.8, carbs: 0, fat: 1.3, fiber: 0, category: "Carnes" },
    { name: "Ovo de galinha cozido", calories: 146, protein: 13.3, carbs: 0.6, fat: 9.5, fiber: 0, category: "Carnes" },
    { name: "Ovo de galinha frito", calories: 197, protein: 13.6, carbs: 0.7, fat: 15.0, fiber: 0, category: "Carnes" },
    
    // Leite e derivados
    { name: "Leite integral", calories: 60, protein: 2.9, carbs: 4.3, fat: 3.2, fiber: 0, category: "Laticínios" },
    { name: "Leite desnatado", calories: 35, protein: 3.4, carbs: 4.9, fat: 0.1, fiber: 0, category: "Laticínios" },
    { name: "Iogurte natural", calories: 51, protein: 4.1, carbs: 6.0, fat: 1.5, fiber: 0, category: "Laticínios" },
    { name: "Queijo minas frescal", calories: 264, protein: 17.4, carbs: 2.9, fat: 20.2, fiber: 0, category: "Laticínios" },
    { name: "Queijo mussarela", calories: 330, protein: 25.0, carbs: 2.8, fat: 24.6, fiber: 0, category: "Laticínios" },
    
    // Frutas
    { name: "Banana nanica", calories: 87, protein: 1.3, carbs: 22.3, fat: 0.1, fiber: 2.6, category: "Frutas" },
    { name: "Maçã", calories: 56, protein: 0.3, carbs: 15.2, fat: 0.1, fiber: 1.3, category: "Frutas" },
    { name: "Laranja", calories: 37, protein: 0.9, carbs: 9.1, fat: 0.1, fiber: 1.0, category: "Frutas" },
    { name: "Mamão", calories: 40, protein: 0.5, carbs: 10.4, fat: 0.1, fiber: 1.8, category: "Frutas" },
    { name: "Abacaxi", calories: 48, protein: 0.9, carbs: 12.3, fat: 0.1, fiber: 1.0, category: "Frutas" },
    { name: "Manga", calories: 64, protein: 0.4, carbs: 16.7, fat: 0.1, fiber: 1.6, category: "Frutas" },
    { name: "Uva", calories: 50, protein: 0.2, carbs: 13.9, fat: 0.1, fiber: 0.9, category: "Frutas" },
    
    // Verduras e legumes
    { name: "Alface", calories: 11, protein: 1.3, carbs: 1.7, fat: 0.3, fiber: 1.7, category: "Verduras" },
    { name: "Tomate", calories: 15, protein: 1.1, carbs: 3.1, fat: 0.2, fiber: 1.2, category: "Verduras" },
    { name: "Cenoura", calories: 34, protein: 1.3, carbs: 7.7, fat: 0.2, fiber: 3.2, category: "Verduras" },
    { name: "Batata inglesa", calories: 52, protein: 1.9, carbs: 11.9, fat: 0.1, fiber: 1.3, category: "Verduras" },
    { name: "Batata doce", calories: 77, protein: 1.7, carbs: 18.4, fat: 0.1, fiber: 2.2, category: "Verduras" },
    { name: "Abobrinha", calories: 19, protein: 1.2, carbs: 4.0, fat: 0.1, fiber: 1.0, category: "Verduras" },
    { name: "Brócolis", calories: 20, protein: 3.6, carbs: 1.5, fat: 0.4, fiber: 3.4, category: "Verduras" },
    
    // Óleos e gorduras
    { name: "Azeite de oliva", calories: 884, protein: 0, carbs: 0, fat: 100.0, fiber: 0, category: "Óleos" },
    { name: "Óleo de soja", calories: 884, protein: 0, carbs: 0, fat: 100.0, fiber: 0, category: "Óleos" },
    { name: "Manteiga", calories: 760, protein: 0.9, carbs: 0.1, fat: 84.0, fiber: 0, category: "Óleos" },
    
    // Açúcares e doces
    { name: "Açúcar cristal", calories: 387, protein: 0, carbs: 99.9, fat: 0, fiber: 0, category: "Açúcares" },
    { name: "Mel de abelha", calories: 309, protein: 0.4, carbs: 84.4, fat: 0, fiber: 0.2, category: "Açúcares" },
    
    // Oleaginosas
    { name: "Amendoim", calories: 544, protein: 27.2, carbs: 20.3, fat: 43.9, fiber: 8.0, category: "Oleaginosas" },
    { name: "Castanha do pará", calories: 643, protein: 14.5, carbs: 15.1, fat: 63.5, fiber: 7.9, category: "Oleaginosas" },
    { name: "Amêndoa", calories: 640, protein: 19.5, carbs: 19.5, fat: 53.4, fiber: 11.6, category: "Oleaginosas" }
  ];

  const filteredFoods = tacoDatabase.filter(food =>
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
      fat: (selectedFood.fat * multiplier).toFixed(1),
      fiber: (selectedFood.fiber * multiplier).toFixed(1)
    };
  };

  const nutrition = calculateNutrition();

  // Agrupar alimentos por categoria
  const categories = [...new Set(tacoDatabase.map(food => food.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de Calorias
              </CardTitle>
              <p className="text-gray-600">
                Baseado na Tabela TACO - Tabela Brasileira de Composição de Alimentos
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
                  const food = tacoDatabase.find(f => f.name === value);
                  setSelectedFood(food || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um alimento" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <div key={category}>
                        <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-100">
                          {category}
                        </div>
                        {filteredFoods
                          .filter(food => food.category === category)
                          .map((food) => (
                            <SelectItem key={food.name} value={food.name}>
                              {food.name}
                            </SelectItem>
                          ))}
                      </div>
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
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{nutrition.fiber}g</div>
                      <div className="text-sm text-gray-600">Fibra</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    * Valores para {quantity}g de {selectedFood.name}
                  </div>
                </div>
              )}

              {/* Informações sobre a TACO */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Sobre a Tabela TACO</h4>
                <p className="text-sm text-blue-700">
                  A Tabela Brasileira de Composição de Alimentos (TACO) é uma base de dados oficial 
                  desenvolvida pela UNICAMP que contém informações nutricionais de alimentos consumidos 
                  no Brasil. Os valores apresentados são baseados nesta tabela científica e confiável.
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
