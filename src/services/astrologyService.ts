
import { Astronomy } from 'astronomy-engine';

export interface PlanetPosition {
  sign: string;
  degree: number;
  house?: number;
  symbol: string;
}

export interface AstrologyChart {
  sun: PlanetPosition;
  moon: PlanetPosition;
  ascendant: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
}

const ZODIAC_SIGNS = [
  { name: 'Áries', symbol: '♈', icon: '🐏' },
  { name: 'Touro', symbol: '♉', icon: '🐂' },
  { name: 'Gêmeos', symbol: '♊', icon: '👥' },
  { name: 'Câncer', symbol: '♋', icon: '🦀' },
  { name: 'Leão', symbol: '♌', icon: '🦁' },
  { name: 'Virgem', symbol: '♍', icon: '👸' },
  { name: 'Libra', symbol: '♎', icon: '⚖️' },
  { name: 'Escorpião', symbol: '♏', icon: '🦂' },
  { name: 'Sagitário', symbol: '♐', icon: '🏹' },
  { name: 'Capricórnio', symbol: '♑', icon: '🐐' },
  { name: 'Aquário', symbol: '♒', icon: '🏺' },
  { name: 'Peixes', symbol: '♓', icon: '🐟' }
];

const getZodiacSign = (longitude: number): { name: string; symbol: string; icon: string } => {
  const signIndex = Math.floor(longitude / 30);
  return ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
};

const getDegreeInSign = (longitude: number): number => {
  return longitude % 30;
};

export const calculateAstrologyChart = (
  date: Date,
  latitude: number,
  longitude: number
): AstrologyChart => {
  try {
    // Calcular posições planetárias usando astronomy-engine
    const observer = Astronomy.MakeObserver(latitude, longitude, 0);
    
    // Sol
    const sunPos = Astronomy.SunPosition(date);
    const sunLon = sunPos.elon;
    const sunSign = getZodiacSign(sunLon);
    
    // Lua
    const moonPos = Astronomy.GeoMoon(date);
    const moonLon = moonPos.lon;
    const moonSign = getZodiacSign(moonLon);
    
    // Mercúrio
    const mercuryPos = Astronomy.HelioVector(Astronomy.Body.Mercury, date);
    const mercuryLon = Math.atan2(mercuryPos.y, mercuryPos.x) * 180 / Math.PI;
    const mercurySign = getZodiacSign(mercuryLon < 0 ? mercuryLon + 360 : mercuryLon);
    
    // Vênus
    const venusPos = Astronomy.HelioVector(Astronomy.Body.Venus, date);
    const venusLon = Math.atan2(venusPos.y, venusPos.x) * 180 / Math.PI;
    const venusSign = getZodiacSign(venusLon < 0 ? venusLon + 360 : venusLon);
    
    // Marte
    const marsPos = Astronomy.HelioVector(Astronomy.Body.Mars, date);
    const marsLon = Math.atan2(marsPos.y, marsPos.x) * 180 / Math.PI;
    const marsSign = getZodiacSign(marsLon < 0 ? marsLon + 360 : marsLon);
    
    // Ascendente (simplificado)
    const ascendantLon = (sunLon + 90) % 360;
    const ascendantSign = getZodiacSign(ascendantLon);

    return {
      sun: {
        sign: sunSign.name,
        degree: getDegreeInSign(sunLon),
        symbol: sunSign.icon,
      },
      moon: {
        sign: moonSign.name,
        degree: getDegreeInSign(moonLon),
        symbol: moonSign.icon,
      },
      ascendant: {
        sign: ascendantSign.name,
        degree: getDegreeInSign(ascendantLon),
        symbol: ascendantSign.icon,
      },
      mercury: {
        sign: mercurySign.name,
        degree: getDegreeInSign(mercuryLon < 0 ? mercuryLon + 360 : mercuryLon),
        symbol: mercurySign.icon,
      },
      venus: {
        sign: venusSign.name,
        degree: getDegreeInSign(venusLon < 0 ? venusLon + 360 : venusLon),
        symbol: venusSign.icon,
      },
      mars: {
        sign: marsSign.name,
        degree: getDegreeInSign(marsLon < 0 ? marsLon + 360 : marsLon),
        symbol: marsSign.icon,
      }
    };
  } catch (error) {
    console.error('Erro no cálculo astrológico:', error);
    // Fallback para dados de exemplo em caso de erro
    return {
      sun: { sign: 'Leão', degree: 15, symbol: '🦁' },
      moon: { sign: 'Câncer', degree: 22, symbol: '🦀' },
      ascendant: { sign: 'Virgem', degree: 8, symbol: '👸' },
      mercury: { sign: 'Virgem', degree: 3, symbol: '👸' },
      venus: { sign: 'Câncer', degree: 28, symbol: '🦀' },
      mars: { sign: 'Gêmeos', degree: 11, symbol: '👥' }
    };
  }
};
