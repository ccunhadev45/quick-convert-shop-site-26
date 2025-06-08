
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Zap, Lightbulb, DollarSign } from "lucide-react";

const EnergySavings = () => {
  const [applianceType, setApplianceType] = useState("");
  const [oldWatts, setOldWatts] = useState("");
  const [newWatts, setNewWatts] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [electricityRate, setElectricityRate] = useState("0.75");
  
  const applianceDefaults = {
    "led-vs-incandescent": { old: 60, new: 10, name: "LED vs Incandescente" },
    "led-vs-fluorescent": { old: 20, new: 10, name: "LED vs Fluorescente" },
    "ac-inverter": { old: 1500, new: 1000, name: "Ar Condicionado Inverter" },
    "refrigerator": { old: 150, new: 80, name: "Geladeira Eficiente" },
    "washing-machine": { old: 500, new: 300, name: "Máquina de Lavar" }
  };

  const calculateSavings = () => {
    if (!oldWatts || !newWatts || !hoursPerDay) return null;
    
    const oldW = parseFloat(oldWatts);
    const newW = parseFloat(newWatts);
    const hours = parseFloat(hoursPerDay);
    const rate = parseFloat(electricityRate);
    
    const dailySavingsKWh = ((oldW - newW) * hours) / 1000;
    const monthlySavingsKWh = dailySavingsKWh * 30;
    const yearlySavingsKWh = dailySavingsKWh * 365;
    
    const monthlySavingsReais = monthlySavingsKWh * rate;
    const yearlySavingsReais = yearlySavingsKWh * rate;
    
    return {
      dailyKWh: dailySavingsKWh.toFixed(3),
      monthlyKWh: monthlySavingsKWh.toFixed(2),
      yearlyKWh: yearlySavingsKWh.toFixed(2),
      monthlyReais: monthlySavingsReais.toFixed(2),
      yearlyReais: yearlySavingsReais.toFixed(2),
      co2Reduction: (yearlySavingsKWh * 0.0817).toFixed(2) // kg CO2 por kWh no Brasil
    };
  };

  const handleApplianceChange = (value: string) => {
    setApplianceType(value);
    if (value && applianceDefaults[value as keyof typeof applianceDefaults]) {
      const defaults = applianceDefaults[value as keyof typeof applianceDefaults];
      setOldWatts(defaults.old.toString());
      setNewWatts(defaults.new.toString());
    }
  };

  const savings = calculateSavings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Zap className="h-8 w-8 text-yellow-600" />
                Calculadora de Economia de Energia
              </CardTitle>
              <p className="text-gray-600">
                Compare o consumo de energia entre aparelhos
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Comparação</Label>
                <Select value={applianceType} onValueChange={handleApplianceChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma comparação" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(applianceDefaults).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Consumo Antigo (Watts)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 60"
                    value={oldWatts}
                    onChange={(e) => setOldWatts(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Consumo Novo (Watts)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 10"
                    value={newWatts}
                    onChange={(e) => setNewWatts(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Horas de Uso por Dia</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 8"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tarifa de Energia (R$/kWh)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 0.75"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(e.target.value)}
                  />
                </div>
              </div>

              {savings && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Economia Calculada:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-900">R$ {savings.monthlyReais}</p>
                      <p className="text-sm text-green-700">economia mensal</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-900">R$ {savings.yearlyReais}</p>
                      <p className="text-sm text-blue-700">economia anual</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-lg space-y-3">
                    <h4 className="font-semibold text-yellow-800">Consumo de Energia:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-yellow-900">{savings.dailyKWh}</p>
                        <p className="text-xs text-yellow-700">kWh/dia</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-900">{savings.monthlyKWh}</p>
                        <p className="text-xs text-yellow-700">kWh/mês</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-900">{savings.yearlyKWh}</p>
                        <p className="text-xs text-yellow-700">kWh/ano</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mb-2">
                      Impacto Ambiental
                    </Badge>
                    <p className="text-lg font-bold text-green-900">{savings.co2Reduction} kg CO2</p>
                    <p className="text-sm text-green-700">redução de emissões por ano</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default EnergySavings;
