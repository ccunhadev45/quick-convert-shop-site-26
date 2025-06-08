import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { financialDataService } from "@/services/financialDataService";
import { useQuery } from "@tanstack/react-query";

const FinancialIndicesPage = () => {
  const { data: financialData, isLoading, refetch } = useQuery({
    queryKey: ['financial-data'],
    queryFn: () => financialDataService.getAllFinancialData(),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const getVariationIndicator = (value: number | null) => {
    if (value === null) {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
    return value >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getVariationColor = (value: number | null) => {
    if (value === null) {
      return "text-gray-500";
    }
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Índices Financeiros
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Acompanhe os principais indicadores do mercado financeiro em tempo real
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Dólar Americano (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {financialData ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    R$ {financialData.usdBrl.value.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      Variação: <span className={getVariationColor(financialData.usdBrl.variation)}>
                        {financialData.usdBrl.variation ? financialData.usdBrl.variation.toFixed(2) : "0.00"}%
                      </span>
                    </Badge>
                    {getVariationIndicator(financialData.usdBrl.variation)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fonte: {financialData.usdBrl.source}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Última atualização: {financialData.usdBrl.lastUpdate}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Euro (EUR)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {financialData ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    R$ {financialData.eurBrl.value.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      Variação: <span className={getVariationColor(financialData.eurBrl.variation)}>
                        {financialData.eurBrl.variation ? financialData.eurBrl.variation.toFixed(2) : "0.00"}%
                      </span>
                    </Badge>
                    {getVariationIndicator(financialData.eurBrl.variation)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fonte: {financialData.eurBrl.source}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Última atualização: {financialData.eurBrl.lastUpdate}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Bitcoin (BTC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {financialData ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    R$ {financialData.btcBrl.value.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      Variação: <span className={getVariationColor(financialData.btcBrl.variation)}>
                        {financialData.btcBrl.variation ? financialData.btcBrl.variation.toFixed(2) : "0.00"}%
                      </span>
                    </Badge>
                    {getVariationIndicator(financialData.btcBrl.variation)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fonte: {financialData.btcBrl.source}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Última atualização: {financialData.btcBrl.lastUpdate}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
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

export default FinancialIndicesPage;
