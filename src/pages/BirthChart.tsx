
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { geocodeCity } from "@/services/geocodingService";
import { calculateAstrologyChart, AstrologyChart } from "@/services/astrologyService";
import { useToast } from "@/hooks/use-toast";

const BirthChart = () => {
  const [birthData, setBirthData] = useState({
    name: "",
    date: "",
    time: "",
    city: ""
  });
  const [chartData, setChartData] = useState<AstrologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const generateChart = async () => {
    if (!birthData.name || !birthData.date || !birthData.time || !birthData.city) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Geocodificar a cidade
      const locationData = await geocodeCity(birthData.city);
      
      if (!locationData) {
        toast({
          title: "Cidade não encontrada",
          description: "Não foi possível encontrar as coordenadas da cidade informada.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Criar objeto Date com data e hora de nascimento
      const birthDateTime = new Date(`${birthData.date}T${birthData.time}`);
      
      // Calcular mapa astral
      const chart = calculateAstrologyChart(
        birthDateTime,
        locationData.lat,
        locationData.lng
      );
      
      setChartData(chart);
      
      toast({
        title: "Mapa astral gerado!",
        description: "Seu mapa astral foi calculado com sucesso.",
      });
      
    } catch (error) {
      console.error('Erro ao gerar mapa astral:', error);
      toast({
        title: "Erro no cálculo",
        description: "Ocorreu um erro ao calcular seu mapa astral. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerador de Mapa Astral
          </h1>
          <p className="text-gray-600">
            Insira seus dados de nascimento para gerar seu mapa astral completo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-purple-600" />
                Dados de Nascimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={birthData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={birthData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Horário
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={birthData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Cidade de Nascimento
                </Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo, SP ou New York, USA"
                  value={birthData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  A latitude e longitude serão calculadas automaticamente
                </p>
              </div>

              <Button
                onClick={generateChart}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!birthData.name || !birthData.date || !birthData.time || !birthData.city || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  "Gerar Mapa Astral"
                )}
              </Button>
            </CardContent>
          </Card>

          {chartData && (
            <Card>
              <CardHeader>
                <CardTitle>Seu Mapa Astral - {birthData.name}</CardTitle>
                <p className="text-sm text-gray-600">
                  {new Date(birthData.date).toLocaleDateString('pt-BR')} às {birthData.time} - {birthData.city}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Posições Planetárias</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">☉</span>
                          <div>
                            <span className="font-medium">Sol</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.sun.symbol}</span>
                              <Badge variant="outline">
                                {chartData.sun.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.sun.degree.toFixed(0)}°</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">☽</span>
                          <div>
                            <span className="font-medium">Lua</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.moon.symbol}</span>
                              <Badge variant="outline">
                                {chartData.moon.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.moon.degree.toFixed(0)}°</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">↑</span>
                          <div>
                            <span className="font-medium">Ascendente</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.ascendant.symbol}</span>
                              <Badge variant="outline">
                                {chartData.ascendant.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.ascendant.degree.toFixed(0)}°</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">☿</span>
                          <div>
                            <span className="font-medium">Mercúrio</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.mercury.symbol}</span>
                              <Badge variant="outline">
                                {chartData.mercury.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.mercury.degree.toFixed(0)}°</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">♀</span>
                          <div>
                            <span className="font-medium">Vênus</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.venus.symbol}</span>
                              <Badge variant="outline">
                                {chartData.venus.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.venus.degree.toFixed(0)}°</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">♂</span>
                          <div>
                            <span className="font-medium">Marte</span>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{chartData.mars.symbol}</span>
                              <Badge variant="outline">
                                {chartData.mars.sign}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{chartData.mars.degree.toFixed(0)}°</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <span className="text-lg mr-2">{chartData.sun.symbol}</span>
                      Seu Signo Solar
                    </h4>
                    <p className="text-sm text-gray-700">
                      Você é do signo de <strong>{chartData.sun.sign}</strong>. 
                      Com Sol em {chartData.sun.sign} e Lua em {chartData.moon.sign}, 
                      você possui características únicas que influenciam sua personalidade. 
                      Seu ascendente em {chartData.ascendant.sign} mostra como você se apresenta ao mundo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthChart;
