
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseConverterPage from "@/components/BaseConverterPage";

const CookingConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState("");

  const units = [
    { value: "cup", label: "Xícara", toMl: 240 },
    { value: "tbsp", label: "Colher de sopa", toMl: 15 },
    { value: "tsp", label: "Colher de chá", toMl: 5 },
    { value: "ml", label: "Mililitros", toMl: 1 },
    { value: "l", label: "Litros", toMl: 1000 }
  ];

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("Valor inválido");
      return;
    }

    const fromFactor = units.find(u => u.value === fromUnit)?.toMl || 1;
    const toFactor = units.find(u => u.value === toUnit)?.toMl || 1;
    
    const inMl = value * fromFactor;
    const converted = inMl / toFactor;
    
    setResult(converted.toFixed(2));
  };

  return (
    <BaseConverterPage 
      title="Conversor de Medidas Culinárias"
      description="Converta medidas culinárias entre diferentes unidades"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="input-value">Valor</Label>
            <Input
              id="input-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite o valor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-unit">De</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-unit">Para</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={convert} className="w-full">
          Converter
        </Button>

        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Resultado:</Label>
            <p className="text-2xl font-bold text-primary">
              {result} {units.find(u => u.value === toUnit)?.label}
            </p>
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default CookingConverter;
