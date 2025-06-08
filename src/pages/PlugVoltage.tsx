
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Zap, MapPin, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const PlugVoltage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    { name: "Brasil", voltage: "127V/220V", frequency: "60Hz", plugTypes: ["A", "B", "C"], flag: "🇧🇷" },
    { name: "Estados Unidos", voltage: "120V", frequency: "60Hz", plugTypes: ["A", "B"], flag: "🇺🇸" },
    { name: "Reino Unido", voltage: "230V", frequency: "50Hz", plugTypes: ["G"], flag: "🇬🇧" },
    { name: "França", voltage: "230V", frequency: "50Hz", plugTypes: ["C", "E"], flag: "🇫🇷" },
    { name: "Alemanha", voltage: "230V", frequency: "50Hz", plugTypes: ["C", "F"], flag: "🇩🇪" },
    { name: "Japão", voltage: "100V", frequency: "50Hz/60Hz", plugTypes: ["A", "B"], flag: "🇯🇵" },
    { name: "Austrália", voltage: "230V", frequency: "50Hz", plugTypes: ["I"], flag: "🇦🇺" },
    { name: "China", voltage: "220V", frequency: "50Hz", plugTypes: ["A", "C", "I"], flag: "🇨🇳" },
    { name: "Argentina", voltage: "220V", frequency: "50Hz", plugTypes: ["C", "I"], flag: "🇦🇷" },
    { name: "Canadá", voltage: "120V", frequency: "60Hz", plugTypes: ["A", "B"], flag: "🇨🇦" },
    { name: "Itália", voltage: "230V", frequency: "50Hz", plugTypes: ["C", "F", "L"], flag: "🇮🇹" },
    { name: "Espanha", voltage: "230V", frequency: "50Hz", plugTypes: ["C", "F"], flag: "🇪🇸" },
  ];

  const plugDescriptions = {
    A: "Dois pinos chatos paralelos",
    B: "Dois pinos chatos paralelos + terra redondo",
    C: "Dois pinos redondos (Europeu)",
    E: "Dois pinos redondos + terra (França/Bélgica)",
    F: "Dois pinos redondos + terra lateral (Alemanha)",
    G: "Três pinos retangulares (Reino Unido)",
    I: "Dois pinos chatos em V + terra (Austrália)",
    L: "Três pinos redondos (Itália)"
  };

  const selectedCountryData = countries.find(c => c.name === selectedCountry);

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
            <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tomadas e Voltagem por País
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Consultar Padrão de Energia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Selecionar País</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCountryData && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Voltagem</h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {selectedCountryData.voltage}
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h3 className="font-semibold text-green-800 dark:text-green-200">Frequência</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {selectedCountryData.frequency}
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h3 className="font-semibold text-purple-800 dark:text-purple-200">Tipos de Tomada</h3>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {selectedCountryData.plugTypes.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Descrição dos Tipos de Tomada
                      </h3>
                      <div className="space-y-2">
                        {selectedCountryData.plugTypes.map((type) => (
                          <div key={type} className="flex items-center gap-3">
                            <span className="font-bold text-yellow-700 dark:text-yellow-300">Tipo {type}:</span>
                            <span className="text-yellow-600 dark:text-yellow-400">
                              {plugDescriptions[type as keyof typeof plugDescriptions]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Todos os Países</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countries.map((country) => (
                  <div key={country.name} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{country.flag}</span>
                      <span className="font-semibold">{country.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Voltagem: {country.voltage}</p>
                      <p>Frequência: {country.frequency}</p>
                      <p>Tomadas: {country.plugTypes.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default PlugVoltage;
