
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calculator } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StructuralCalculator = () => {
  const [calculationType, setCalculationType] = useState("beam");
  const [length, setLength] = useState("");
  const [load, setLoad] = useState("");
  const [material, setMaterial] = useState("concrete");
  const [results, setResults] = useState<any>(null);

  const materials = {
    concrete: { name: "Concreto Armado", resistance: 25, elasticity: 30000 },
    steel: { name: "Aço", resistance: 250, elasticity: 200000 },
    wood: { name: "Madeira", resistance: 40, elasticity: 12000 }
  };

  useEffect(() => {
    const lengthNum = parseFloat(length);
    const loadNum = parseFloat(load);
    
    if (lengthNum > 0 && loadNum > 0) {
      const selectedMaterial = materials[material as keyof typeof materials];
      
      if (calculationType === "beam") {
        // Cálculo simplificado para viga biapoiada
        const moment = (loadNum * lengthNum * lengthNum) / 8; // kN.m
        const deflection = (5 * loadNum * Math.pow(lengthNum, 4)) / (384 * selectedMaterial.elasticity * 0.001); // cm
        const requiredHeight = Math.sqrt((6 * moment * 1000) / (selectedMaterial.resistance * 20)); // cm (largura 20cm)
        
        setResults({
          moment: moment,
          deflection: deflection,
          requiredHeight: requiredHeight,
          requiredWidth: 20,
          material: selectedMaterial.name
        });
      } else {
        // Cálculo simplificado para pilar
        const area = (loadNum * 1000) / selectedMaterial.resistance; // cm²
        const dimension = Math.sqrt(area); // cm (seção quadrada)
        
        setResults({
          requiredArea: area,
          dimension: dimension,
          load: loadNum,
          material: selectedMaterial.name
        });
      }
    } else {
      setResults(null);
    }
  }, [calculationType, length, load, material]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de Estruturas
              </CardTitle>
              <p className="text-gray-600">
                Cálculos básicos para vigas e pilares
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Cálculo</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beam">Viga Biapoiada</SelectItem>
                      <SelectItem value="column">Pilar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concrete">Concreto Armado</SelectItem>
                      <SelectItem value="steel">Aço</SelectItem>
                      <SelectItem value="wood">Madeira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "beam" && (
                  <div className="space-y-2">
                    <Label htmlFor="length">Vão Livre (m)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="Ex: 4"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="load">
                    {calculationType === "beam" ? "Carga Distribuída (kN/m)" : "Carga Axial (kN)"}
                  </Label>
                  <Input
                    id="load"
                    type="number"
                    placeholder={calculationType === "beam" ? "Ex: 10" : "Ex: 500"}
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              {results && calculationType === "beam" && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Resultados da Viga:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Momento Máximo</p>
                          <p className="text-xl font-bold text-blue-900">{results.moment.toFixed(2)} kN.m</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.moment.toFixed(2)} kN.m`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Flecha Máxima</p>
                          <p className="text-xl font-bold text-green-900">{results.deflection.toFixed(2)} cm</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.deflection.toFixed(2)} cm`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Altura Mínima</p>
                          <p className="text-xl font-bold text-orange-900">{results.requiredHeight.toFixed(0)} cm</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.requiredHeight.toFixed(0)} cm`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Largura Sugerida</p>
                          <p className="text-xl font-bold text-purple-900">{results.requiredWidth} cm</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.requiredWidth} cm`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {results && calculationType === "column" && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Resultados do Pilar:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Área Necessária</p>
                          <p className="text-xl font-bold text-blue-900">{results.requiredArea.toFixed(0)} cm²</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.requiredArea.toFixed(0)} cm²`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Dimensão (seção quadrada)</p>
                          <p className="text-xl font-bold text-green-900">{results.dimension.toFixed(0)} cm</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.dimension.toFixed(0)} cm`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Aviso:</strong> Estes são cálculos simplificados para pré-dimensionamento. 
                  Para projetos estruturais, sempre consulte um engenheiro estrutural qualificado.
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

export default StructuralCalculator;
