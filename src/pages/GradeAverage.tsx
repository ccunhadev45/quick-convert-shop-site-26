
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

interface Grade {
  id: number;
  subject: string;
  grade: number;
  weight: number;
}

const GradeAverage = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, subject: "", grade: 0, weight: 1 }
  ]);
  const [calculationType, setCalculationType] = useState("simple");
  const [result, setResult] = useState<any>(null);

  const addGrade = () => {
    const newId = Math.max(...grades.map(g => g.id)) + 1;
    setGrades([...grades, { id: newId, subject: "", grade: 0, weight: 1 }]);
  };

  const removeGrade = (id: number) => {
    if (grades.length > 1) {
      setGrades(grades.filter(g => g.id !== id));
    }
  };

  const updateGrade = (id: number, field: keyof Grade, value: any) => {
    setGrades(grades.map(g => 
      g.id === id ? { ...g, [field]: value } : g
    ));
  };

  const calculateAverage = () => {
    const validGrades = grades.filter(g => g.grade > 0);
    
    if (validGrades.length === 0) return;

    let average = 0;
    let totalWeight = 0;

    if (calculationType === "simple") {
      average = validGrades.reduce((sum, g) => sum + g.grade, 0) / validGrades.length;
      totalWeight = validGrades.length;
    } else {
      const weightedSum = validGrades.reduce((sum, g) => sum + (g.grade * g.weight), 0);
      totalWeight = validGrades.reduce((sum, g) => sum + g.weight, 0);
      average = weightedSum / totalWeight;
    }

    const classification = getClassification(average);
    const neededForGoal = calculateNeededGrade(average, validGrades.length);

    setResult({
      average: average.toFixed(2),
      classification,
      totalGrades: validGrades.length,
      totalWeight: totalWeight.toFixed(1),
      neededForGoal
    });
  };

  const getClassification = (average: number) => {
    if (average >= 9) return { level: "Excelente", color: "text-green-600" };
    if (average >= 8) return { level: "Muito Bom", color: "text-blue-600" };
    if (average >= 7) return { level: "Bom", color: "text-yellow-600" };
    if (average >= 6) return { level: "Regular", color: "text-orange-600" };
    if (average >= 5) return { level: "Insuficiente", color: "text-red-600" };
    return { level: "Muito Insuficiente", color: "text-red-800" };
  };

  const calculateNeededGrade = (currentAverage: number, totalGrades: number) => {
    const goals = [6, 7, 8, 9]; // Metas comuns
    return goals.map(goal => {
      const needed = (goal * (totalGrades + 1)) - (currentAverage * totalGrades);
      return {
        goal,
        needed: Math.max(0, Math.min(10, needed)).toFixed(1)
      };
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
            <Calculator className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Média Escolar
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Média</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Tipo de Cálculo</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Média Simples</SelectItem>
                      <SelectItem value="weighted">Média Ponderada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notas</CardTitle>
                <Button onClick={addGrade} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Nota
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grades.map((grade, index) => (
                  <div key={grade.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Matéria/Avaliação</Label>
                      <Input
                        placeholder="Ex: Matemática"
                        value={grade.subject}
                        onChange={(e) => updateGrade(grade.id, 'subject', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label>Nota (0-10)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={grade.grade || ""}
                        onChange={(e) => updateGrade(grade.id, 'grade', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    {calculationType === "weighted" && (
                      <div>
                        <Label>Peso</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={grade.weight}
                          onChange={(e) => updateGrade(grade.id, 'weight', parseFloat(e.target.value) || 1)}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeGrade(grade.id)}
                        disabled={grades.length === 1}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={calculateAverage} className="w-full mt-6">
                Calcular Média
              </Button>
            </CardContent>
          </Card>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    Resultado da Média
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {result.average}
                    </div>
                    <div className={`text-lg font-semibold ${result.classification.color}`}>
                      {result.classification.level}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      {result.totalGrades} notas • Peso total: {result.totalWeight}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">
                    Notas Necessárias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                      Para atingir diferentes médias na próxima avaliação:
                    </p>
                    {result.neededForGoal.map((goal: any) => (
                      <div key={goal.goal} className="flex justify-between items-center">
                        <span className="text-green-600 dark:text-green-400">
                          Média {goal.goal}:
                        </span>
                        <span className="font-bold text-green-700 dark:text-green-300">
                          {parseFloat(goal.needed) > 10 ? "Impossível" : goal.needed}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default GradeAverage;
