
import { useState } from "react";
import { ArrowLeft, DollarSign, TrendingUp, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const DividendCalculator = () => {
  const [shares, setShares] = useState("");
  const [dividendPerShare, setDividendPerShare] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [sharePrice, setSharePrice] = useState("");
  const [results, setResults] = useState<any>(null);

  const frequencies = {
    monthly: { name: "Mensal", multiplier: 12 },
    quarterly: { name: "Trimestral", multiplier: 4 },
    semiannual: { name: "Semestral", multiplier: 2 },
    annual: { name: "Anual", multiplier: 1 }
  };

  const calculateDividends = () => {
    if (!shares || !dividendPerShare) return;

    const numShares = parseFloat(shares);
    const dividend = parseFloat(dividendPerShare);
    const price = parseFloat(sharePrice) || 0;
    const freq = frequencies[frequency as keyof typeof frequencies];

    const dividendPerPeriod = numShares * dividend;
    const annualDividend = dividendPerPeriod * freq.multiplier;
    const monthlyDividend = annualDividend / 12;
    
    let yield5Year = 0;
    let yieldPercent = 0;
    
    if (price > 0) {
      yieldPercent = (annualDividend / (numShares * price)) * 100;
      yield5Year = annualDividend * 5; // 5 anos
    }

    const investmentValue = numShares * price;
    const breakEvenYears = investmentValue > 0 ? investmentValue / annualDividend : 0;

    setResults({
      dividendPerPeriod: dividendPerPeriod.toFixed(2),
      annualDividend: annualDividend.toFixed(2),
      monthlyDividend: monthlyDividend.toFixed(2),
      yieldPercent: yieldPercent.toFixed(2),
      yield5Year: yield5Year.toFixed(2),
      investmentValue: investmentValue.toFixed(2),
      breakEvenYears: breakEvenYears.toFixed(1),
      frequency: freq.name
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
            <DollarSign className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Dividendos
            </h1>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
              PRO
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Dados do Investimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shares">Quantidade de Ações</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="Ex: 100"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dividend">Dividendo por Ação (R$)</Label>
                  <Input
                    id="dividend"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 1.50"
                    value={dividendPerShare}
                    onChange={(e) => setDividendPerShare(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frequência dos Dividendos</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(frequencies).map(([key, freq]) => (
                        <SelectItem key={key} value={key}>
                          {freq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço por Ação (R$) - Opcional</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 25.00"
                    value={sharePrice}
                    onChange={(e) => setSharePrice(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateDividends} className="w-full">
                Calcular Dividendos
              </Button>
            </CardContent>
          </Card>

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-emerald-700 dark:text-emerald-300 text-sm">
                    Dividendos por Período
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      R$ {results.dividendPerPeriod}
                    </div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">
                      A cada pagamento ({results.frequency})
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300 text-sm">
                    Renda Anual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      R$ {results.annualDividend}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Total no ano
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300 text-sm">
                    Renda Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      R$ {results.monthlyDividend}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      Média mensal
                    </div>
                  </div>
                </CardContent>
              </Card>

              {parseFloat(results.yieldPercent) > 0 && (
                <>
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-700 dark:text-yellow-300 text-sm">
                        Dividend Yield
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {results.yieldPercent}%
                        </div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">
                          Rendimento anual
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-700 dark:text-green-300 text-sm">
                        Payback
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {results.breakEvenYears} anos
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          Para recuperar investimento
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                    <CardHeader>
                      <CardTitle className="text-orange-700 dark:text-orange-300 text-sm">
                        Projeção 5 Anos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          R$ {results.yield5Year}
                        </div>
                        <div className="text-sm text-orange-600 dark:text-orange-400">
                          Total em dividendos
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Dicas de Investimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Diversificação:</strong> Invista em várias ações pagadoras de dividendos
                </div>
                <div>
                  <strong>Consistência:</strong> Procure empresas com histórico estável de pagamentos
                </div>
                <div>
                  <strong>Yield Sustentável:</strong> Yields muito altos podem indicar risco
                </div>
                <div>
                  <strong>Reinvestimento:</strong> Reinvestir dividendos acelera o crescimento
                </div>
                <div>
                  <strong>Impostos:</strong> Considere a tributação nos seus cálculos
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Faixas de Dividend Yield</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Conservador:</span>
                  <span className="font-mono text-green-600">3-6%</span>
                </div>
                <div className="flex justify-between">
                  <span>Moderado:</span>
                  <span className="font-mono text-blue-600">6-10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Agressivo:</span>
                  <span className="font-mono text-yellow-600">10-15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Alto Risco:</span>
                  <span className="font-mono text-red-600">15%+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default DividendCalculator;
