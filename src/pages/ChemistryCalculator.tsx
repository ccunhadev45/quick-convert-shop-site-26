import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FlaskRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const ChemistryCalculator = () => {
  // Molarity calculations
  const [moles, setMoles] = useState("");
  const [volume, setVolume] = useState("");
  const [molarity, setMolarity] = useState("");

  // pH calculations
  const [hConcentration, setHConcentration] = useState("");
  const [ph, setPh] = useState("");

  // Molar mass calculations
  const [mass, setMass] = useState("");
  const [molesForMass, setMolesForMass] = useState("");
  const [molarMass, setMolarMass] = useState("");

  const { addRecord } = useConversionHistory();

  const calculateMolarity = () => {
    if (moles && volume) {
      const result = parseFloat(moles) / parseFloat(volume);
      setMolarity(result.toFixed(4));
      addRecord({
        type: 'calculation',
        category: 'Química',
        title: 'Molaridade (M = n/V)',
        input: `${moles} mol / ${volume} L`,
        output: `${result.toFixed(4)} M`
      });
      toast({
        title: "Molaridade calculada!",
        description: `M = ${result.toFixed(4)} mol/L`
      });
    }
  };

  const calculatePH = () => {
    if (hConcentration) {
      const concentration = parseFloat(hConcentration);
      if (concentration > 0) {
        const result = -Math.log10(concentration);
        setPh(result.toFixed(2));
        addRecord({
          type: 'calculation',
          category: 'Química',
          title: 'pH = -log[H+]',
          input: `[H+] = ${hConcentration} M`,
          output: `pH = ${result.toFixed(2)}`
        });
        toast({
          title: "pH calculado!",
          description: `pH = ${result.toFixed(2)}`
        });
      }
    }
  };

  const calculateMolarMass = () => {
    if (mass && molesForMass) {
      const result = parseFloat(mass) / parseFloat(molesForMass);
      setMolarMass(result.toFixed(2));
      addRecord({
        type: 'calculation',
        category: 'Química',
        title: 'Massa Molar (MM = m/n)',
        input: `${mass} g / ${molesForMass} mol`,
        output: `${result.toFixed(2)} g/mol`
      });
      toast({
        title: "Massa molar calculada!",
        description: `MM = ${result.toFixed(2)} g/mol`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <FlaskRound className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Química
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="molarity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="molarity">Molaridade</TabsTrigger>
              <TabsTrigger value="ph">pH</TabsTrigger>
              <TabsTrigger value="molar">Massa Molar</TabsTrigger>
            </TabsList>

            <TabsContent value="molarity">
              <Card>
                <CardHeader>
                  <CardTitle>Cálculo de Molaridade (M = n/V)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="moles">Número de Mols (mol)</Label>
                    <Input
                      id="moles"
                      type="number"
                      value={moles}
                      onChange={(e) => setMoles(e.target.value)}
                      placeholder="Digite o número de mols"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volume">Volume da Solução (L)</Label>
                    <Input
                      id="volume"
                      type="number"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="Digite o volume em litros"
                    />
                  </div>
                  <Button onClick={calculateMolarity} className="w-full">
                    Calcular Molaridade
                  </Button>
                  {molarity && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Molaridade: {molarity} M (mol/L)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ph">
              <Card>
                <CardHeader>
                  <CardTitle>Cálculo de pH (pH = -log[H⁺])</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hConcentration">Concentração de H⁺ (M)</Label>
                    <Input
                      id="hConcentration"
                      type="number"
                      value={hConcentration}
                      onChange={(e) => setHConcentration(e.target.value)}
                      placeholder="Digite a concentração de H+"
                      step="0.0001"
                    />
                  </div>
                  <Button onClick={calculatePH} className="w-full">
                    Calcular pH
                  </Button>
                  {ph && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                        pH: {ph}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-2">
                        {parseFloat(ph) < 7 ? "Solução ácida" : 
                         parseFloat(ph) > 7 ? "Solução básica" : "Solução neutra"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="molar">
              <Card>
                <CardHeader>
                  <CardTitle>Massa Molar (MM = m/n)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mass">Massa (g)</Label>
                    <Input
                      id="mass"
                      type="number"
                      value={mass}
                      onChange={(e) => setMass(e.target.value)}
                      placeholder="Digite a massa em gramas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="molesForMass">Número de Mols (mol)</Label>
                    <Input
                      id="molesForMass"
                      type="number"
                      value={molesForMass}
                      onChange={(e) => setMolesForMass(e.target.value)}
                      placeholder="Digite o número de mols"
                    />
                  </div>
                  <Button onClick={calculateMolarMass} className="w-full">
                    Calcular Massa Molar
                  </Button>
                  {molarMass && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Massa Molar: {molarMass} g/mol
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

export default ChemistryCalculator;
