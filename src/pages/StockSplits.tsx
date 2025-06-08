
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const StockSplits = () => {
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");
  const [splitRatio, setSplitRatio] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateSplit = () => {
    if (!shares || !price || !splitRatio) return;
    
    const currentShares = parseInt(shares);
    const currentPrice = parseFloat(price);
    const ratio = parseFloat(splitRatio);
    
    const newShares = currentShares * ratio;
    const newPrice = currentPrice / ratio;
    const totalValue = currentShares * currentPrice;
    
    setResult({
      newShares,
      newPrice: newPrice.toFixed(2),
      totalValue: totalValue.toFixed(2),
      percentageIncrease: ((ratio - 1) * 100).toFixed(0)
    });
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
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Desdobramento de Ações
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Calcular Stock Split</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ações Atuais</label>
                    <Input
                      type="number"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                      placeholder="Ex: 100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preço Atual (R$)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 50.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Proporção do Split (ex: 2 para 1:2)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(e.target.value)}
                    placeholder="Ex: 2"
                  />
                </div>
              </div>

              <Button onClick={calculateSplit} className="w-full" size="lg">
                Calcular Split
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Novas Ações</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.newShares}</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Novo Preço</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">R$ {result.newPrice}</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Valor Total</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {result.totalValue}</p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Aumento Ações</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.percentageIncrease}%</p>
                    </div>
                  </div>
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

export default StockSplits;
