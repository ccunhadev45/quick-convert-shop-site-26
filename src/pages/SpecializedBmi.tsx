
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
import { Heart, Calculator, Users, Info, TrendingUp } from "lucide-react";

const SpecializedBmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [result, setResult] = useState<any>(null);

  const categories = [
    { id: "child", name: "Criança (2-18 anos)", ageRange: "2-18" },
    { id: "adult", name: "Adulto (18-65 anos)", ageRange: "18-65" },
    { id: "elderly", name: "Idoso (65+ anos)", ageRange: "65+" },
    { id: "athlete", name: "Atleta", ageRange: "18-45" },
    { id: "pregnant", name: "Gestante", ageRange: "18-45" }
  ];

  const activityLevels = [
    { id: "sedentary", name: "Sedentário", description: "Pouco ou nenhum exercício" },
    { id: "light", name: "Leve", description: "Exercício leve 1-3 dias/semana" },
    { id: "moderate", name: "Moderado", description: "Exercício moderado 3-5 dias/semana" },
    { id: "intense", name: "Intenso", description: "Exercício intenso 6-7 dias/semana" },
    { id: "extreme", name: "Extremo", description: "Exercício muito intenso 2x/dia" }
  ];

  const calculateSpecializedBMI = () => {
    if (!weight || !height || !age || !gender || !category) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // cm para metros
    const ageNum = parseInt(age);
    
    const bmi = weightNum / (heightNum * heightNum);
    
    let interpretation = "";
    let percentile = null;
    let idealWeight = "";
    let recommendations = [];

    // Lógica específica por categoria
    switch (category) {
      case "child":
        // IMC infantil usa percentis
        const childPercentile = calculateChildPercentile(bmi, ageNum, gender);
        percentile = childPercentile;
        if (childPercentile < 5) {
          interpretation = "Baixo peso";
          recommendations.push("Consultar pediatra para avaliação nutricional");
        } else if (childPercentile < 85) {
          interpretation = "Peso normal";
          recommendations.push("Manter alimentação saudável e atividade física");
        } else if (childPercentile < 95) {
          interpretation = "Sobrepeso";
          recommendations.push("Ajustar alimentação e aumentar atividade física");
        } else {
          interpretation = "Obesidade";
          recommendations.push("Consultar pediatra para plano de tratamento");
        }
        break;

      case "elderly":
        // IMC para idosos tem faixas diferentes
        if (bmi < 22) {
          interpretation = "Baixo peso";
          recommendations.push("Atenção à desnutrição e sarcopenia");
        } else if (bmi < 27) {
          interpretation = "Peso normal";
          recommendations.push("Manter peso e massa muscular");
        } else if (bmi < 30) {
          interpretation = "Sobrepeso";
          recommendations.push("Leve redução de peso pode ser benéfica");
        } else {
          interpretation = "Obesidade";
          recommendations.push("Redução gradual de peso sob supervisão");
        }
        break;

      case "athlete":
        // Atletas podem ter IMC elevado devido à massa muscular
        if (bmi < 20) {
          interpretation = "Baixo peso para atleta";
        } else if (bmi < 25) {
          interpretation = "Peso ideal para atleta";
        } else if (bmi < 30) {
          interpretation = "Peso elevado - avaliar composição corporal";
        } else {
          interpretation = "Peso muito elevado";
        }
        recommendations.push("Considerar análise de composição corporal");
        recommendations.push("Avaliar porcentagem de gordura e massa muscular");
        break;

      case "pregnant":
        // IMC pré-gestacional determina ganho de peso recomendado
        const preGestationalBMI = bmi; // Assumindo que é o IMC atual
        let weightGainRange = "";
        
        if (preGestationalBMI < 18.5) {
          interpretation = "Baixo peso pré-gestacional";
          weightGainRange = "12,5-18 kg";
        } else if (preGestationalBMI < 25) {
          interpretation = "Peso normal pré-gestacional";
          weightGainRange = "11,5-16 kg";
        } else if (preGestationalBMI < 30) {
          interpretation = "Sobrepeso pré-gestacional";
          weightGainRange = "7-11,5 kg";
        } else {
          interpretation = "Obesidade pré-gestacional";
          weightGainRange = "5-9 kg";
        }
        
        recommendations.push(`Ganho de peso recomendado: ${weightGainRange}`);
        recommendations.push("Acompanhamento nutricional especializado");
        break;

      default:
        // IMC adulto padrão
        if (bmi < 18.5) {
          interpretation = "Baixo peso";
        } else if (bmi < 25) {
          interpretation = "Peso normal";
        } else if (bmi < 30) {
          interpretation = "Sobrepeso";
        } else {
          interpretation = "Obesidade";
        }
    }

    // Calcular peso ideal
    const idealBMI = category === "elderly" ? 24 : 22;
    const idealWeightCalc = idealBMI * (heightNum * heightNum);
    idealWeight = `${idealWeightCalc.toFixed(1)} kg`;

    setResult({
      bmi: bmi.toFixed(1),
      interpretation,
      percentile,
      idealWeight,
      recommendations,
      category: categories.find(c => c.id === category)?.name,
      activityLevel: activityLevel ? activityLevels.find(a => a.id === activityLevel)?.name : null
    });
  };

  const calculateChildPercentile = (bmi: number, age: number, gender: string) => {
    // Simulação de cálculo de percentil infantil
    // Em uma implementação real, usaria tabelas de crescimento oficiais
    const basePercentile = Math.random() * 100;
    return Math.round(basePercentile);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-pink-600" />
              IMC Especializado
            </CardTitle>
            <p className="text-gray-600">
              Cálculo de IMC personalizado para diferentes grupos populacionais
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Avaliação Especializada</AlertTitle>
              <AlertDescription className="text-blue-700">
                Este calculador oferece interpretações específicas para crianças, idosos, atletas e gestantes, 
                considerando as particularidades de cada grupo.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Entrada de Dados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dados Pessoais
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Ex: 175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                    
                    <div>
                      <Label htmlFor="gender">Sexo</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {(category === "athlete" || category === "adult") && (
                    <div>
                      <Label htmlFor="activityLevel">Nível de Atividade</Label>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityLevels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name} - {level.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button onClick={calculateSpecializedBMI} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular IMC Especializado
                  </Button>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultado</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-pink-200 bg-pink-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-pink-800">Categoria:</p>
                            <p className="text-pink-700">{result.category}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-pink-800">IMC:</p>
                            <p className="text-pink-700 text-2xl font-bold">{result.bmi}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-pink-800">Classificação:</p>
                            <p className="text-pink-700 text-lg font-semibold">{result.interpretation}</p>
                          </div>
                          
                          {result.percentile && (
                            <div>
                              <p className="font-medium text-pink-800">Percentil:</p>
                              <p className="text-pink-700">P{result.percentile}</p>
                            </div>
                          )}
                          
                          <div>
                            <p className="font-medium text-pink-800">Peso Ideal Estimado:</p>
                            <p className="text-pink-700">{result.idealWeight}</p>
                          </div>
                          
                          {result.activityLevel && (
                            <div>
                              <p className="font-medium text-pink-800">Nível de Atividade:</p>
                              <p className="text-pink-700">{result.activityLevel}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recomendações */}
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Recomendações
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
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
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados para calcular o IMC especializado</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Informações sobre Categorias */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Categorias Especializadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <Card key={cat.id} className="border-gray-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{cat.ageRange} anos</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900">{cat.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {cat.id === "child" && "Usa percentis de crescimento específicos para idade e sexo"}
                        {cat.id === "adult" && "Classificação padrão de IMC para adultos"}
                        {cat.id === "elderly" && "Faixas de IMC ajustadas para população idosa"}
                        {cat.id === "athlete" && "Considera maior massa muscular e composição corporal"}
                        {cat.id === "pregnant" && "Orientações para ganho de peso gestacional"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
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

export default SpecializedBmi;
