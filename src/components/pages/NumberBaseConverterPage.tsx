import React, { useState, useEffect } from "react";
import { ArrowLeft, Copy, RotateCcw, Info, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { useToast } from "@/hooks/use-toast";

const NumberBaseConverterPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("255");
  const [inputBase, setInputBase] = useState(10);
  const [results, setResults] = useState({
    binary: "",
    octal: "",
    decimal: "",
    hexadecimal: ""
  });
  const [error, setError] = useState("");
  const { toast } = useToast();

  const bases = [
    { value: 2, label: "Binário", prefix: "0b" },
    { value: 8, label: "Octal", prefix: "0o" },
    { value: 10, label: "Decimal", prefix: "" },
    { value: 16, label: "Hexadecimal", prefix: "0x" }
  ];

  const convertNumber = (value: string, fromBase: number) => {
    try {
      // Remover prefixos comuns
      let cleanValue = value.trim();
      if (cleanValue.startsWith("0b")) cleanValue = cleanValue.slice(2);
      if (cleanValue.startsWith("0o")) cleanValue = cleanValue.slice(2);
      if (cleanValue.startsWith("0x")) cleanValue = cleanValue.slice(2);

      // Validar caracteres para a base
      const validChars = "0123456789ABCDEF".slice(0, fromBase);
      const upperValue = cleanValue.toUpperCase();
      
      for (const char of upperValue) {
        if (!validChars.includes(char)) {
          throw new Error(`Caractere inválido '${char}' para base ${fromBase}`);
        }
      }

      // Converter para decimal primeiro
      const decimalValue = parseInt(cleanValue, fromBase);
      
      if (isNaN(decimalValue)) {
        throw new Error("Valor inválido");
      }

      if (decimalValue < 0) {
        throw new Error("Números negativos não são suportados");
      }

      // Converter para todas as bases
      return {
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase()
      };
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      setResults({ binary: "", octal: "", decimal: "", hexadecimal: "" });
      setError("");
      return;
    }

    try {
      const converted = convertNumber(inputValue, inputBase);
      setResults(converted);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro de conversão");
      setResults({ binary: "", octal: "", decimal: "", hexadecimal: "" });
    }
  }, [inputValue, inputBase]);

  const copyToClipboard = async (value: string, base: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copiado!",
        description: `Valor ${base} copiado para a área de transferência`,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o valor",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setInputValue("");
    setInputBase(10);
  };

  const examples = [
    { decimal: "255", binary: "11111111", octal: "377", hex: "FF", description: "Valor máximo de 8 bits" },
    { decimal: "1024", binary: "10000000000", octal: "2000", hex: "400", description: "1 KB em bytes" },
    { decimal: "16777215", binary: "111111111111111111111111", octal: "77777777", hex: "FFFFFF", description: "Branco em RGB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Conversor de Base Numérica</h1>
            <p className="text-muted-foreground">Converta números entre binário, octal, decimal e hexadecimal</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Calculadora Principal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Conversor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite o número..."
                      className="font-mono"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Base de origem</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {bases.map((base) => (
                        <Button
                          key={base.value}
                          variant={inputBase === base.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setInputBase(base.value)}
                        >
                          {base.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Resultados */}
              {!error && inputValue.trim() && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Resultados</h3>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">Binário (Base 2)</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(results.binary, "binário")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-mono text-lg break-all">{results.binary}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {results.binary.length} dígitos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">Octal (Base 8)</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(results.octal, "octal")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-mono text-lg">{results.octal}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Prefixo: 0o{results.octal}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">Decimal (Base 10)</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(results.decimal, "decimal")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-mono text-lg">{results.decimal}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Formato padrão
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">Hexadecimal (Base 16)</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(results.hexadecimal, "hexadecimal")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-mono text-lg">{results.hexadecimal}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Prefixo: 0x{results.hexadecimal}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exemplos e Referência */}
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="examples">Exemplos</TabsTrigger>
              <TabsTrigger value="reference">Referência</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplos Comuns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {examples.map((example, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <h4 className="font-semibold">{example.description}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Decimal:</span>
                            <p className="font-mono">{example.decimal}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Binário:</span>
                            <p className="font-mono text-xs">{example.binary}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Octal:</span>
                            <p className="font-mono">{example.octal}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Hex:</span>
                            <p className="font-mono">{example.hex}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reference">
              <Card>
                <CardHeader>
                  <CardTitle>Referência Rápida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Características das Bases</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Binário (Base 2):</strong> Usa apenas 0 e 1</li>
                        <li><strong>Octal (Base 8):</strong> Usa dígitos de 0 a 7</li>
                        <li><strong>Decimal (Base 10):</strong> Usa dígitos de 0 a 9</li>
                        <li><strong>Hexadecimal (Base 16):</strong> Usa 0-9 e A-F</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Prefixos Comuns</h4>
                      <ul className="space-y-2 text-sm font-mono">
                        <li><strong>0b</strong> ou <strong>0B</strong> - Binário</li>
                        <li><strong>0o</strong> ou <strong>0O</strong> - Octal</li>
                        <li><strong>0x</strong> ou <strong>0X</strong> - Hexadecimal</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AdSpace position="footer" />
    </div>
  );
};

export default NumberBaseConverterPage;