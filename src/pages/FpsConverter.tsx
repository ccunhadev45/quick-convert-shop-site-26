
import { useState } from "react";
import { ArrowLeft, Monitor, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const FpsConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("fps");
  const [results, setResults] = useState<any>(null);

  const calculateConversions = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    let fps: number;

    switch (inputType) {
      case "fps":
        fps = value;
        break;
      case "frametime":
        fps = 1000 / value; // ms para fps
        break;
      case "hz":
        fps = value; // Hz = FPS para displays
        break;
      default:
        fps = value;
    }

    const frameTime = 1000 / fps; // em milissegundos
    const frameTimeSeconds = 1 / fps; // em segundos

    setResults({
      fps: fps.toFixed(1),
      frameTime: frameTime.toFixed(2),
      frameTimeSeconds: frameTimeSeconds.toFixed(6),
      refreshRate: fps.toFixed(0),
      description: getPerformanceDescription(fps),
      gaming: getGamingAnalysis(fps)
    });
  };

  const getPerformanceDescription = (fps: number) => {
    if (fps >= 240) return "Profissional/Competitivo - Ultra suave";
    if (fps >= 144) return "Alto desempenho - Muito fluido";
    if (fps >= 120) return "Excelente - Muito responsivo";
    if (fps >= 60) return "Padrão - Fluido e jogável";
    if (fps >= 30) return "Mínimo aceitável - Básico";
    return "Abaixo do ideal - Pode travar";
  };

  const getGamingAnalysis = (fps: number) => {
    const analysis = [];
    
    if (fps >= 240) {
      analysis.push("Ideal para e-sports profissionais");
      analysis.push("Vantagem competitiva máxima");
      analysis.push("Requer monitor 240Hz+");
    } else if (fps >= 144) {
      analysis.push("Excelente para FPS competitivos");
      analysis.push("Movimento muito suave");
      analysis.push("Requer monitor 144Hz");
    } else if (fps >= 120) {
      analysis.push("Ótimo para a maioria dos jogos");
      analysis.push("Experiência muito fluida");
      analysis.push("Compatível com consoles novos");
    } else if (fps >= 60) {
      analysis.push("Padrão para jogos modernos");
      analysis.push("Experiência fluida");
      analysis.push("Mínimo para VR");
    } else if (fps >= 30) {
      analysis.push("Aceitável para jogos casuais");
      analysis.push("Pode sentir input lag");
      analysis.push("RPGs e estratégia OK");
    } else {
      analysis.push("Performance ruim");
      analysis.push("Experiência prejudicada");
      analysis.push("Reduza configurações gráficas");
    }

    return analysis;
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
            <Gamepad2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de FPS
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Análise de Performance Gaming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.1"
                    placeholder="Digite o valor"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Entrada</Label>
                  <Select value={inputType} onValueChange={setInputType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fps">FPS (Frames por Segundo)</SelectItem>
                      <SelectItem value="frametime">Frame Time (ms)</SelectItem>
                      <SelectItem value="hz">Taxa de Atualização (Hz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateConversions} className="w-full">
                Analisar Performance
              </Button>

              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                        Conversões Técnicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600 dark:text-blue-400">FPS:</span>
                        <span className="font-mono font-bold">{results.fps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600 dark:text-blue-400">Frame Time:</span>
                        <span className="font-mono font-bold">{results.frameTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600 dark:text-blue-400">Frame Time (s):</span>
                        <span className="font-mono font-bold">{results.frameTimeSeconds}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600 dark:text-blue-400">Monitor recomendado:</span>
                        <span className="font-bold">{results.refreshRate}Hz</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-700 dark:text-green-300">
                        Avaliação de Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                        {results.description}
                      </p>
                      <div className="space-y-2">
                        {results.gaming.map((item: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-green-600 dark:text-green-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm">Padrões de FPS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cinema:</span>
                      <span className="font-mono">24 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Console Padrão:</span>
                      <span className="font-mono">30 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PC Gaming:</span>
                      <span className="font-mono">60 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alta Performance:</span>
                      <span className="font-mono">144 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profissional:</span>
                      <span className="font-mono">240+ FPS</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm">Frame Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>30 FPS:</span>
                      <span className="font-mono">33.33ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>60 FPS:</span>
                      <span className="font-mono">16.67ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>120 FPS:</span>
                      <span className="font-mono">8.33ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>144 FPS:</span>
                      <span className="font-mono">6.94ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>240 FPS:</span>
                      <span className="font-mono">4.17ms</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm">Tipos de Jogo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>FPS/Battle Royale:</strong> 144+ FPS</div>
                    <div><strong>MOBA/RTS:</strong> 120+ FPS</div>
                    <div><strong>Racing:</strong> 120+ FPS</div>
                    <div><strong>RPG/Adventure:</strong> 60+ FPS</div>
                    <div><strong>Indie/Casual:</strong> 60+ FPS</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default FpsConverter;
