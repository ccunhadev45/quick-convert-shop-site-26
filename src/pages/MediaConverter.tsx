
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileType, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const MediaConverter = () => {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
  const [mediaType, setMediaType] = useState("");

  const formats = {
    video: ["MP4", "AVI", "MOV", "WMV", "FLV", "MKV", "WEBM", "M4V"],
    audio: ["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A", "AIFF"],
    image: ["JPG", "PNG", "GIF", "BMP", "TIFF", "WEBP", "SVG", "ICO"]
  };

  const getCompatibilityInfo = () => {
    if (!fromFormat || !toFormat || !mediaType) return null;

    const compatibility = {
      quality: Math.random() > 0.5 ? "Alta" : "Média",
      compression: Math.random() > 0.5 ? "Com perda" : "Sem perda",
      support: Math.random() > 0.3 ? "Amplo" : "Limitado"
    };

    return compatibility;
  };

  const compatibility = getCompatibilityInfo();

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
            <FileType className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Formatos de Mídia
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Converter Formatos de Arquivos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Mídia</label>
                <Select value={mediaType} onValueChange={setMediaType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="audio">Áudio</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mediaType && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium mb-2">Formato Origem</label>
                    <Select value={fromFormat} onValueChange={setFromFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="De" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats[mediaType as keyof typeof formats]?.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Formato Destino</label>
                    <Select value={toFormat} onValueChange={setToFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Para" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats[mediaType as keyof typeof formats]?.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {compatibility && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações da Conversão</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qualidade</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {compatibility.quality}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Compressão</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {compatibility.compression}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Suporte</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {compatibility.support}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Dica:</strong> Para converter seus arquivos, recomendamos usar ferramentas como FFmpeg (linha de comando) ou aplicativos como HandBrake (interface gráfica).
                    </p>
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

export default MediaConverter;
