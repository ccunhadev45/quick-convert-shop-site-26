
export interface IBGECity {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
      };
    };
  };
}

export interface CityResult {
  id: number;
  name: string;
  state: string;
  stateCode: string;
  fullName: string;
}

// Cache para evitar múltiplas requisições
let citiesCache: CityResult[] | null = null;

export const fetchBrazilianCities = async (): Promise<CityResult[]> => {
  // Retorna cache se já foi carregado
  if (citiesCache) {
    return citiesCache;
  }

  try {
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome'
    );
    
    if (!response.ok) {
      throw new Error('Falha ao buscar cidades do IBGE');
    }
    
    const data: IBGECity[] = await response.json();
    
    citiesCache = data.map(city => ({
      id: city.id,
      name: city.nome,
      state: city.microrregiao.mesorregiao.UF.nome,
      stateCode: city.microrregiao.mesorregiao.UF.sigla,
      fullName: `${city.nome}, ${city.microrregiao.mesorregiao.UF.sigla}`
    }));
    
    return citiesCache;
  } catch (error) {
    console.error('Erro ao buscar cidades do IBGE:', error);
    throw error;
  }
};

export const searchCities = async (query: string): Promise<CityResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  const cities = await fetchBrazilianCities();
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  return cities
    .filter(city => {
      const normalizedName = city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedState = city.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedStateCode = city.stateCode.toLowerCase();
      
      return normalizedName.includes(normalizedQuery) ||
             normalizedState.includes(normalizedQuery) ||
             normalizedStateCode.includes(normalizedQuery);
    })
    .slice(0, 10); // Limita a 10 resultados para performance
};

// Função para geocodificar cidade brasileira
export const geocodeBrazilianCity = async (cityName: string, stateCode: string) => {
  try {
    const query = `${cityName}, ${stateCode}, Brazil`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=br`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
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
    return null;
  }
};
