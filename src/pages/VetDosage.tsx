
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Stethoscope, AlertTriangle, Calculator } from "lucide-react";

const VetDosage = () => {
  const [medication, setMedication] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petType, setPetType] = useState("");
  
  const medications = {
    amoxicillin: {
      name: "Amoxicilina",
      dogDose: { min: 10, max: 20, unit: "mg/kg", frequency: "2x ao dia" },
      catDose: { min: 10, max: 15, unit: "mg/kg", frequency: "2x ao dia" },
      warnings: ["Administrar com alimento", "Curso completo de antibiótico"]
    },
    prednisolone: {
      name: "Prednisolona",
      dogDose: { min: 0.5, max: 2, unit: "mg/kg", frequency: "1-2x ao dia" },
      catDose: { min: 0.5, max: 1, unit: "mg/kg", frequency: "1x ao dia" },
      warnings: ["Administrar com alimento", "Reduzir dose gradualmente"]
    },
    tramadol: {
      name: "Tramadol",
      dogDose: { min: 2, max: 5, unit: "mg/kg", frequency: "2-3x ao dia" },
      catDose: { min: 1, max: 2, unit: "mg/kg", frequency: "2x ao dia" },
      warnings: ["Monitorar sinais de sedação", "Não usar com outros opioides"]
    },
    metacam: {
      name: "Meloxicam",
      dogDose: { min: 0.1, max: 0.2, unit: "mg/kg", frequency: "1x ao dia" },
      catDose: { min: 0.05, max: 0.1, unit: "mg/kg", frequency: "1x ao dia" },
      warnings: ["Administrar com alimento", "Monitorar função renal"]
    }
  };

  const calculateDosage = () => {
    if (!medication || !petWeight || !petType) return null;
    
    const med = medications[medication as keyof typeof medications];
    const weight = parseFloat(petWeight);
    const dose = petType === "dog" ? med.dogDose : med.catDose;
    
    return {
      minDose: (weight * dose.min).toFixed(2),
      maxDose: (weight * dose.max).toFixed(2),
      unit: dose.unit.replace("/kg", ""),
      frequency: dose.frequency,
      warnings: med.warnings
    };
  };

  const dosage = calculateDosage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Stethoscope className="h-8 w-8 text-green-600" />
                Calculadora de Dosagem Veterinária
              </CardTitle>
              <p className="text-gray-600">
                Calcule dosagens de medicamentos para pets
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    AVISO: Apenas para referência. Sempre consulte um veterinário.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Pet</Label>
                  <Select value={petType} onValueChange={setPetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Cão</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Peso do Pet (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 15.5"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Medicamento</Label>
                <Select value={medication} onValueChange={setMedication}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o medicamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(medications).map(([key, med]) => (
                      <SelectItem key={key} value={key}>
                        {med.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {dosage && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Dosagem Calculada:</h3>
                  
                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <div className="text-center">
                      <Calculator className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="flex justify-center gap-2 items-center">
                        <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                          {dosage.minDose} - {dosage.maxDose} {dosage.unit}
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700 mt-2">{dosage.frequency}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dose Mínima</p>
                        <p className="text-xl font-bold text-green-900">{dosage.minDose} {dosage.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dose Máxima</p>
                        <p className="text-xl font-bold text-green-900">{dosage.maxDose} {dosage.unit}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Cuidados Importantes:
                    </h4>
                    <ul className="space-y-2">
                      {dosage.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Lembre-se:</strong> Esta calculadora é apenas uma ferramenta de referência. 
                      Sempre consulte um médico veterinário antes de administrar qualquer medicamento 
                      ao seu pet. Dosagens podem variar conforme a condição clínica específica.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default VetDosage;
