
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AstrologyChart as ChartData } from "@/services/astrologyService";
import { AlertCircle } from "lucide-react";
import ChartMandala from "./astrology/ChartMandala";
import PlanetDataTable from "./astrology/PlanetDataTable";
import ChartSummary from "./astrology/ChartSummary";
import HousesDistribution from "./astrology/HousesDistribution";

interface AstrologyChartProps {
  chartData: ChartData;
  birthData: {
    name: string;
    date: string;
    time: string;
    city: string;
  };
  unknownTime?: boolean;
}

const AstrologyChart = ({ chartData, birthData, unknownTime = false }: AstrologyChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          Mapa Astral Completo - {birthData.name}
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          {new Date(birthData.date).toLocaleDateString('pt-BR')} às {unknownTime ? 'horário aproximado (12:00)' : birthData.time} - {birthData.city}
        </p>
        {unknownTime && (
          <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 p-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Cálculo com horário aproximado</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <ChartMandala chartData={chartData} unknownTime={unknownTime} />
        
        <PlanetDataTable chartData={chartData} unknownTime={unknownTime} />

        <ChartSummary chartData={chartData} unknownTime={unknownTime} />

        <HousesDistribution chartData={chartData} unknownTime={unknownTime} />
      </CardContent>
    </Card>
  );
};

export default AstrologyChart;
