
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseConverterPage from "@/components/BaseConverterPage";

const DateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [operation, setOperation] = useState("add");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("days");
  const [result, setResult] = useState("");

  const operations = [
    { value: "add", label: "Adicionar" },
    { value: "subtract", label: "Subtrair" }
  ];

  const units = [
    { value: "days", label: "Dias" },
    { value: "weeks", label: "Semanas" },
    { value: "months", label: "Meses" },
    { value: "years", label: "Anos" }
  ];

  const calculateDate = () => {
    if (!startDate || !amount) return;
    
    const date = new Date(startDate);
    const amountNum = parseInt(amount);
    const multiplier = operation === "subtract" ? -1 : 1;
    
    switch (unit) {
      case "days":
        date.setDate(date.getDate() + (amountNum * multiplier));
        break;
      case "weeks":
        date.setDate(date.getDate() + (amountNum * 7 * multiplier));
        break;
      case "months":
        date.setMonth(date.getMonth() + (amountNum * multiplier));
        break;
      case "years":
        date.setFullYear(date.getFullYear() + (amountNum * multiplier));
        break;
    }
    
    setResult(date.toLocaleDateString('pt-BR'));
  };

  return (
    <BaseConverterPage 
      title="Calculadora de Data"
      description="Adicione ou subtraia tempo de uma data específica"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="start-date">Data inicial</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="operation">Operação</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operations.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Quantidade</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unidade</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u.value} value={u.value}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateDate} className="w-full">
          Calcular Data
        </Button>

        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Data resultante:</Label>
            <p className="text-2xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default DateCalculator;
