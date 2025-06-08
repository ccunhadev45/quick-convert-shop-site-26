
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseConverterPage from "@/components/BaseConverterPage";

const FuelConsumption = () => {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [consumption, setConsumption] = useState("");

  const calculateConsumption = () => {
    const distanceNum = parseFloat(distance);
    const fuelNum = parseFloat(fuel);
    
    if (distanceNum > 0 && fuelNum > 0) {
      const result = distanceNum / fuelNum;
      setConsumption(result.toFixed(2));
    } else {
      setConsumption("Valores inválidos");
    }
  };

  return (
    <BaseConverterPage 
      title="Calculadora de Consumo de Combustível"
      description="Calcule o consumo de combustível do seu veículo em km/l"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="distance">Distância percorrida (km)</Label>
            <Input
              id="distance"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Ex: 100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuel">Combustível gasto (litros)</Label>
            <Input
              id="fuel"
              type="number"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              placeholder="Ex: 8.5"
            />
          </div>
        </div>

        <Button onClick={calculateConsumption} className="w-full">
          Calcular Consumo
        </Button>

        {consumption && (
          <div className="p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Consumo:</Label>
            <p className="text-2xl font-bold text-primary">{consumption} km/l</p>
          </div>
        )}
      </div>
    </BaseConverterPage>
  );
};

export default FuelConsumption;
