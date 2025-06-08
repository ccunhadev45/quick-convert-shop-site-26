
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Luggage, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const LuggageCalculator = () => {
  const [airline, setAirline] = useState("");
  const [classType, setClassType] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [result, setResult] = useState<any>(null);

  const airlines = [
    {
      name: "LATAM",
      limits: {
        economy: { weight: 23, dimensions: [158] },
        business: { weight: 32, dimensions: [158] },
        first: { weight: 32, dimensions: [158] }
      }
    },
    {
      name: "Gol",
      limits: {
        economy: { weight: 23, dimensions: [158] },
        business: { weight: 32, dimensions: [158] }
      }
    },
    {
      name: "Azul",
      limits: {
        economy: { weight: 23, dimensions: [158] },
        business: { weight: 32, dimensions: [158] }
      }
    }
  ];

  const calculateLuggage = () => {
    if (!airline || !classType || !weight) return;
    
    const selectedAirline = airlines.find(a => a.name === airline);
    if (!selectedAirline) return;
    
    const limits = selectedAirline.limits[classType as keyof typeof selectedAirline.limits];
    if (!limits) return;
    
    const currentWeight = parseFloat(weight);
    const totalDimensions = Object.values(dimensions).reduce((sum, dim) => sum + parseFloat(dim || "0"), 0);
    
    const weightStatus = currentWeight <= limits.weight ? "OK" : "EXCESSO";
    const dimensionStatus = totalDimensions <= limits.dimensions[0] ? "OK" : "EXCESSO";
    
    setResult({
      weightLimit: limits.weight,
      currentWeight,
      weightExcess: Math.max(0, currentWeight - limits.weight),
      weightStatus,
      dimensionLimit: limits.dimensions[0],
      currentDimensions: totalDimensions,
      dimensionExcess: Math.max(0, totalDimensions - limits.dimensions[0]),
      dimensionStatus,
      overall: weightStatus === "OK" && dimensionStatus === "OK" ? "APROVADA" : "REJEITA"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Luggage className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Bagagem
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Verificar Limites de Bagagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Companhia Aérea</label>
                  <Select value={airline} onValueChange={setAirline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {airlines.map((airline) => (
                        <SelectItem key={airline.name} value={airline.name}>
                          {airline.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Classe</label>
                  <Select value={classType} onValueChange={setClassType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Econômica</SelectItem>
                      <SelectItem value="business">Executiva</SelectItem>
                      <SelectItem value="first">Primeira Classe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Peso da Bagagem (kg)</label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex: 20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dimensões (cm)</label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                    placeholder="Comprimento"
                  />
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                    placeholder="Largura"
                  />
                  <Input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="Altura"
                  />
                </div>
              </div>

              <Button onClick={calculateLuggage} className="w-full" size="lg">
                Verificar Bagagem
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.overall === "APROVADA" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className={`h-5 w-5 ${result.overall === "APROVADA" ? "text-green-600" : "text-red-600"}`} />
                      <span className={`font-bold ${result.overall === "APROVADA" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                        Bagagem {result.overall}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${result.weightStatus === "OK" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                      <h3 className="font-semibold mb-2">Peso</h3>
                      <p>Atual: {result.currentWeight}kg</p>
                      <p>Limite: {result.weightLimit}kg</p>
                      {result.weightExcess > 0 && (
                        <p className="text-red-600 dark:text-red-400">Excesso: {result.weightExcess}kg</p>
                      )}
                    </div>

                    <div className={`p-4 rounded-lg ${result.dimensionStatus === "OK" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                      <h3 className="font-semibold mb-2">Dimensões</h3>
                      <p>Atual: {result.currentDimensions}cm</p>
                      <p>Limite: {result.dimensionLimit}cm</p>
                      {result.dimensionExcess > 0 && (
                        <p className="text-red-600 dark:text-red-400">Excesso: {result.dimensionExcess}cm</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default LuggageCalculator;
