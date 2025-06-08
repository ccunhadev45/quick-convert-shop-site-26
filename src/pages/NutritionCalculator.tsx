
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const NutritionCalculator = () => {
  const [food, setFood] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("grams");
  const [results, setResults] = useState<any>(null);

  const foodDatabase = {
    "arroz": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    "feijao": { calories: 127, protein: 9, carbs: 23, fat: 0.5, fiber: 6.4 },
    "frango": { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    "ovos": { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
    "banana": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    "maça": { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
    "pao": { calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7 },
    "leite": { calories: 42, protein: 3.4, carbs: 5, fat: 1, fiber: 0 }
  };

  const units = {
    grams: { name: "Gramas", factor: 1 },
    kg: { name: "Quilogramas", factor: 1000 },
    portions: { name: "Porções", factor: 100 },
    cups: { name: "Xícaras", factor: 150 },
    spoons: { name: "Colheres", factor: 15 }
  };

  const calculateNutrition = () => {
    if (!food || !quantity) return;
    
    const selectedFood = foodDatabase[food as keyof typeof foodDatabase];
    if (!selectedFood) return;
    
    const amount = parseFloat(quantity);
    if (isNaN(amount)) return;
    
    const unitFactor = units[unit as keyof typeof units]?.factor || 1;
    const totalGrams = (amount * unitFactor) / 100; // Database values are per 100g
    
    setResults({
      calories: Math.round(selectedFood.calories * totalGrams),
      protein: (selectedFood.protein * totalGrams).toFixed(1),
      carbs: (selectedFood.carbs * totalGrams).toFixed(1),
      fat: (selectedFood.fat * totalGrams).toFixed(1),
      fiber: (selectedFood.fiber * totalGrams).toFixed(1),
      quantity: amount,
      unit: units[unit as keyof typeof units]?.name
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Calculadora Nutricional</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calcular Valores Nutricionais</CardTitle>
              <CardDescription>
                Selecione um alimento e quantidade para ver os valores nutricionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="food">Alimento</Label>
                <Select onValueChange={setFood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um alimento" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(foodDatabase).map(([key, data]) => (
                      <SelectItem key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Digite a quantidade"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <Select onValueChange={setUnit} value={unit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={calculateNutrition} className="w-full">
                Calcular
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Valores Nutricionais</CardTitle>
                <CardDescription>
                  Para {results.quantity} {results.unit} de {food}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.calories}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calorias</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{results.protein}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Proteínas</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{results.carbs}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{results.fat}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Gorduras</div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="text-xl font-bold text-purple-600">{results.fiber}g</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fibras</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default NutritionCalculator;
