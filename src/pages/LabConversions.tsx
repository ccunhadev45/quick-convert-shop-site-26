
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { TestTube, Calculator, Crown, ArrowRight } from "lucide-react";

const LabConversions = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [testType, setTestType] = useState("");
  const [result, setResult] = useState<any>(null);

  const testTypes = [
    {
      id: "glucose",
      name: "Glicose",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.0555 }
      ]
    },
    {
      id: "cholesterol",
      name: "Colesterol",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.0259 }
      ]
    },
    {
      id: "creatinine",
      name: "Creatinina",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "umol_l", name: "μmol/L", factor: 88.4 }
      ]
    },
    {
      id: "urea",
      name: "Ureia",
      units: [
        { id: "mg_dl", name: "mg/dL", factor: 1 },
        { id: "mmol_l", name: "mmol/L", factor: 0.167 }
      ]
    },
    {
      id: "hemoglobin",
      name: "Hemoglobina",
      units: [
        { id: "g_dl", name: "g/dL", factor: 1 },
        { id: "g_l", name: "g/L", factor: 10 },
        { id: "mmol_l", name: "mmol/L", factor: 0.6206 }
      ]
    }
  ];

  const referenceValues = {
    glucose: { normal: "70-100 mg/dL", unit: "mg/dL" },
    cholesterol: { normal: "<200 mg/dL", unit: "mg/dL" },
    creatinine: { normal: "0.6-1.2 mg/dL", unit: "mg/dL" },
    urea: { normal: "15-45 mg/dL", unit: "mg/dL" },
    hemoglobin: { normal: "12-16 g/dL", unit: "g/dL" }
  };

  const convertValue = () => {
    if (!value || !fromUnit || !toUnit || !testType) return;

    const selectedTest = testTypes.find(test => test.id === testType);
    if (!selectedTest) return;

    const fromUnitData = selectedTest.units.find(unit => unit.id === fromUnit);
    const toUnitData = selectedTest.units.find(unit => unit.id === toUnit);
    
    if (!fromUnitData || !toUnitData) return;

    const valueNum = parseFloat(value);
    const convertedValue = (valueNum / fromUnitData.factor) * toUnitData.factor;

    setResult({
      originalValue: valueNum,
      convertedValue: convertedValue.toFixed(3),
      fromUnit: fromUnitData.name,
      toUnit: toUnitData.name,
      testName: selectedTest.name,
      reference: referenceValues[testType as keyof typeof referenceValues]
    });
  };

  const getCurrentUnits = () => {
    if (!testType) return [];
    const selectedTest = testTypes.find(test => test.id === testType);
    return selectedTest ? selectedTest.units : [];
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
              <TestTube className="h-8 w-8 text-blue-600" />
              Conversões Laboratoriais
            </CardTitle>
            <p className="text-gray-600">
              Converta unidades de exames laboratoriais entre diferentes sistemas
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Conversão
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testType">Tipo de Exame</Label>
                    <Select value={testType} onValueChange={setTestType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o exame" />
                      </SelectTrigger>
                      <SelectContent>
                        {testTypes.map((test) => (
                          <SelectItem key={test.id} value={test.id}>
                            {test.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="value">Valor</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Digite o valor"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromUnit">De</Label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCurrentUnits().map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="toUnit">Para</Label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCurrentUnits().map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={convertValue} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Converter
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultado</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-blue-800">Exame:</p>
                            <p className="text-blue-700">{result.testName}</p>
                          </div>
                          <div className="flex items-center justify-center py-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-900">
                                {result.originalValue} {result.fromUnit}
                              </p>
                              <ArrowRight className="h-6 w-6 mx-auto my-2 text-blue-600" />
                              <p className="text-2xl font-bold text-blue-900">
                                {result.convertedValue} {result.toUnit}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Valor de Referência:</p>
                            <p className="text-blue-700">{result.reference.normal}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione um exame e preencha os dados</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exames Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testTypes.map((test) => (
                  <Card key={test.id} className="border-gray-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{test.name}</h4>
                      <div className="space-y-1">
                        {test.units.map((unit) => (
                          <span key={unit.id} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2">
                            {unit.name}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Ref: {referenceValues[test.id as keyof typeof referenceValues]?.normal}
                      </p>
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
