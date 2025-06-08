
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const UploadTime = () => {
  const [fileSize, setFileSize] = useState("");
  const [fileSizeUnit, setFileSizeUnit] = useState("MB");
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("Mbps");
  const [result, setResult] = useState<any>(null);

  const calculateUploadTime = () => {
    if (!fileSize || !uploadSpeed) return;
    
    // Converter tudo para bytes
    let sizeInBytes = parseFloat(fileSize);
    switch (fileSizeUnit) {
      case "KB": sizeInBytes *= 1024; break;
      case "MB": sizeInBytes *= 1024 * 1024; break;
      case "GB": sizeInBytes *= 1024 * 1024 * 1024; break;
    }
    
    // Converter velocidade para bytes por segundo
    let speedInBytesPerSec = parseFloat(uploadSpeed);
    switch (speedUnit) {
      case "Kbps": speedInBytesPerSec = (speedInBytesPerSec * 1000) / 8; break;
      case "Mbps": speedInBytesPerSec = (speedInBytesPerSec * 1000000) / 8; break;
      case "Gbps": speedInBytesPerSec = (speedInBytesPerSec * 1000000000) / 8; break;
    }
    
    const timeInSeconds = sizeInBytes / speedInBytesPerSec;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    setResult({
      timeInSeconds: timeInSeconds.toFixed(0),
      hours,
      minutes,
      seconds,
      formattedTime: `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`
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
            <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Tempo de Upload
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Calcular Tempo de Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tamanho do Arquivo</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      placeholder="Ex: 500"
                      className="flex-1"
                    />
                    <Select value={fileSizeUnit} onValueChange={setFileSizeUnit}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KB">KB</SelectItem>
                        <SelectItem value="MB">MB</SelectItem>
                        <SelectItem value="GB">GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Velocidade de Upload</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={uploadSpeed}
                      onChange={(e) => setUploadSpeed(e.target.value)}
                      placeholder="Ex: 10"
                      className="flex-1"
                    />
                    <Select value={speedUnit} onValueChange={setSpeedUnit}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kbps">Kbps</SelectItem>
                        <SelectItem value="Mbps">Mbps</SelectItem>
                        <SelectItem value="Gbps">Gbps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={calculateUploadTime} className="w-full" size="lg">
                Calcular Tempo
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tempo Estimado de Upload</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {result.formattedTime}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Horas</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{result.hours}</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Minutos</p>
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{result.minutes}</p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Segundos</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{result.seconds}</p>
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

export default UploadTime;
