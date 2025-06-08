
import { useState } from "react";
import { ArrowLeft, Calculator, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const GradeConverter = () => {
  const [grade, setGrade] = useState("");
  const [fromSystem, setFromSystem] = useState("");
  const [toSystem, setToSystem] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const gradingSystems = {
    "br-10": { name: "Brasil (0-10)", min: 0, max: 10 },
    "br-100": { name: "Brasil (0-100)", min: 0, max: 100 },
    "us-gpa": { name: "EUA GPA (0-4)", min: 0, max: 4 },
    "us-letter": { name: "EUA Letras (A-F)", min: 0, max: 100 },
    "uk-class": { name: "Reino Unido", min: 0, max: 100 },
    "fr-20": { name: "França (0-20)", min: 0, max: 20 },
    "de-6": { name: "Alemanha (1-6)", min: 1, max: 6 },
  };

  const convertGrade = () => {
    if (!grade || !fromSystem || !toSystem) return;

    const gradeNum = parseFloat(grade);
    let normalizedGrade = 0;

    // Normalizar para escala 0-100
    switch (fromSystem) {
      case "br-10":
        normalizedGrade = (gradeNum / 10) * 100;
        break;
      case "br-100":
        normalizedGrade = gradeNum;
        break;
      case "us-gpa":
        normalizedGrade = (gradeNum / 4) * 100;
        break;
      case "fr-20":
        normalizedGrade = (gradeNum / 20) * 100;
        break;
      case "de-6":
        normalizedGrade = ((6 - gradeNum) / 5) * 100;
        break;
      default:
        normalizedGrade = gradeNum;
    }

    // Converter para sistema de destino
    let convertedGrade = "";
    switch (toSystem) {
      case "br-10":
        convertedGrade = ((normalizedGrade / 100) * 10).toFixed(1);
        break;
      case "br-100":
        convertedGrade = normalizedGrade.toFixed(0);
        break;
      case "us-gpa":
        const gpa = (normalizedGrade / 100) * 4;
        convertedGrade = gpa.toFixed(2);
        break;
      case "us-letter":
        if (normalizedGrade >= 97) convertedGrade = "A+";
        else if (normalizedGrade >= 93) convertedGrade = "A";
        else if (normalizedGrade >= 90) convertedGrade = "A-";
        else if (normalizedGrade >= 87) convertedGrade = "B+";
        else if (normalizedGrade >= 83) convertedGrade = "B";
        else if (normalizedGrade >= 80) convertedGrade = "B-";
        else if (normalizedGrade >= 77) convertedGrade = "C+";
        else if (normalizedGrade >= 73) convertedGrade = "C";
        else if (normalizedGrade >= 70) convertedGrade = "C-";
        else if (normalizedGrade >= 67) convertedGrade = "D+";
        else if (normalizedGrade >= 65) convertedGrade = "D";
        else convertedGrade = "F";
        break;
      case "uk-class":
        if (normalizedGrade >= 70) convertedGrade = "First Class (70+)";
        else if (normalizedGrade >= 60) convertedGrade = "Upper Second (2:1)";
        else if (normalizedGrade >= 50) convertedGrade = "Lower Second (2:2)";
        else if (normalizedGrade >= 40) convertedGrade = "Third Class";
        else convertedGrade = "Fail";
        break;
      case "fr-20":
        convertedGrade = ((normalizedGrade / 100) * 20).toFixed(1);
        break;
      case "de-6":
        const germanGrade = 6 - ((normalizedGrade / 100) * 5);
        convertedGrade = Math.max(1, Math.min(6, germanGrade)).toFixed(1);
        break;
      default:
        convertedGrade = normalizedGrade.toFixed(0);
    }

    setResult(convertedGrade);
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
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Notas
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Conversão entre Sistemas de Notas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Nota</Label>
                  <Input
                    id="grade"
                    type="number"
                    step="0.1"
                    placeholder="Digite a nota"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sistema de Origem</Label>
                  <Select value={fromSystem} onValueChange={setFromSystem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sistema" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(gradingSystems).map(([key, system]) => (
                        <SelectItem key={key} value={key}>
                          {system.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sistema de Destino</Label>
                <Select value={toSystem} onValueChange={setToSystem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sistema" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(gradingSystems).map(([key, system]) => (
                      <SelectItem key={key} value={key}>
                        {system.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={convertGrade} className="w-full">
                Converter Nota
              </Button>

              {result && (
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                        Resultado da Conversão
                      </p>
                      <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                        {result}
                      </p>
                      {toSystem && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                          {gradingSystems[toSystem as keyof typeof gradingSystems]?.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm">Equivalências Gerais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Excelente:</span>
                        <span>9-10 (BR) | A (US) | 1-2 (DE)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bom:</span>
                        <span>7-8 (BR) | B (US) | 2-3 (DE)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regular:</span>
                        <span>5-6 (BR) | C (US) | 3-4 (DE)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insuficiente:</span>
                        <span>&lt;5 (BR) | F (US) | 5-6 (DE)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm">Sistemas Principais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div><strong>Brasil:</strong> 0-10 ou 0-100</div>
                      <div><strong>EUA:</strong> GPA 0-4 ou A-F</div>
                      <div><strong>Reino Unido:</strong> First/2:1/2:2/3rd</div>
                      <div><strong>França:</strong> 0-20</div>
                      <div><strong>Alemanha:</strong> 1-6 (1=melhor)</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default GradeConverter;
