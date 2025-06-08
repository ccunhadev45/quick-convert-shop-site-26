
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BirthChart = () => {
  const [birthData, setBirthData] = useState({
    name: "",
    date: "",
    time: "",
    city: "",
    lat: "",
    lng: ""
  });
  const [chartGenerated, setChartGenerated] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const generateChart = () => {
    if (birthData.name && birthData.date && birthData.time && birthData.city) {
      setChartGenerated(true);
    }
  };

  const mockAstrologicalData = {
    sun: { sign: "Leão", degree: "15°32'", house: "5ª Casa" },
    moon: { sign: "Câncer", degree: "22°18'", house: "4ª Casa" },
    ascendant: { sign: "Virgem", degree: "8°45'" },
    mercury: { sign: "Virgem", degree: "3°12'", house: "6ª Casa" },
    venus: { sign: "Câncer", degree: "28°55'", house: "4ª Casa" },
    mars: { sign: "Gêmeos", degree: "11°33'", house: "3ª Casa" }
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
                  placeholder="Ex: São Paulo, SP"
                  value={birthData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    placeholder="-23.5505"
                    value={birthData.lat}
                    onChange={(e) => handleInputChange("lat", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    placeholder="-46.6333"
                    value={birthData.lng}
                    onChange={(e) => handleInputChange("lng", e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={generateChart}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!birthData.name || !birthData.date || !birthData.time || !birthData.city}
              >
                Gerar Mapa Astral
              </Button>
            </CardContent>
          </Card>

          {chartGenerated && (
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
                        <div>
                          <span className="font-medium">☉ Sol</span>
                          <Badge variant="outline" className="ml-2">
                            {mockAstrologicalData.sun.sign}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <div>{mockAstrologicalData.sun.degree}</div>
                          <div className="text-gray-500">{mockAstrologicalData.sun.house}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <span className="font-medium">☽ Lua</span>
                          <Badge variant="outline" className="ml-2">
                            {mockAstrologicalData.moon.sign}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <div>{mockAstrologicalData.moon.degree}</div>
                          <div className="text-gray-500">{mockAstrologicalData.moon.house}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <span className="font-medium">↑ Ascendente</span>
                          <Badge variant="outline" className="ml-2">
                            {mockAstrologicalData.ascendant.sign}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <div>{mockAstrologicalData.ascendant.degree}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <span className="font-medium">☿ Mercúrio</span>
                          <Badge variant="outline" className="ml-2">
                            {mockAstrologicalData.mercury.sign}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <div>{mockAstrologicalData.mercury.degree}</div>
                          <div className="text-gray-500">{mockAstrologicalData.mercury.house}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Interpretação Resumida</h4>
                    <p className="text-sm text-gray-700">
                      Com Sol em {mockAstrologicalData.sun.sign} e Lua em {mockAstrologicalData.moon.sign}, 
                      você possui uma personalidade criativa e intuitiva. Seu ascendente em {mockAstrologicalData.ascendant.sign} 
                      indica uma abordagem prática e detalhista da vida.
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
