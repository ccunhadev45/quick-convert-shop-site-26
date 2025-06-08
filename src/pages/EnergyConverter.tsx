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

const EnergyConverter = () => {
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("3600000");
  const [fromUnit, setFromUnit] = useState<string>("kWh");
  const [toUnit, setToUnit] = useState<string>("J");

  const energyUnits = [
    { symbol: "J", name: "Joule", factor: 1 },
    { symbol: "kJ", name: "Quilojoule", factor: 1000 },
    { symbol: "MJ", name: "Megajoule", factor: 1000000 },
    { symbol: "cal", name: "Caloria", factor: 4.184 },
    { symbol: "kcal", name: "Quilocaloria", factor: 4184 },
    { symbol: "Wh", name: "Watt-hora", factor: 3600 },
    { symbol: "kWh", name: "Quilowatt-hora", factor: 3600000 },
    { symbol: "BTU", name: "BTU", factor: 1055.06 },
    { symbol: "eV", name: "Elétron-volt", factor: 1.602176634e-19 },
  ];

  const convertEnergy = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const num = Number(value);
    const fromFactor = energyUnits.find(unit => unit.symbol === from)?.factor || 1;
    const toFactor = energyUnits.find(unit => unit.symbol === to)?.factor || 1;
    
    const result = (num * fromFactor) / toFactor;
    
    // Format very large or very small numbers in scientific notation
    if (result >= 1e6 || (result < 1e-3 && result !== 0)) {
      setToValue(result.toExponential(4));
    } else {
      setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
    }
  };

  useEffect(() => {
    convertEnergy(fromValue, fromUnit, toUnit);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Energia
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de energia
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Energia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">De:</label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {energyUnits.map((unit) => (
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
                  placeholder="Digite a energia"
                  className="text-lg border-gray-200"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Para:</label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {energyUnits.map((unit) => (
                      <SelectItem key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Input
                    type="text"
                    value={toValue}
                    readOnly
                    placeholder="Resultado"
                    className="text-lg bg-gray-50 border-gray-200 pr-12"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Conversões Comuns</h3>
                <p>1 kWh = 3.600.000 J</p>
                <p>1 kcal = 4.184 J</p>
                <p>1 BTU = 1.055 J</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Exemplos Práticos</h3>
                <p>Lâmpada LED 10W/h: 36 kJ</p>
                <p>Chuveiro elétrico/h: 21.600 kJ</p>
                <p>Carro 1L gasolina: 31.500 kJ</p>
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

export default EnergyConverter;
