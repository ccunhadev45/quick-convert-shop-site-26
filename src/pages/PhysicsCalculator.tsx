import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const PhysicsCalculator = () => {
  // Force calculations
  const [mass, setMass] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [force, setForce] = useState("");

  // Energy calculations
  const [energyMass, setEnergyMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [kineticEnergy, setKineticEnergy] = useState("");

  // Motion calculations
  const [initialVelocity, setInitialVelocity] = useState("");
  const [motionAcceleration, setMotionAcceleration] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");

  const { addRecord } = useConversionHistory();

  const calculateForce = () => {
    if (mass && acceleration) {
      const result = parseFloat(mass) * parseFloat(acceleration);
      setForce(result.toString());
      addRecord({
        type: 'calculation',
        category: 'Física',
        title: 'Força (F = m × a)',
        input: `${mass} kg × ${acceleration} m/s²`,
        output: `${result} N`
      });
      toast({
        title: "Força calculada!",
        description: `F = ${result} N`
      });
    }
  };

  const calculateKineticEnergy = () => {
    if (energyMass && velocity) {
      const result = 0.5 * parseFloat(energyMass) * Math.pow(parseFloat(velocity), 2);
      setKineticEnergy(result.toString());
      addRecord({
        type: 'calculation',
        category: 'Física',
        title: 'Energia Cinética (E = ½mv²)',
        input: `m: ${energyMass} kg, v: ${velocity} m/s`,
        output: `${result} J`
      });
      toast({
        title: "Energia cinética calculada!",
        description: `E = ${result} J`
      });
    }
  };

  const calculateDistance = () => {
    if (initialVelocity && motionAcceleration && time) {
      const result = parseFloat(initialVelocity) * parseFloat(time) + 
                    0.5 * parseFloat(motionAcceleration) * Math.pow(parseFloat(time), 2);
      setDistance(result.toString());
      addRecord({
        type: 'calculation',
        category: 'Física',
        title: 'Distância (s = v₀t + ½at²)',
        input: `v₀: ${initialVelocity} m/s, a: ${motionAcceleration} m/s², t: ${time} s`,
        output: `${result} m`
      });
      toast({
        title: "Distância calculada!",
        description: `s = ${result} m`
      });
    }
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
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Física
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="force" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="force">Força</TabsTrigger>
              <TabsTrigger value="energy">Energia</TabsTrigger>
              <TabsTrigger value="motion">Movimento</TabsTrigger>
            </TabsList>

            <TabsContent value="force">
              <Card>
                <CardHeader>
                  <CardTitle>Cálculo de Força (F = m × a)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mass">Massa (kg)</Label>
                    <Input
                      id="mass"
                      type="number"
                      value={mass}
                      onChange={(e) => setMass(e.target.value)}
                      placeholder="Digite a massa em kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="acceleration">Aceleração (m/s²)</Label>
                    <Input
                      id="acceleration"
                      type="number"
                      value={acceleration}
                      onChange={(e) => setAcceleration(e.target.value)}
                      placeholder="Digite a aceleração em m/s²"
                    />
                  </div>
                  <Button onClick={calculateForce} className="w-full">
                    Calcular Força
                  </Button>
                  {force && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        Força: {force} N (Newtons)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="energy">
              <Card>
                <CardHeader>
                  <CardTitle>Energia Cinética (E = ½mv²)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="energyMass">Massa (kg)</Label>
                    <Input
                      id="energyMass"
                      type="number"
                      value={energyMass}
                      onChange={(e) => setEnergyMass(e.target.value)}
                      placeholder="Digite a massa em kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="velocity">Velocidade (m/s)</Label>
                    <Input
                      id="velocity"
                      type="number"
                      value={velocity}
                      onChange={(e) => setVelocity(e.target.value)}
                      placeholder="Digite a velocidade em m/s"
                    />
                  </div>
                  <Button onClick={calculateKineticEnergy} className="w-full">
                    Calcular Energia Cinética
                  </Button>
                  {kineticEnergy && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        Energia Cinética: {kineticEnergy} J (Joules)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="motion">
              <Card>
                <CardHeader>
                  <CardTitle>Movimento Uniformemente Variado (s = v₀t + ½at²)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="initialVelocity">Velocidade Inicial (m/s)</Label>
                    <Input
                      id="initialVelocity"
                      type="number"
                      value={initialVelocity}
                      onChange={(e) => setInitialVelocity(e.target.value)}
                      placeholder="Digite a velocidade inicial"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motionAcceleration">Aceleração (m/s²)</Label>
                    <Input
                      id="motionAcceleration"
                      type="number"
                      value={motionAcceleration}
                      onChange={(e) => setMotionAcceleration(e.target.value)}
                      placeholder="Digite a aceleração"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Tempo (s)</Label>
                    <Input
                      id="time"
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Digite o tempo em segundos"
                    />
                  </div>
                  <Button onClick={calculateDistance} className="w-full">
                    Calcular Distância
                  </Button>
                  {distance && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        Distância: {distance} m (metros)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default PhysicsCalculator;
