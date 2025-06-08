
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Gamepad2, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const GameCurrency = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState("");

  const gameCurrencies = [
    { id: "wow_gold", name: "WoW Gold", rate: 1 },
    { id: "lol_rp", name: "League of Legends RP", rate: 0.75 },
    { id: "fortnite_vbucks", name: "Fortnite V-Bucks", rate: 0.01 },
    { id: "minecraft_minecoins", name: "Minecraft Minecoins", rate: 0.005 },
    { id: "steam_wallet", name: "Steam Wallet", rate: 100 },
    { id: "robux", name: "Roblox Robux", rate: 0.0125 },
  ];

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    
    const fromRate = gameCurrencies.find(c => c.id === fromCurrency)?.rate || 1;
    const toRate = gameCurrencies.find(c => c.id === toCurrency)?.rate || 1;
    
    const baseValue = parseFloat(amount) * fromRate;
    const convertedValue = baseValue / toRate;
    
    setResult(convertedValue.toFixed(2));
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult("");
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
            <Gamepad2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Moedas de Jogos
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Converter Moedas Virtuais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantidade</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Digite a quantidade"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-2">De</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameCurrencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline" size="icon" onClick={swapCurrencies}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Para</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameCurrencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={convertCurrency} className="w-full" size="lg">
                  Converter
                </Button>

                {result && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Resultado: {result} {gameCurrencies.find(c => c.id === toCurrency)?.name}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default GameCurrency;
