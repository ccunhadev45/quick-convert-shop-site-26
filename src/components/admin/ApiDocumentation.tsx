
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Server, Globe, DollarSign, Cloud, Zap } from "lucide-react";

const ApiDocumentation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Server className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold text-foreground">Documentação de APIs</h2>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="currency">Moedas</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="geo">Geolocalização</TabsTrigger>
          <TabsTrigger value="external">Externas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                APIs Utilizadas no Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">ExchangeRate-API</h4>
                    <Badge variant="secondary">Gratuita</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Taxas de câmbio em tempo real para conversão de moedas
                  </p>
                  <div className="text-xs space-y-1">
                    <p><strong>URL:</strong> api.exchangerate-api.com</p>
                    <p><strong>Limite:</strong> 1.500 req/mês (gratuito)</p>
                    <p><strong>Autenticação:</strong> API Key</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">CoinGecko API</h4>
                    <Badge variant="secondary">Gratuita</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Preços de criptomoedas e dados de mercado
                  </p>
                  <div className="text-xs space-y-1">
                    <p><strong>URL:</strong> api.coingecko.com</p>
                    <p><strong>Limite:</strong> 50 req/min (gratuito)</p>
                    <p><strong>Autenticação:</strong> Não requerida</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">ViaCEP</h4>
                    <Badge variant="secondary">Gratuita</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consulta de CEP e dados de endereços brasileiros
                  </p>
                  <div className="text-xs space-y-1">
                    <p><strong>URL:</strong> viacep.com.br</p>
                    <p><strong>Limite:</strong> Ilimitado</p>
                    <p><strong>Autenticação:</strong> Não requerida</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">IBGE Localidades</h4>
                    <Badge variant="secondary">Gratuita</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Estados, municípios e dados geográficos do Brasil
                  </p>
                  <div className="text-xs space-y-1">
                    <p><strong>URL:</strong> servicodados.ibge.gov.br</p>
                    <p><strong>Limite:</strong> Ilimitado</p>
                    <p><strong>Autenticação:</strong> Não requerida</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Considerações Importantes</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Implementar cache para reduzir chamadas às APIs</li>
                  <li>• Configurar fallbacks para quando APIs estiverem indisponíveis</li>
                  <li>• Monitorar limites de rate limiting</li>
                  <li>• Implementar retry logic com backoff exponencial</li>
                  <li>• Considerar upgrades pagos para maior volume</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                APIs de Moedas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">1. ExchangeRate-API</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Endpoint Principal:</h5>
                  <pre className="text-sm overflow-x-auto">
{`GET https://api.exchangerate-api.com/v4/latest/USD

Resposta:
{
  "base": "USD",
  "date": "2024-01-15",
  "rates": {
    "BRL": 5.1234,
    "EUR": 0.8765,
    "GBP": 0.7890,
    ...
  }
}`}
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Implementação React:</h5>
                  <pre className="text-sm overflow-x-auto">
{`const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await fetch(
      \`https://api.exchangerate-api.com/v4/latest/\${baseCurrency}\`
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Erro ao buscar taxas:', error);
    // Fallback para taxas cached ou valores padrão
    return getCachedRates(baseCurrency);
  }
};

// Hook personalizado
const useCurrencyRates = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      try {
        const data = await fetchExchangeRates(baseCurrency);
        setRates(data);
        // Cache no localStorage
        localStorage.setItem(\`rates_\${baseCurrency}\`, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};`}
                  </pre>
                </div>

                <h4 className="font-semibold">2. Fixer.io (Alternativa Premium)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`GET https://api.fixer.io/latest?access_key=YOUR_API_KEY&base=USD

Vantagens:
• Dados históricos
• Flutuação de moedas
• Maior precisão
• 1.000 req/mês gratuito

Implementação:
const FIXER_API_KEY = process.env.FIXER_API_KEY;

const fetchFixerRates = async (base = 'USD', symbols = '') => {
  const url = \`https://api.fixer.io/latest?access_key=\${FIXER_API_KEY}&base=\${base}\`;
  
  if (symbols) {
    url += \`&symbols=\${symbols}\`;
  }
  
  const response = await fetch(url);
  return response.json();
};`}
                  </pre>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Cache Strategy</h5>
                  <pre className="text-sm text-blue-800 dark:text-blue-200 overflow-x-auto">
{`// Cache com expiração
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const getCachedRates = (baseCurrency) => {
  const cached = localStorage.getItem(\`rates_\${baseCurrency}\`);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
};

const getRatesWithCache = async (baseCurrency) => {
  // Tenta cache primeiro
  const cached = getCachedRates(baseCurrency);
  if (cached) return cached;
  
  // Busca nova data
  return fetchExchangeRates(baseCurrency);
};`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>APIs de Criptomoedas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">1. CoinGecko API (Recomendada)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Endpoint de Preços Simples:</h5>
                  <pre className="text-sm overflow-x-auto">
{`GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd,brl

Resposta:
{
  "bitcoin": {
    "usd": 43250.50,
    "brl": 220875.75
  },
  "ethereum": {
    "usd": 2654.80,
    "brl": 13572.12
  }
}`}
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Hook para Criptomoedas:</h5>
                  <pre className="text-sm overflow-x-auto">
{`const useCryptoPrices = (coinIds, vsCurrencies = 'usd') => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = coinIds.join(',');
        const response = await fetch(
          \`https://api.coingecko.com/api/v3/simple/price?ids=\${ids}&vs_currencies=\${vsCurrencies}&include_24hr_change=true\`
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Erro ao buscar preços crypto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, [coinIds, vsCurrencies]);

  return { prices, loading };
};

// Lista de principais criptomoedas
const MAJOR_COINS = [
  'bitcoin', 'ethereum', 'binancecoin', 'cardano', 
  'solana', 'polkadot', 'chainlink', 'litecoin'
];`}
                  </pre>
                </div>

                <h4 className="font-semibold">2. CoinMarketCap API (Alternativa)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`// Requer API Key
const CMC_API_KEY = 'YOUR_CMC_API_KEY';

const fetchCMCPrices = async () => {
  const response = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100',
    {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      }
    }
  );
  return response.json();
};

// Plano gratuito: 333 calls/day
// Plano básico: 10.000 calls/month - $29/mês`}
                  </pre>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">WebSocket para Tempo Real</h5>
                  <pre className="text-sm text-green-800 dark:text-green-200 overflow-x-auto">
{`// Para atualizações em tempo real
const useCryptoWebSocket = (coinIds) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/stream');
    
    const streams = coinIds.map(coin => \`\${coin}usdt@ticker\`).join('/');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: streams.split('/'),
        id: 1
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.stream) {
        const symbol = data.stream.replace('@ticker', '');
        setPrices(prev => ({
          ...prev,
          [symbol]: parseFloat(data.data.c)
        }));
      }
    };

    return () => ws.close();
  }, [coinIds]);

  return prices;
};`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>APIs de Geolocalização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">1. ViaCEP (CEP Brasileiro)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`GET https://viacep.com.br/ws/01001000/json/

Resposta:
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}

