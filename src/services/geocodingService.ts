
export interface GeocodingResult {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export const geocodeCity = async (cityQuery: string): Promise<GeocodingResult | null> => {
  try {
    // Usando OpenStreetMap Nominatim API (gratuita)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=1`
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
        city: result.display_name.split(',')[0],
        country: result.display_name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
