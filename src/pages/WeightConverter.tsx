
import Header from "@/components/Header";
import UnitConverter from "@/components/UnitConverter";

const weightUnits = [
  { symbol: "mg", name: "Miligrama", factor: 0.000001 },
  { symbol: "g", name: "Grama", factor: 0.001 },
  { symbol: "kg", name: "Quilograma", factor: 1 },
  { symbol: "t", name: "Tonelada", factor: 1000 },
  { symbol: "oz", name: "Onça", factor: 0.0283495 },
  { symbol: "lb", name: "Libra", factor: 0.453592 },
  { symbol: "st", name: "Stone", factor: 6.35029 },
  { symbol: "cwt", name: "Hundredweight", factor: 50.8023 },
];

const WeightConverter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Peso e Massa
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de peso e massa
          </p>
        </div>
        <UnitConverter
          title="Conversor de Peso e Massa"
          units={weightUnits}
          defaultFromUnit="kg"
          defaultToUnit="lb"
        />
      </main>
    </div>
  );
};

export default WeightConverter;
