
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const InvestmentComparison = () => {
  const [initialAmount, setInitialAmount] = useState<string>("10000");
  const [monthlyAmount, setMonthlyAmount] = useState<string>("500");
  const [period, setPeriod] = useState<string>("60");
  const [results, setResults] = useState<any>(null);

  const calculateInvestments = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyAmount) || 0;
    const months = parseInt(period) || 12;

    // Taxas de juros anuais aproximadas (valores ilustrativos)
    const investments = {
      savings: 0.005, // 0.5% ao mês (6% ao ano)
      cdb: 0.01, // 1% ao mês (12% ao ano)
      treasury: 0.009, // 0.9% ao mês (10.8% ao ano)
      stocks: 0.012, // 1.2% ao mês (14.4% ao ano - mais volátil)
      crypto: 0.02 // 2% ao mês (24% ao ano - muito volátil)
    };

    const investmentNames = {
      savings: "Poupança",
      cdb: "CDB",
      treasury: "Tesouro Direto",
      stocks: "Ações",
      crypto: "Criptomoedas"
    };

    const results = Object.entries(investments).map(([key, rate]) => {
      let total = initial;
      let totalInvested = initial;

      // Calcula juros compostos mensais
      for (let i = 0; i < months; i++) {
        total = total * (1 + rate) + monthly;
        totalInvested += monthly;
      }

      const profit = total - totalInvested;
      const profitPercentage = (profit / totalInvested) * 100;

      return {
        name: investmentNames[key as keyof typeof investmentNames],
        key,
        total: total.toFixed(2),
        profit: profit.toFixed(2),
        profitPercentage: profitPercentage.toFixed(2),
        totalInvested: totalInvested.toFixed(2)
      };
    });

    setResults(results.sort((a, b) => parseFloat(b.total) - parseFloat(a.total)));
  };

  const getRiskBadge = (key: string) => {
    const riskLevels = {
      savings: { label: "Baixo Risco", color: "bg-green-100 text-green-800" },
      cdb: { label: "Baixo Risco", color: "bg-green-100 text-green-800" },
      treasury: { label: "Baixo Risco", color: "bg-green-100 text-green-800" },
      stocks: { label: "Alto Risco", color: "bg-red-100 text-red-800" },
      crypto: { label: "Altíssimo Risco", color: "bg-red-100 text-red-800" }
    };

    const risk = riskLevels[key as keyof typeof riskLevels];
    return <Badge className={risk.color}>{risk.label}</Badge>;
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Comparador de Investimentos ⭐
          </h1>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Parâmetros do Investimento</CardTitle>
              <CardDescription>
                Configure os valores para comparar diferentes tipos de investimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="initial">Valor Inicial (R$)</Label>
                <Input
                  id="initial"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="monthly">Aporte Mensal (R$)</Label>
                <Input
                  id="monthly"
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="period">Período (meses)</Label>
                <Input
                  id="period"
                  type="number"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateInvestments} className="w-full">
                Calcular e Comparar
              </Button>

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                ⚠️ Este é um simulador educativo. As taxas são ilustrativas e não representam garantia de rentabilidade.
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            {results && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Comparação de Resultados</h3>
                {results.map((investment: any, index: number) => (
                  <Card key={investment.key} className={index === 0 ? "border-green-500 border-2" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{investment.name}</CardTitle>
                        <div className="flex gap-2">
                          {index === 0 && <Badge className="bg-green-100 text-green-800">Melhor Resultado</Badge>}
                          {getRiskBadge(investment.key)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Final</div>
                          <div className="text-xl font-bold">R$ {investment.total}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Lucro</div>
                          <div className="text-xl font-bold text-green-600">R$ {investment.profit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Rendimento</div>
                          <div className="text-xl font-bold text-blue-600">{investment.profitPercentage}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Investido</div>
                          <div className="text-lg">R$ {investment.totalInvested}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default InvestmentComparison;
