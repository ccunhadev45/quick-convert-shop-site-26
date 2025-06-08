import { useState, useEffect } from "react";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AreaConverter = () => {
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("10.7639");
  const [fromUnit, setFromUnit] = useState<string>("m2");
  const [toUnit, setToUnit] = useState<string>("ft2");

  const areaUnits = [
    { symbol: "m2", name: "Metro Quadrado", factor: 1 },
    { symbol: "cm2", name: "Centímetro Quadrado", factor: 0.0001 },
    { symbol: "km2", name: "Quilômetro Quadrado", factor: 1000000 },
    { symbol: "ft2", name: "Pé Quadrado", factor: 0.092903 },
    { symbol: "in2", name: "Polegada Quadrada", factor: 0.00064516 },
    { symbol: "yd2", name: "Jarda Quadrada", factor: 0.836127 },
    { symbol: "ac", name: "Acre", factor: 4046.86 },
    { symbol: "ha", name: "Hectare", factor: 10000 },
  ];

  const convertArea = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const num = Number(value);
    const fromFactor = areaUnits.find(unit => unit.symbol === from)?.factor || 1;
    const toFactor = areaUnits.find(unit => unit.symbol === to)?.factor || 1;
    
    const result = (num * fromFactor) / toFactor;
    setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
  };

  useEffect(() => {
    convertArea(fromValue, fromUnit, toUnit);
  }, [fromValue, fromUnit, toUnit]);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Conversor de Área
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Converta entre diferentes unidades de área
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800 dark:text-gray-200">Conversor de Área</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">De:</label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="border-gray-200 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaUnits.map((unit) => (
                      <SelectItem key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Digite a área"
                  className="text-lg border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Para:</label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="border-gray-200 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaUnits.map((unit) => (
                      <SelectItem key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Input
                    type="number"
                    value={toValue}
                    readOnly
                    placeholder="Resultado"
                    className="text-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 pr-12"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => copyToClipboard(toValue)}
                    disabled={!toValue}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Conversões Comuns</h3>
                <p>1 m² = 10.000 cm²</p>
                <p>1 m² = 10,76 ft²</p>
                <p>1 hectare = 10.000 m²</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Áreas de Referência</h3>
                <p>Campo de futebol: ~7.000 m²</p>
                <p>Quadra de tênis: ~261 m²</p>
                <p>Casa média: ~150 m²</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSpace position="middle" />
        
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default AreaConverter;
