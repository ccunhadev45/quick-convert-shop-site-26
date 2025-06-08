
import { AstrologyChart as ChartData } from "@/services/astrologyService";

interface ChartSummaryProps {
  chartData: ChartData;
  unknownTime: boolean;
}

const ChartSummary = ({ chartData, unknownTime }: ChartSummaryProps) => {
  return (
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
          {unknownTime && <span className="text-amber-600"> (Aproximado)</span>}
        </p>
        <p>
          <strong>Meio do Céu em {chartData.midheaven.sign}:</strong> Sua vocação e objetivos de carreira.
          {unknownTime && <span className="text-amber-600"> (Aproximado)</span>}
        </p>
      </div>
      {unknownTime && (
        <div className="mt-3 p-3 bg-amber-100 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>* Nota:</strong> Elementos marcados com asterisco são aproximados devido ao horário de nascimento desconhecido.
            Para um mapa mais preciso, procure seu horário exato na certidão de nascimento.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartSummary;
