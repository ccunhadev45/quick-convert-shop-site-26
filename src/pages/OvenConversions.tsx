
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const OvenConversions = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("celsius");
  const [toUnit, setToUnit] = useState<string>("fahrenheit");
  const [ovenType, setOvenType] = useState<string>("conventional");
  const [result, setResult] = useState<any>(null);

  const temperatureUnits = {
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",
    gas: "Gás (1-9)"
  };

  const ovenTypes = {
    conventional: "Forno Convencional",
    fan: "Forno Turbo/Ventilado",
    gas: "Forno a Gás"
  };

  const gasMarks = {
    1: 140, 2: 150, 3: 170, 4: 180, 5: 190, 6: 200, 7: 220, 8: 230, 9: 240
  };

  const convertTemperature = () => {
    if (!temperature) return;
    
    let inputTemp = parseFloat(temperature);
    if (isNaN(inputTemp)) return;

    // Convert to Celsius first
    let celsius = inputTemp;
    
    switch (fromUnit) {
      case "fahrenheit":
        celsius = (inputTemp - 32) * 5/9;
        break;
      case "kelvin":
        celsius = inputTemp - 273.15;
        break;
      case "gas":
        celsius = gasMarks[inputTemp as keyof typeof gasMarks] || inputTemp;
        break;
    }

    // Adjust for oven type
    if (ovenType === "fan") {
      celsius -= 20; // Fan ovens are typically 20°C lower
    }

    // Convert to target unit
    let converted = celsius;
    switch (toUnit) {
      case "fahrenheit":
        converted = (celsius * 9/5) + 32;
        break;
      case "kelvin":
        converted = celsius + 273.15;
        break;
      case "gas":
        // Find closest gas mark
        const gasMarkEntry = Object.entries(gasMarks).find(([mark, temp]) => 
          Math.abs(temp - celsius) < 10
        );
        converted = gasMarkEntry ? parseInt(gasMarkEntry[0]) : Math.round(celsius / 20);
        break;
    }

    setResult({
      original: `${temperature}${fromUnit === 'gas' ? ' (Gás)' : '°'}`,
      converted: converted.toFixed(toUnit === 'gas' ? 0 : 1),
      unit: toUnit === 'gas' ? ' (Gás)' : '°',
      celsius: celsius.toFixed(1)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Conversões de Forno</h1>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Conversor de Temperaturas de Forno</CardTitle>
            <CardDescription>
              Converta temperaturas entre diferentes unidades e tipos de forno
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="oven-type">Tipo de Forno</Label>
              <Select onValueChange={setOvenType} value={ovenType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ovenTypes).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-unit">De</Label>
                <Select onValueChange={setFromUnit} value={fromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(temperatureUnits).map(([key, name]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="to-unit">Para</Label>
                <Select onValueChange={setToUnit} value={toUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(temperatureUnits).map(([key, name]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="temperature">Temperatura</Label>
              <Input
                id="temperature"
                type="number"
                placeholder="Digite a temperatura"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>

            <Button onClick={convertTemperature} className="w-full">
              Converter
            </Button>

            {result && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold mb-2">Resultado:</h3>
                <p className="text-lg">
                  <span className="font-semibold">{result.original}</span>
                  {" = "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {result.converted}{result.unit}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Temperatura base: {result.celsius}°C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tipo de forno: {ovenTypes[ovenType as keyof typeof ovenTypes]}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default OvenConversions;
