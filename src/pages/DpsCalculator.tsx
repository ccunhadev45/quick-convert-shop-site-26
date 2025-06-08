
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const DpsCalculator = () => {
  const [damage, setDamage] = useState("");
  const [attackSpeed, setAttackSpeed] = useState("");
  const [critChance, setCritChance] = useState("");
  const [critMultiplier, setCritMultiplier] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateDps = () => {
    if (!damage || !attackSpeed) return;
    
    const baseDamage = parseFloat(damage);
    const speed = parseFloat(attackSpeed);
    const critRate = parseFloat(critChance) / 100 || 0;
    const critMult = parseFloat(critMultiplier) || 2;
    
    const avgDamage = baseDamage * (1 - critRate) + (baseDamage * critMult * critRate);
    const dps = avgDamage * speed;
    
    setResult({
      baseDps: (baseDamage * speed).toFixed(2),
      avgDamage: avgDamage.toFixed(2),
      dps: dps.toFixed(2),
      dpm: (dps * 60).toFixed(0)
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
            <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de DPS
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Calcular Damage Per Second
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Dano Base</label>
                  <Input
                    type="number"
                    value={damage}
                    onChange={(e) => setDamage(e.target.value)}
                    placeholder="Ex: 100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Velocidade de Ataque (ataques/seg)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={attackSpeed}
                    onChange={(e) => setAttackSpeed(e.target.value)}
                    placeholder="Ex: 1.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Chance Crítica (%)</label>
                  <Input
                    type="number"
                    value={critChance}
                    onChange={(e) => setCritChance(e.target.value)}
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Multiplicador Crítico</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={critMultiplier}
                    onChange={(e) => setCritMultiplier(e.target.value)}
                    placeholder="Ex: 2.0"
                  />
                </div>
              </div>

              <Button onClick={calculateDps} className="w-full" size="lg">
                Calcular DPS
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">DPS Base (sem crítico)</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.baseDps}</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">DPS com Crítico</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.dps}</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dano Médio por Ataque</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.avgDamage}</p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dano por Minuto</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.dpm}</p>
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

export default DpsCalculator;
