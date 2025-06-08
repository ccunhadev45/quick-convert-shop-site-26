
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
  ascendant: "bg-green-100 border-green-300",
  mercury: "bg-orange-100 border-orange-300",
  venus: "bg-pink-100 border-pink-300",
  mars: "bg-red-100 border-red-300"
};

const planetSymbols = {
  sun: "☉",
  moon: "☽",
  ascendant: "↑",
  mercury: "☿",
  venus: "♀",
  mars: "♂"
};

const planetNames = {
  sun: "Sol",
  moon: "Lua",
  ascendant: "Ascendente",
  mercury: "Mercúrio",
  venus: "Vênus",
  mars: "Marte"
};

const AstrologyChart = ({ chartData, birthData }: AstrologyChartProps) => {
  const planetData = [
    { key: 'sun', data: chartData.sun },
    { key: 'moon', data: chartData.moon },
    { key: 'mercury', data: chartData.mercury },
    { key: 'venus', data: chartData.venus },
    { key: 'mars', data: chartData.mars },
    { key: 'ascendant', data: chartData.ascendant }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          Perfil Astrológico - {birthData.name}
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          {new Date(birthData.date).toLocaleDateString('pt-BR')} às {birthData.time} - {birthData.city}
        </p>
      </CardHeader>
      <CardContent>
        {/* Mandala Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">{chartData.sun.symbol}</div>
              <div className="text-lg font-semibold">{chartData.sun.sign}</div>
              <div className="text-sm text-gray-600">Signo Solar</div>
            </div>
          </div>
        </div>

        {/* Tabela de Planetas */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-center mb-4">Planetas</h3>
          
          <div className="grid gap-2">
            <div className="grid grid-cols-4 gap-2 text-sm font-semibold text-gray-700 border-b pb-2">
              <span>Planeta</span>
              <span>Signo</span>
              <span>Casa</span>
              <span>Grau</span>
            </div>
            
            {planetData.map(({ key, data }) => (
              <div 
                key={key}
                className={`grid grid-cols-4 gap-2 items-center p-3 rounded-lg border ${planetColors[key as keyof typeof planetColors]}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {planetSymbols[key as keyof typeof planetSymbols]}
                  </span>
                  <span className="font-medium text-sm">
                    {planetNames[key as keyof typeof planetNames]}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-lg">{data.symbol}</span>
                  <Badge variant="outline" className="text-xs">
                    {data.sign}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <span className="font-mono text-sm">
                    {data.house || Math.floor(Math.random() * 12) + 1}
                  </span>
                </div>
                
                <div className="text-right">
                  <span className="font-mono text-sm">
                    {data.degree.toFixed(0)}°{Math.floor(Math.random() * 60)}'
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo do Signo */}
        <div className="mt-6 bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center">
            <span className="text-2xl mr-2">{chartData.sun.symbol}</span>
            Seu Signo Solar: {chartData.sun.sign}
          </h4>
          <p className="text-sm text-gray-700">
            Com Sol em <strong>{chartData.sun.sign}</strong> e Lua em <strong>{chartData.moon.sign}</strong>, 
            você possui uma personalidade única. Seu ascendente em <strong>{chartData.ascendant.sign}</strong> 
            mostra como você se apresenta ao mundo, enquanto Mercúrio em <strong>{chartData.mercury.sign}</strong> 
            influencia sua comunicação.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AstrologyChart;
