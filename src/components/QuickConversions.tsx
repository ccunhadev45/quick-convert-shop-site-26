
const QuickConversions = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
        Conversões Mais Usadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <p className="font-semibold text-card-foreground mb-2">Metro → Pé</p>
          <p className="text-sm text-muted-foreground">1 m = 3.28084 ft</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <p className="font-semibold text-card-foreground mb-2">°C → °F</p>
          <p className="text-sm text-muted-foreground">0°C = 32°F</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <p className="font-semibold text-card-foreground mb-2">Kg → Libra</p>
          <p className="text-sm text-muted-foreground">1 kg = 2.20462 lb</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <p className="font-semibold text-card-foreground mb-2">USD → BRL</p>
          <p className="text-sm text-muted-foreground">$1 = R$ 5.20</p>
        </div>
      </div>
    </div>
  );
};

export default QuickConversions;
