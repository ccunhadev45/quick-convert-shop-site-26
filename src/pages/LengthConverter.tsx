
import Header from "@/components/Header";
import UnitConverter from "@/components/UnitConverter";

const lengthUnits = [
  { symbol: "mm", name: "Milímetro", factor: 0.001 },
  { symbol: "cm", name: "Centímetro", factor: 0.01 },
  { symbol: "m", name: "Metro", factor: 1 },
  { symbol: "km", name: "Quilômetro", factor: 1000 },
  { symbol: "in", name: "Polegada", factor: 0.0254 },
  { symbol: "ft", name: "Pé", factor: 0.3048 },
  { symbol: "yd", name: "Jarda", factor: 0.9144 },
  { symbol: "mi", name: "Milha", factor: 1609.344 },
  { symbol: "nmi", name: "Milha Náutica", factor: 1852 },
];

const LengthConverter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Comprimento
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de comprimento e distância
          </p>
        </div>
        <UnitConverter
          title="Conversor de Comprimento"
          units={lengthUnits}
          defaultFromUnit="m"
          defaultToUnit="ft"
        />
      </main>
    </div>
  );
};

export default LengthConverter;
