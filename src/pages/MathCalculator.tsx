
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const MathCalculator = () => {
  // Circle calculations
  const [radius, setRadius] = useState("");
  const [circleArea, setCircleArea] = useState("");
  const [circumference, setCircumference] = useState("");

  // Triangle calculations
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [triangleArea, setTriangleArea] = useState("");

  // Trigonometry
  const [angle, setAngle] = useState("");
  const [sine, setSine] = useState("");
  const [cosine, setCosine] = useState("");
  const [tangent, setTangent] = useState("");

  const { addRecord } = useConversionHistory();

  const calculateCircle = () => {
    if (radius) {
      const r = parseFloat(radius);
      const area = Math.PI * r * r;
      const circ = 2 * Math.PI * r;
      
      setCircleArea(area.toFixed(4));
      setCircumference(circ.toFixed(4));
      
      addRecord({
        type: 'calculation',
        category: 'Matemática',
        title: 'Círculo (A = πr², C = 2πr)',
        input: `r = ${radius}`,
        output: `Área: ${area.toFixed(4)}, Circunferência: ${circ.toFixed(4)}`
      });
      
      toast({
        title: "Círculo calculado!",
        description: `Área: ${area.toFixed(4)}, Circunferência: ${circ.toFixed(4)}`
      });
    }
  };

  const calculateTriangle = () => {
    if (sideA && sideB && sideC) {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);
      
      // Heron's formula
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      
      if (!isNaN(area)) {
        setTriangleArea(area.toFixed(4));
        addRecord({
          type: 'calculation',
          category: 'Matemática',
          title: 'Triângulo (Fórmula de Heron)',
          input: `a: ${a}, b: ${b}, c: ${c}`,
          output: `Área: ${area.toFixed(4)}`
        });
        toast({
          title: "Triângulo calculado!",
          description: `Área: ${area.toFixed(4)}`
        });
      } else {
        toast({
          title: "Erro",
          description: "Lados inválidos para formar um triângulo",
          variant: "destructive"
        });
      }
    }
  };

  const calculateTrigonometry = () => {
    if (angle) {
      const angleRad = (parseFloat(angle) * Math.PI) / 180;
      const sin = Math.sin(angleRad);
      const cos = Math.cos(angleRad);
      const tan = Math.tan(angleRad);
      
      setSine(sin.toFixed(6));
      setCosine(cos.toFixed(6));
      setTangent(tan.toFixed(6));
      
      addRecord({
        type: 'calculation',
        category: 'Matemática',
        title: 'Trigonometria',
        input: `${angle}°`,
        output: `sen: ${sin.toFixed(6)}, cos: ${cos.toFixed(6)}, tan: ${tan.toFixed(6)}`
      });
      
      toast({
        title: "Trigonometria calculada!",
        description: `sen: ${sin.toFixed(4)}, cos: ${cos.toFixed(4)}, tan: ${tan.toFixed(4)}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora Matemática
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="circle" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="circle">Círculo</TabsTrigger>
              <TabsTrigger value="triangle">Triângulo</TabsTrigger>
              <TabsTrigger value="trigonometry">Trigonometria</TabsTrigger>
            </TabsList>

            <TabsContent value="circle">
              <Card>
                <CardHeader>
                  <CardTitle>Cálculos do Círculo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="radius">Raio</Label>
                    <Input
                      id="radius"
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      placeholder="Digite o raio"
                    />
                  </div>
                  <Button onClick={calculateCircle} className="w-full">
                    Calcular
                  </Button>
                  {circleArea && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Área: {circleArea} unidades²
                      </p>
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Circunferência: {circumference} unidades
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="triangle">
              <Card>
                <CardHeader>
                  <CardTitle>Área do Triângulo (Fórmula de Heron)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sideA">Lado A</Label>
                    <Input
                      id="sideA"
                      type="number"
                      value={sideA}
                      onChange={(e) => setSideA(e.target.value)}
                      placeholder="Digite o lado A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideB">Lado B</Label>
                    <Input
                      id="sideB"
                      type="number"
                      value={sideB}
                      onChange={(e) => setSideB(e.target.value)}
                      placeholder="Digite o lado B"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideC">Lado C</Label>
                    <Input
                      id="sideC"
                      type="number"
                      value={sideC}
                      onChange={(e) => setSideC(e.target.value)}
                      placeholder="Digite o lado C"
                    />
                  </div>
                  <Button onClick={calculateTriangle} className="w-full">
                    Calcular Área
                  </Button>
                  {triangleArea && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Área: {triangleArea} unidades²
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trigonometry">
              <Card>
                <CardHeader>
                  <CardTitle>Funções Trigonométricas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="angle">Ângulo (graus)</Label>
                    <Input
                      id="angle"
                      type="number"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      placeholder="Digite o ângulo em graus"
                    />
                  </div>
                  <Button onClick={calculateTrigonometry} className="w-full">
                    Calcular
                  </Button>
                  {sine && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Seno: {sine}
                      </p>
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Cosseno: {cosine}
                      </p>
                      <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Tangente: {tangent}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MathCalculator;
