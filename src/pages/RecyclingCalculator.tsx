
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Recycle, Trash2, Package } from "lucide-react";

const RecyclingCalculator = () => {
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState("");
  
  const materialData = {
    plastic: {
      name: "Plástico",
      bottles: { conversion: 0.04, unit: "garrafas PET (500ml)" },
      energy: 1.5, // kWh economia por kg
      co2: 2.1, // kg CO2 evitados por kg
      water: 15 // litros água poupados por kg
    },
    paper: {
      name: "Papel",
      bottles: { conversion: 0.001, unit: "folhas A4" },
      energy: 0.4,
      co2: 0.9,
      water: 60
    },
    aluminum: {
      name: "Alumínio",
      bottles: { conversion: 0.015, unit: "latas de refrigerante" },
      energy: 8.0,
      co2: 11.5,
      water: 40
    },
    glass: {
      name: "Vidro",
      bottles: { conversion: 0.5, unit: "garrafas de vidro" },
      energy: 0.3,
      co2: 0.5,
      water: 2
    },
    cardboard: {
      name: "Papelão",
      bottles: { conversion: 0.02, unit: "caixas médias" },
      energy: 0.5,
      co2: 1.2,
      water: 30
    }
  };

  const calculateImpact = () => {
    if (!materialType || !weight) return null;
    
    const material = materialData[materialType as keyof typeof materialData];
    const weightNum = parseFloat(weight);
    
    return {
      items: Math.round(weightNum / material.bottles.conversion),
      itemUnit: material.bottles.unit,
      energySaved: (weightNum * material.energy).toFixed(1),
      co2Avoided: (weightNum * material.co2).toFixed(1),
      waterSaved: (weightNum * material.water).toFixed(0)
    };
  };

  const impact = calculateImpact();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Recycle className="h-8 w-8 text-teal-600" />
                Calculadora de Reciclagem
              </CardTitle>
              <p className="text-gray-600">
                Calcule o impacto ambiental da sua reciclagem
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Material</Label>
                  <Select value={materialType} onValueChange={setMaterialType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o material" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(materialData).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 1.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              {impact && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Impacto da Reciclagem:</h3>
                  
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <Package className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-teal-900">{impact.items}</p>
                      <p className="text-sm text-teal-700">{impact.itemUnit}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-xl font-bold text-green-900">{impact.energySaved}</p>
                      <p className="text-sm text-green-700">kWh energia poupada</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-xl font-bold text-blue-900">{impact.co2Avoided}</p>
                      <p className="text-sm text-blue-700">kg CO2 evitados</p>
                    </div>
                    
                    <div className="bg-cyan-50 p-4 rounded-lg text-center">
                      <p className="text-xl font-bold text-cyan-900">{impact.waterSaved}</p>
                      <p className="text-sm text-cyan-700">litros água poupados</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Equivalências:</h4>
                    <ul className="space-y-1 text-sm text-amber-700">
                      <li>• Energia poupada = {Math.round(parseFloat(impact.energySaved) * 24)} horas de TV ligada</li>
                      <li>• CO2 evitado = {Math.round(parseFloat(impact.co2Avoided) * 4.5)} km de carro</li>
                      <li>• Água poupada = {Math.round(parseInt(impact.waterSaved) / 8)} banhos de 15 minutos</li>
                    </ul>
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

export default RecyclingCalculator;
