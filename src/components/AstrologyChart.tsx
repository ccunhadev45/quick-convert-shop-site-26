
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AstrologyChart as ChartData } from "@/services/astrologyService";

interface AstrologyChartProps {
  chartData: ChartData;
  birthData: {
    name: string;
    date: string;
    time: string;
    city: string;
  };
}

const planetColors = {
  sun: "bg-yellow-100 border-yellow-300",
  moon: "bg-blue-100 border-blue-300",
  mercury: "bg-orange-100 border-orange-300",
  venus: "bg-pink-100 border-pink-300",
  mars: "bg-red-100 border-red-300",
  jupiter: "bg-purple-100 border-purple-300",
  saturn: "bg-gray-100 border-gray-300",
  uranus: "bg-cyan-100 border-cyan-300",
  neptune: "bg-indigo-100 border-indigo-300",
  pluto: "bg-slate-100 border-slate-300",
  ascendant: "bg-green-100 border-green-300",
  midheaven: "bg-emerald-100 border-emerald-300",
  descendant: "bg-teal-100 border-teal-300",
  imumCoeli: "bg-lime-100 border-lime-300",
  northNode: "bg-violet-100 border-violet-300",
  southNode: "bg-rose-100 border-rose-300"
};

const planetSymbols = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
  ascendant: "ASC",
  midheaven: "MC",
  descendant: "DSC",
  imumCoeli: "IC",
  northNode: "☊",
  southNode: "☋"
};

const AstrologyChart = ({ chartData, birthData }: AstrologyChartProps) => {
  const planetData = [
    { key: 'sun', data: chartData.sun, category: 'Planetas Pessoais' },
    { key: 'moon', data: chartData.moon, category: 'Planetas Pessoais' },
    { key: 'mercury', data: chartData.mercury, category: 'Planetas Pessoais' },
    { key: 'venus', data: chartData.venus, category: 'Planetas Pessoais' },
    { key: 'mars', data: chartData.mars, category: 'Planetas Pessoais' },
    { key: 'jupiter', data: chartData.jupiter, category: 'Planetas Sociais' },
    { key: 'saturn', data: chartData.saturn, category: 'Planetas Sociais' },
    { key: 'uranus', data: chartData.uranus, category: 'Planetas Transpessoais' },
    { key: 'neptune', data: chartData.neptune, category: 'Planetas Transpessoais' },
    { key: 'pluto', data: chartData.pluto, category: 'Planetas Transpessoais' },
    { key: 'ascendant', data: chartData.ascendant, category: 'Pontos Importantes' },
    { key: 'midheaven', data: chartData.midheaven, category: 'Pontos Importantes' },
    { key: 'descendant', data: chartData.descendant, category: 'Pontos Importantes' },
    { key: 'imumCoeli', data: chartData.imumCoeli, category: 'Pontos Importantes' },
    { key: 'northNode', data: chartData.northNode, category: 'Nodos Lunares' },
    { key: 'southNode', data: chartData.southNode, category: 'Nodos Lunares' }
  ];

  const groupedData = planetData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof planetData>);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          Mapa Astral Completo - {birthData.name}
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          {new Date(birthData.date).toLocaleDateString('pt-BR')} às {birthData.time} - {birthData.city}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mandala Central */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-2">{chartData.sun.symbol}</div>
              <div className="text-lg font-semibold">{chartData.sun.sign}</div>
              <div className="text-sm text-gray-600">Sol em Casa {chartData.sun.house}</div>
            </div>
            
            {/* Pontos cardeais */}
            <div className="absolute top-2 text-xs font-semibold">
              <span className="text-green-600">ASC: {chartData.ascendant.sign}</span>
            </div>
            <div className="absolute bottom-2 text-xs font-semibold">
              <span className="text-teal-600">DSC: {chartData.descendant.sign}</span>
            </div>
            <div className="absolute right-2 text-xs font-semibold transform rotate-90">
              <span className="text-emerald-600">MC: {chartData.midheaven.sign}</span>
            </div>
            <div className="absolute left-2 text-xs font-semibold transform -rotate-90">
              <span className="text-lime-600">IC: {chartData.imumCoeli.sign}</span>
            </div>
          </div>
        </div>

        {/* Tabelas por Categoria */}
        {Object.entries(groupedData).map(([category, planets]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-lg text-center text-purple-700">{category}</h3>
            
            <div className="grid gap-2">
              <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-700 border-b pb-2">
                <span>Planeta</span>
                <span>Signo</span>
                <span>Casa</span>
                <span>Grau</span>
                <span>Minutos</span>
              </div>
              
              {planets.map(({ key, data }) => (
                <div 
                  key={key}
                  className={`grid grid-cols-5 gap-2 items-center p-3 rounded-lg border ${planetColors[key as keyof typeof planetColors]}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {planetSymbols[key as keyof typeof planetSymbols]}
                    </span>
                    <span className="font-medium text-sm">
                      {data.planet}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{data.symbol}</span>
                    <Badge variant="outline" className="text-xs">
                      {data.sign}
                    </Badge>
                  </div>
                  
                  <div className="text-center">
                    <span className="font-mono text-sm font-semibold">
                      {data.house}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <span className="font-mono text-sm">
                      {Math.floor(data.degree)}°
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <span className="font-mono text-sm">
                      {Math.floor((data.degree % 1) * 60)}'
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Resumo Interpretativo */}
        <div className="mt-6 bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-lg text-purple-800">
            Interpretação do Seu Mapa Astral
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Sol em {chartData.sun.sign} (Casa {chartData.sun.house}):</strong> Representa sua essência e propósito de vida.
            </p>
            <p>
              <strong>Lua em {chartData.moon.sign} (Casa {chartData.moon.house}):</strong> Mostra suas emoções e necessidades internas.
            </p>
            <p>
              <strong>Ascendente em {chartData.ascendant.sign}:</strong> Como você se apresenta ao mundo e sua personalidade exterior.
            </p>
            <p>
              <strong>Meio do Céu em {chartData.midheaven.sign}:</strong> Sua vocação e objetivos de carreira.
            </p>
          </div>
        </div>

        {/* Distribuição por Casas */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(house => {
            const planetsInHouse = planetData.filter(p => p.data.house === house);
            return (
              <div key={house} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-purple-700">Casa {house}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {planetsInHouse.length > 0 
                    ? planetsInHouse.map(p => p.data.planet).join(', ')
                    : 'Vazia'
                  }
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AstrologyChart;
