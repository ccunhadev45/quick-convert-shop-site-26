
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Ruler, User } from "lucide-react";

const BodyMeasurements = () => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  
  const getBodyType = () => {
    if (!bust || !waist || !hips) return null;
    
    const bustNum = parseFloat(bust);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);
    
    const bustWaistDiff = Math.abs(bustNum - waistNum);
    const hipsWaistDiff = Math.abs(hipsNum - waistNum);
    const bustHipsDiff = Math.abs(bustNum - hipsNum);
    
    if (bustWaistDiff <= 5 && hipsWaistDiff <= 5) {
      return {
        type: "Retângulo",
        description: "Medidas similares em busto, cintura e quadril",
        characteristics: ["Silhueta reta", "Cintura pouco definida", "Proporcional"],
        tips: ["Use cintos para marcar a cintura", "Crie curvas com drapeados", "Aposte em estampas"]
      };
    }
    
    if (bustNum > waistNum + 5 && hipsNum > waistNum + 5 && bustHipsDiff <= 5) {
      return {
        type: "Ampulheta",
        description: "Busto e quadril proporcionais com cintura marcada",
        characteristics: ["Cintura bem definida", "Busto e quadril equilibrados", "Curvas harmoniosas"],
        tips: ["Destaque a cintura", "Use peças ajustadas", "Evite volumes excessivos"]
      };
    }
    
    if (bustNum > hipsNum + 5) {
      return {
        type: "Triângulo Invertido",
        description: "Busto maior que o quadril",
        characteristics: ["Ombros largos", "Quadril estreito", "Foco na parte superior"],
        tips: ["Equilibre com volumes embaixo", "Use cores escuras em cima", "Destaque as pernas"]
      };
    }
    
    if (hipsNum > bustNum + 5) {
      return {
        type: "Triângulo (Pêra)",
        description: "Quadril maior que o busto",
        characteristics: ["Quadril largo", "Ombros estreitos", "Foco na parte inferior"],
        tips: ["Equilibre com volumes em cima", "Use cores claras na parte superior", "Destaque a cintura"]
      };
    }
    
    if (waistNum > bustNum && waistNum > hipsNum) {
      return {
        type: "Maçã",
        description: "Concentração de medidas na região da cintura",
        characteristics: ["Cintura mais larga", "Tendência a acumular na barriga", "Braços e pernas finos"],
        tips: ["Use decotes em V", "Evite cintos apertados", "Destaque pernas e braços"]
      };
    }
    
    return {
      type: "Personalizado",
      description: "Combinação única de medidas",
      characteristics: ["Perfil individual", "Medidas específicas"],
      tips: ["Consulte um profissional", "Faça ajustes personalizados"]
    };
  };

  const bodyType = getBodyType();
  
  const calculateRatios = () => {
    if (!bust || !waist || !hips) return null;
    
    const bustNum = parseFloat(bust);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);
    
    return {
      waistToBust: (waistNum / bustNum).toFixed(2),
      waistToHips: (waistNum / hipsNum).toFixed(2),
      bustToHips: (bustNum / hipsNum).toFixed(2)
    };
  };

  const ratios = calculateRatios();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <User className="h-8 w-8 text-teal-600" />
                Calculadora de Medidas Corporais
              </CardTitle>
              <p className="text-gray-600">
                Descubra seu tipo corporal e receba dicas de estilo
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bust">Busto (cm)</Label>
                  <Input
                    id="bust"
                    type="number"
                    placeholder="Ex: 90"
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Cintura (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder="Ex: 70"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Quadril (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    placeholder="Ex: 95"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              {bodyType && (
                <div className="mt-8 space-y-6">
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-teal-100 text-teal-800">
                      Tipo Corporal: {bodyType.type}
                    </Badge>
                    <p className="text-gray-600 mt-2">{bodyType.description}</p>
                  </div>
                  
                  <div className="bg-teal-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-teal-800">Características:</h3>
                    <ul className="space-y-1">
                      {bodyType.characteristics.map((char, index) => (
                        <li key={index} className="text-teal-700 flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-blue-800">Dicas de Estilo:</h3>
                    <ul className="space-y-1">
                      {bodyType.tips.map((tip, index) => (
                        <li key={index} className="text-blue-700 flex items-center gap-2">
                          <Ruler className="w-4 h-4" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {ratios && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-4">Proporções:</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Cintura/Busto</p>
                          <p className="text-xl font-bold text-gray-900">{ratios.waistToBust}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Cintura/Quadril</p>
                          <p className="text-xl font-bold text-gray-900">{ratios.waistToHips}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Busto/Quadril</p>
                          <p className="text-xl font-bold text-gray-900">{ratios.bustToHips}</p>
                        </div>
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

export default BodyMeasurements;
