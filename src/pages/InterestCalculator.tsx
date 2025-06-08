
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseConverterPage from "@/components/BaseConverterPage";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [interestType, setInterestType] = useState("compound");
  const [result, setResult] = useState<any>(null);

  const frequencies = [
    { value: "1", label: "Anual" },
    { value: "12", label: "Mensal" },
    { value: "365", label: "Diário" }
  ];

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);

    if (p > 0 && r > 0 && t > 0) {
      let finalAmount;
      let interest;

      if (interestType === "simple") {
        // Juros simples: A = P(1 + rt)
        finalAmount = p * (1 + r * t);
      } else {
        // Juros compostos: A = P(1 + r/n)^(nt)
        finalAmount = p * Math.pow(1 + r / n, n * t);
      }

      interest = finalAmount - p;

      setResult({
        finalAmount: finalAmount.toFixed(2),
        interest: interest.toFixed(2),
        principal: p.toFixed(2)
      });
    } else {
      setResult({ error: "Valores inválidos" });
    }
  };

  return (
    <BaseConverterPage 
      title="Calculadora de Juros"
      description="Calcule juros simples ou compostos para investimentos e empréstimos"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="principal">Capital inicial (R$)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Ex: 10000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Taxa de juros anual (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Ex: 10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Período (anos)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Ex: 5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-type">Tipo de juros</Label>
            <Select value={interestType} onValueChange={setInterestType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Juros Simples</SelectItem>
                <SelectItem value="compound">Juros Compostos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {interestType === "compound" && (
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência de capitalização</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button onClick={calculateInterest} className="w-full">
          Calcular Juros
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
                  <Label className="text-sm font-medium">Capital inicial:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.principal}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Juros ganhos:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.interest}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Montante final:</Label>
                  <p className="text-xl font-bold text-primary">R$ {result.finalAmount}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default InterestCalculator;
