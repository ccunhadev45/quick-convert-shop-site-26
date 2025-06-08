
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const TimezoneConverter = () => {
  const [time, setTime] = useState("");
  const [fromTimezone, setFromTimezone] = useState("");
  const [toTimezone, setToTimezone] = useState("");
  const [convertedTime, setConvertedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const timezones = [
    { id: "America/Sao_Paulo", name: "Brasil (Brasília)", offset: -3 },
    { id: "America/New_York", name: "EUA (Nova York)", offset: -5 },
    { id: "America/Los_Angeles", name: "EUA (Los Angeles)", offset: -8 },
    { id: "Europe/London", name: "Reino Unido (Londres)", offset: 0 },
    { id: "Europe/Paris", name: "França (Paris)", offset: 1 },
    { id: "Europe/Berlin", name: "Alemanha (Berlim)", offset: 1 },
    { id: "Asia/Tokyo", name: "Japão (Tóquio)", offset: 9 },
    { id: "Asia/Shanghai", name: "China (Xangai)", offset: 8 },
    { id: "Asia/Dubai", name: "Emirados Árabes (Dubai)", offset: 4 },
    { id: "Australia/Sydney", name: "Austrália (Sydney)", offset: 11 },
    { id: "Pacific/Auckland", name: "Nova Zelândia (Auckland)", offset: 13 },
    { id: "America/Argentina/Buenos_Aires", name: "Argentina (Buenos Aires)", offset: -3 },
    { id: "America/Mexico_City", name: "México (Cidade do México)", offset: -6 },
    { id: "Africa/Cairo", name: "Egito (Cairo)", offset: 2 },
    { id: "Asia/Kolkata", name: "Índia (Mumbai)", offset: 5.5 },
    { id: "Asia/Seoul", name: "Coreia do Sul (Seul)", offset: 9 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const convertTimezone = () => {
    if (!time || !fromTimezone || !toTimezone) return;

    const fromTz = timezones.find(tz => tz.id === fromTimezone);
    const toTz = timezones.find(tz => tz.id === toTimezone);

    if (!fromTz || !toTz) return;

    // Parse the input time
    const [hours, minutes] = time.split(':').map(Number);
    
    // Create a date with the input time
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    // Calculate offset difference
    const offsetDiff = toTz.offset - fromTz.offset;
    
    // Apply offset
    const convertedDate = new Date(date.getTime() + (offsetDiff * 60 * 60 * 1000));
    
    // Format result
    const resultHours = convertedDate.getHours().toString().padStart(2, '0');
    const resultMinutes = convertedDate.getMinutes().toString().padStart(2, '0');
    
    let dayIndicator = "";
    if (convertedDate.getDate() !== date.getDate()) {
      if (convertedDate.getDate() > date.getDate()) {
        dayIndicator = " (+1 dia)";
      } else {
        dayIndicator = " (-1 dia)";
      }
    }

    setConvertedTime(`${resultHours}:${resultMinutes}${dayIndicator}`);
  };

  const getCurrentTimeInTimezone = (timezone: any) => {
    const now = new Date();
    const offsetDiff = timezone.offset - (-3); // Brasil como referência
    const tzTime = new Date(now.getTime() + (offsetDiff * 60 * 60 * 1000));
    return tzTime.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
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
            <Plane className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Fusos Horários
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Conversão de Horários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fuso de Origem</Label>
                  <Select value={fromTimezone} onValueChange={setFromTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fuso" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.id} value={tz.id}>
                          {tz.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fuso de Destino</Label>
                  <Select value={toTimezone} onValueChange={setToTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fuso" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.id} value={tz.id}>
                          {tz.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={convertTimezone} className="w-full">
                Converter Horário
              </Button>

              {convertedTime && (
                <Card className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-2">
                        Horário Convertido
                      </p>
                      <p className="text-4xl font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                        {convertedTime}
                      </p>
                      {toTimezone && (
                        <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                          {timezones.find(tz => tz.id === toTimezone)?.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários Mundiais Atuais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timezones.slice(0, 12).map((timezone) => (
                  <div key={timezone.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {timezone.name.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {timezone.name.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                    <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                      {getCurrentTimeInTimezone(timezone)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Principais Fusos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>UTC-8:</strong> Los Angeles, São Francisco
                </div>
                <div>
                  <strong>UTC-5:</strong> Nova York, Miami, Toronto
                </div>
                <div>
                  <strong>UTC-3:</strong> São Paulo, Buenos Aires
                </div>
                <div>
                  <strong>UTC+0:</strong> Londres, Dublin (GMT)
                </div>
                <div>
                  <strong>UTC+1:</strong> Paris, Berlim, Roma
                </div>
                <div>
                  <strong>UTC+8:</strong> Pequim, Singapura
                </div>
                <div>
                  <strong>UTC+9:</strong> Tóquio, Seul
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Dicas de Viagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Jet Lag:</strong> Ajuste gradualmente antes da viagem
                </div>
                <div>
                  <strong>Reuniões:</strong> Use horário local para evitar confusão
                </div>
                <div>
                  <strong>Horário de Verão:</strong> Alguns países alteram o fuso
                </div>
                <div>
                  <strong>Apps úteis:</strong> World Clock, TimeZone Converter
                </div>
                <div>
                  <strong>Negócios:</strong> Considere horários de trabalho locais
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default TimezoneConverter;
