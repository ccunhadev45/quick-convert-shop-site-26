
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, DollarSign } from "lucide-react";

const AnalyticsDashboard = () => {
  // Dados simulados - em uma aplicação real viriam de uma API
  const stats = [
    {
      title: "Visitantes Únicos",
      value: "12,547",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Visualizações",
      value: "45,821",
      change: "+8.2%", 
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Receita AdSense",
      value: "R$ 1,234",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Conversão",
      value: "3.4%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const topPages = [
    { page: "Conversor de Temperatura", visits: 8942, percentage: 19.5 },
    { page: "Conversor de Comprimento", visits: 7328, percentage: 16.0 },
    { page: "Conversor de Peso", visits: 6541, percentage: 14.3 },
    { page: "Conversor de Volume", visits: 5892, percentage: 12.9 },
    { page: "Página Inicial", visits: 4721, percentage: 10.3 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics e Receita</h2>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Páginas Mais Visitadas */}
      <Card>
        <CardHeader>
          <CardTitle>Páginas Mais Visitadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{page.page}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{page.visits.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Receita Mensal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita AdSense (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Cliques</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span>Impressões</span>
                <span className="font-bold">45,821</span>
              </div>
              <div className="flex justify-between">
                <span>CTR</span>
                <span className="font-bold">2.72%</span>
              </div>
              <div className="flex justify-between">
                <span>CPC Médio</span>
                <span className="font-bold">R$ 0,99</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">R$ 1,234,56</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas de Produtos (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Cliques em produtos</span>
                <span className="font-bold">324</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de conversão</span>
                <span className="font-bold">3.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Comissão média</span>
                <span className="font-bold">8.5%</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Estimativa</span>
                <span className="text-green-600">R$ 892,34</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
