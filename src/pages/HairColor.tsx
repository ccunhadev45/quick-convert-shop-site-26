
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Palette, Info } from "lucide-react";

const HairColor = () => {
  const [baseColor, setBaseColor] = useState("");
  const [targetColor, setTargetColor] = useState("");
  
  const hairColors = {
    "1": { name: "Preto", level: 1, rgb: "#000000" },
    "2": { name: "Castanho Escuro", level: 2, rgb: "#2B1B17" },
    "3": { name: "Castanho Médio", level: 3, rgb: "#4A4A4A" },
    "4": { name: "Castanho Claro", level: 4, rgb: "#6B4423" },
    "5": { name: "Castanho Claro Dourado", level: 5, rgb: "#8B4513" },
    "6": { name: "Louro Escuro", level: 6, rgb: "#A0522D" },
    "7": { name: "Louro Médio", level: 7, rgb: "#D2691E" },
    "8": { name: "Louro Claro", level: 8, rgb: "#DEB887" },
    "9": { name: "Louro Muito Claro", level: 9, rgb: "#F5DEB3" },
    "10": { name: "Louro Platinado", level: 10, rgb: "#FFF8DC" }
  };

  const getProcessInfo = () => {
    if (!baseColor || !targetColor) return null;
    
    const base = hairColors[baseColor as keyof typeof hairColors];
    const target = hairColors[targetColor as keyof typeof hairColors];
    
    if (base.level > target.level) {
      return {
        process: "Escurecimento",
        method: "Tonalizante ou tintura permanente",
        time: "20-30 minutos",
        difficulty: "Fácil",
        warning: "Processo simples, mas pode ser difícil de remover depois."
      };
    } else if (base.level < target.level) {
      const levelDiff = target.level - base.level;
      if (levelDiff <= 2) {
        return {
          process: "Clareamento Leve",
          method: "Tintura com amônia ou água oxigenada 20 vol",
          time: "30-45 minutos",
          difficulty: "Médio",
          warning: "Pode ser necessário fazer um teste de mecha."
        };
      } else {
        return {
          process: "Clareamento Intenso",
          method: "Descoloração + Tonalização",
          time: "60-90 minutos",
          difficulty: "Difícil",
          warning: "Recomendado procurar um profissional. Alto risco de danos."
        };
      }
    } else {
      return {
        process: "Manutenção",
        method: "Tonalizante ou glossing",
        time: "15-20 minutos",
        difficulty: "Fácil",
        warning: "Processo para manter ou intensificar a cor atual."
      };
    }
  };

  const processInfo = getProcessInfo();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Palette className="h-8 w-8 text-purple-600" />
                Conversor de Cores de Cabelo
              </CardTitle>
              <p className="text-gray-600">
                Descubra o processo para mudar sua cor de cabelo
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cor Atual</label>
                  <Select value={baseColor} onValueChange={setBaseColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua cor atual" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(hairColors).map(([level, color]) => (
                        <SelectItem key={level} value={level}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.rgb }}
                            />
                            {level} - {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cor Desejada</label>
                  <Select value={targetColor} onValueChange={setTargetColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cor desejada" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(hairColors).map(([level, color]) => (
                        <SelectItem key={level} value={level}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.rgb }}
                            />
                            {level} - {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {processInfo && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Processo Recomendado:</h3>
                  
                  <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {processInfo.process}
                      </Badge>
                      <Badge variant={processInfo.difficulty === "Fácil" ? "default" : processInfo.difficulty === "Médio" ? "secondary" : "destructive"}>
                        {processInfo.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Método:</p>
                        <p className="text-gray-900">{processInfo.method}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tempo:</p>
                        <p className="text-gray-900">{processInfo.time}</p>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">Importante:</p>
                          <p className="text-sm text-amber-700">{processInfo.warning}</p>
                        </div>
                      </div>
                    </div>
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

export default HairColor;
