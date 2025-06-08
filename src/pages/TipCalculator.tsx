
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [country, setCountry] = useState("");
  const [serviceQuality, setServiceQuality] = useState("");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const countries = [
    { id: "us", name: "Estados Unidos", tipRange: [15, 20, 25] },
    { id: "ca", name: "Canadá", tipRange: [15, 18, 20] },
    { id: "uk", name: "Reino Unido", tipRange: [10, 12, 15] },
    { id: "br", name: "Brasil", tipRange: [10, 10, 15] },
    { id: "fr", name: "França", tipRange: [0, 5, 10] },
    { id: "de", name: "Alemanha", tipRange: [5, 10, 15] },
    { id: "jp", name: "Japão", tipRange: [0, 0, 0] },
    { id: "au", name: "Austrália", tipRange: [10, 15, 20] },
  ];

  const calculateTip = () => {
    if (!billAmount || !country || !serviceQuality) return;
    
    const bill = parseFloat(billAmount);
    const selectedCountry = countries.find(c => c.id === country);
    const peopleCount = parseInt(people);
    
    if (!selectedCountry) return;
    
    let tipPercentage = 0;
    switch (serviceQuality) {
      case "poor":
        tipPercentage = selectedCountry.tipRange[0];
        break;
      case "good":
        tipPercentage = selectedCountry.tipRange[1];
        break;
      case "excellent":
        tipPercentage = selectedCountry.tipRange[2];
        break;
    }
    
    const tipAmount = (bill * tipPercentage) / 100;
    const total = bill + tipAmount;
    const tipPerPerson = tipAmount / peopleCount;
    const totalPerPerson = total / peopleCount;
    
    setResult({
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2),
      percentage: tipPercentage
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Gorjetas
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Calcular Gorjeta por País
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor da Conta</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="Ex: 50.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Pessoas</label>
                    <Input
                      type="number"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      placeholder="Ex: 2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">País</label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Qualidade do Serviço</label>
                  <Select value={serviceQuality} onValueChange={setServiceQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Avaliar serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Ruim</SelectItem>
                      <SelectItem value="good">Bom</SelectItem>
                      <SelectItem value="excellent">Excelente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateTip} className="w-full" size="lg">
                Calcular Gorjeta
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gorjeta Recomendada ({result.percentage}%)</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">R$ {result.tipAmount}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">R$ {result.total}</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gorjeta por pessoa</p>
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">R$ {result.tipPerPerson}</p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total por pessoa</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">R$ {result.totalPerPerson}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default TipCalculator;
