
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const BasicStatistics = () => {
  const [data, setData] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateStats = () => {
    const numbers = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) return;

    const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const median = sortedNumbers.length % 2 === 0 
      ? (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2
      : sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    
    const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
    const standardDeviation = Math.sqrt(variance);
    
    setResults({
      count: numbers.length,
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      variance: variance.toFixed(2),
      standardDeviation: standardDeviation.toFixed(2)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Estatística Básica</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Inserir Dados</CardTitle>
              <CardDescription>
                Digite os números separados por vírgula para calcular estatísticas básicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="data">Dados (separados por vírgula)</Label>
                <Input
                  id="data"
                  placeholder="1, 2, 3, 4, 5..."
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <Button onClick={calculateStats} className="w-full">
                Calcular Estatísticas
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quantidade</Label>
                    <p className="text-2xl font-bold">{results.count}</p>
                  </div>
                  <div>
                    <Label>Média</Label>
                    <p className="text-2xl font-bold">{results.mean}</p>
                  </div>
                  <div>
                    <Label>Mediana</Label>
                    <p className="text-2xl font-bold">{results.median}</p>
                  </div>
                  <div>
                    <Label>Mínimo</Label>
                    <p className="text-2xl font-bold">{results.min}</p>
                  </div>
                  <div>
                    <Label>Máximo</Label>
                    <p className="text-2xl font-bold">{results.max}</p>
                  </div>
                  <div>
                    <Label>Desvio Padrão</Label>
                    <p className="text-2xl font-bold">{results.standardDeviation}</p>
                  </div>
                  <div>
                    <Label>Variância</Label>
                    <p className="text-2xl font-bold">{results.variance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default BasicStatistics;
