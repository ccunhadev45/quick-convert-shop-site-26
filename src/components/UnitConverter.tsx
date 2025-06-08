
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Unit {
  symbol: string;
  name: string;
  factor: number;
}

interface UnitConverterProps {
  title: string;
  units: Unit[];
  defaultFromUnit?: string;
  defaultToUnit?: string;
}

const UnitConverter = ({ title, units, defaultFromUnit, defaultToUnit }: UnitConverterProps) => {
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("0");
  const [fromUnit, setFromUnit] = useState<string>(defaultFromUnit || units[0]?.symbol || "");
  const [toUnit, setToUnit] = useState<string>(defaultToUnit || units[1]?.symbol || "");

  useEffect(() => {
    convertValue(fromValue, fromUnit, toUnit);
  }, [fromValue, fromUnit, toUnit]);

  const convertValue = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue("");
      return;
    }

    const fromUnitData = units.find(unit => unit.symbol === from);
    const toUnitData = units.find(unit => unit.symbol === to);

    if (!fromUnitData || !toUnitData) return;

    const baseValue = Number(value) * fromUnitData.factor;
    const convertedValue = baseValue / toUnitData.factor;
    
    setToValue(convertedValue.toFixed(8).replace(/\.?0+$/, ""));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">De:</label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Digite o valor"
                className="text-lg"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(fromValue)}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Para:</label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                type="number"
                value={toValue}
                readOnly
                placeholder="Resultado"
                className="text-lg bg-gray-50"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(toValue)}
                disabled={!toValue}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={swapUnits}
            className="rounded-full"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
