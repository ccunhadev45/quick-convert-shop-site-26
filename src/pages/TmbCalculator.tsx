
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";

const TmbCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [tmb, setTmb] = useState<number | null>(null);
  const [totalCalories, setTotalCalories] = useState<number | null>(null);

  const activityMultipliers = {
    sedentary: { value: 1.2, label: "Sedentário (pouco ou nenhum exercício)" },
    light: { value: 1.375, label: "Levemente ativo (exercício leve 1-3 dias/semana)" },
    moderate: { value: 1.55, label: "Moderadamente ativo (exercício moderado 3-5 dias/semana)" },
    very: { value: 1.725, label: "Muito ativo (exercício pesado 6-7 dias/semana)" },
    extra: { value: 1.9, label: "Extremamente ativo (exercício muito pesado, trabalho físico)" }
  };

  const calculateTmb = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);
    
    if (weightNum > 0 && heightNum > 0 && ageNum > 0) {
      let tmbResult;
      
      // Fórmula de Harris-Benedict
      if (gender === "male") {
        tmbResult = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
      } else {
        tmbResult = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
      }
      
      setTmb(tmbResult);
      setTotalCalories(tmbResult * activityMultipliers[activityLevel as keyof typeof activityMultipliers].value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de TMB
              </CardTitle>
              <p className="text-gray-600">
                Calcule sua Taxa Metabólica Basal
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 70"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      calculateTmb();
                    }}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 175"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      calculateTmb();
                    }}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Ex: 30"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      calculateTmb();
                    }}
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sexo</Label>
                <RadioGroup 
                  value={gender} 
                  onValueChange={(value) => {
                    setGender(value);
                    calculateTmb();
                  }}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="activity">Nível de Atividade</Label>
                <Select 
                  value={activityLevel} 
                  onValueChange={(value) => {
                    setActivityLevel(value);
                    calculateTmb();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível de atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(activityMultipliers).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {tmb && totalCalories && (
                <div className="mt-8 space-y-4">
                  <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">TMB (Taxa Metabólica Basal)</h3>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(tmb)} kcal/dia
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Calorias necessárias em repouso
                    </p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-xl text-center">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Gasto Calórico Total</h3>
                    <div className="text-3xl font-bold text-blue-900">
                      {Math.round(totalCalories)} kcal/dia
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      Calorias necessárias com atividade física
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-sm text-gray-600">
                <p className="font-semibold text-gray-800 mb-2">Informação:</p>
                <p>
                  A TMB representa a quantidade mínima de energia que seu corpo precisa para 
                  manter as funções vitais em repouso. O gasto calórico total inclui suas 
                  atividades físicas diárias.
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

export default TmbCalculator;
