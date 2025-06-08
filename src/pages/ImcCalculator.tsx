
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";

const ImcCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imc, setImc] = useState<number | null>(null);

  useEffect(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters
    
    if (weightNum > 0 && heightNum > 0) {
      const imcResult = weightNum / (heightNum * heightNum);
      setImc(imcResult);
    } else {
      setImc(null);
    }
  }, [weight, height]);

  const getImcCategory = (imc: number) => {
    if (imc < 18.5) return { category: "Abaixo do peso", color: "text-blue-600" };
    if (imc < 25) return { category: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { category: "Sobrepeso", color: "text-yellow-600" };
    if (imc < 35) return { category: "Obesidade grau I", color: "text-orange-600" };
    if (imc < 40) return { category: "Obesidade grau II", color: "text-red-600" };
    return { category: "Obesidade grau III", color: "text-red-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de IMC
              </CardTitle>
              <p className="text-gray-600">
                Calcule seu Índice de Massa Corporal
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              {imc && (
                <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Seu IMC</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {imc.toFixed(1)}
                  </div>
                  <div className={`text-lg font-semibold ${getImcCategory(imc).color}`}>
                    {getImcCategory(imc).category}
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <h4 className="font-semibold text-gray-800">Categorias do IMC:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>Abaixo do peso: {`<`} 18,5</div>
                  <div>Peso normal: 18,5 - 24,9</div>
                  <div>Sobrepeso: 25,0 - 29,9</div>
                  <div>Obesidade I: 30,0 - 34,9</div>
                  <div>Obesidade II: 35,0 - 39,9</div>
                  <div>Obesidade III: {`≥`} 40,0</div>
                </div>
              </div>
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

export default ImcCalculator;
