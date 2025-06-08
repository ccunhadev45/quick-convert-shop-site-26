
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Brain, Heart, AlertCircle, CheckCircle2 } from "lucide-react";

const MentalWellness = () => {
  const [stressLevel, setStressLevel] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [workload, setWorkload] = useState("");
  const [socialSupport, setSocialSupport] = useState("");
  
  const calculateWellness = () => {
    if (!stressLevel || !sleepHours || !workload || !socialSupport) return null;
    
    let score = 0;
    
    // Stress level scoring (inverted - higher stress = lower score)
    const stressScore = parseInt(stressLevel);
    score += (10 - stressScore);
    
    // Sleep hours scoring
    const sleep = parseInt(sleepHours);
    if (sleep >= 7 && sleep <= 9) score += 10;
    else if (sleep >= 6 && sleep <= 10) score += 7;
    else score += 3;
    
    // Workload scoring (inverted)
    const work = parseInt(workload);
    score += (10 - work);
    
    // Social support scoring
    const support = parseInt(socialSupport);
    score += support;
    
    const percentage = Math.round((score / 40) * 100);
    
    return {
      score: percentage,
      level: percentage >= 80 ? "Excelente" : 
             percentage >= 60 ? "Bom" : 
             percentage >= 40 ? "Regular" : "Precisa Atenção",
      color: percentage >= 80 ? "green" : 
             percentage >= 60 ? "blue" : 
             percentage >= 40 ? "yellow" : "red"
    };
  };

  const getRecommendations = (result: any) => {
    if (!result) return [];
    
    const recommendations = [];
    
    if (result.score < 60) {
      recommendations.push("Considere buscar ajuda profissional");
      recommendations.push("Pratique técnicas de relaxamento diariamente");
    }
    
    if (parseInt(sleepHours) < 7) {
      recommendations.push("Estabeleça uma rotina de sono de 7-9 horas");
    }
    
    if (parseInt(stressLevel) > 7) {
      recommendations.push("Identifique e gerencie fontes de estresse");
      recommendations.push("Pratique mindfulness ou meditação");
    }
    
    if (parseInt(workload) > 7) {
      recommendations.push("Organize melhor suas tarefas e prazos");
      recommendations.push("Tire pausas regulares durante o trabalho");
    }
    
    if (parseInt(socialSupport) < 5) {
      recommendations.push("Fortaleça conexões sociais e familiares");
      recommendations.push("Participe de atividades em grupo");
    }
    
    return recommendations;
  };

  const result = calculateWellness();
  const recommendations = getRecommendations(result);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Brain className="h-8 w-8 text-purple-600" />
                Avaliação de Bem-Estar Mental
              </CardTitle>
              <p className="text-gray-600">
                Avalie seu estado de bem-estar mental e receba orientações
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nível de Estresse (1-10)</Label>
                  <Select value={stressLevel} onValueChange={setStressLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione de 1 a 10" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num <= 3 ? "Baixo" : num <= 6 ? "Moderado" : "Alto"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Horas de Sono por Noite</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 8"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sobrecarga de Trabalho (1-10)</Label>
                  <Select value={workload} onValueChange={setWorkload}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione de 1 a 10" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num <= 3 ? "Leve" : num <= 6 ? "Moderada" : "Intensa"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Apoio Social (1-10)</Label>
                  <Select value={socialSupport} onValueChange={setSocialSupport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione de 1 a 10" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num <= 3 ? "Baixo" : num <= 6 ? "Moderado" : "Alto"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {result && (
                <div className="mt-8 space-y-4">
                  <div className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`text-2xl px-6 py-3 ${
                        result.color === "green" ? "bg-green-100 text-green-800" :
                        result.color === "blue" ? "bg-blue-100 text-blue-800" :
                        result.color === "yellow" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.score}% - {result.level}
                    </Badge>
                  </div>
                  
                  {recommendations.length > 0 && (
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Recomendações para seu bem-estar:
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="text-purple-700 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.score < 40 && (
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="text-red-800 font-semibold">
                          Atenção: Considere buscar apoio profissional
                        </p>
                      </div>
                    </div>
                  )}
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

export default MentalWellness;
