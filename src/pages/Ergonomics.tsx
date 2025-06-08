
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Monitor, Armchair, Eye, AlertTriangle } from "lucide-react";

const Ergonomics = () => {
  const [workstation, setWorkstation] = useState("");
  const [screenHeight, setScreenHeight] = useState("");
  const [chairHeight, setChairHeight] = useState("");
  const [keyboardPosition, setKeyboardPosition] = useState("");
  const [userHeight, setUserHeight] = useState("");
  
  const calculateErgonomics = () => {
    if (!workstation || !screenHeight || !chairHeight || !keyboardPosition || !userHeight) return null;
    
    const height = parseInt(userHeight);
    let score = 0;
    const issues = [];
    const recommendations = [];
    
    // Ideal measurements based on user height
    const idealDeskHeight = Math.round(height * 0.45); // ~45% of height
    const idealScreenDistance = 50; // 50-70cm
    
    // Screen height evaluation
    const screenPos = parseInt(screenHeight);
    if (screenPos >= 15 && screenPos <= 30) {
      score += 25;
    } else {
      issues.push("Altura da tela inadequada");
      recommendations.push("Posicione o topo da tela na altura dos olhos ou ligeiramente abaixo");
    }
    
    // Chair height evaluation  
    const chairPos = parseInt(chairHeight);
    const expectedChairHeight = idealDeskHeight - 30; // Chair should be 30cm lower than desk
    if (Math.abs(chairPos - expectedChairHeight) <= 5) {
      score += 25;
    } else {
      issues.push("Altura da cadeira inadequada");
      recommendations.push(`Ajuste a cadeira para aproximadamente ${expectedChairHeight}cm`);
    }
    
    // Keyboard position evaluation
    if (keyboardPosition === "elbow_level") {
      score += 25;
    } else {
      issues.push("Posição do teclado inadequada");
      recommendations.push("Mantenha o teclado na altura dos cotovelos");
    }
    
    // Workstation type evaluation
    if (workstation === "standing_desk" || workstation === "adjustable_desk") {
      score += 25;
    } else if (workstation === "regular_desk") {
      score += 15;
    } else {
      issues.push("Estação de trabalho não ergonômica");
      recommendations.push("Considere uma mesa ajustável ou apoios ergonômicos");
    }
    
    return {
      score,
      level: score >= 80 ? "Excelente" : score >= 60 ? "Bom" : score >= 40 ? "Regular" : "Precisa Melhorias",
      color: score >= 80 ? "green" : score >= 60 ? "blue" : score >= 40 ? "yellow" : "red",
      issues,
      recommendations,
      idealMeasurements: {
        deskHeight: idealDeskHeight,
        chairHeight: expectedChairHeight,
        screenDistance: idealScreenDistance
      }
    };
  };

  const assessment = calculateErgonomics();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Monitor className="h-8 w-8 text-indigo-600" />
                Avaliação Ergonômica
              </CardTitle>
              <p className="text-gray-600">
                Analise e melhore a ergonomia do seu ambiente de trabalho
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Estação de Trabalho</Label>
                  <Select value={workstation} onValueChange={setWorkstation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular_desk">Mesa Comum</SelectItem>
                      <SelectItem value="adjustable_desk">Mesa Ajustável</SelectItem>
                      <SelectItem value="standing_desk">Mesa em Pé</SelectItem>
                      <SelectItem value="laptop_only">Apenas Laptop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Sua Altura (cm)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 170"
                    value={userHeight}
                    onChange={(e) => setUserHeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Altura da Tela (graus abaixo do olho)</Label>
                  <Select value={screenHeight} onValueChange={setScreenHeight}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ângulo da tela" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0° (altura dos olhos)</SelectItem>
                      <SelectItem value="15">15° abaixo</SelectItem>
                      <SelectItem value="30">30° abaixo</SelectItem>
                      <SelectItem value="45">45° abaixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Altura da Cadeira (cm)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 45"
                    value={chairHeight}
                    onChange={(e) => setChairHeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Posição do Teclado</Label>
                <Select value={keyboardPosition} onValueChange={setKeyboardPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elbow_level">Altura dos cotovelos</SelectItem>
                    <SelectItem value="above_elbow">Acima dos cotovelos</SelectItem>
                    <SelectItem value="below_elbow">Abaixo dos cotovelos</SelectItem>
                  </SelectContent>
                </Select>
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
                      {assessment.score}/100 - {assessment.level}
                    </Badge>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                      <Armchair className="h-5 w-5" />
                      Medidas Ideais para sua Altura:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-indigo-700">
                      <div className="text-center">
                        <p className="font-bold">{assessment.idealMeasurements.deskHeight}cm</p>
                        <p className="text-sm">Altura da Mesa</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{assessment.idealMeasurements.chairHeight}cm</p>
                        <p className="text-sm">Altura da Cadeira</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{assessment.idealMeasurements.screenDistance}cm</p>
                        <p className="text-sm">Distância da Tela</p>
                      </div>
                    </div>
                  </div>
                  
                  {assessment.issues.length > 0 && (
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Problemas Identificados:
                      </h3>
                      <ul className="space-y-1">
                        {assessment.issues.map((issue, index) => (
                          <li key={index} className="text-red-700">• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {assessment.recommendations.length > 0 && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Recomendações:
                      </h3>
                      <ul className="space-y-1">
                        {assessment.recommendations.map((rec, index) => (
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

export default Ergonomics;
