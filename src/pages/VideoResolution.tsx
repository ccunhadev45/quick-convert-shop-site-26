
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const VideoResolution = () => {
  const [fromResolution, setFromResolution] = useState("");
  const [toResolution, setToResolution] = useState("");
  const [result, setResult] = useState<any>(null);

  const resolutions = [
    { name: "480p (SD)", width: 640, height: 480, pixels: 307200 },
    { name: "720p (HD)", width: 1280, height: 720, pixels: 921600 },
    { name: "1080p (Full HD)", width: 1920, height: 1080, pixels: 2073600 },
    { name: "1440p (2K)", width: 2560, height: 1440, pixels: 3686400 },
    { name: "4K (UHD)", width: 3840, height: 2160, pixels: 8294400 },
    { name: "8K", width: 7680, height: 4320, pixels: 33177600 },
    { name: "Instagram Stories", width: 1080, height: 1920, pixels: 2073600 },
    { name: "YouTube Thumbnail", width: 1280, height: 720, pixels: 921600 },
    { name: "Facebook Post", width: 1200, height: 630, pixels: 756000 },
    { name: "Twitter Post", width: 1024, height: 512, pixels: 524288 },
  ];

  const convertResolution = () => {
    if (!fromResolution || !toResolution) return;
    
    const from = resolutions.find(r => r.name === fromResolution);
    const to = resolutions.find(r => r.name === toResolution);
    
    if (!from || !to) return;
    
    const pixelRatio = to.pixels / from.pixels;
    const aspectRatioFrom = (from.width / from.height).toFixed(2);
    const aspectRatioTo = (to.width / to.height).toFixed(2);
    
    setResult({
      from,
      to,
      pixelRatio: pixelRatio.toFixed(2),
      aspectRatioFrom,
      aspectRatioTo,
      qualityChange: pixelRatio > 1 ? "Aumento" : pixelRatio < 1 ? "Redução" : "Igual",
      storageMultiplier: pixelRatio.toFixed(2)
    });
  };

  const swapResolutions = () => {
    const temp = fromResolution;
    setFromResolution(toResolution);
    setToResolution(temp);
    setResult(null);
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
            <Monitor className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Resoluções
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Comparar Resoluções de Vídeo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Resolução Origem</label>
                  <Select value={fromResolution} onValueChange={setFromResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((res) => (
                        <SelectItem key={res.name} value={res.name}>
                          {res.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="icon" onClick={swapResolutions}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resolução Destino</label>
                  <Select value={toResolution} onValueChange={setToResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((res) => (
                        <SelectItem key={res.name} value={res.name}>
                          {res.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={convertResolution} className="w-full" size="lg">
                Comparar Resoluções
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Origem</h3>
                      <p><strong>{result.from.name}</strong></p>
                      <p>{result.from.width} × {result.from.height}</p>
                      <p>{result.from.pixels.toLocaleString()} pixels</p>
                      <p>Aspecto: {result.aspectRatioFrom}:1</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Destino</h3>
                      <p><strong>{result.to.name}</strong></p>
                      <p>{result.to.width} × {result.to.height}</p>
                      <p>{result.to.pixels.toLocaleString()} pixels</p>
                      <p>Aspecto: {result.aspectRatioTo}:1</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mudança de Qualidade</p>
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {result.qualityChange}
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Multiplicador de Pixels</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        {result.pixelRatio}×
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Impacto no Armazenamento</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">
                        {result.storageMultiplier}×
                      </p>
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

export default VideoResolution;
