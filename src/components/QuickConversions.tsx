
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuickConversions = () => {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");

  const conversions = {
    comprimento: {
      m: { name: "Metro", factor: 1 },
      km: { name: "Quilômetro", factor: 1000 },
      cm: { name: "Centímetro", factor: 0.01 },
      mm: { name: "Milímetro", factor: 0.001 },
      in: { name: "Polegada", factor: 0.0254 },
      ft: { name: "Pé", factor: 0.3048 },
    },
    peso: {
      kg: { name: "Quilograma", factor: 1 },
      g: { name: "Grama", factor: 0.001 },
      lb: { name: "Libra", factor: 0.453592 },
      oz: { name: "Onça", factor: 0.0283495 },
    },
  };

  const calculateConversion = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    
    const fromFactor = conversions.comprimento[fromUnit as keyof typeof conversions.comprimento]?.factor || 1;
    const toFactor = conversions.comprimento[toUnit as keyof typeof conversions.comprimento]?.factor || 1;
    
    const result = (num * fromFactor) / toFactor;
    return result.toFixed(4).replace(/\.?0+$/, "");
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Conversão Rápida
      </h2>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Conversor de Comprimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Valor</label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Digite um valor"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">De</label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions.comprimento).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Para</label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions.comprimento).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Resultado</label>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border text-center font-semibold">
                {calculateConversion()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickConversions;
