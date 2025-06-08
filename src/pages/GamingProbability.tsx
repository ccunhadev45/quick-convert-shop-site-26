
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Dice6, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const GamingProbability = () => {
  const [calculationType, setCalculationType] = useState("");
  const [probability, setProbability] = useState("");
  const [attempts, setAttempts] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateProbability = () => {
    if (!probability || !attempts) return;
    
    const prob = parseFloat(probability) / 100;
    const tries = parseInt(attempts);
    
    let results: any = {};
    
    if (calculationType === "atleast_one") {
      // Probabilidade de obter pelo menos um sucesso em N tentativas
      const noSuccess = Math.pow(1 - prob, tries);
      const atLeastOne = 1 - noSuccess;
      results.atLeastOne = (atLeastOne * 100).toFixed(2);
      results.noSuccess = (noSuccess * 100).toFixed(2);
    } else if (calculationType === "exact") {
      // Probabilidade binomial exata
      const exactProb = prob * Math.pow(1 - prob, tries - 1);
      results.exact = (exactProb * 100).toFixed(2);
    } else if (calculationType === "expected") {
      // Número esperado de tentativas
      const expected = 1 / prob;
      results.expected = expected.toFixed(0);
    }
    
    setResult(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Dice6 className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Probabilidades Gaming
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Calcular Probabilidades de Drop/Loot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Cálculo</label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="atleast_one">Pelo menos um sucesso</SelectItem>
                      <SelectItem value="exact">Probabilidade exata</SelectItem>
                      <SelectItem value="expected">Tentativas esperadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Probabilidade de Drop (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={probability}
                    onChange={(e) => setProbability(e.target.value)}
                    placeholder="Ex: 5.5"
                  />
                </div>

                {calculationType !== "expected" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Tentativas</label>
                    <Input
                      type="number"
                      value={attempts}
                      onChange={(e) => setAttempts(e.target.value)}
                      placeholder="Ex: 100"
                    />
                  </div>
                )}
              </div>

              <Button onClick={calculateProbability} className="w-full" size="lg">
                Calcular Probabilidade
              </Button>

              {result && (
                <div className="space-y-4">
                  {result.atLeastOne && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Chance de pelo menos um drop</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.atLeastOne}%</p>
                    </div>
                  )}

                  {result.noSuccess && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Chance de nenhum drop</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result.noSuccess}%</p>
                    </div>
                  )}

                  {result.exact && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Probabilidade exata</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.exact}%</p>
                    </div>
                  )}

                  {result.expected && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tentativas esperadas para drop</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.expected}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default GamingProbability;
