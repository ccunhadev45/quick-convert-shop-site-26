
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

const TimeConverter = () => {
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("3600");
  const [fromUnit, setFromUnit] = useState<string>("h");
  const [toUnit, setToUnit] = useState<string>("s");

  const timeUnits = [
    { symbol: "ns", name: "Nanossegundo", factor: 1e-9 },
    { symbol: "μs", name: "Microssegundo", factor: 1e-6 },
    { symbol: "ms", name: "Milissegundo", factor: 0.001 },
    { symbol: "s", name: "Segundo", factor: 1 },
    { symbol: "min", name: "Minuto", factor: 60 },
    { symbol: "h", name: "Hora", factor: 3600 },
    { symbol: "d", name: "Dia", factor: 86400 },
    { symbol: "w", name: "Semana", factor: 604800 },
    { symbol: "mo", name: "Mês", factor: 2629746 },
    { symbol: "y", name: "Ano", factor: 31556952 },
  ];

  const convertTime = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const num = Number(value);
    const fromFactor = timeUnits.find(unit => unit.symbol === from)?.factor || 1;
    const toFactor = timeUnits.find(unit => unit.symbol === to)?.factor || 1;
    
    const result = (num * fromFactor) / toFactor;
    
    // Format very large or very small numbers appropriately
    if (result >= 1e6 || (result < 1e-3 && result !== 0)) {
      setToValue(result.toExponential(4));
    } else {
      setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
    }
  };

  useEffect(() => {
    convertTime(fromValue, fromUnit, toUnit);
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
            Conversor de Tempo
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de tempo
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Tempo</CardTitle>
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
                    {timeUnits.map((unit) => (
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
                  placeholder="Digite o tempo"
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
                    {timeUnits.map((unit) => (
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
                <h3 className="font-semibold text-blue-800 mb-2">Conversões Básicas</h3>
                <p>1 hora = 60 minutos</p>
                <p>1 dia = 24 horas</p>
                <p>1 ano = 365,25 dias</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Exemplos Práticos</h3>
                <p>Filme típico: ~120 min</p>
                <p>Jornada trabalho: 8 h</p>
                <p>Década: 10 anos</p>
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

export default TimeConverter;
