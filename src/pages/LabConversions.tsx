
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { FlaskRound, Calculator, AlertTriangle, Info, Crown } from "lucide-react";

const LabConversions = () => {
  const [value, setValue] = useState("");
  const [testType, setTestType] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<any>(null);

  const labTests = {
    glucose: {
      name: "Glicose",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.0555 }
      ],
      referenceRanges: {
        "mg_dl": { normal: "70-100", prediabetes: "100-125", diabetes: ">126" },
        "mmol_l": { normal: "3.9-5.6", prediabetes: "5.6-6.9", diabetes: ">7.0" }
      }
    },
    cholesterol: {
      name: "Colesterol Total",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.0259 }
      ],
      referenceRanges: {
        "mg_dl": { desirable: "<200", borderline: "200-239", high: "≥240" },
        "mmol_l": { desirable: "<5.2", borderline: "5.2-6.2", high: "≥6.2" }
      }
    },
    creatinine: {
      name: "Creatinina",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "umol_l", name: "μmol/L", factor: 88.4 }
      ],
      referenceRanges: {
        "mg_dl": { men: "0.7-1.3", women: "0.6-1.1" },
        "umol_l": { men: "62-115", women: "53-97" }
      }
    },
    urea: {
      name: "Ureia",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.357 }
      ],
      referenceRanges: {
        "mg_dl": { normal: "15-45" },
        "mmol_l": { normal: "2.5-7.5" }
      }
    },
    hemoglobin: {
      name: "Hemoglobina",
      units: [
        { id: "g_dl", name: "g/dL", factor: 1 },
        { id: "g_l", name: "g/L", factor: 10 },
        { id: "mmol_l", name: "mmol/L", factor: 0.6206 }
      ],
      referenceRanges: {
        "g_dl": { men: "14.0-17.5", women: "12.3-15.3" },
        "g_l": { men: "140-175", women: "123-153" },
        "mmol_l": { men: "8.7-10.9", women: "7.6-9.5" }
      }
    }
  };

  const convertValue = () => {
    if (!value || !testType || !fromUnit || !toUnit) return;

    const valueNum = parseFloat(value);
    const test = labTests[testType as keyof typeof labTests];
    
    if (!test) return;

    const fromUnitData = test.units.find(u => u.id === fromUnit);
    const toUnitData = test.units.find(u => u.id === toUnit);

    if (!fromUnitData || !toUnitData) return;

    // Converter para unidade base primeiro, depois para unidade alvo
    const baseValue = valueNum / fromUnitData.factor;
    const convertedValue = baseValue * toUnitData.factor;

    setResult({
      original: { value: valueNum, unit: fromUnitData.name },
      converted: { value: convertedValue, unit: toUnitData.name },
      test: test.name,
      referenceRanges: test.referenceRanges
    });
  };

  const getInterpretation = (value: number, ranges: any, unit: string) => {
    if (!ranges[unit]) return null;

    const rangeData = ranges[unit];
    
    for (const [key, range] of Object.entries(rangeData)) {
      if (typeof range === 'string') {
        const rangeStr = range as string;
        if (rangeStr.includes('-')) {
          const [min, max] = rangeStr.split('-').map(n => parseFloat(n));
          if (value >= min && value <= max) {
            return { category: key, status: 'normal' };
          }
        } else if (rangeStr.startsWith('<')) {
          const max = parseFloat(rangeStr.substring(1));
          if (value < max) {
            return { category: key, status: 'normal' };
          }
        } else if (rangeStr.startsWith('>') || rangeStr.startsWith('≥')) {
          const min = parseFloat(rangeStr.substring(1));
          if (value >= min) {
            return { category: key, status: 'high' };
          }
        }
      }
    }
    
    return { category: 'indefinido', status: 'unknown' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-yellow-500" />
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                PRO
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FlaskRound className="h-8 w-8 text-teal-600" />
              Conversões Laboratoriais
            </CardTitle>
            <p className="text-gray-600">
              Converta unidades de exames laboratoriais clínicos
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Informação</AlertTitle>
              <AlertDescription className="text-blue-700">
                Esta ferramenta converte valores entre diferentes unidades laboratoriais. 
                Sempre consulte valores de referência do laboratório específico.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Entrada de Dados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Conversão de Exame
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testType">Tipo de Exame</Label>
                    <Select value={testType} onValueChange={setTestType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o exame" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(labTests).map(([key, test]) => (
                          <SelectItem key={key} value={key}>
                            {test.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="value">Valor do Exame</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Ex: 100"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {testType && (
                    <>
                      <div>
                        <Label htmlFor="fromUnit">De (Unidade Original)</Label>
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Unidade original" />
                          </SelectTrigger>
                          <SelectContent>
                            {labTests[testType as keyof typeof labTests]?.units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="toUnit">Para (Unidade Desejada)</Label>
                        <Select value={toUnit} onValueChange={setToUnit}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Unidade desejada" />
                          </SelectTrigger>
                          <SelectContent>
                            {labTests[testType as keyof typeof labTests]?.units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button onClick={convertValue} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Converter
                  </Button>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultado</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-green-800">Exame:</p>
                            <p className="text-green-700">{result.test}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-green-800">Valor Original:</p>
                            <p className="text-green-700 text-lg">{result.original.value} {result.original.unit}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-green-800">Valor Convertido:</p>
                            <p className="text-green-700 text-xl font-bold">
                              {result.converted.value.toFixed(2)} {result.converted.unit}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Valores de Referência */}
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Valores de Referência</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(result.referenceRanges).map(([unit, ranges]) => (
                            <div key={unit} className="space-y-2">
                              <h4 className="font-medium text-gray-800">
                                {labTests[testType as keyof typeof labTests]?.units.find(u => u.id === unit)?.name}
                              </h4>
                              <div className="space-y-1 text-sm">
                                {Object.entries(ranges as Record<string, string>).map(([category, range]) => (
                                  <div key={category} className="flex justify-between">
                                    <span className="capitalize text-gray-600">{category}:</span>
                                    <span className="text-gray-800">{range}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FlaskRound className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione um exame e preencha os dados para converter</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Exames Disponíveis */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exames Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(labTests).map(([key, test]) => (
                  <Card key={key} className="border-gray-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-gray-900">{test.name}</h4>
                      <p className="text-sm text-gray-600 mt-2">Unidades disponíveis:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {test.units.map((unit) => (
                          <Badge key={unit.id} variant="outline" className="text-xs">
                            {unit.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSpace position="middle" />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default LabConversions;
