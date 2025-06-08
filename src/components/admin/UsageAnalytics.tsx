
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calculator, Clock } from "lucide-react";
import { useConversionHistory } from "@/hooks/useConversionHistory";

const UsageAnalytics = () => {
  const { records } = useConversionHistory();

  const totalUsage = records.length;
  const uniqueCategories = [...new Set(records.map(r => r.category))].length;
  const todayUsage = records.filter(r => {
    const today = new Date().toDateString();
    return new Date(r.timestamp).toDateString() === today;
  }).length;

  const categoryStats = records.reduce((acc, record) => {
    acc[record.category] = (acc[record.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const typeStats = records.reduce((acc, record) => {
    acc[record.type] = (acc[record.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usos</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage}</div>
            <p className="text-xs text-muted-foreground">
              Todas as conversões e cálculos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayUsage}</div>
            <p className="text-xs text-muted-foreground">
              Usos hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCategories}</div>
            <p className="text-xs text-muted-foreground">
              Diferentes tipos usados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{typeStats.conversion || 0}</div>
            <p className="text-xs text-muted-foreground">
              vs {typeStats.calculation || 0} cálculos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Categorias Mais Usadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map(([category, count], index) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <span className="font-medium">{category}</span>
                  </div>
                  <Badge>{count} usos</Badge>
                </div>
              ))}
              {topCategories.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum dado de uso ainda
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Operação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(typeStats).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="font-medium capitalize">{type === 'conversion' ? 'Conversões' : 'Cálculos'}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
              {Object.keys(typeStats).length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum dado disponível
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registros Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {records.slice(-10).reverse().map((record, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{record.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {record.category} • {new Date(record.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
                <Badge variant={record.type === 'conversion' ? 'default' : 'secondary'}>
                  {record.type === 'conversion' ? 'Conversão' : 'Cálculo'}
                </Badge>
              </div>
            ))}
            {records.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Nenhum registro encontrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageAnalytics;
