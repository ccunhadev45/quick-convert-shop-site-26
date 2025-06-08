
export interface ViaCepCity {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface CityResult {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  fullName: string;
}

// Cache para cidades com TTL
interface CacheEntry {
  data: CityResult[];
  timestamp: number;
}

let citiesCache: CacheEntry | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

export const fetchBrazilianCitiesViaCep = async (): Promise<CityResult[]> => {
  // Verifica se o cache ainda é válido
  if (citiesCache && (Date.now() - citiesCache.timestamp) < CACHE_TTL) {
    console.log('Retornando cidades do cache');
    return citiesCache.data;
  }

  try {
    console.log('Buscando cidades do IBGE...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Falha ao buscar cidades: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Cidades carregadas:', data.length);
    
    const cities = data.map((city: any) => ({
      id: city.id.toString(),
      name: city.nome,
      state: city.microrregiao.mesorregiao.UF.nome,
      stateCode: city.microrregiao.mesorregiao.UF.sigla,
      fullName: `${city.nome}, ${city.microrregiao.mesorregiao.UF.sigla}`
    }));

    // Atualiza o cache
    citiesCache = {
      data: cities,
      timestamp: Date.now()
    };
    
    return cities;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    
    // Se houver cache expirado, use-o como fallback
    if (citiesCache) {
      console.log('Usando cache expirado como fallback');
      return citiesCache.data;
    }
    
    throw new Error('Não foi possível carregar as cidades. Verifique sua conexão.');
  }
};

export const searchCitiesViaCep = async (query: string): Promise<CityResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const cities = await fetchBrazilianCitiesViaCep();
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const results = cities
      .filter(city => {
        const normalizedName = city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedState = city.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedStateCode = city.stateCode.toLowerCase();
        
        return normalizedName.includes(normalizedQuery) ||
               normalizedState.includes(normalizedQuery) ||
               normalizedStateCode.includes(normalizedQuery);
      })
      .slice(0, 10);
      
    console.log('Resultados filtrados:', results.length);
    return results;
  } catch (error) {
    console.error('Erro na busca:', error);
    throw error;
  }
};

export const geocodeCityViaCep = async (cityName: string, stateCode: string) => {
  try {
    const query = `${cityName}, ${stateCode}, Brazil`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=br`,
      { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'SuperConversor/1.0'
        }
      }
    );
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Geocoding request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        city: cityName,
        country: 'Brasil'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Não foi possível obter as coordenadas da cidade');
  }
};

// Função para limpar cache manualmente
export const clearCitiesCache = () => {
  citiesCache = null;
  console.log('Cache de cidades limpo');
};
