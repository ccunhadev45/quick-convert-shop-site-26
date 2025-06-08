
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { HardHat, AlertTriangle, CheckCircle, Shield } from "lucide-react";

const WorkplaceSafety = () => {
  const [workplace, setWorkplace] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [safetyMeasures, setSafetyMeasures] = useState<string[]>([]);
  
  const workplaceTypes = {
    office: { name: "Escritório", riskLevel: 1, requiredMeasures: ["fire_exits", "first_aid", "ergonomic"] },
    factory: { name: "Fábrica", riskLevel: 4, requiredMeasures: ["ppe", "emergency_procedures", "safety_training", "ventilation"] },
    construction: { name: "Construção", riskLevel: 5, requiredMeasures: ["ppe", "fall_protection", "safety_training", "tool_inspection"] },
    laboratory: { name: "Laboratório", riskLevel: 3, requiredMeasures: ["chemical_storage", "ventilation", "ppe", "emergency_procedures"] },
    warehouse: { name: "Armazém", riskLevel: 2, requiredMeasures: ["forklift_safety", "fall_protection", "ppe", "emergency_procedures"] }
  };

  const safetyMeasuresList = {
    ppe: "Equipamentos de Proteção Individual",
    fire_exits: "Saídas de Emergência Sinalizadas",
    first_aid: "Kit de Primeiros Socorros",
    emergency_procedures: "Procedimentos de Emergência",
    safety_training: "Treinamento de Segurança",
    ergonomic: "Mobiliário Ergonômico",
    ventilation: "Sistema de Ventilação",
    chemical_storage: "Armazenamento Seguro de Químicos",
    fall_protection: "Proteção Contra Quedas",
    tool_inspection: "Inspeção Regular de Ferramentas",
    forklift_safety: "Segurança para Empilhadeiras"
  };

  const handleSafetyMeasureChange = (measure: string, checked: boolean) => {
    if (checked) {
      setSafetyMeasures([...safetyMeasures, measure]);
    } else {
      setSafetyMeasures(safetyMeasures.filter(m => m !== measure));
    }
  };

  const calculateSafety = () => {
    if (!workplace || !employeeCount) return null;
    
    const workplaceData = workplaceTypes[workplace as keyof typeof workplaceTypes];
    const requiredMeasures = workplaceData.requiredMeasures;
    const implementedRequired = safetyMeasures.filter(m => requiredMeasures.includes(m));
    
    const complianceScore = (implementedRequired.length / requiredMeasures.length) * 100;
    const totalMeasuresScore = (safetyMeasures.length / Object.keys(safetyMeasuresList).length) * 100;
    
    const overallScore = Math.round((complianceScore * 0.7) + (totalMeasuresScore * 0.3));
    
    const missingRequired = requiredMeasures.filter(m => !safetyMeasures.includes(m));
    
    return {
      score: overallScore,
      complianceScore: Math.round(complianceScore),
      level: overallScore >= 90 ? "Excelente" : 
             overallScore >= 70 ? "Bom" : 
             overallScore >= 50 ? "Regular" : "Inadequado",
      color: overallScore >= 90 ? "green" : 
             overallScore >= 70 ? "blue" : 
             overallScore >= 50 ? "yellow" : "red",
      missingRequired,
      workplaceData,
      riskLevel: workplaceData.riskLevel
    };
  };

  const getRecommendations = (assessment: any) => {
    if (!assessment) return [];
    
    const recommendations = [];
    
    if (assessment.missingRequired.length > 0) {
      recommendations.push("Implemente imediatamente as medidas obrigatórias em falta");
    }
    
    if (assessment.score < 70) {
      recommendations.push("Realize auditoria completa de segurança");
      recommendations.push("Desenvolva plano de ação para melhorias");
    }
    
    if (assessment.riskLevel >= 3 && !safetyMeasures.includes("safety_training")) {
      recommendations.push("Implemente programa de treinamento regular");
    }
    
    if (parseInt(employeeCount) > 50 && !safetyMeasures.includes("emergency_procedures")) {
      recommendations.push("Desenvolva plano de evacuação detalhado");
    }
    
    return recommendations;
  };

  const assessment = calculateSafety();
  const recommendations = getRecommendations(assessment);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <HardHat className="h-8 w-8 text-orange-600" />
                Avaliação de Segurança no Trabalho
              </CardTitle>
              <p className="text-gray-600">
                Avalie e melhore a segurança do seu ambiente de trabalho
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Ambiente</Label>
                  <Select value={workplace} onValueChange={setWorkplace}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(workplaceTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Número de Funcionários</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 25"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Medidas de Segurança Implementadas:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(safetyMeasuresList).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={safetyMeasures.includes(key)}
                        onCheckedChange={(checked) => handleSafetyMeasureChange(key, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {assessment && (
                <div className="mt-8 space-y-4">
                  <div className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`text-2xl px-6 py-3 ${
                        assessment.color === "green" ? "bg-green-100 text-green-800" :
                        assessment.color === "blue" ? "bg-blue-100 text-blue-800" :
                        assessment.color === "yellow" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {assessment.score}% - {assessment.level}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-blue-900">{assessment.complianceScore}%</p>
                      <p className="text-sm text-blue-700">Conformidade Obrigatória</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-orange-900">Nível {assessment.riskLevel}/5</p>
                      <p className="text-sm text-orange-700">Risco do Ambiente</p>
                    </div>
                  </div>
                  
                  {assessment.missingRequired.length > 0 && (
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Medidas Obrigatórias em Falta:
                      </h3>
                      <ul className="space-y-1">
                        {assessment.missingRequired.map((measure: string) => (
                          <li key={measure} className="text-red-700">
                            • {safetyMeasuresList[measure as keyof typeof safetyMeasuresList]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {recommendations.length > 0 && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Recomendações:
                      </h3>
                      <ul className="space-y-1">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="text-green-700">• {rec}</li>
                        ))}
                      </ul>
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

export default WorkplaceSafety;
