
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ConcreteCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [concreteType, setConcreteType] = useState("c20");
  const [results, setResults] = useState<any>(null);

  const concreteTypes = {
    c15: { cement: 310, sand: 890, gravel: 1190, water: 185 },
    c20: { cement: 350, sand: 870, gravel: 1200, water: 175 },
    c25: { cement: 400, sand: 850, gravel: 1180, water: 160 },
    c30: { cement: 450, sand: 830, gravel: 1160, water: 145 }
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
        cement: (concrete.cement * volume) / 1000,
        sand: (concrete.sand * volume) / 1000,
        gravel: (concrete.gravel * volume) / 1000,
        water: concrete.water * volume
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de Concreto
              </CardTitle>
              <p className="text-gray-600">
                Calcule a quantidade de materiais necessários
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Comprimento (m)</Label>
                  <Input
                    id="length"
                    type="number"
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
                    placeholder="Ex: 3"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Concreto</Label>
                <Select value={concreteType} onValueChange={setConcreteType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c15">C15 - Concreto Simples</SelectItem>
                    <SelectItem value="c20">C20 - Uso Geral</SelectItem>
                    <SelectItem value="c25">C25 - Estrutural</SelectItem>
                    <SelectItem value="c30">C30 - Alta Resistência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {results && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Materiais Necessários:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Volume de Concreto</p>
                          <p className="text-xl font-bold text-blue-900">{results.volume.toFixed(2)} m³</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.volume.toFixed(2)} m³`)}
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
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.cement.toFixed(0)} kg`)}
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
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.sand.toFixed(0)} kg`)}
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
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.gravel.toFixed(0)} kg`)}
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
