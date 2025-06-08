
import { AstrologyChart as ChartData } from "@/services/astrologyService";

interface HousesDistributionProps {
  chartData: ChartData;
  unknownTime: boolean;
}

const HousesDistribution = ({ chartData, unknownTime }: HousesDistributionProps) => {
  const planetData = [
    { key: 'sun', data: chartData.sun },
    { key: 'moon', data: chartData.moon },
    { key: 'mercury', data: chartData.mercury },
    { key: 'venus', data: chartData.venus },
    { key: 'mars', data: chartData.mars },
    { key: 'jupiter', data: chartData.jupiter },
    { key: 'saturn', data: chartData.saturn },
    { key: 'uranus', data: chartData.uranus },
    { key: 'neptune', data: chartData.neptune },
    { key: 'pluto', data: chartData.pluto },
    { key: 'ascendant', data: chartData.ascendant },
    { key: 'midheaven', data: chartData.midheaven },
    { key: 'descendant', data: chartData.descendant },
    { key: 'imumCoeli', data: chartData.imumCoeli },
    { key: 'northNode', data: chartData.northNode },
    { key: 'southNode', data: chartData.southNode }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(house => {
        const planetsInHouse = planetData.filter(p => p.data.house === house);
        return (
          <div key={house} className={`p-3 bg-gray-50 rounded-lg ${unknownTime ? 'opacity-70' : ''}`}>
            <div className="font-semibold text-purple-700">
              Casa {house}
              {unknownTime && <span className="text-amber-500 text-xs">*</span>}
            </div>
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
  );
};

export default HousesDistribution;
