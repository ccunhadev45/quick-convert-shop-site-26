
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const OccupationalHealth = () => {
  const [workplace, setWorkplace] = useState("");
  const [exposure, setExposure] = useState("");
  const [workHours, setWorkHours] = useState("");
  
  const riskFactors = {
    office: {
      name: "Escritório",
      risks: ["Postura inadequada", "Fadiga visual", "Estresse", "Ar condicionado"],
      level: "baixo"
    },
    construction: {
      name: "Construção Civil",
      risks: ["Quedas", "Ruído", "Poeira", "Equipamentos pesados"],
      level: "alto"
    },
    healthcare: {
      name: "Saúde",
      risks: ["Exposição biológica", "Estresse", "Turnos noturnos", "Radiação"],
      level: "médio"
    },
    industry: {
      name: "Indústria",
      risks: ["Químicos", "Ruído", "Calor", "Máquinas perigosas"],
      level: "alto"
    }
  };

  const exposureTypes = {
    chemical: "Químicos",
    biological: "Biológicos", 
    physical: "Físicos",
    ergonomic: "Ergonômicos",
    psychosocial: "Psicossociais"
  };

  const calculateRisk = () => {
    if (!workplace || !exposure || !workHours) return null;
    
    const workplaceData = riskFactors[workplace as keyof typeof riskFactors];
    const hours = parseInt(workHours);
    
    let riskScore = workplaceData.level === "alto" ? 3 : workplaceData.level === "médio" ? 2 : 1;
    if (hours > 8) riskScore += 1;
    if (hours > 10) riskScore += 1;
    
    return {
      level: riskScore >= 4 ? "Alto" : riskScore >= 2 ? "Médio" : "Baixo",
      color: riskScore >= 4 ? "red" : riskScore >= 2 ? "yellow" : "green",
      workplace: workplaceData,
      recommendations: generateRecommendations(workplace, exposure, hours)
    };
  };

  const generateRecommendations = (workplace: string, exposure: string, hours: number) => {
    const recommendations = [];
    
    if (hours > 8) {
      recommendations.push("Considere pausas regulares a cada 2 horas");
    }
    
    if (workplace === "office") {
      recommendations.push("Use apoio para os pés e monitor na altura dos olhos");
      recommendations.push("Faça pausas visuais olhando para longe a cada 20 minutos");
    }
    
    if (workplace === "construction") {
      recommendations.push("Use sempre EPIs: capacete, luvas e calçados de segurança");
      recommendations.push("Verifique equipamentos antes do uso");
    }
    
    if (exposure === "chemical") {
      recommendations.push("Use máscaras e luvas apropriadas");
      recommendations.push("Mantenha ventilação adequada no ambiente");
    }
    
    return recommendations;
  };

  const assessment = calculateRisk();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                Avaliação de Saúde Ocupacional
              </CardTitle>
              <p className="text-gray-600">
                Analise riscos ocupacionais no seu ambiente de trabalho
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ambiente de Trabalho</Label>
                  <Select value={workplace} onValueChange={setWorkplace}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(riskFactors).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Tipo de Exposição</Label>
                  <Select value={exposure} onValueChange={setExposure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de exposição" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(exposureTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horas de Trabalho por Dia</Label>
                <Input
                  type="number"
                  placeholder="Ex: 8"
                  value={workHours}
                  onChange={(e) => setWorkHours(e.target.value)}
                />
              </div>

              {assessment && (
                <div className="mt-8 space-y-4">
                  <div className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`text-2xl px-6 py-3 ${
                        assessment.color === "red" ? "bg-red-100 text-red-800" :
                        assessment.color === "yellow" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}
                    >
                      Risco {assessment.level}
                    </Badge>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Fatores de Risco Identificados:
                    </h3>
                    <ul className="space-y-1">
                      {assessment.workplace.risks.map((risk, index) => (
                        <li key={index} className="text-blue-700">• {risk}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Recomendações:
                    </h3>
                    <ul className="space-y-1">
                      {assessment.recommendations.map((rec, index) => (
                        <li key={index} className="text-green-700">• {rec}</li>
                      ))}
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

export default OccupationalHealth;
