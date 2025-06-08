
import { useState } from "react";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FinancialIndicesPage = () => {
  // Simulação de dados financeiros - em produção, usar API real
  const financialData = {
    selic: { value: 11.75, change: 0.25, lastUpdate: "14/12/2024" },
    cdi: { value: 11.65, change: 0.20, lastUpdate: "14/12/2024" },
    ipca: { value: 4.87, change: -0.13, lastUpdate: "Nov/2024" },
    igpm: { value: 3.92, change: 0.45, lastUpdate: "Nov/2024" },
    dolar: { value: 5.20, change: 0.15, lastUpdate: "14/12/2024" },
    euro: { value: 5.65, change: -0.08, lastUpdate: "14/12/2024" },
    bovespa: { value: 125480, change: 1.25, lastUpdate: "14/12/2024" },
    bitcoin: { value: 42500, change: 2.5, lastUpdate: "14/12/2024" }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'currency':
        return `R$ ${value.toFixed(2)}`;
      case 'points':
        return value.toLocaleString('pt-BR');
      case 'dollar':
        return `$ ${value.toLocaleString('en-US')}`;
      default:
        return value.toString();
    }
  };

  const indices = [
    {
      title: "Taxa Selic",
      description: "Taxa básica de juros da economia",
      value: financialData.selic.value,
      change: financialData.selic.change,
      lastUpdate: financialData.selic.lastUpdate,
      type: "percentage",
      color: "blue"
    },
    {
      title: "CDI",
      description: "Certificado de Depósito Interbancário",
      value: financialData.cdi.value,
      change: financialData.cdi.change,
      lastUpdate: financialData.cdi.lastUpdate,
      type: "percentage",
      color: "green"
    },
    {
      title: "IPCA",
      description: "Índice Nacional de Preços ao Consumidor Amplo",
      value: financialData.ipca.value,
      change: financialData.ipca.change,
      lastUpdate: financialData.ipca.lastUpdate,
      type: "percentage",
      color: "orange"
    },
    {
      title: "IGP-M",
      description: "Índice Geral de Preços do Mercado",
      value: financialData.igpm.value,
      change: financialData.igpm.change,
      lastUpdate: financialData.igpm.lastUpdate,
      type: "percentage",
      color: "purple"
    },
    {
      title: "Dólar",
      description: "USD/BRL",
      value: financialData.dolar.value,
      change: financialData.dolar.change,
      lastUpdate: financialData.dolar.lastUpdate,
      type: "currency",
      color: "emerald"
    },
    {
      title: "Euro",
      description: "EUR/BRL",
      value: financialData.euro.value,
      change: financialData.euro.change,
      lastUpdate: financialData.euro.lastUpdate,
      type: "currency",
      color: "cyan"
    },
    {
      title: "Ibovespa",
      description: "Índice da Bolsa de Valores de São Paulo",
      value: financialData.bovespa.value,
      change: financialData.bovespa.change,
      lastUpdate: financialData.bovespa.lastUpdate,
      type: "points",
      color: "red"
    },
    {
      title: "Bitcoin",
      description: "BTC/USD",
      value: financialData.bitcoin.value,
      change: financialData.bitcoin.change,
      lastUpdate: financialData.bitcoin.lastUpdate,
      type: "dollar",
      color: "amber"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
    purple: "bg-purple-50 border-purple-200",
    emerald: "bg-emerald-50 border-emerald-200",
    cyan: "bg-cyan-50 border-cyan-200",
    red: "bg-red-50 border-red-200",
    amber: "bg-amber-50 border-amber-200"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Índices Financeiros
          </h1>
          <p className="text-lg text-gray-600">
            Acompanhe os principais indicadores econômicos e financeiros
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {indices.map((index, i) => (
            <Card key={i} className={`border ${colorClasses[index.color as keyof typeof colorClasses]}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{index.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{index.description}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(formatValue(index.value, index.type))}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatValue(index.value, index.type)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {index.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-semibold ${
                        index.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}
                        {index.type === 'percentage' || index.type === 'points' ? '%' : ''}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {index.lastUpdate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Calculadora de Rendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Valor Inicial: R$ 10.000</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Poupança (0,5% a.m.)</span>
                      <span className="font-semibold">R$ 10.618</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CDI (100%)</span>
                      <span className="font-semibold">R$ 11.165</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Selic</span>
                      <span className="font-semibold">R$ 11.175</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Inflação Acumulada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Últimos 12 meses:</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IPCA</span>
                      <span className="font-semibold text-orange-600">4.87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IGP-M</span>
                      <span className="font-semibold text-purple-600">3.92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Meta Selic</span>
                      <span className="font-semibold text-blue-600">4.50%</span>
                    </div>
                  </div>
                </div>
              </div>
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

export default FinancialIndicesPage;
