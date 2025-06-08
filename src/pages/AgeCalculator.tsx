
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseConverterPage from "@/components/BaseConverterPage";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths
    });
  };

  return (
    <BaseConverterPage 
      title="Calculadora de Idade"
      description="Calcule sua idade exata em anos, meses, dias e mais"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="birth-date">Data de nascimento</Label>
          <Input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <Button onClick={calculateAge} className="w-full">
          Calcular Idade
        </Button>

        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Idade atual:</Label>
              <p className="text-xl font-bold text-primary">
                {result.years} anos, {result.months} meses e {result.days} dias
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Total em dias:</Label>
              <p className="text-xl font-bold text-primary">{result.totalDays} dias</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Total em semanas:</Label>
              <p className="text-xl font-bold text-primary">{result.totalWeeks} semanas</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Total em meses:</Label>
              <p className="text-xl font-bold text-primary">{result.totalMonths} meses</p>
            </div>
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default AgeCalculator;
