
import Header from "@/components/Header";
import UnitConverter from "@/components/UnitConverter";

const volumeUnits = [
  { symbol: "ml", name: "Mililitro", factor: 0.001 },
  { symbol: "cl", name: "Centilitro", factor: 0.01 },
  { symbol: "dl", name: "Decilitro", factor: 0.1 },
  { symbol: "l", name: "Litro", factor: 1 },
  { symbol: "m³", name: "Metro Cúbico", factor: 1000 },
  { symbol: "fl oz", name: "Onça Fluida", factor: 0.0295735 },
  { symbol: "cup", name: "Xícara", factor: 0.236588 },
  { symbol: "pt", name: "Pinta", factor: 0.473176 },
  { symbol: "qt", name: "Quarto", factor: 0.946353 },
  { symbol: "gal", name: "Galão", factor: 3.78541 },
];

const VolumeConverter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Volume
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes unidades de volume e capacidade
          </p>
        </div>
        <UnitConverter
          title="Conversor de Volume"
          units={volumeUnits}
          defaultFromUnit="l"
          defaultToUnit="gal"
        />
      </main>
    </div>
  );
};

export default VolumeConverter;
