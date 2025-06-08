
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { DollarSign, Calculator, TrendingUp, Crown, PiggyBank } from "lucide-react";

const AdvancedFinance = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      type: 'loan',
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2)
    });
  };

  const calculateRetirement = () => {
    if (!monthlyContribution || !currentAge || !retirementAge || !interestRate) return;

    const monthly = parseFloat(monthlyContribution);
    const yearsToRetire = parseInt(retirementAge) - parseInt(currentAge);
    const monthsToRetire = yearsToRetire * 12;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;

    // Valor futuro de anuidade
    const futureValue = monthly * (((Math.pow(1 + monthlyRate, monthsToRetire) - 1) / monthlyRate));
    const totalContributed = monthly * monthsToRetire;
    const earnings = futureValue - totalContributed;

    // Renda mensal na aposentadoria (4% rule)
    const monthlyIncome = futureValue * 0.04 / 12;

    setResult({
      type: 'retirement',
      futureValue: futureValue.toFixed(2),
      totalContributed: totalContributed.toFixed(2),
      earnings: earnings.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      yearsToRetire
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-yellow-500" />
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                PRO
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              Finanças Avançadas
            </CardTitle>
            <p className="text-gray-600">
              Empréstimos, aposentadoria, fluxo de caixa e análise de viabilidade
            </p>
          </CardHeader>
          <CardContent>
            
            <Tabs defaultValue="loans" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="loans">Empréstimos</TabsTrigger>
                <TabsTrigger value="retirement">Aposentadoria</TabsTrigger>
                <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
                <TabsTrigger value="viability">Viabilidade</TabsTrigger>
              </TabsList>

              <TabsContent value="loans" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Calculadora de Empréstimo
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="loanAmount">Valor do Empréstimo (R$)</Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          placeholder="Ex: 100000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="interestRate">Taxa de Juros Anual (%)</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.01"
                          placeholder="Ex: 12.5"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="loanTerm">Prazo (anos)</Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          placeholder="Ex: 10"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <Button onClick={calculateLoan} className="w-full" size="lg">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Empréstimo
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Resultado</h3>
                    
                    {result && result.type === 'loan' ? (
                      <div className="space-y-4">
                        <Card className="border-green-200 bg-green-50">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-medium text-green-800">Valor do Empréstimo:</p>
                                <p className="text-green-700">R$ {result.principal}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Parcela Mensal:</p>
                                <p className="text-green-700 text-2xl font-bold">R$ {result.monthlyPayment}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Total a Pagar:</p>
                                <p className="text-green-700 font-semibold">R$ {result.totalPayment}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Total de Juros:</p>
                                <p className="text-green-700 font-semibold">R$ {result.totalInterest}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Preencha os dados para calcular o empréstimo</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="retirement" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <PiggyBank className="h-5 w-5" />
                      Planejamento de Aposentadoria
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="monthlyContribution">Contribuição Mensal (R$)</Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          placeholder="Ex: 1000"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentAge">Idade Atual</Label>
                          <Input
                            id="currentAge"
                            type="number"
                            placeholder="Ex: 30"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="retirementAge">Idade para Aposentadoria</Label>
                          <Input
                            id="retirementAge"
                            type="number"
                            placeholder="Ex: 65"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interestRate">Rentabilidade Anual Esperada (%)</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.01"
                          placeholder="Ex: 8"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <Button onClick={calculateRetirement} className="w-full" size="lg">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Simular Aposentadoria
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Projeção</h3>
                    
                    {result && result.type === 'retirement' ? (
                      <div className="space-y-4">
                        <Card className="border-blue-200 bg-blue-50">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-medium text-blue-800">Anos até Aposentadoria:</p>
                                <p className="text-blue-700">{result.yearsToRetire} anos</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Total Contribuído:</p>
                                <p className="text-blue-700">R$ {result.totalContributed}</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Rendimentos:</p>
                                <p className="text-blue-700 font-semibold">R$ {result.earnings}</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Patrimônio Final:</p>
                                <p className="text-blue-700 text-2xl font-bold">R$ {result.futureValue}</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Renda Mensal Estimada:</p>
                                <p className="text-blue-700 text-xl font-bold">R$ {result.monthlyIncome}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <PiggyBank className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Preencha os dados para simular a aposentadoria</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cashflow" className="mt-6">
                <Card className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise de Fluxo de Caixa</h3>
                      <p className="text-gray-600 mb-4">
                        Funcionalidade em desenvolvimento. Em breve você poderá analisar seu fluxo de caixa.
                      </p>
                      <Badge variant="secondary">Em Breve</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="viability" className="mt-6">
                <Card className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise de Viabilidade</h3>
                      <p className="text-gray-600 mb-4">
                        Funcionalidade em desenvolvimento. Em breve você poderá analisar a viabilidade de projetos.
                      </p>
                      <Badge variant="secondary">Em Breve</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <AdSpace position="middle" />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default AdvancedFinance;
