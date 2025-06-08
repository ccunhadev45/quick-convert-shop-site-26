
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Droplet, Calculator, Thermometer, Activity, Info } from "lucide-react";

const HydrationCalculator = () => {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [climate, setClimate] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [result, setResult] = useState<any>(null);

  const activityLevels = [
    { id: "sedentary", name: "Sedentário", multiplier: 0, description: "Pouco movimento, trabalho de escritório" },
    { id: "light", name: "Leve", multiplier: 0.3, description: "Caminhadas, exercícios leves" },
    { id: "moderate", name: "Moderado", multiplier: 0.6, description: "Exercícios 3-4x/semana" },
    { id: "intense", name: "Intenso", multiplier: 1.0, description: "Exercícios diários intensos" },
    { id: "extreme", name: "Extremo", multiplier: 1.5, description: "Atletas, exercícios 2x/dia" }
  ];

  const climateTypes = [
    { id: "temperate", name: "Temperado", adjustment: 0, description: "15-25°C, umidade normal" },
    { id: "hot_dry", name: "Quente e Seco", adjustment: 0.5, description: ">30°C, baixa umidade" },
    { id: "hot_humid", name: "Quente e Úmido", adjustment: 0.7, description: ">30°C, alta umidade" },
    { id: "cold", name: "Frio", adjustment: -0.2, description: "<10°C" },
    { id: "air_conditioned", name: "Ar Condicionado", adjustment: -0.1, description: "Ambiente controlado" }
  ];

  const healthConditionsList = [
    { id: "none", name: "Nenhuma", adjustment: 0 },
    { id: "fever", name: "Febre", adjustment: 0.5 },
    { id: "diabetes", name: "Diabetes", adjustment: 0.3 },
    { id: "kidney_disease", name: "Doença Renal", adjustment: -0.3 },
    { id: "heart_disease", name: "Doença Cardíaca", adjustment: 0.2 },
    { id: "pregnancy", name: "Gravidez", adjustment: 0.4 },
    { id: "breastfeeding", name: "Amamentação", adjustment: 0.6 }
  ];

  const calculateHydration = () => {
    if (!weight || !age || !gender || !activityLevel || !climate) return;

    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age);
    
    // Cálculo base: 35ml por kg de peso corporal
    let baseWater = weightNum * 35;
    
    // Ajuste por idade
    if (ageNum < 12) {
      baseWater = weightNum * 50; // Crianças precisam de mais água por kg
    } else if (ageNum > 65) {
      baseWater = weightNum * 30; // Idosos podem precisar de menos, mas devem ser monitorados
    }
    
    // Ajuste por gênero (homens geralmente precisam de mais)
    if (gender === "male") {
      baseWater *= 1.1;
    }
    
    // Ajuste por atividade física
    const activity = activityLevels.find(a => a.id === activityLevel);
    if (activity) {
      baseWater += (baseWater * activity.multiplier);
    }
    
    // Ajuste por clima
    const climateType = climateTypes.find(c => c.id === climate);
    if (climateType) {
      baseWater += (baseWater * climateType.adjustment);
    }
    
    // Ajuste por condições de saúde
    if (healthConditions && healthConditions !== "none") {
      const condition = healthConditionsList.find(h => h.id === healthConditions);
      if (condition) {
        baseWater += (baseWater * condition.adjustment);
      }
    }
    
    // Converter para litros
    const totalLiters = baseWater / 1000;
    
    // Distribuição ao longo do dia
    const hourlyIntake = totalLiters / 16; // 16 horas acordado
    const glassesOf250ml = Math.ceil(totalLiters / 0.25);
    
    // Recomendações específicas
    const recommendations = [];
    
    if (ageNum < 12) {
      recommendations.push("Ofereça água frequentemente, mesmo que a criança não peça");
    }
    
    if (ageNum > 65) {
      recommendations.push("Idosos têm menor sensação de sede, beba água regularmente");
    }
    
    if (activity && activity.multiplier > 0.5) {
      recommendations.push("Beba 200-300ml de água 2-3 horas antes do exercício");
      recommendations.push("Durante exercício: 150-250ml a cada 15-20 minutos");
    }
    
    if (climateType && climateType.adjustment > 0.3) {
      recommendations.push("Em clima quente, aumente a ingestão gradualmente");
      recommendations.push("Monitore cor da urina como indicador de hidratação");
    }
    
    recommendations.push("Distribua a ingestão ao longo do dia");
    recommendations.push("Beba mais se urina estiver escura ou concentrada");

    setResult({
      totalLiters: totalLiters.toFixed(1),
      hourlyIntake: hourlyIntake.toFixed(0),
      glassesOf250ml,
      baseWater: (baseWater / 1000).toFixed(1),
      activity: activity?.name,
      climate: climateType?.name,
      healthCondition: healthConditionsList.find(h => h.id === healthConditions)?.name,
      recommendations
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Droplet className="h-8 w-8 text-cyan-600" />
              Calculadora de Hidratação
            </CardTitle>
            <p className="text-gray-600">
              Calcule suas necessidades hídricas personalizadas
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <Alert className="border-cyan-200 bg-cyan-50">
              <Droplet className="h-4 w-4 text-cyan-600" />
              <AlertTitle className="text-cyan-800">Hidratação Personalizada</AlertTitle>
              <AlertDescription className="text-cyan-700">
                Esta calculadora considera idade, peso, atividade física, clima e condições de saúde 
                para determinar suas necessidades hídricas diárias.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Entrada de Dados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Informações Pessoais
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Ex: 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="age">Idade</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Ex: 30"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gender">Sexo</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione seu sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="activityLevel">Nível de Atividade</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione seu nível de atividade" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            <div>
                              <div className="font-medium">{level.name}</div>
                              <div className="text-xs text-gray-500">{level.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="climate">Clima/Ambiente</Label>
                    <Select value={climate} onValueChange={setClimate}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o clima" />
                      </SelectTrigger>
                      <SelectContent>
                        {climateTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-gray-500">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="healthConditions">Condições de Saúde</Label>
                    <Select value={healthConditions} onValueChange={setHealthConditions}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Condições especiais (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {healthConditionsList.map((condition) => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculateHydration} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Necessidades Hídricas
                  </Button>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Suas Necessidades</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-cyan-200 bg-cyan-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-cyan-800">Necessidade Diária Total:</p>
                            <p className="text-cyan-700 text-3xl font-bold">{result.totalLiters} L</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-cyan-800">Por Hora:</p>
                              <p className="text-cyan-700 text-lg">{result.hourlyIntake} ml</p>
                            </div>
                            
                            <div>
                              <p className="font-medium text-cyan-800">Copos (250ml):</p>
                              <p className="text-cyan-700 text-lg">{result.glassesOf250ml} copos</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-medium text-cyan-800">Necessidade Base:</p>
                            <p className="text-cyan-700">{result.baseWater} L</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Fatores Considerados */}
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Fatores Considerados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Atividade: {result.activity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Clima: {result.climate}</span>
                          </div>
                          {result.healthCondition && result.healthCondition !== "Nenhuma" && (
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">Condição: {result.healthCondition}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recomendações */}
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-800">Dicas de Hidratação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Droplet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha seus dados para calcular as necessidades hídricas</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Sinais de Hidratação */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Monitore sua Hidratação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Bem Hidratado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Urina clara ou amarelo claro</li>
                      <li>• Mucosas úmidas</li>
                      <li>• Pele elástica</li>
                      <li>• Energia normal</li>
                      <li>• Raramente com sede</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800">Desidratado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Urina escura ou concentrada</li>
                      <li>• Boca seca</li>
                      <li>• Fadiga ou tontura</li>
                      <li>• Dor de cabeça</li>
                      <li>• Sede intensa</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSpace position="middle" />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default HydrationCalculator;
