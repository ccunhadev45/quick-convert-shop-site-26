
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AstrologyChart } from "@/services/astrologyService";
import { calculateAspects } from "@/services/aspectsService";
import { Star, Heart, Briefcase, Home, Users } from "lucide-react";

interface AstrologyInterpretationProps {
  chartData: AstrologyChart;
  unknownTime?: boolean;
}

const SIGN_INTERPRETATIONS = {
  'Áries': { personality: 'Pioneiro e corajoso', love: 'Passionate e impulsivo', career: 'Líder natural' },
  'Touro': { personality: 'Estável e determinado', love: 'Leal e sensual', career: 'Perseverante e prático' },
  'Gêmeos': { personality: 'Comunicativo e versátil', love: 'Intelectual e curioso', career: 'Adaptável e criativo' },
  'Câncer': { personality: 'Emotivo e protetor', love: 'Carinhoso e devotado', career: 'Intuitivo e cuidadoso' },
  'Leão': { personality: 'Confiante e generoso', love: 'Dramático e leal', career: 'Criativo e ambicioso' },
  'Virgem': { personality: 'Analítico e perfeccionista', love: 'Dedicado e prestativo', career: 'Detalhista e eficiente' },
  'Libra': { personality: 'Diplomático e harmonioso', love: 'Romântico e charmoso', career: 'Justo e colaborativo' },
  'Escorpião': { personality: 'Intenso e misterioso', love: 'Profundo e transformador', career: 'Determinado e investigativo' },
  'Sagitário': { personality: 'Aventureiro e otimista', love: 'Livre e filosófico', career: 'Visionário e expansivo' },
  'Capricórnio': { personality: 'Ambicioso e disciplinado', love: 'Tradicional e leal', career: 'Responsável e estratégico' },
  'Aquário': { personality: 'Original e independente', love: 'Amigo e inovador', career: 'Revolucionário e humanitário' },
  'Peixes': { personality: 'Intuitivo e compassivo', love: 'Romântico e empático', career: 'Criativo e inspirador' }
};

const AstrologyInterpretation = ({ chartData, unknownTime = false }: AstrologyInterpretationProps) => {
  const planets = {
    sol: { degree: chartData.sun.degree + (chartData.sun.house - 1) * 30, planet: chartData.sun.planet },
    lua: { degree: chartData.moon.degree + (chartData.moon.house - 1) * 30, planet: chartData.moon.planet },
    mercurio: { degree: chartData.mercury.degree + (chartData.mercury.house - 1) * 30, planet: chartData.mercury.planet },
    venus: { degree: chartData.venus.degree + (chartData.venus.house - 1) * 30, planet: chartData.venus.planet },
    marte: { degree: chartData.mars.degree + (chartData.mars.house - 1) * 30, planet: chartData.mars.planet }
  };

  const aspects = calculateAspects(planets);
  const sunSign = chartData.sun.sign as keyof typeof SIGN_INTERPRETATIONS;
  const moonSign = chartData.moon.sign as keyof typeof SIGN_INTERPRETATIONS;
  const ascSign = chartData.ascendant.sign as keyof typeof SIGN_INTERPRETATIONS;

  return (
    <div className="space-y-6">
      {/* Interpretação por Área da Vida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Interpretação por Área da Vida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <h4 className="font-semibold">Personalidade</h4>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Sol em {chartData.sun.sign}:</strong> {SIGN_INTERPRETATIONS[sunSign]?.personality}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ascendente em {chartData.ascendant.sign}:</strong> Como você se apresenta ao mundo
                {unknownTime && <span className="text-amber-600"> (aproximado)</span>}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                <h4 className="font-semibold">Relacionamentos</h4>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Vênus em {chartData.venus.sign}:</strong> {SIGN_INTERPRETATIONS[chartData.venus.sign as keyof typeof SIGN_INTERPRETATIONS]?.love}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Lua em {chartData.moon.sign}:</strong> Suas necessidades emocionais
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-green-500" />
                <h4 className="font-semibold">Carreira</h4>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Meio do Céu em {chartData.midheaven.sign}:</strong> Sua vocação e objetivos profissionais
                {unknownTime && <span className="text-amber-600"> (aproximado)</span>}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Saturno em {chartData.saturn.sign}:</strong> Seus desafios e estrutura profissional
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-orange-500" />
                <h4 className="font-semibold">Família e Raízes</h4>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Fundo do Céu em {chartData.imumCoeli.sign}:</strong> Suas raízes e base emocional
                {unknownTime && <span className="text-amber-600"> (aproximado)</span>}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Lua na Casa {chartData.moon.house}:</strong> Como você se sente em casa
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aspectos Planetários */}
      <Card>
        <CardHeader>
          <CardTitle>Aspectos Planetários Principais</CardTitle>
          <p className="text-sm text-gray-600">
            Os aspectos mostram como os planetas se relacionam entre si em seu mapa
          </p>
        </CardHeader>
        <CardContent>
          {aspects.length > 0 ? (
            <div className="space-y-3">
              {aspects.slice(0, 8).map((aspect, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">
                      {aspect.description}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Orb: {aspect.orb.toFixed(1)}°
                    </span>
                  </div>
                  <div className="text-right max-w-xs">
                    <p className="text-sm font-medium">{aspect.meaning}</p>
                  </div>
                </div>
              ))}
              {aspects.length > 8 && (
                <p className="text-sm text-gray-500 text-center">
                  E mais {aspects.length - 8} aspectos em seu mapa completo...
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum aspecto principal encontrado</p>
          )}
        </CardContent>
      </Card>

      {/* Síntese Astrológica */}
      <Card>
        <CardHeader>
          <CardTitle>Síntese do Seu Mapa Astral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-800">Essência Principal</h4>
            <p className="text-sm text-gray-700">
              Com Sol em {chartData.sun.sign}, você é naturalmente {SIGN_INTERPRETATIONS[sunSign]?.personality.toLowerCase()}. 
              Sua Lua em {chartData.moon.sign} revela necessidades emocionais que buscam {SIGN_INTERPRETATIONS[moonSign]?.personality.toLowerCase()}.
              {!unknownTime && ` Seu Ascendente em ${chartData.ascendant.sign} faz com que as pessoas te vejam como alguém ${SIGN_INTERPRETATIONS[ascSign]?.personality.toLowerCase()}.`}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800">Potenciais e Desafios</h4>
            <p className="text-sm text-gray-700">
              Seus planetas estão distribuídos de forma a criar um padrão único. 
              Os aspectos mais fortes em seu mapa sugerem áreas de facilidade natural e também 
              pontos que precisam de mais atenção e desenvolvimento consciente.
            </p>
          </div>

          {unknownTime && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-2 text-amber-800">Nota sobre Precisão</h4>
              <p className="text-sm text-amber-700">
                Esta interpretação foi gerada com horário aproximado. Para uma análise mais precisa 
                das casas astrológicas e pontos como Ascendente e Meio do Céu, procure seu horário 
                exato de nascimento na certidão de nascimento.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AstrologyInterpretation;
