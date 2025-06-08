
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Dog, Cat, Heart } from "lucide-react";

const PetAgeConverter = () => {
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [size, setSize] = useState("medium");
  
  const calculateHumanAge = () => {
    if (!petType || !petAge) return null;
    
    const age = parseFloat(petAge);
    let humanAge = 0;
    
    if (petType === "dog") {
      // Cálculo mais preciso baseado no tamanho do cão
      if (age <= 1) {
        humanAge = age * 15;
      } else if (age <= 2) {
        humanAge = 15 + (age - 1) * 9;
      } else {
        const baseAge = 24; // 2 anos = 24 anos humanos
        const yearlyRate = size === "small" ? 4 : size === "medium" ? 5 : 6;
        humanAge = baseAge + (age - 2) * yearlyRate;
      }
    } else if (petType === "cat") {
      if (age <= 1) {
        humanAge = age * 15;
      } else if (age <= 2) {
        humanAge = 15 + (age - 1) * 9;
      } else {
        humanAge = 24 + (age - 2) * 4;
      }
    }
    
    return Math.round(humanAge);
  };

  const getLifeStage = () => {
    if (!petType || !petAge) return null;
    
    const age = parseFloat(petAge);
    
    if (petType === "dog") {
      if (age < 1) return { stage: "Filhote", color: "bg-yellow-100 text-yellow-800" };
      if (age < 3) return { stage: "Jovem", color: "bg-green-100 text-green-800" };
      if (age < 7) return { stage: "Adulto", color: "bg-blue-100 text-blue-800" };
      if (age < 10) return { stage: "Maduro", color: "bg-orange-100 text-orange-800" };
      return { stage: "Idoso", color: "bg-red-100 text-red-800" };
    } else if (petType === "cat") {
      if (age < 1) return { stage: "Filhote", color: "bg-yellow-100 text-yellow-800" };
      if (age < 3) return { stage: "Jovem", color: "bg-green-100 text-green-800" };
      if (age < 6) return { stage: "Adulto", color: "bg-blue-100 text-blue-800" };
      if (age < 10) return { stage: "Maduro", color: "bg-orange-100 text-orange-800" };
      return { stage: "Idoso", color: "bg-red-100 text-red-800" };
    }
    
    return null;
  };

  const humanAge = calculateHumanAge();
  const lifeStage = getLifeStage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Heart className="h-8 w-8 text-amber-600" />
                Conversor de Idade de Pets
              </CardTitle>
              <p className="text-gray-600">
                Converta a idade do seu pet para idade humana
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
                  <Label>Idade do Pet (anos)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 3.5"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                  />
                </div>
              </div>

              {petType === "dog" && (
                <div className="space-y-2">
                  <Label>Porte do Cão</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeno (até 10kg)</SelectItem>
                      <SelectItem value="medium">Médio (10-25kg)</SelectItem>
                      <SelectItem value="large">Grande (acima de 25kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {humanAge && lifeStage && (
                <div className="mt-8 space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="text-3xl px-8 py-4 bg-amber-100 text-amber-800">
                      {humanAge} anos humanos
                    </Badge>
                  </div>
                  
                  <div className="bg-amber-50 p-6 rounded-lg space-y-4">
                    <div className="text-center">
                      <Badge className={lifeStage.color}>
                        {lifeStage.stage}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Idade do Pet</p>
                        <p className="text-2xl font-bold text-gray-900">{petAge} anos</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Equivale a</p>
                        <p className="text-2xl font-bold text-gray-900">{humanAge} anos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3">Cuidados para esta fase:</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      {lifeStage.stage === "Filhote" && (
                        <>
                          <li>• Vacinação completa e vermifugação</li>
                          <li>• Alimentação específica para filhotes</li>
                          <li>• Socialização e educação básica</li>
                        </>
                      )}
                      {lifeStage.stage === "Jovem" && (
                        <>
                          <li>• Exercícios regulares e brincadeiras</li>
                          <li>• Treinamento e reforço de comandos</li>
                          <li>• Check-ups veterinários anuais</li>
                        </>
                      )}
                      {lifeStage.stage === "Adulto" && (
                        <>
                          <li>• Manutenção do peso ideal</li>
                          <li>• Exercícios regulares adequados</li>
                          <li>• Check-ups veterinários anuais</li>
                        </>
                      )}
                      {lifeStage.stage === "Maduro" && (
                        <>
                          <li>• Atenção especial à saúde articular</li>
                          <li>• Ajustes na alimentação e exercícios</li>
                          <li>• Check-ups veterinários semestrais</li>
                        </>
                      )}
                      {lifeStage.stage === "Idoso" && (
                        <>
                          <li>• Cuidados especiais com mobilidade</li>
                          <li>• Alimentação para pets seniores</li>
                          <li>• Check-ups veterinários frequentes</li>
                        </>
                      )}
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

export default PetAgeConverter;
