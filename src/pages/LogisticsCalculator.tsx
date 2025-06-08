
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
import { Truck, Calculator, Package, MapPin, Clock } from "lucide-react";

const LogisticsCalculator = () => {
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelPrice, setFuelPrice] = useState("5.50");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);

  const vehicles = [
    { id: "bike", name: "Moto", capacity: "30kg", consumption: "35", speed: "40" },
    { id: "van", name: "Van", capacity: "1000kg", consumption: "12", speed: "60" },
    { id: "truck_3_5t", name: "Caminhão 3,5t", capacity: "3500kg", consumption: "8", speed: "70" },
    { id: "truck_truck", name: "Caminhão Truck", capacity: "14000kg", consumption: "6", speed: "80" },
    { id: "truck_bitruck", name: "Bitruck", capacity: "23000kg", consumption: "4", speed: "80" },
    { id: "truck_carreta", name: "Carreta", capacity: "40000kg", consumption: "3.5", speed: "80" }
  ];

  const calculateFreight = () => {
    if (!distance || !weight || !vehicleType) return;

    const distanceNum = parseFloat(distance);
    const weightNum = parseFloat(weight);
    const fuelPriceNum = parseFloat(fuelPrice);
    
    const selectedVehicle = vehicles.find(v => v.id === vehicleType);
    if (!selectedVehicle) return;

    const consumption = parseFloat(selectedVehicle.consumption);
    const speed = parseFloat(selectedVehicle.speed);
    const capacity = parseFloat(selectedVehicle.capacity.replace('kg', ''));

    // Cálculos
    const fuelNeeded = distanceNum / consumption;
    const fuelCost = fuelNeeded * fuelPriceNum;
    const travelTime = distanceNum / speed;
    const utilizationRate = (weightNum / capacity) * 100;
    
    // Estimativa de custo por km (incluindo combustível, pedágio, motorista)
    const costPerKm = {
      bike: 1.20,
      van: 2.50,
      truck_3_5t: 3.80,
      truck_truck: 4.50,
      truck_bitruck: 5.20,
      truck_carreta: 6.00
    };

    const baseCost = distanceNum * costPerKm[vehicleType as keyof typeof costPerKm];
    const totalCost = baseCost + fuelCost;
    const costPerKg = totalCost / weightNum;

    setResult({
      vehicle: selectedVehicle.name,
      distance: distanceNum,
      weight: weightNum,
      fuelNeeded: fuelNeeded.toFixed(1),
      fuelCost: fuelCost.toFixed(2),
      travelTime: travelTime.toFixed(1),
      utilizationRate: utilizationRate.toFixed(1),
      totalCost: totalCost.toFixed(2),
      costPerKg: costPerKg.toFixed(2),
      capacity
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Truck className="h-8 w-8 text-blue-600" />
              Calculadora de Logística
            </CardTitle>
            <p className="text-gray-600">
              Calcule frete, rotas, capacidade de carga e tempo de entrega
            </p>
          </CardHeader>
          <CardContent>
            
            <Tabs defaultValue="freight" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="freight">Frete</TabsTrigger>
                <TabsTrigger value="capacity">Capacidade</TabsTrigger>
                <TabsTrigger value="routes">Rotas</TabsTrigger>
              </TabsList>

              <TabsContent value="freight" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Dados do Frete
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="origin">Origem</Label>
                          <Input
                            id="origin"
                            placeholder="São Paulo, SP"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="destination">Destino</Label>
                          <Input
                            id="destination"
                            placeholder="Rio de Janeiro, RJ"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="distance">Distância (km)</Label>
                        <Input
                          id="distance"
                          type="number"
                          placeholder="Ex: 400"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weight">Peso da Carga (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Ex: 1000"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="vehicleType">Tipo de Veículo</Label>
                        <Select value={vehicleType} onValueChange={setVehicleType}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione o veículo" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicles.map((v) => (
                              <SelectItem key={v.id} value={v.id}>
                                <div>
                                  <div className="font-medium">{v.name}</div>
                                  <div className="text-sm text-gray-500">Cap: {v.capacity}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fuelPrice">Preço do Combustível (R$/L)</Label>
                        <Input
                          id="fuelPrice"
                          type="number"
                          step="0.01"
                          value={fuelPrice}
                          onChange={(e) => setFuelPrice(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <Button onClick={calculateFreight} className="w-full" size="lg">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Frete
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Resultados</h3>
                    
                    {result ? (
                      <div className="space-y-4">
                        <Card className="border-blue-200 bg-blue-50">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-medium text-blue-800">Veículo:</p>
                                <p className="text-blue-700">{result.vehicle}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium text-blue-800">Distância:</p>
                                  <p className="text-blue-700">{result.distance} km</p>
                                </div>
                                <div>
                                  <p className="font-medium text-blue-800">Peso:</p>
                                  <p className="text-blue-700">{result.weight} kg</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium text-blue-800">Combustível:</p>
                                  <p className="text-blue-700">{result.fuelNeeded}L</p>
                                </div>
                                <div>
                                  <p className="font-medium text-blue-800">Tempo:</p>
                                  <p className="text-blue-700">{result.travelTime}h</p>
                                </div>
                              </div>
                              <Separator />
                              <div>
                                <p className="font-medium text-blue-800">Utilização:</p>
                                <p className="text-blue-700">{result.utilizationRate}% da capacidade</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Custo Total:</p>
                                <p className="text-blue-700 text-2xl font-bold">R$ {result.totalCost}</p>
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Custo por kg:</p>
                                <p className="text-blue-700 font-semibold">R$ {result.costPerKg}/kg</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Preencha os dados para calcular o frete</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="capacity" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="border-gray-200">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><strong>Capacidade:</strong> {vehicle.capacity}</p>
                          <p><strong>Consumo:</strong> {vehicle.consumption} km/L</p>
                          <p><strong>Velocidade:</strong> {vehicle.speed} km/h</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="routes" className="mt-6">
                <Card className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Otimização de Rotas</h3>
                      <p className="text-gray-600 mb-4">
                        Funcionalidade em desenvolvimento. Em breve você poderá otimizar rotas múltiplas.
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

export default LogisticsCalculator;
