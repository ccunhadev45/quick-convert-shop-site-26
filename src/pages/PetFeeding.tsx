
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Utensils, Dog, Cat, Clock } from "lucide-react";

const PetFeeding = () => {
  const [petType, setPetType] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("normal");
  const [age, setAge] = useState("adult");
  const [foodType, setFoodType] = useState("dry");
  
  const calculateFeeding = () => {
    if (!petType || !petWeight) return null;
    
    const weight = parseFloat(petWeight);
    let baseAmount = 0;
    let caloriesPerKg = 0;
    
    if (petType === "dog") {
      // Cálculo baseado em necessidades calóricas
      if (weight <= 5) caloriesPerKg = 110;
      else if (weight <= 15) caloriesPerKg = 95;
      else if (weight <= 25) caloriesPerKg = 85;
      else caloriesPerKg = 75;
      
      baseAmount = (weight * caloriesPerKg) / 350; // 350 kcal por 100g de ração seca
    } else if (petType === "cat") {
      caloriesPerKg = weight <= 5 ? 80 : 70;
      baseAmount = (weight * caloriesPerKg) / 350;
    }
    
    // Ajustes por idade
    if (age === "puppy") baseAmount *= 1.5;
    else if (age === "senior") baseAmount *= 0.8;
    
    // Ajustes por atividade
    if (activityLevel === "low") baseAmount *= 0.8;
    else if (activityLevel === "high") baseAmount *= 1.3;
    
    // Ajustes por tipo de comida
    if (foodType === "wet") baseAmount *= 3; // Comida úmida tem menos calorias por peso
    
    return {
      dailyAmount: Math.round(baseAmount),
      meals: age === "puppy" ? 3 : 2,
      mealAmount: Math.round(baseAmount / (age === "puppy" ? 3 : 2))
    };
  };

  const feeding = calculateFeeding();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Utensils className="h-8 w-8 text-orange-600" />
                Calculadora de Alimentação para Pets
              </CardTitle>
              <p className="text-gray-600">
                Calcule a quantidade ideal de ração para seu pet
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Pet</Label>
                  <Select value={petType} onValueChange={setPetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">
                        <div className="flex items-center gap-2">
                          <Dog className="h-4 w-4" />
                          Cão
                        </div>
                      </SelectItem>
                      <SelectItem value="cat">
                        <div className="flex items-center gap-2">
                          <Cat className="h-4 w-4" />
                          Gato
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Peso do Pet (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 15.5"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Faixa Etária</Label>
                  <Select value={age} onValueChange={setAge}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puppy">Filhote (até 1 ano)</SelectItem>
                      <SelectItem value="adult">Adulto (1-7 anos)</SelectItem>
                      <SelectItem value="senior">Idoso (acima de 7 anos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Nível de Atividade</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixo (sedentário)</SelectItem>
                      <SelectItem value="normal">Normal (passeios regulares)</SelectItem>
                      <SelectItem value="high">Alto (muito ativo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Ração</Label>
                <Select value={foodType} onValueChange={setFoodType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry">Ração Seca</SelectItem>
                    <SelectItem value="wet">Ração Úmida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {feeding && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Quantidade Recomendada:</h3>
                  
                  <div className="bg-orange-50 p-6 rounded-lg space-y-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="text-2xl px-6 py-3 bg-orange-100 text-orange-800">
                        {feeding.dailyAmount}g por dia
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-xl font-bold text-orange-900">{feeding.meals}</p>
                        <p className="text-sm text-orange-700">refeições por dia</p>
                      </div>
                      <div>
                        <Utensils className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-xl font-bold text-orange-900">{feeding.mealAmount}g</p>
                        <p className="text-sm text-orange-700">por refeição</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Horários Sugeridos:</h4>
                    {feeding.meals === 2 ? (
                      <div className="space-y-2 text-sm text-blue-700">
                        <p>• <strong>Manhã:</strong> 7:00 - 8:00 ({feeding.mealAmount}g)</p>
                        <p>• <strong>Noite:</strong> 18:00 - 19:00 ({feeding.mealAmount}g)</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm text-blue-700">
                        <p>• <strong>Manhã:</strong> 7:00 - 8:00 ({feeding.mealAmount}g)</p>
                        <p>• <strong>Tarde:</strong> 13:00 - 14:00 ({feeding.mealAmount}g)</p>
                        <p>• <strong>Noite:</strong> 18:00 - 19:00 ({feeding.mealAmount}g)</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Dicas Importantes:</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Sempre deixe água fresca disponível</li>
                      <li>• Ajuste a quantidade conforme a condição corporal do pet</li>
                      <li>• Consulte um veterinário para dietas especiais</li>
                      <li>• Petiscos devem representar no máximo 10% da alimentação</li>
                      <li>• Faça transições alimentares gradualmente</li>
                    </ul>
                  </div>
                </div>
              )}
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

export default PetFeeding;
