
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseConverterPage from "@/components/BaseConverterPage";

const NumberConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");

  const bases = [
    { value: "2", label: "Binário (Base 2)" },
    { value: "8", label: "Octal (Base 8)" },
    { value: "10", label: "Decimal (Base 10)" },
    { value: "16", label: "Hexadecimal (Base 16)" }
  ];

  const convertNumber = () => {
    try {
      const decimal = parseInt(inputValue, parseInt(fromBase));
      if (isNaN(decimal)) {
        setResult("Valor inválido");
        return;
      }
      const converted = decimal.toString(parseInt(toBase));
      setResult(converted.toUpperCase());
    } catch (error) {
      setResult("Erro na conversão");
    }
  };

  return (
    <BaseConverterPage 
      title="Conversor de Base Numérica"
      description="Converta números entre diferentes bases numéricas"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input-value">Valor a converter</Label>
            <Input
              id="input-value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite o número"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-base">Base de origem</Label>
            <Select value={fromBase} onValueChange={setFromBase}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bases.map((base) => (
                  <SelectItem key={base.value} value={base.value}>
                    {base.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-base">Base de destino</Label>
          <Select value={toBase} onValueChange={setToBase}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bases.map((base) => (
                <SelectItem key={base.value} value={base.value}>
                  {base.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={convertNumber} className="w-full">
          Converter
        </Button>

        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Resultado:</Label>
            <p className="text-2xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default NumberConverter;
