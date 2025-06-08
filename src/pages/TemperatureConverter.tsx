
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TemperatureConverter = () => {
  const [fromValue, setFromValue] = useState<string>("0");
  const [toValue, setToValue] = useState<string>("32");
  const [fromUnit, setFromUnit] = useState<string>("C");
  const [toUnit, setToUnit] = useState<string>("F");

  const convertTemperature = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const num = Number(value);
    let result: number;

    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case "C":
        celsius = num;
        break;
      case "F":
        celsius = (num - 32) * 5/9;
        break;
      case "K":
        celsius = num - 273.15;
        break;
      case "R":
        celsius = (num - 491.67) * 5/9;
        break;
      default:
        celsius = num;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case "C":
        result = celsius;
        break;
      case "F":
        result = celsius * 9/5 + 32;
        break;
      case "K":
        result = celsius + 273.15;
        break;
      case "R":
        result = celsius * 9/5 + 491.67;
        break;
      default:
        result = celsius;
    }

    setToValue(result.toFixed(4).replace(/\.?0+$/, ""));
  };

  useEffect(() => {
    convertTemperature(fromValue, fromUnit, toUnit);
  }, [fromValue, fromUnit, toUnit]);

  const temperatureUnits = [
    { symbol: "C", name: "Celsius" },
    { symbol: "F", name: "Fahrenheit" },
    { symbol: "K", name: "Kelvin" },
    { symbol: "R", name: "Rankine" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Temperatura
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre Celsius, Fahrenheit, Kelvin e Rankine
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Temperatura</CardTitle>
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
                    {temperatureUnits.map((unit) => (
                      <SelectItem key={unit.symbol} value={unit.symbol}>
                        {unit.name} (°{unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Digite a temperatura"
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
                    {temperatureUnits.map((unit) => (
                      <SelectItem key={unit.symbol} value={unit.symbol}>
                        {unit.name} (°{unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={toValue}
                  readOnly
                  placeholder="Resultado"
                  className="text-lg bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Pontos de Referência</h3>
                <p>Água congela: 0°C = 32°F = 273.15K</p>
                <p>Água ferve: 100°C = 212°F = 373.15K</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Temperatura Corporal</h3>
                <p>Normal: 37°C = 98.6°F = 310.15K</p>
                <p>Febre: {'>'}38°C = {'>'}100.4°F = {'>'}311.15K</p>
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

export default TemperatureConverter;
