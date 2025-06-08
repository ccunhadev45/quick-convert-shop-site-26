
import { Badge } from "@/components/ui/badge";
import { AstrologyChart as ChartData } from "@/services/astrologyService";
import { planetColors, planetSymbols } from "./planetConstants";

interface PlanetDataTableProps {
  chartData: ChartData;
  unknownTime: boolean;
}

const PlanetDataTable = ({ chartData, unknownTime }: PlanetDataTableProps) => {
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
    <div className="space-y-6">
      {Object.entries(groupedData).map(([category, planets]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-semibold text-lg text-center text-purple-700">
            {category}
            {unknownTime && (category === 'Pontos Importantes' || category.includes('Casa')) && (
              <span className="text-amber-500 text-sm ml-2">*Aproximado</span>
            )}
          </h3>
          
          <div className="grid gap-2">
            <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-700 border-b pb-2">
              <span>Planeta</span>
              <span>Signo</span>
              <span>Casa</span>
              <span>Grau</span>
              <span>Minutos</span>
            </div>
            
            {planets.map(({ key, data }) => {
              const isTimeDependent = ['ascendant', 'midheaven', 'descendant', 'imumCoeli'].includes(key);
              return (
                <div 
                  key={key}
                  className={`grid grid-cols-5 gap-2 items-center p-3 rounded-lg border ${planetColors[key as keyof typeof planetColors]} ${unknownTime && isTimeDependent ? 'opacity-70' : ''}`}
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
                      {unknownTime && isTimeDependent && <span className="text-amber-500">*</span>}
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanetDataTable;
