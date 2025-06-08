import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Rocket, Clock, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AstronomicalDistance = () => {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const celestialBodies = {
    earth: { name: "Terra", avgDistance: 0, icon: "🌍", color: "text-blue-600" },
    moon: { name: "Lua", avgDistance: 384400, icon: "🌙", color: "text-gray-400" },
    mars: { name: "Marte", avgDistance: 225000000, icon: "🔴", color: "text-red-600" },
    venus: { name: "Vênus", avgDistance: 108000000, icon: "💛", color: "text-yellow-500" },
    jupiter: { name: "Júpiter", avgDistance: 778000000, icon: "🟠", color: "text-orange-600" },
    saturn: { name: "Saturno", avgDistance: 1400000000, icon: "🪐", color: "text-yellow-700" },
    sun: { name: "Sol", avgDistance: 150000000, icon: "☀️", color: "text-yellow-400" },
    mercury: { name: "Mercúrio", avgDistance: 77000000, icon: "⚫", color: "text-gray-600" },
    uranus: { name: "Urano", avgDistance: 2900000000, icon: "🔵", color: "text-cyan-500" },
    neptune: { name: "Netuno", avgDistance: 4500000000, icon: "🔷", color: "text-blue-800" }
  };

  const spacecraftSpeeds = {
    apollo: { name: "Apollo 11", speed: 11000, description: "Velocidade máxima das missões Apollo" },
    voyager: { name: "Voyager 1", speed: 17000, description: "Sonda mais rápida já lançada" },
    newHorizons: { name: "New Horizons", speed: 16260, description: "Missão para Plutão" },
    parker: { name: "Parker Solar Probe", speed: 200000, description: "Sonda solar mais rápida (no periélio)" }
  };

  const calculateDistance = async () => {
    if (!selectedOrigin || !selectedDestination) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione origem e destino.",
        variant: "destructive"
      });
      return;
    }

    if (selectedOrigin === selectedDestination) {
      toast({
        title: "Mesma localização",
        description: "Origem e destino não podem ser iguais.",
        variant: "destructive"
      });
      return;
    }

    setIsAnimating(true);
    setShowSuccess(false);
    setCalculated(false);

    // Animação do foguete (3 segundos)
    setTimeout(() => {
      setIsAnimating(false);
      setCalculated(true);
      setShowSuccess(true);
      
      const destName = celestialBodies[selectedDestination as keyof typeof celestialBodies].name;
      toast({
        title: "🚀 Viagem Concluída!",
        description: `Você chegou com sucesso em ${destName}!`,
      });

      // Remove mensagem de sucesso após 3 segundos
      setTimeout(() => setShowSuccess(false), 3000);
    }, 3000);
  };

  const getDistance = () => {
    const origin = celestialBodies[selectedOrigin as keyof typeof celestialBodies];
    const destination = celestialBodies[selectedDestination as keyof typeof celestialBodies];
    return Math.abs(destination.avgDistance - origin.avgDistance);
  };

  const formatDistance = (km: number) => {
    if (km >= 1000000) {
      return `${(km / 1000000).toFixed(1)} milhões de km`;
    } else if (km >= 1000) {
      return `${(km / 1000).toFixed(0)} mil km`;
    }
    return `${km.toLocaleString()} km`;
  };

  const calculateTravelTime = (distance: number, speed: number) => {
    const timeInHours = distance / speed;
    const days = Math.floor(timeInHours / 24);
    const years = Math.floor(days / 365);
    
    if (years > 0) {
      return `${years} anos e ${days % 365} dias`;
    } else if (days > 0) {
      return `${days} dias`;
    } else {
      return `${Math.round(timeInHours)} horas`;
    }
  };

  const distance = calculated ? getDistance() : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Distância Astronômica
          </h1>
          <p className="text-lg text-gray-600">
            Calcule distâncias entre corpos celestes e tempo de viagem com tecnologia atual
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800 flex items-center justify-center">
                <Globe className="mr-2 h-5 w-5 text-cyan-600" />
                Selecionar Corpos Celestes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-700 mb-3 block">Origem</Label>
                <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a origem da viagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(celestialBodies).map(([key, body]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{body.icon}</span>
                          <span className={`font-medium ${body.color}`}>{body.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Animação do foguete */}
              {(selectedOrigin && selectedDestination) && (
                <div className="relative py-8">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-3xl mb-2">
                        {celestialBodies[selectedOrigin as keyof typeof celestialBodies]?.icon}
                      </div>
                      <span className="text-sm text-gray-600">
                        {celestialBodies[selectedOrigin as keyof typeof celestialBodies]?.name}
                      </span>
                    </div>
                    
                    <div className="flex-1 relative mx-4">
                      <div className="h-0.5 bg-gray-300 w-full"></div>
                      {isAnimating && (
                        <div className="absolute top-1/2 transform -translate-y-1/2 animate-[slide-in-right_3s_ease-in-out]">
                          <Rocket className="h-6 w-6 text-blue-600 animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl mb-2">
                        {celestialBodies[selectedDestination as keyof typeof celestialBodies]?.icon}
                      </div>
                      <span className="text-sm text-gray-600">
                        {celestialBodies[selectedDestination as keyof typeof celestialBodies]?.name}
                      </span>
                    </div>
                  </div>
                  
                  {showSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-100 border border-green-300 rounded-lg p-4 animate-fade-in">
                        <div className="flex items-center space-x-2 text-green-800">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Chegou ao destino!</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label className="text-base font-medium text-gray-700 mb-3 block">Destino</Label>
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o destino da viagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(celestialBodies).map(([key, body]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{body.icon}</span>
                          <span className={`font-medium ${body.color}`}>{body.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateDistance}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                disabled={!selectedOrigin || !selectedDestination || selectedOrigin === selectedDestination || isAnimating}
              >
                {isAnimating ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    Viajando pelo espaço...
                  </>
                ) : (
                  "Iniciar Viagem Espacial"
                )}
              </Button>
            </CardContent>
          </Card>

          {calculated && (
            <Card className="border border-gray-200 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">Resultados da Viagem</CardTitle>
                <p className="text-sm text-gray-600 text-center">
                  De {celestialBodies[selectedOrigin as keyof typeof celestialBodies].name} para{" "}
                  {celestialBodies[selectedDestination as keyof typeof celestialBodies].name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <div className="flex items-center mb-2">
                      <Globe className="mr-2 h-5 w-5 text-cyan-600" />
                      <span className="font-medium text-gray-800">Distância</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-800">
                      {formatDistance(distance)}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
                      <Rocket className="mr-2 h-5 w-5" />
                      Tempo de Viagem por Tecnologia
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(spacecraftSpeeds).map(([key, spacecraft]) => (
                        <div key={key} className="p-3 border border-gray-200 rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-800">{spacecraft.name}</span>
                            <Badge variant="outline" className="bg-gray-100">
                              {spacecraft.speed.toLocaleString()} km/h
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {spacecraft.description}
                          </div>
                          <div className="flex items-center text-lg font-semibold text-blue-600">
                            <Clock className="mr-2 h-4 w-4" />
                            {calculateTravelTime(distance, spacecraft.speed)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium mb-2 text-gray-800">💡 Curiosidade</h4>
                    <p className="text-sm text-gray-600">
                      A luz viajaria essa distância em aproximadamente{" "}
                      <strong>{Math.round(distance / 299792458 / 60)} minutos</strong>!
                      Para comparação, a luz do Sol leva cerca de 8 minutos para chegar à Terra.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <AdSpace position="middle" />
        
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default AstronomicalDistance;
