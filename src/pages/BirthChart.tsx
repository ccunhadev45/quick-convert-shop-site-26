
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateAstrologyChart, AstrologyChart } from "@/services/astrologyService";
import { GeocodingResult } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";
import CityAutocomplete from "@/components/CityAutocomplete";
import ChartComponent from "@/components/AstrologyChart";

const BirthChart = () => {
  const [birthData, setBirthData] = useState({
    name: "",
    date: "",
    time: "",
    city: ""
  });
  const [coordinates, setCoordinates] = useState<GeocodingResult | null>(null);
  const [chartData, setChartData] = useState<AstrologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const handleCitySelect = (city: string, coords?: GeocodingResult) => {
    setBirthData(prev => ({ ...prev, city }));
    if (coords) {
      setCoordinates(coords);
    }
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

    if (!coordinates) {
      toast({
        title: "Localização não encontrada",
        description: "Por favor, selecione uma cidade da lista de sugestões.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Criar objeto Date com data e hora de nascimento
      const birthDateTime = new Date(`${birthData.date}T${birthData.time}`);
      
      // Calcular mapa astral
      const chart = calculateAstrologyChart(
        birthDateTime,
        coordinates.lat,
        coordinates.lng
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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para início
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerador de Mapa Astral
          </h1>
          <p className="text-muted-foreground">
            Insira seus dados de nascimento para gerar seu mapa astral completo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-card-foreground">
                <Star className="mr-2 h-5 w-5 text-purple-600" />
                Dados de Nascimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={birthData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center text-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={birthData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="border-input bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center text-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    Horário
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={birthData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="border-input bg-background"
                  />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Cidade de Nascimento</Label>
                <CityAutocomplete
                  value={birthData.city}
                  onSelect={handleCitySelect}
                  placeholder="Digite sua cidade de nascimento..."
                />
              </div>

              <Button
                onClick={generateChart}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!birthData.name || !birthData.date || !birthData.time || !birthData.city || !coordinates || isLoading}
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
            <ChartComponent chartData={chartData} birthData={birthData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthChart;
