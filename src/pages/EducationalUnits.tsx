
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

const EducationalUnits = () => {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const educationalUnits = {
    "notas-br": { name: "Notas (Brasil)", factor: 1 },
    "notas-us": { name: "Notas (EUA)", factor: 10 },
    "creditos": { name: "Créditos", factor: 15 },
    "horas-aula": { name: "Horas-aula", factor: 1 },
    "carga-horaria": { name: "Carga Horária", factor: 60 },
    "semestre": { name: "Semestre", factor: 18 },
    "trimestre": { name: "Trimestre", factor: 12 },
    "bimestre": { name: "Bimestre", factor: 9 }
  };

  const convert = () => {
    if (!value || !fromUnit || !toUnit) return;
    
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) return;

    // Lógica específica para diferentes tipos de conversão
    let convertedValue = inputValue;
    
    if (fromUnit === "notas-br" && toUnit === "notas-us") {
      convertedValue = inputValue; // 0-10 para 0-100
    } else if (fromUnit === "notas-us" && toUnit === "notas-br") {
      convertedValue = inputValue / 10; // 0-100 para 0-10
    } else {
      // Conversão baseada em fatores
      const fromFactor = educationalUnits[fromUnit as keyof typeof educationalUnits]?.factor || 1;
      const toFactor = educationalUnits[toUnit as keyof typeof educationalUnits]?.factor || 1;
      convertedValue = (inputValue * toFactor) / fromFactor;
    }

    setResult(convertedValue.toFixed(2));
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Unidades Educacionais</h1>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Conversor de Unidades Educacionais</CardTitle>
            <CardDescription>
              Converta entre diferentes sistemas de avaliação e unidades acadêmicas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-unit">De</Label>
                <Select onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(educationalUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="to-unit">Para</Label>
                <Select onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(educationalUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="value">Valor</Label>
              <Input
                id="value"
                type="number"
                placeholder="Digite o valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <Button onClick={convert} className="w-full">
              Converter
            </Button>

            {result && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-lg">
                  <span className="font-semibold">{value} {educationalUnits[fromUnit as keyof typeof educationalUnits]?.name}</span>
                  {" = "}
                  <span className="font-bold text-green-600 dark:text-green-400">{result} {educationalUnits[toUnit as keyof typeof educationalUnits]?.name}</span>
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

export default EducationalUnits;
