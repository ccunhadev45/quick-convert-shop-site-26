import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CryptoConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCrypto, setFromCrypto] = useState<string>("BTC");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [result, setResult] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Simulação de preços de criptomoedas - em produção, usar API real
  const cryptoPrices: { [key: string]: { usd: number, brl: number, change24h: number } } = {
    BTC: { usd: 42500, brl: 221000, change24h: 2.5 },
    ETH: { usd: 2800, brl: 14560, change24h: -1.2 },
    BNB: { usd: 310, brl: 1612, change24h: 3.8 },
    ADA: { usd: 0.48, brl: 2.50, change24h: -0.5 },
    SOL: { usd: 95, brl: 494, change24h: 4.2 },
    DOT: { usd: 7.2, brl: 37.44, change24h: 1.8 },
    MATIC: { usd: 0.85, brl: 4.42, change24h: -2.1 },
    LINK: { usd: 15.6, brl: 81.12, change24h: 0.9 },
  };

  const cryptocurrencies = [
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
    { code: "ETH", name: "Ethereum", symbol: "Ξ" },
    { code: "BNB", name: "Binance Coin", symbol: "BNB" },
    { code: "ADA", name: "Cardano", symbol: "ADA" },
    { code: "SOL", name: "Solana", symbol: "SOL" },
    { code: "DOT", name: "Polkadot", symbol: "DOT" },
    { code: "MATIC", name: "Polygon", symbol: "MATIC" },
    { code: "LINK", name: "Chainlink", symbol: "LINK" },
  ];

  const currencies = [
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
  ];

  const convertCrypto = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult("");
      return;
    }

    const num = Number(amount);
    const cryptoData = cryptoPrices[fromCrypto];
    
    if (cryptoData) {
      const price = toCurrency === "USD" ? cryptoData.usd : cryptoData.brl;
      const convertedAmount = num * price;
      setResult(convertedAmount.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }));
      setLastUpdate(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    convertCrypto();
  }, [amount, fromCrypto, toCurrency]);

  const copyToClipboard = (text: string) => {
    const cleanText = text.replace(/[.,]/g, '');
    navigator.clipboard.writeText(cleanText);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversor de Criptomoedas
          </h1>
          <p className="text-lg text-gray-600">
            Converta criptomoedas para USD ou BRL
          </p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Conversor de Criptomoedas</CardTitle>
            {lastUpdate && (
              <p className="text-sm text-center text-gray-500">
                Última atualização: {lastUpdate}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Criptomoeda:</label>
                <Select value={fromCrypto} onValueChange={setFromCrypto}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptocurrencies.map((crypto) => (
                      <SelectItem key={crypto.code} value={crypto.code}>
                        {crypto.symbol} {crypto.name} ({crypto.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Digite a quantidade"
                  className="text-lg border-gray-200"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Converter para:</label>
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
                    value={result ? `${getCurrencySymbol(toCurrency)} ${result}` : ""}
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

            {cryptoPrices[fromCrypto] && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-800 font-semibold">
                      Preço Atual: {getCurrencySymbol(toCurrency)} {
                        (toCurrency === "USD" ? cryptoPrices[fromCrypto].usd : cryptoPrices[fromCrypto].brl)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {cryptoPrices[fromCrypto].change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      cryptoPrices[fromCrypto].change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cryptoPrices[fromCrypto].change24h > 0 ? '+' : ''}{cryptoPrices[fromCrypto].change24h.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-8">
              {Object.entries(cryptoPrices).slice(0, 4).map(([code, data]) => (
                <div key={code} className="bg-gray-50 p-3 rounded border">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-800">{code}</p>
                    <div className="flex items-center">
                      {data.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    ${data.usd.toLocaleString('en-US')}
                  </p>
                  <p className={`text-xs ${data.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.change24h > 0 ? '+' : ''}{data.change24h.toFixed(1)}%
                  </p>
                </div>
              ))}
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

export default CryptoConverter;
