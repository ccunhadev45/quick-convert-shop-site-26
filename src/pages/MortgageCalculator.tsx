
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseConverterPage from "@/components/BaseConverterPage";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const r = parseFloat(rate) / 100 / 12; // Taxa mensal
    const n = parseFloat(years) * 12; // Número de pagamentos

    if (price > 0 && down >= 0 && r > 0 && n > 0) {
      const loanAmount = price - down;
      const monthlyPayment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = monthlyPayment * n;
      const totalInterest = totalAmount - loanAmount;

      setResult({
        loanAmount: loanAmount.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    } else {
      setResult({ error: "Valores inválidos" });
    }
  };

  return (
    <BaseConverterPage 
      title="Calculadora de Financiamento Imobiliário"
      description="Calcule parcelas e custos totais do financiamento da casa própria"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="home-price">Valor do imóvel (R$)</Label>
            <Input
              id="home-price"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="Ex: 300000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="down-payment">Entrada (R$)</Label>
            <Input
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Ex: 60000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Taxa de juros anual (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Ex: 9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Período (anos)</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Ex: 30"
            />
          </div>
        </div>

        <Button onClick={calculateMortgage} className="w-full">
          Calcular Financiamento
        </Button>

        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            {result.error ? (
              <div className="col-span-2 p-4 bg-destructive/10 rounded-lg">
                <p className="text-destructive">{result.error}</p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Valor financiado:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.loanAmount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Parcela mensal:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.monthlyPayment}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Total pago:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.totalAmount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Total de juros:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.totalInterest}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default MortgageCalculator;
