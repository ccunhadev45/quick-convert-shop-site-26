
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

// Cache para cidades
let citiesCache: CityResult[] | null = null;

export const fetchBrazilianCitiesViaCep = async (): Promise<CityResult[]> => {
  if (citiesCache) {
    return citiesCache;
  }

  try {
    console.log('Buscando cidades do IBGE...');
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome'
    );
    
    if (!response.ok) {
      throw new Error('Falha ao buscar cidades');
    }
    
    const data = await response.json();
    console.log('Cidades carregadas:', data.length);
    
    citiesCache = data.map((city: any) => ({
      id: city.id.toString(),
      name: city.nome,
      state: city.microrregiao.mesorregiao.UF.nome,
      stateCode: city.microrregiao.mesorregiao.UF.sigla,
      fullName: `${city.nome}, ${city.microrregiao.mesorregiao.UF.sigla}`
    }));
    
    return citiesCache;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
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
    return [];
  }
};

export const geocodeCityViaCep = async (cityName: string, stateCode: string) => {
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
