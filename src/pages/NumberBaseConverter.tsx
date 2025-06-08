
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Binary } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const NumberBaseConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");

  const { addRecord } = useConversionHistory();

  const bases = [
    { value: "2", label: "Binário (Base 2)" },
    { value: "8", label: "Octal (Base 8)" },
    { value: "10", label: "Decimal (Base 10)" },
    { value: "16", label: "Hexadecimal (Base 16)" }
  ];

  const isValidNumber = (value: string, base: number) => {
    if (!value) return false;
    
    const validChars = "0123456789ABCDEF".slice(0, base);
    return value.toUpperCase().split('').every(char => validChars.includes(char));
  };

  const convertBase = () => {
    if (!inputValue) {
      toast({
        title: "Erro",
        description: "Digite um valor para converter",
        variant: "destructive"
      });
      return;
    }

    const fromBaseNum = parseInt(fromBase);
    const toBaseNum = parseInt(toBase);

    if (!isValidNumber(inputValue, fromBaseNum)) {
      toast({
        title: "Erro",
        description: `Número inválido para base ${fromBaseNum}`,
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert from source base to decimal
      const decimal = parseInt(inputValue, fromBaseNum);
      
      // Convert from decimal to target base
      const converted = decimal.toString(toBaseNum).toUpperCase();
      
      setResult(converted);
      
      const fromBaseName = bases.find(b => b.value === fromBase)?.label || `Base ${fromBase}`;
      const toBaseName = bases.find(b => b.value === toBase)?.label || `Base ${toBase}`;
      
      addRecord({
        type: 'conversion',
        category: 'Base Numérica',
        title: `${fromBaseName} → ${toBaseName}`,
        input: inputValue,
        output: converted,
        fromUnit: fromBaseName,
        toUnit: toBaseName
      });
      
      toast({
        title: "Conversão realizada!",
        description: `${inputValue} (base ${fromBase}) = ${converted} (base ${toBase})`
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro na conversão",
        variant: "destructive"
      });
    }
  };

  const swapBases = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
    setInputValue(result);
    setResult("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Binary className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Base Numérica
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Converter entre Bases Numéricas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromBase">De (Base)</Label>
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
                <div>
                  <Label htmlFor="toBase">Para (Base)</Label>
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
              </div>

              <div>
                <Label htmlFor="inputValue">Valor a Converter</Label>
                <Input
                  id="inputValue"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder={`Digite um número na base ${fromBase}`}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {fromBase === "16" && "Use A-F para dígitos hexadecimais"}
                  {fromBase === "2" && "Use apenas 0 e 1"}
                  {fromBase === "8" && "Use apenas dígitos 0-7"}
                  {fromBase === "10" && "Use apenas dígitos 0-9"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={convertBase} className="flex-1">
                  Converter
                </Button>
                <Button onClick={swapBases} variant="outline">
                  ⇄ Trocar
                </Button>
              </div>

              {result && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Label>Resultado</Label>
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                    {result}
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    {inputValue} (base {fromBase}) = {result} (base {toBase})
                  </p>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Referência Rápida:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><strong>Decimal 15:</strong></div>
                  <div>
                    <div>Binário: 1111</div>
                    <div>Octal: 17</div>
                    <div>Hexadecimal: F</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NumberBaseConverter;
