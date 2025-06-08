import { useState } from "react";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateAstrologyChart, AstrologyChart } from "@/services/astrologyService";
import { GeocodingResult } from "@/services/geocodingService";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/useLoading";
import CityAutocomplete from "@/components/CityAutocomplete";
import ChartComponent from "@/components/AstrologyChart";
import AstrologyInterpretation from "@/components/AstrologyInterpretation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Star, Clock, Calendar, AlertCircle, Sparkles } from "lucide-react";

const BirthChart = () => {
  const [birthData, setBirthData] = useState({
    name: "",
    date: "",
    time: "",
    city: ""
  });
  const [unknownTime, setUnknownTime] = useState(false);
  const [coordinates, setCoordinates] = useState<GeocodingResult | null>(null);
  const [chartData, setChartData] = useState<AstrologyChart | null>(null);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const { isLoading, withLoading } = useLoading();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const handleCitySelect = (city: string, coords?: GeocodingResult) => {
    console.log('Cidade selecionada na página:', city, coords);
    setBirthData(prev => ({ ...prev, city }));
    if (coords) {
      setCoordinates(coords);
    }
  };

  const handleUnknownTimeChange = (checked: boolean) => {
    setUnknownTime(checked);
    if (checked) {
      setBirthData(prev => ({ ...prev, time: "12:00" }));
    } else {
      setBirthData(prev => ({ ...prev, time: "" }));
    }
  };

  const generateChart = async () => {
    if (!birthData.name || !birthData.date || !birthData.city) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha pelo menos nome, data e cidade.",
        variant: "destructive"
      });
      return;
    }

    if (!unknownTime && !birthData.time) {
      toast({
        title: "Horário obrigatório",
        description: "Por favor, informe o horário ou marque que não sabe.",
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

    await withLoading(async () => {
      try {
        const timeToUse = unknownTime ? "12:00" : birthData.time;
        const birthDateTime = new Date(`${birthData.date}T${timeToUse}`);
        
        console.log('Gerando mapa astral:', { 
          date: birthDateTime, 
          coords: coordinates, 
          unknownTime 
        });
        
        const chart = calculateAstrologyChart(
          birthDateTime,
          coordinates.lat,
          coordinates.lng
        );
        
        setChartData(chart);
        setShowInterpretation(true);
        
        toast({
          title: "Mapa astral gerado!",
          description: unknownTime 
            ? "Seu mapa foi calculado com horário aproximado (meio-dia)."
            : "Seu mapa astral foi calculado com sucesso.",
        });
        
      } catch (error) {
        console.error('Erro ao gerar mapa astral:', error);
        toast({
          title: "Erro no cálculo",
          description: "Ocorreu um erro ao calcular seu mapa astral. Tente novamente.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gerador de Mapa Astral
          </h1>
          <p className="text-lg text-gray-600">
            Insira seus dados de nascimento para gerar seu mapa astral completo com interpretações detalhadas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800 flex items-center justify-center">
                <Star className="mr-2 h-5 w-5 text-purple-600" />
                Dados de Nascimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="py-8">
                  <LoadingSpinner size="lg" text="Calculando seu mapa astral..." />
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={birthData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700">
                        <Calendar className="mr-2 h-4 w-4" />
                        Data de Nascimento
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={birthData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700">
                        <Clock className="mr-2 h-4 w-4" />
                        Horário
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={birthData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="border-gray-200"
                        disabled={unknownTime}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unknown-time"
                      checked={unknownTime}
                      onCheckedChange={handleUnknownTimeChange}
                    />
                    <Label 
                      htmlFor="unknown-time" 
                      className="text-sm text-gray-700 cursor-pointer flex items-center"
                    >
                      <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                      Não sei meu horário de nascimento
                    </Label>
                  </div>

                  {unknownTime && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-800">
                        <strong>Nota:</strong> Sem o horário exato, o Ascendente, Meio do Céu e as casas 
                        astrológicas podem não estar precisos. O cálculo será feito considerando meio-dia.
                      </p>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Cidade de Nascimento</Label>
                    <CityAutocomplete
                      value={birthData.city}
                      onSelect={handleCitySelect}
                      placeholder="Digite sua cidade de nascimento..."
                    />
                  </div>

                  <Button
                    onClick={generateChart}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!birthData.name || !birthData.date || !birthData.city || (!unknownTime && !birthData.time) || !coordinates || isLoading}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Mapa Astral Completo
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {chartData && (
            <ChartComponent 
              chartData={chartData} 
              birthData={birthData} 
              unknownTime={unknownTime}
            />
          )}
        </div>

        {chartData && showInterpretation && (
          <div className="mb-12">
            <AstrologyInterpretation 
              chartData={chartData} 
              unknownTime={unknownTime}
            />
          </div>
        )}

        <AdSpace position="middle" />
        
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default BirthChart;
