import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { financialDataService } from "@/services/financialDataService";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BRL");
  const [result, setResult] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  const { data: financialData, isLoading, refetch } = useQuery({
    queryKey: ['currency-rates'],
    queryFn: () => financialDataService.getAllFinancialData(),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  // Taxas de câmbio baseadas nos dados em tempo real
  const getExchangeRates = () => {
    if (!financialData) {
      return {
        "USD-BRL": 5.20,
        "EUR-BRL": 5.65,
        "BRL-USD": 0.19,
        "BRL-EUR": 0.18,
        "USD-EUR": 0.92,
        "EUR-USD": 1.09,
      };
    }

    const usdBrl = financialData.usdBrl.value;
    const eurBrl = financialData.eurBrl.value;
    const usdEur = eurBrl / usdBrl;

    return {
      "USD-BRL": usdBrl,
      "EUR-BRL": eurBrl,
      "BRL-USD": 1 / usdBrl,
      "BRL-EUR": 1 / eurBrl,
      "USD-EUR": usdEur,
      "EUR-USD": 1 / usdEur,
      "GBP-BRL": usdBrl * 1.24, // Aproximação
      "JPY-BRL": usdBrl / 150, // Aproximação
      "CAD-BRL": usdBrl * 0.74, // Aproximação
      "AUD-BRL": usdBrl * 0.66, // Aproximação
      "CHF-BRL": usdBrl * 1.10, // Aproximação
      "CNY-BRL": usdBrl / 7.2, // Aproximação
    };
  };

  const currencies = [
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "JPY", name: "Iene Japonês", symbol: "¥" },
    { code: "CAD", name: "Dólar Canadense", symbol: "C$" },
    { code: "AUD", name: "Dólar Australiano", symbol: "A$" },
    { code: "CHF", name: "Franco Suíço", symbol: "CHF" },
    { code: "CNY", name: "Yuan Chinês", symbol: "¥" },
  ];

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult("");
      setRate(0);
      return;
    }

    const num = Number(amount);
    let convertedRate = 1;

    if (fromCurrency === toCurrency) {
      convertedRate = 1;
    } else {
      const exchangeRates = getExchangeRates();
      const directRate = exchangeRates[`${fromCurrency}-${toCurrency}` as keyof typeof exchangeRates];
      const reverseRate = exchangeRates[`${toCurrency}-${fromCurrency}` as keyof typeof exchangeRates];
      
      if (directRate) {
        convertedRate = directRate;
      } else if (reverseRate) {
        convertedRate = 1 / reverseRate;
      } else {
        // Conversão via USD para outras moedas
        const usdRate = exchangeRates["USD-BRL"];
        convertedRate = usdRate;
      }
    }

    const convertedAmount = num * convertedRate;
    setResult(convertedAmount.toFixed(4).replace(/\.?0+$/, ""));
    setRate(convertedRate);
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, financialData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Atualizando...",
      description: "Buscando taxas mais recentes",
    });
  };

  const exchangeRates = getExchangeRates();
  const lastUpdate = financialData?.usdBrl.lastUpdate;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Moedas
          </h1>
          <p className="text-lg text-gray-600">
            Converta entre diferentes moedas com taxas em tempo real
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Moedas</CardTitle>
            <div className="flex items-center justify-center gap-4">
              {lastUpdate && (
                <p className="text-sm text-center text-gray-500">
                  Última atualização: {typeof lastUpdate === 'string' ? lastUpdate.slice(11, 19) : lastUpdate}
                </p>
              )}
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">De:</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Digite o valor"
                  className="text-lg border-gray-200"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Para:</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Input
                    type="text"
                    value={result}
                    readOnly
                    placeholder="Resultado"
                    className="text-lg bg-gray-50 border-gray-200 pr-12"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => copyToClipboard(result)}
                    disabled={!result}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={swapCurrencies} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Inverter Moedas
              </Button>
            </div>

            {rate > 0 && rate !== 1 && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-center text-blue-800">
                  <strong>Taxa de Câmbio:</strong> 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </p>
                {financialData?.usdBrl.source && (
                  <p className="text-center text-xs text-blue-600 mt-1">
                    Fonte: {financialData.usdBrl.source}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 mt-8">
              <div className="bg-green-50 p-3 rounded border border-green-100">
                <p className="font-semibold text-green-800">USD/BRL</p>
                <p>R$ {exchangeRates["USD-BRL"].toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <p className="font-semibold text-blue-800">EUR/BRL</p>
                <p>R$ {exchangeRates["EUR-BRL"].toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded border border-purple-100">
                <p className="font-semibold text-purple-800">GBP/BRL</p>
                <p>R$ {exchangeRates["GBP-BRL"]?.toFixed(2) || "6.45"}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded border border-orange-100">
                <p className="font-semibold text-orange-800">USD/EUR</p>
                <p>€ {exchangeRates["USD-EUR"].toFixed(3)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdSpace position="middle" />
        
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default CurrencyConverter;
