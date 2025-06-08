
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Heart, Calculator, Crown, Info } from "lucide-react";

const SpecializedBmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [result, setResult] = useState<any>(null);

  const specialties = [
    { id: "athlete", name: "Atletas", description: "IMC específico para atletas" },
    { id: "elderly", name: "Idosos (65+)", description: "Faixas adaptadas para terceira idade" },
    { id: "children", name: "Crianças/Adolescentes", description: "Percentis pediátricos" },
    { id: "pregnancy", name: "Gestantes", description: "IMC durante gravidez" },
    { id: "bodybuilder", name: "Fisiculturistas", description: "Alta massa muscular" }
  ];

  const calculateSpecializedBMI = () => {
    if (!weight || !height || !specialty) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    const bmi = weightNum / (heightNum * heightNum);

    let interpretation = "";
    let category = "";
    let recommendations = [];

    switch (specialty) {
      case "athlete":
        if (bmi < 20) { category = "Baixo peso"; interpretation = "Pode indicar necessidade de ganho de massa"; }
        else if (bmi < 25) { category = "Normal"; interpretation = "Peso adequado para atleta"; }
        else if (bmi < 30) { category = "Sobrepeso"; interpretation = "Avaliar composição corporal"; }
        else { category = "Obesidade"; interpretation = "Requer avaliação médica"; }
        recommendations = ["Avaliação da composição corporal", "Análise da massa muscular", "Consulta com nutricionista esportivo"];
        break;

      case "elderly":
        if (bmi < 23) { category = "Baixo peso"; interpretation = "Risco nutricional aumentado"; }
        else if (bmi < 28) { category = "Normal"; interpretation = "Peso adequado para idoso"; }
        else if (bmi < 32) { category = "Sobrepeso"; interpretation = "Leve excesso, monitorar"; }
        else { category = "Obesidade"; interpretation = "Risco para saúde"; }
        recommendations = ["Avaliação geriátrica", "Exercícios de baixo impacto", "Acompanhamento nutricional"];
        break;

      case "children":
        category = "Percentil pediátrico";
        interpretation = "Necessária avaliação com tabelas de crescimento";
        recommendations = ["Consulta pediátrica", "Avaliação do crescimento", "Hábitos alimentares saudáveis"];
        break;

      case "pregnancy":
        category = "Gestante";
        interpretation = "IMC pré-gestacional importante para ganho de peso adequado";
        recommendations = ["Acompanhamento pré-natal", "Nutrição gestacional", "Exercícios apropriados"];
        break;

      case "bodybuilder":
        if (bmi < 25) { category = "Normal"; interpretation = "Pode estar em cutting"; }
        else if (bmi < 30) { category = "Sobrepeso"; interpretation = "Provável alta massa muscular"; }
        else { category = "IMC elevado"; interpretation = "Necessária análise de composição corporal"; }
        recommendations = ["DEXA scan", "Bioimpedância", "Avaliação de dobras cutâneas"];
        break;

      default:
        category = "Indefinido";
        interpretation = "Selecione uma especialidade";
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      interpretation,
      recommendations,
      specialty: specialties.find(s => s.id === specialty)?.name
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-yellow-500" />
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                PRO
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-red-600" />
              IMC Especializado
            </CardTitle>
            <p className="text-gray-600">
              Cálculo de IMC adaptado para populações específicas
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dados Pessoais
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select value={specialty} onValueChange={setSpecialty}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((spec) => (
                          <SelectItem key={spec.id} value={spec.id}>
                            <div>
                              <div className="font-medium">{spec.name}</div>
                              <div className="text-sm text-gray-500">{spec.description}</div>
                            </div>
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
                        placeholder="70"
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
                        placeholder="170"
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
                        placeholder="30"
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

                  <Button onClick={calculateSpecializedBMI} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular IMC Especializado
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultado</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-blue-800">Especialidade:</p>
                            <p className="text-blue-700">{result.specialty}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">IMC:</p>
                            <p className="text-blue-700 text-2xl font-bold">{result.bmi}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Categoria:</p>
                            <p className="text-blue-700">{result.category}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Interpretação:</p>
                            <p className="text-blue-700">{result.interpretation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Recomendações:</strong>
                        <ul className="mt-2 space-y-1">
                          {result.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados para calcular o IMC especializado</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sobre IMC Especializado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialties.map((spec) => (
                  <Card key={spec.id} className="border-gray-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{spec.name}</h4>
                      <p className="text-sm text-gray-600">{spec.description}</p>
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
