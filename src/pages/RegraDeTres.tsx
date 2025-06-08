
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RegraDeTres = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [x, setX] = useState("");
  const [missingValue, setMissingValue] = useState<"a" | "b" | "c" | "x">("x");

  const calculateRegraDeTres = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);
    const numX = parseFloat(x);

    let result = 0;

    switch (missingValue) {
      case "a":
        if (numB && numC && numX) {
          result = (numB * numC) / numX;
          setA(result.toFixed(4).replace(/\.?0+$/, ""));
        }
        break;
      case "b":
        if (numA && numC && numX) {
          result = (numA * numX) / numC;
          setB(result.toFixed(4).replace(/\.?0+$/, ""));
        }
        break;
      case "c":
        if (numA && numB && numX) {
          result = (numA * numX) / numB;
          setC(result.toFixed(4).replace(/\.?0+$/, ""));
        }
        break;
      case "x":
        if (numA && numB && numC) {
          result = (numB * numC) / numA;
          setX(result.toFixed(4).replace(/\.?0+$/, ""));
        }
        break;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  const clearAll = () => {
    setA("");
    setB("");
    setC("");
    setX("");
  };

  const getFieldColor = (field: string) => {
    return field === missingValue ? "border-blue-500 bg-blue-50" : "border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Regra de Três
          </h1>
          <p className="text-lg text-gray-600">
            Resolva problemas de proporcionalidade de forma simples
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800 flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6" />
              Regra de Três Simples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Como usar:</strong> Deixe em branco o valor que você quer descobrir e preencha os outros três campos.
              </p>
              <p className="text-xs text-blue-600">
                Fórmula: A está para B, assim como C está para X
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="a">Valor A</Label>
                  <div className="flex gap-2">
                    <Input
                      id="a"
                      type="number"
                      placeholder="Digite o valor A"
                      value={a}
                      onChange={(e) => {
                        setA(e.target.value);
                        setMissingValue(e.target.value ? missingValue : "a");
                      }}
                      className={`text-lg ${getFieldColor("a")}`}
                    />
                    {a && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(a)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c">Valor C</Label>
                  <div className="flex gap-2">
                    <Input
                      id="c"
                      type="number"
                      placeholder="Digite o valor C"
                      value={c}
                      onChange={(e) => {
                        setC(e.target.value);
                        setMissingValue(e.target.value ? missingValue : "c");
                      }}
                      className={`text-lg ${getFieldColor("c")}`}
                    />
                    {c && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(c)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="b">Valor B</Label>
                  <div className="flex gap-2">
                    <Input
                      id="b"
                      type="number"
                      placeholder="Digite o valor B"
                      value={b}
                      onChange={(e) => {
                        setB(e.target.value);
                        setMissingValue(e.target.value ? missingValue : "b");
                      }}
                      className={`text-lg ${getFieldColor("b")}`}
                    />
                    {b && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(b)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="x">Valor X (resultado)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="x"
                      type="number"
                      placeholder="Digite o valor X"
                      value={x}
                      onChange={(e) => {
                        setX(e.target.value);
                        setMissingValue(e.target.value ? missingValue : "x");
                      }}
                      className={`text-lg ${getFieldColor("x")}`}
                    />
                    {x && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(x)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-lg font-mono text-gray-700 bg-gray-50 p-4 rounded-lg">
              {a || "A"} : {b || "B"} = {c || "C"} : {x || "X"}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={calculateRegraDeTres} className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="h-4 w-4 mr-2" />
                Calcular
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Limpar Tudo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Exemplo Prático</h3>
                <p>Se 2 kg custam R$ 10,00</p>
                <p>Quanto custam 5 kg?</p>
                <p className="text-green-700 font-medium mt-1">2:10 = 5:X → X = R$ 25,00</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h3 className="font-semibold text-orange-800 mb-2">Dica</h3>
                <p>Use para problemas de:</p>
                <p>• Proporção de ingredientes</p>
                <p>• Conversão de escalas</p>
                <p>• Cálculos de dosagem</p>
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

export default RegraDeTres;
