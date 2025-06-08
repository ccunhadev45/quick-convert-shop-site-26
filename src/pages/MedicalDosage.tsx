
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
import { Stethoscope, Calculator, AlertTriangle, Info, Crown } from "lucide-react";

const MedicalDosage = () => {
  const [weight, setWeight] = useState("");
  const [medicationType, setMedicationType] = useState("");
  const [dosagePerKg, setDosagePerKg] = useState("");
  const [frequency, setFrequency] = useState("");
  const [result, setResult] = useState<any>(null);

  const medicationTypes = [
    { id: "paracetamol", name: "Paracetamol", dosage: "10-15", unit: "mg/kg", maxDaily: "60 mg/kg" },
    { id: "ibuprofen", name: "Ibuprofeno", dosage: "5-10", unit: "mg/kg", maxDaily: "40 mg/kg" },
    { id: "amoxicillin", name: "Amoxicilina", dosage: "20-40", unit: "mg/kg", maxDaily: "90 mg/kg" },
    { id: "prednisolone", name: "Prednisolona", dosage: "1-2", unit: "mg/kg", maxDaily: "2 mg/kg" },
    { id: "furosemide", name: "Furosemida", dosage: "1-2", unit: "mg/kg", maxDaily: "6 mg/kg" },
    { id: "custom", name: "Dosagem Personalizada", dosage: "custom", unit: "mg/kg", maxDaily: "N/A" }
  ];

  const calculateDosage = () => {
    if (!weight || (!medicationType && !dosagePerKg)) return;

    const weightNum = parseFloat(weight);
    let dosageRange = "";
    let totalDose = 0;
    let dailyDose = 0;
    let selectedMed = null;

    if (medicationType && medicationType !== "custom") {
      selectedMed = medicationTypes.find(med => med.id === medicationType);
      if (selectedMed) {
        const [min, max] = selectedMed.dosage.split("-").map(n => parseFloat(n));
        const minDose = min * weightNum;
        const maxDose = max ? max * weightNum : minDose;
        totalDose = (minDose + maxDose) / 2;
        dosageRange = max ? `${minDose.toFixed(1)} - ${maxDose.toFixed(1)} mg` : `${minDose.toFixed(1)} mg`;
      }
    } else if (dosagePerKg) {
      totalDose = parseFloat(dosagePerKg) * weightNum;
      dosageRange = `${totalDose.toFixed(1)} mg`;
    }

    const frequencyNum = frequency ? parseInt(frequency) : 1;
    dailyDose = totalDose * frequencyNum;

    setResult({
      medication: selectedMed,
      weight: weightNum,
      singleDose: totalDose,
      dosageRange,
      frequency: frequencyNum,
      dailyDose,
      customDosage: medicationType === "custom" || !medicationType
    });
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
              <Stethoscope className="h-8 w-8 text-red-600" />
              Calculadora de Dosagens Médicas
            </CardTitle>
            <p className="text-gray-600">
              Calcule dosagens precisas de medicamentos por peso corporal
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Aviso Importante</AlertTitle>
              <AlertDescription className="text-red-700">
                Esta ferramenta é apenas para referência educacional. Sempre consulte um médico ou farmacêutico 
                antes de administrar qualquer medicamento. Verifique bulas e protocolos médicos.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Entrada de Dados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dados do Paciente
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weight">Peso do Paciente (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="medication">Medicamento</Label>
                    <Select value={medicationType} onValueChange={setMedicationType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione um medicamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicationTypes.map((med) => (
                          <SelectItem key={med.id} value={med.id}>
                            {med.name} {med.dosage !== "custom" && `(${med.dosage} ${med.unit})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {medicationType === "custom" && (
                    <div>
                      <Label htmlFor="dosagePerKg">Dosagem por kg (mg/kg)</Label>
                      <Input
                        id="dosagePerKg"
                        type="number"
                        placeholder="Ex: 10"
                        value={dosagePerKg}
                        onChange={(e) => setDosagePerKg(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="frequency">Frequência (vezes por dia)</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Frequência de administração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x ao dia</SelectItem>
                        <SelectItem value="2">2x ao dia (12/12h)</SelectItem>
                        <SelectItem value="3">3x ao dia (8/8h)</SelectItem>
                        <SelectItem value="4">4x ao dia (6/6h)</SelectItem>
                        <SelectItem value="6">6x ao dia (4/4h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculateDosage} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Dosagem
                  </Button>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultados</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          {!result.customDosage && result.medication && (
                            <div>
                              <p className="font-medium text-blue-800">Medicamento:</p>
                              <p className="text-blue-700">{result.medication.name}</p>
                            </div>
                          )}
                          
                          <div>
                            <p className="font-medium text-blue-800">Peso do Paciente:</p>
                            <p className="text-blue-700">{result.weight} kg</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-blue-800">Dose por Administração:</p>
                            <p className="text-blue-700 text-lg font-semibold">{result.dosageRange}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-blue-800">Frequência:</p>
                            <p className="text-blue-700">{result.frequency}x ao dia</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-blue-800">Dose Total Diária:</p>
                            <p className="text-blue-700 text-lg font-semibold">{result.dailyDose.toFixed(1)} mg</p>
                          </div>
                          
                          {result.medication && result.medication.maxDaily !== "N/A" && (
                            <div>
                              <p className="font-medium text-blue-800">Dose Máxima Diária:</p>
                              <p className="text-blue-700">{result.medication.maxDaily}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Lembrete</AlertTitle>
                      <AlertDescription>
                        Sempre considere a condição clínica do paciente, contraindicações e interações medicamentosas.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados para calcular a dosagem</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Medicamentos Comuns */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Medicamentos Comuns - Dosagens Pediátricas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicationTypes.slice(0, -1).map((med) => (
                  <Card key={med.id} className="border-gray-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-gray-900">{med.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Dosagem: {med.dosage} {med.unit}
                      </p>
                      <p className="text-sm text-gray-600">
                        Máximo diário: {med.maxDaily}
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

export default MedicalDosage;