// Hook personalizado
const useCEP = (cep) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCEP = async (cepValue) => {
    if (!cepValue || cepValue.length !== 8) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`https://viacep.com.br/ws/\${cepValue}/json/\`);
      const data = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      
      setAddress(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { address, loading, error, fetchCEP };
};`}
                  </pre>
                </div>

                <h4 className="font-semibold">2. IBGE Localidades</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`// Estados
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados

// Municípios de um estado
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios

// Hook para estados e cidades
const useIBGEData = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchStates = async () => {
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    );
    const data = await response.json();
    setStates(data);
  };

  const fetchCities = async (stateId) => {
    const response = await fetch(
      \`https://servicodados.ibge.gov.br/api/v1/localidades/estados/\${stateId}/municipios?orderBy=nome\`
    );
    const data = await response.json();
    setCities(data);
  };

  return { states, cities, fetchStates, fetchCities };
};`}
                  </pre>
                </div>

                <h4 className="font-semibold">3. TimeZone API</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`// WorldTimeAPI (Gratuita)
GET https://worldtimeapi.org/api/timezone/America/Sao_Paulo

Resposta:
{
  "datetime": "2024-01-15T14:30:00.123456-03:00",
  "timezone": "America/Sao_Paulo",
  "offset": "-03:00",
  "dst": false
}

// Hook para fusos horários
const useWorldTime = (timezone) => {
  const [time, setTime] = useState(null);

  const fetchTime = async () => {
    try {
      const response = await fetch(
        \`https://worldtimeapi.org/api/timezone/\${timezone}\`
      );
      const data = await response.json();
      setTime(data);
    } catch (error) {
      console.error('Erro ao buscar horário:', error);
    }
  };

  return { time, fetchTime };
};`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>APIs Externas Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">1. Astronomy Engine (Astrologia)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`// Biblioteca JavaScript instalada localmente
import * as Astronomy from 'astronomy-engine';

// Calcular posições planetárias
const calculatePlanetPositions = (date, latitude, longitude) => {
  const observer = new Astronomy.Observer(latitude, longitude, 0);
  const time = new Astronomy.AstroTime(date);
  
  const planets = [
    'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
    'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
  ];
  
  return planets.map(planet => {
    const body = Astronomy.Body[planet];
    const position = Astronomy.Horizon(time, observer, body);
    
    return {
      name: planet,
      altitude: position.altitude,
      azimuth: position.azimuth,
      ecliptic: Astronomy.EclipticGeoMoon(time)
    };
  });
};`}
                  </pre>
                </div>

                <h4 className="font-semibold">2. OpenWeatherMap (Clima)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`const WEATHER_API_KEY = 'YOUR_OPENWEATHER_KEY';

const fetchWeatherData = async (city) => {
  const response = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${WEATHER_API_KEY}&units=metric&lang=pt_br\`
  );
  return response.json();
};

// Para conversores de temperatura com contexto climático
const useWeatherContext = (city) => {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (city) {
      fetchWeatherData(city).then(setWeather);
    }
  }, [city]);
  
  return weather;
};`}
                  </pre>
                </div>

                <h4 className="font-semibold">3. Nutrition API (Nutricional)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`// FoodData Central (USDA) - Gratuita
const USDA_API_KEY = 'YOUR_USDA_KEY';

const searchFood = async (query) => {
  const response = await fetch(
    \`https://api.nal.usda.gov/fdc/v1/foods/search?query=\${query}&api_key=\${USDA_API_KEY}\`
  );
  return response.json();
};

// Para calculadoras nutricionais
const useNutritionData = () => {
  const [foods, setFoods] = useState([]);
  
  const searchFoodItems = async (query) => {
    const data = await searchFood(query);
    setFoods(data.foods || []);
  };
  
  return { foods, searchFoodItems };
};`}
                  </pre>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Rate Limiting e Boas Práticas</h4>
                  <pre className="text-sm text-orange-800 dark:text-orange-200 overflow-x-auto">
{`// Implementar rate limiting
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  async makeRequest(apiCall) {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );
    
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.timeWindow - (now - this.requests[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.makeRequest(apiCall);
    }
    
    this.requests.push(now);
    return apiCall();
  }
}

// Uso
const coinGeckoLimiter = new RateLimiter(50, 60000); // 50 req/min

const fetchWithRateLimit = (url) => 
  coinGeckoLimiter.makeRequest(() => fetch(url));`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentation;
