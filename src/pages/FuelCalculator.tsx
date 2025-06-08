
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Fuel } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const FuelCalculator = () => {
  // Trip calculation
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [tripCost, setTripCost] = useState("");
  const [fuelNeeded, setFuelNeeded] = useState("");

  // Efficiency calculation
  const [fuelUsed, setFuelUsed] = useState("");
  const [distanceTraveled, setDistanceTraveled] = useState("");
  const [efficiency, setEfficiency] = useState("");

  // Cost comparison
  const [gasPrice, setGasPrice] = useState("");
  const [ethanolPrice, setEthanolPrice] = useState("");
  const [comparison, setComparison] = useState("");

  const { addRecord } = useConversionHistory();

  const calculateTrip = () => {
    if (distance && consumption && fuelPrice) {
      const dist = parseFloat(distance);
      const cons = parseFloat(consumption);
      const price = parseFloat(fuelPrice);
      
      const litersNeeded = dist / cons;
      const totalCost = litersNeeded * price;
      
      setFuelNeeded(litersNeeded.toFixed(2));
      setTripCost(totalCost.toFixed(2));
      
      addRecord({
        type: 'calculation',
        category: 'Combustível',
        title: 'Cálculo de Viagem',
        input: `${dist}km, ${cons}km/L, R$${price}/L`,
        output: `${litersNeeded.toFixed(2)}L, R$${totalCost.toFixed(2)}`
      });
      
      toast({
        title: "Viagem calculada!",
        description: `Você precisará de ${litersNeeded.toFixed(2)}L gastando R$${totalCost.toFixed(2)}`
      });
    }
  };

  const calculateEfficiency = () => {
    if (fuelUsed && distanceTraveled) {
      const fuel = parseFloat(fuelUsed);
      const dist = parseFloat(distanceTraveled);
      
      const eff = dist / fuel;
      setEfficiency(eff.toFixed(2));
      
      addRecord({
        type: 'calculation',
        category: 'Combustível',
        title: 'Eficiência do Veículo',
        input: `${dist}km com ${fuel}L`,
        output: `${eff.toFixed(2)} km/L`
      });
      
      toast({
        title: "Eficiência calculada!",
        description: `Seu veículo faz ${eff.toFixed(2)} km/L`
      });
    }
  };

  const compareFuels = () => {
    if (gasPrice && ethanolPrice) {
      const gas = parseFloat(gasPrice);
      const ethanol = parseFloat(ethanolPrice);
      
      // Etanol tem eficiência ~70% da gasolina
      const ethanolEfficiency = ethanol / 0.7;
      
      let result = "";
      if (ethanolEfficiency < gas) {
        const savings = ((gas - ethanolEfficiency) / gas * 100).toFixed(1);
        result = `Etanol compensa! Economia de ${savings}%`;
      } else {
        const loss = ((ethanolEfficiency - gas) / gas * 100).toFixed(1);
        result = `Gasolina compensa! Etanol sai ${loss}% mais caro`;
      }
      
      setComparison(result);
      
      addRecord({
        type: 'calculation',
        category: 'Combustível',
        title: 'Comparação Gasolina vs Etanol',
        input: `Gasolina: R$${gas}, Etanol: R$${ethanol}`,
        output: result
      });
      
      toast({
        title: "Comparação feita!",
        description: result
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Fuel className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Combustível
            </h1>
          </div>
        </div>

        <Tabs defaultValue="trip" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trip">Viagem</TabsTrigger>
            <TabsTrigger value="efficiency">Eficiência</TabsTrigger>
            <TabsTrigger value="comparison">Comparação</TabsTrigger>
          </TabsList>

          <TabsContent value="trip">
            <Card>
              <CardHeader>
                <CardTitle>Cálculo de Viagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="distance">Distância (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Digite a distância em km"
                  />
                </div>
                <div>
                  <Label htmlFor="consumption">Consumo do Veículo (km/L)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="Ex: 12 km/L"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelPrice">Preço do Combustível (R$/L)</Label>
                  <Input
                    id="fuelPrice"
                    type="number"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="Ex: 5.50"
                    step="0.01"
                  />
                </div>
                <Button onClick={calculateTrip} className="w-full">
                  Calcular Viagem
                </Button>
                {tripCost && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-2">
                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      Combustível necessário: {fuelNeeded} litros
                    </p>
                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      Custo total: R$ {tripCost}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency">
            <Card>
              <CardHeader>
                <CardTitle>Calcular Eficiência do Veículo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="distanceTraveled">Distância Percorrida (km)</Label>
                  <Input
                    id="distanceTraveled"
                    type="number"
                    value={distanceTraveled}
                    onChange={(e) => setDistanceTraveled(e.target.value)}
                    placeholder="Digite a distância percorrida"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelUsed">Combustível Consumido (L)</Label>
                  <Input
                    id="fuelUsed"
                    type="number"
                    value={fuelUsed}
                    onChange={(e) => setFuelUsed(e.target.value)}
                    placeholder="Digite quantos litros foram consumidos"
                    step="0.1"
                  />
                </div>
                <Button onClick={calculateEfficiency} className="w-full">
                  Calcular Eficiência
                </Button>
                {efficiency && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      Eficiência: {efficiency} km/L
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-300 mt-2">
                      {parseFloat(efficiency) > 15 ? "Excelente eficiência!" :
                       parseFloat(efficiency) > 10 ? "Boa eficiência" :
                       parseFloat(efficiency) > 7 ? "Eficiência razoável" :
                       "Eficiência baixa - considere revisão"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Gasolina vs Etanol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="gasPrice">Preço da Gasolina (R$/L)</Label>
                  <Input
                    id="gasPrice"
                    type="number"
                    value={gasPrice}
                    onChange={(e) => setGasPrice(e.target.value)}
                    placeholder="Ex: 5.50"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="ethanolPrice">Preço do Etanol (R$/L)</Label>
                  <Input
                    id="ethanolPrice"
                    type="number"
                    value={ethanolPrice}
                    onChange={(e) => setEthanolPrice(e.target.value)}
                    placeholder="Ex: 3.80"
                    step="0.01"
                  />
                </div>
                <Button onClick={compareFuels} className="w-full">
                  Comparar Combustíveis
                </Button>
                {comparison && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      {comparison}
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-300 mt-2">
                      * Considerando que etanol tem ~70% da eficiência da gasolina
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FuelCalculator;
