
import { AstrologyChart as ChartData } from "@/services/astrologyService";
import { AlertCircle } from "lucide-react";

interface ChartMandalaProps {
  chartData: ChartData;
  unknownTime: boolean;
}

const ChartMandala = ({ chartData, unknownTime }: ChartMandalaProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-64 h-64 rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center relative">
        <div className="text-center">
          <div className="text-6xl mb-2">{chartData.sun.symbol}</div>
          <div className="text-lg font-semibold">{chartData.sun.sign}</div>
          <div className="text-sm text-gray-600">Sol em Casa {chartData.sun.house}</div>
        </div>
        
        {/* Pontos cardeais - com aviso se horário desconhecido */}
        <div className={`absolute top-2 text-xs font-semibold ${unknownTime ? 'opacity-50' : ''}`}>
          <span className="text-green-600">ASC: {chartData.ascendant.sign}</span>
          {unknownTime && <span className="text-amber-500">*</span>}
        </div>
        <div className={`absolute bottom-2 text-xs font-semibold ${unknownTime ? 'opacity-50' : ''}`}>
          <span className="text-teal-600">DSC: {chartData.descendant.sign}</span>
          {unknownTime && <span className="text-amber-500">*</span>}
        </div>
        <div className={`absolute right-2 text-xs font-semibold transform rotate-90 ${unknownTime ? 'opacity-50' : ''}`}>
          <span className="text-emerald-600">MC: {chartData.midheaven.sign}</span>
          {unknownTime && <span className="text-amber-500">*</span>}
        </div>
        <div className={`absolute left-2 text-xs font-semibold transform -rotate-90 ${unknownTime ? 'opacity-50' : ''}`}>
          <span className="text-lime-600">IC: {chartData.imumCoeli.sign}</span>
          {unknownTime && <span className="text-amber-500">*</span>}
        </div>
      </div>
    </div>
  );
};

export default ChartMandala;
