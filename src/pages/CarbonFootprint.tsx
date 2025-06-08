
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Leaf, Car, Plane, Home } from "lucide-react";

const CarbonFootprint = () => {
  const [transportType, setTransportType] = useState("");
  const [distance, setDistance] = useState("");
  const [fuelType, setFuelType] = useState("gasoline");
  
  const emissionFactors = {
    car: {
      gasoline: 0.23, // kg CO2 per km
      diesel: 0.27,
      electric: 0.05
    },
    plane: {
      domestic: 0.255,
      international: 0.195
    },
    bus: 0.089,
    train: 0.041
  };

  const calculateEmissions = () => {
    if (!transportType || !distance) return null;
    
    const dist = parseFloat(distance);
    let factor = 0;
    
    if (transportType === "car") {
      factor = emissionFactors.car[fuelType as keyof typeof emissionFactors.car];
    } else if (transportType === "plane") {
      factor = emissionFactors.plane[fuelType as keyof typeof emissionFactors.plane];
    } else {
      factor = emissionFactors[transportType as keyof typeof emissionFactors] as number;
    }
    
    return (dist * factor).toFixed(2);
  };

  const emissions = calculateEmissions();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Leaf className="h-8 w-8 text-green-600" />
                Calculadora de Pegada de Carbono
              </CardTitle>
              <p className="text-gray-600">
                Calcule suas emissões de CO2 por transporte
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Transporte</Label>
                  <Select value={transportType} onValueChange={setTransportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o transporte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Carro</SelectItem>
                      <SelectItem value="plane">Avião</SelectItem>
                      <SelectItem value="bus">Ônibus</SelectItem>
                      <SelectItem value="train">Trem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Distância (km)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 100"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
              </div>

              {(transportType === "car" || transportType === "plane") && (
                <div className="space-y-2">
                  <Label>
                    {transportType === "car" ? "Tipo de Combustível" : "Tipo de Voo"}
                  </Label>
                  <Select value={fuelType} onValueChange={setFuelType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transportType === "car" ? (
                        <>
                          <SelectItem value="gasoline">Gasolina</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Elétrico</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="domestic">Doméstico</SelectItem>
                          <SelectItem value="international">Internacional</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {emissions && (
                <div className="mt-8 space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="text-2xl px-6 py-3 bg-green-100 text-green-800">
                      {emissions} kg CO2
                    </Badge>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-green-800">Para compensar esta emissão:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-900">{Math.ceil(parseFloat(emissions) / 22)}</p>
                        <p className="text-sm text-green-700">árvores precisam ser plantadas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-900">{(parseFloat(emissions) * 3.67).toFixed(1)}</p>
                        <p className="text-sm text-green-700">litros de gasolina evitados</p>
                      </div>
                    </div>
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

export default CarbonFootprint;
