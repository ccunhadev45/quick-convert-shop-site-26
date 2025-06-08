
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Copy, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ConcreteCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [concreteType, setConcreteType] = useState("c20");
  const [results, setResults] = useState<any>(null);

  // Traços de concreto mais realistas (por m³)
  const concreteTypes = {
    c15: { 
      cement: 250, // kg de cimento por m³
      sand: 950, // kg de areia por m³  
      gravel: 1050, // kg de brita por m³
      water: 180, // litros de água por m³
      description: "Concreto magro - Contrapisos e regularizações"
    },
    c20: { 
      cement: 320, 
      sand: 760, 
      gravel: 1100, 
      water: 190,
      description: "Uso geral - Lajes, vigas e pilares residenciais"
    },
    c25: { 
      cement: 380, 
      sand: 700, 
      gravel: 1050, 
      water: 195,
      description: "Estrutural - Edifícios e estruturas"
    },
    c30: { 
      cement: 430, 
      sand: 650, 
      gravel: 1000, 
      water: 200,
      description: "Alta resistência - Estruturas especiais"
    }
  };

  useEffect(() => {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    
    if (lengthNum > 0 && widthNum > 0 && heightNum > 0) {
      const volume = lengthNum * widthNum * heightNum;
      const concrete = concreteTypes[concreteType as keyof typeof concreteTypes];
      
      setResults({
        volume: volume,
        cement: concrete.cement * volume,
        cementBags: Math.ceil((concrete.cement * volume) / 50), // Sacos de 50kg
        sand: concrete.sand * volume,
        sandM3: (concrete.sand * volume) / 1500, // Densidade da areia ~1500kg/m³
        gravel: concrete.gravel * volume,
        gravelM3: (concrete.gravel * volume) / 1600, // Densidade da brita ~1600kg/m³
        water: concrete.water * volume,
        description: concrete.description
      });
    } else {
      setResults(null);
    }
  }, [length, width, height, concreteType]);

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
                Calculadora de Concreto
              </CardTitle>
              <p className="text-gray-600">
                Calcule a quantidade de materiais necessários com traços realistas
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Comprimento (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 5"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Largura (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 3"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura/Espessura (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Concreto (fck)</Label>
                <Select value={concreteType} onValueChange={setConcreteType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c15">C15 (15 MPa)</SelectItem>
                    <SelectItem value="c20">C20 (20 MPa)</SelectItem>
                    <SelectItem value="c25">C25 (25 MPa)</SelectItem>
                    <SelectItem value="c30">C30 (30 MPa)</SelectItem>
                  </SelectContent>
                </Select>
                {results && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    {results.description}
                  </p>
                )}
              </div>

              {results && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Materiais Necessários:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Volume de Concreto</p>
                          <p className="text-xl font-bold text-blue-900">{results.volume.toFixed(3)} m³</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.volume.toFixed(3)} m³`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Cimento</p>
                          <p className="text-xl font-bold text-gray-900">{results.cement.toFixed(0)} kg</p>
                          <p className="text-xs text-gray-500">{results.cementBags} sacos de 50kg</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.cement.toFixed(0)} kg (${results.cementBags} sacos)`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Areia</p>
                          <p className="text-xl font-bold text-yellow-900">{results.sand.toFixed(0)} kg</p>
                          <p className="text-xs text-gray-500">{results.sandM3.toFixed(2)} m³</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.sand.toFixed(0)} kg (${results.sandM3.toFixed(2)} m³)`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Brita</p>
                          <p className="text-xl font-bold text-stone-900">{results.gravel.toFixed(0)} kg</p>
                          <p className="text-xs text-gray-500">{results.gravelM3.toFixed(2)} m³</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.gravel.toFixed(0)} kg (${results.gravelM3.toFixed(2)} m³)`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg md:col-span-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Água</p>
                          <p className="text-xl font-bold text-blue-900">{results.water.toFixed(0)} litros</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.water.toFixed(0)} litros`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Observações Importantes:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Sempre adicione 10% de margem de segurança aos materiais</li>
                      <li>• A água deve ser potável e limpa</li>
                      <li>• Areia deve ser média e limpa</li>
                      <li>• Brita deve ser graduada (19mm ou 25mm)</li>
                      <li>• Traço baseado em cimento CP II-Z-32</li>
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

export default ConcreteCalculator;
