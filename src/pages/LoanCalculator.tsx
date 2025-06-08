
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseConverterPage from "@/components/BaseConverterPage";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12; // Taxa mensal
    const n = parseFloat(years) * 12; // Número de pagamentos

    if (p > 0 && r > 0 && n > 0) {
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = monthlyPayment * n;
      const totalInterest = totalAmount - p;

      setResult({
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
      title="Calculadora de Empréstimo"
      description="Calcule parcelas mensais, juros totais e valor total do empréstimo"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="principal">Valor do empréstimo (R$)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Ex: 100000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Taxa de juros anual (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Ex: 12"
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

        <Button onClick={calculateLoan} className="w-full">
          Calcular Empréstimo
        </Button>

        {result && (
          <div className="grid gap-4 md:grid-cols-3">
            {result.error ? (
              <div className="col-span-3 p-4 bg-destructive/10 rounded-lg">
                <p className="text-destructive">{result.error}</p>
              </div>
            ) : (
              <>
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

export default LoanCalculator;
