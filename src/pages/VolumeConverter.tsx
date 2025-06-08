
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VolumeConverter = () => {
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("0.264172");
  const [fromUnit, setFromUnit] = useState<string>("l");
  const [toUnit, setToUnit] = useState<string>("gal");

  const volumeUnits = [
    { symbol: "ml", name: "Mililitro", factor: 0.001 },
    { symbol: "cl", name: "Centilitro", factor: 0.01 },
    { symbol: "dl", name: "Decilitro", factor: 0.1 },
    { symbol: "l", name: "Litro", factor: 1 },
    { symbol: "m³", name: "Metro Cúbico", factor: 1000 },
    { symbol: "fl oz", name: "Onça Fluida", factor: 0.0295735 },
    { symbol: "cup", name: "Xícara", factor: 0.236588 },
    { symbol: "pt", name: "Pinta", factor: 0.473176 },
    { symbol: "qt", name: "Quarto", factor: 0.946353 },
    { symbol: "gal", name: "Galão", factor: 3.78541 },
  ];

  const convertVolume = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const num = Number(value);
    const fromFactor = volumeUnits.find(unit => unit.symbol === from)?.factor || 1;
    const toFactor = volumeUnits.find(unit => unit.symbol === to)?.factor || 1;
    
    const result = (num * fromFactor) / toFactor;
    setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
  };

  useEffect(() => {
    convertVolume(fromValue, fromUnit, toUnit);
  }, [fromValue, fromUnit, toUnit]);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Volume
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de volume e capacidade
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Volume</CardTitle>
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
                    {volumeUnits.map((unit) => (
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
                  placeholder="Digite o volume"
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
                    {volumeUnits.map((unit) => (
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
                <p>1 l = 1.000 ml</p>
                <p>1 l = 0,26 gal</p>
                <p>1 m³ = 1.000 l</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Volumes de Referência</h3>
                <p>Garrafa pet: 2 l</p>
                <p>Tanque carro: ~50 l</p>
                <p>Piscina média: ~40 m³</p>
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

export default VolumeConverter;
