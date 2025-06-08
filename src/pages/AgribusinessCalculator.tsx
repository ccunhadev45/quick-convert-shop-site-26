
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
import { Wheat, Calculator, Sprout, MapPin } from "lucide-react";

const AgribusinessCalculator = () => {
  const [area, setArea] = useState("");
  const [crop, setCrop] = useState("");
  const [plantingSpacing, setPlantingSpacing] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [fertilizerAmount, setFertilizerAmount] = useState("");
  const [result, setResult] = useState<any>(null);

  const crops = [
    { id: "soy", name: "Soja", spacing: "0.5", seedsPerMeter: "12-15", fertilizer: "300-400" },
    { id: "corn", name: "Milho", spacing: "0.8", seedsPerMeter: "5-6", fertilizer: "350-450" },
    { id: "coffee", name: "Café", spacing: "3.5", plantsPerHa: "2857", fertilizer: "500-600" },
    { id: "sugar_cane", name: "Cana-de-açúcar", spacing: "1.5", plantsPerHa: "4444", fertilizer: "400-500" },
    { id: "cotton", name: "Algodão", spacing: "0.9", seedsPerMeter: "8-12", fertilizer: "250-350" }
  ];

  const fertilizers = [
    { id: "npk_10_10_10", name: "NPK 10-10-10", nitrogen: 10, phosphorus: 10, potassium: 10 },
    { id: "npk_20_5_20", name: "NPK 20-05-20", nitrogen: 20, phosphorus: 5, potassium: 20 },
    { id: "urea", name: "Ureia", nitrogen: 45, phosphorus: 0, potassium: 0 },
    { id: "superfosfato", name: "Superfosfato Simples", nitrogen: 0, phosphorus: 18, potassium: 0 }
  ];

  const calculatePlanting = () => {
    if (!area || !crop) return;

    const areaNum = parseFloat(area);
    const selectedCrop = crops.find(c => c.id === crop);
    
    if (!selectedCrop) return;

    const spacingNum = parseFloat(selectedCrop.spacing);
    const plantsPerHa = selectedCrop.plantsPerHa ? 
      parseInt(selectedCrop.plantsPerHa) : 
      Math.floor(10000 / (spacingNum * spacingNum));
    
    const totalPlants = plantsPerHa * areaNum;
    const seedsNeeded = Math.ceil(totalPlants * 1.2); // 20% extra
    
    let fertilizerNeeded = 0;
    if (fertilizerType && fertilizerAmount) {
      fertilizerNeeded = parseFloat(fertilizerAmount) * areaNum;
    } else {
      const [min, max] = selectedCrop.fertilizer.split("-").map(n => parseInt(n));
      fertilizerNeeded = (min + max) / 2 * areaNum;
    }

    setResult({
      area: areaNum,
      crop: selectedCrop.name,
      plantsPerHa,
      totalPlants,
      seedsNeeded,
      fertilizerNeeded: fertilizerNeeded.toFixed(0),
      spacing: spacingNum
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
              <Wheat className="h-8 w-8 text-green-600" />
              Calculadora de Agronegócio
            </CardTitle>
            <p className="text-gray-600">
              Ferramentas para cálculos agrícolas, plantio e fertilização
            </p>
          </CardHeader>
          <CardContent>
            
            <Tabs defaultValue="planting" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="planting">Plantio</TabsTrigger>
                <TabsTrigger value="fertilizer">Fertilização</TabsTrigger>
                <TabsTrigger value="area">Área</TabsTrigger>
              </TabsList>

              <TabsContent value="planting" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Sprout className="h-5 w-5" />
                      Dados do Plantio
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="area">Área (hectares)</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="Ex: 10"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="crop">Cultura</Label>
                        <Select value={crop} onValueChange={setCrop}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione a cultura" />
                          </SelectTrigger>
                          <SelectContent>
                            {crops.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fertilizerType">Fertilizante (Opcional)</Label>
                        <Select value={fertilizerType} onValueChange={setFertilizerType}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione o fertilizante" />
                          </SelectTrigger>
                          <SelectContent>
                            {fertilizers.map((f) => (
                              <SelectItem key={f.id} value={f.id}>
                                {f.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {fertilizerType && (
                        <div>
                          <Label htmlFor="fertilizerAmount">Quantidade por hectare (kg)</Label>
                          <Input
                            id="fertilizerAmount"
                            type="number"
                            placeholder="Ex: 400"
                            value={fertilizerAmount}
                            onChange={(e) => setFertilizerAmount(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}

                      <Button onClick={calculatePlanting} className="w-full" size="lg">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Plantio
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Resultados</h3>
                    
                    {result ? (
                      <div className="space-y-4">
                        <Card className="border-green-200 bg-green-50">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-medium text-green-800">Cultura:</p>
                                <p className="text-green-700">{result.crop}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Área Total:</p>
                                <p className="text-green-700">{result.area} hectares</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Plantas por Hectare:</p>
                                <p className="text-green-700 text-lg font-semibold">{result.plantsPerHa.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Total de Plantas:</p>
                                <p className="text-green-700 text-lg font-semibold">{result.totalPlants.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Sementes Necessárias:</p>
                                <p className="text-green-700 text-lg font-semibold">{result.seedsNeeded.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="font-medium text-green-800">Fertilizante Total:</p>
                                <p className="text-green-700 text-lg font-semibold">{result.fertilizerNeeded} kg</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Wheat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Preencha os dados para calcular o plantio</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fertilizer" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fertilizers.map((fert) => (
                    <Card key={fert.id} className="border-gray-200">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{fert.name}</h4>
                        <div className="space-y-1 text-sm">
                          <p>Nitrogênio: {fert.nitrogen}%</p>
                          <p>Fósforo: {fert.phosphorus}%</p>
                          <p>Potássio: {fert.potassium}%</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="area" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {crops.map((crop) => (
                    <Card key={crop.id} className="border-gray-200">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{crop.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Espaçamento: {crop.spacing}m</p>
                          <p>Sementes/metro: {crop.seedsPerMeter}</p>
                          <p>Fertilizante: {crop.fertilizer} kg/ha</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

export default AgribusinessCalculator;
