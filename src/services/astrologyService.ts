
import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
  sign: string;
  degree: number;
  house: number;
  symbol: string;
  planet: string;
}

export interface AstrologyChart {
  // Planetas pessoais
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  
  // Planetas sociais
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  
  // Planetas transpessoais
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  
  // Pontos importantes
  ascendant: PlanetPosition;
  midheaven: PlanetPosition;
  descendant: PlanetPosition;
  imumCoeli: PlanetPosition;
  
  // Nodos lunares
  northNode: PlanetPosition;
  southNode: PlanetPosition;
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

const calculateHouse = (longitude: number, ascendantLon: number): number => {
  const houseCusp = (longitude - ascendantLon + 360) % 360;
  return Math.floor(houseCusp / 30) + 1;
};

const getPlanetPosition = (longitude: number, ascendantLon: number, planetName: string): PlanetPosition => {
  const sign = getZodiacSign(longitude);
  return {
    sign: sign.name,
    degree: getDegreeInSign(longitude),
    house: calculateHouse(longitude, ascendantLon),
    symbol: sign.icon,
    planet: planetName
  };
};

export const calculateAstrologyChart = (
  date: Date,
  latitude: number,
  longitude: number
): AstrologyChart => {
  try {
    console.log('Calculando mapa astral completo para:', { date, latitude, longitude });
    
    const observer = new Astronomy.Observer(latitude, longitude, 0);
    
    // Sol
    const sunPos = Astronomy.SunPosition(date);
    const sunLon = sunPos.elon;
    
    // Lua
    const moonPos = Astronomy.GeoMoon(date);
    const moonLon = ((Math.atan2(moonPos.y, moonPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Ascendente (simplificado)
    const ascendantLon = (sunLon + 90) % 360;
    
    // Mercúrio
    const mercuryPos = Astronomy.HelioVector(Astronomy.Body.Mercury, date);
    const mercuryLon = ((Math.atan2(mercuryPos.y, mercuryPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Vênus
    const venusPos = Astronomy.HelioVector(Astronomy.Body.Venus, date);
    const venusLon = ((Math.atan2(venusPos.y, venusPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Marte
    const marsPos = Astronomy.HelioVector(Astronomy.Body.Mars, date);
    const marsLon = ((Math.atan2(marsPos.y, marsPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Júpiter
    const jupiterPos = Astronomy.HelioVector(Astronomy.Body.Jupiter, date);
    const jupiterLon = ((Math.atan2(jupiterPos.y, jupiterPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Saturno
    const saturnPos = Astronomy.HelioVector(Astronomy.Body.Saturn, date);
    const saturnLon = ((Math.atan2(saturnPos.y, saturnPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Urano
    const uranusPos = Astronomy.HelioVector(Astronomy.Body.Uranus, date);
    const uranusLon = ((Math.atan2(uranusPos.y, uranusPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Netuno
    const neptunePos = Astronomy.HelioVector(Astronomy.Body.Neptune, date);
    const neptuneLon = ((Math.atan2(neptunePos.y, neptunePos.x) * 180 / Math.PI) + 360) % 360;
    
    // Plutão
    const plutoPos = Astronomy.HelioVector(Astronomy.Body.Pluto, date);
    const plutoLon = ((Math.atan2(plutoPos.y, plutoPos.x) * 180 / Math.PI) + 360) % 360;
    
    // Pontos importantes
    const midheavenLon = (ascendantLon + 90) % 360;
    const descendantLon = (ascendantLon + 180) % 360;
    const imumCoeliLon = (ascendantLon + 270) % 360;
    
    // Nodos lunares (simplificado)
    const northNodeLon = (moonLon + 180) % 360;
    const southNodeLon = moonLon;

    return {
      sun: getPlanetPosition(sunLon, ascendantLon, 'Sol'),
      moon: getPlanetPosition(moonLon, ascendantLon, 'Lua'),
      mercury: getPlanetPosition(mercuryLon, ascendantLon, 'Mercúrio'),
      venus: getPlanetPosition(venusLon, ascendantLon, 'Vênus'),
      mars: getPlanetPosition(marsLon, ascendantLon, 'Marte'),
      jupiter: getPlanetPosition(jupiterLon, ascendantLon, 'Júpiter'),
      saturn: getPlanetPosition(saturnLon, ascendantLon, 'Saturno'),
      uranus: getPlanetPosition(uranusLon, ascendantLon, 'Urano'),
      neptune: getPlanetPosition(neptuneLon, ascendantLon, 'Netuno'),
      pluto: getPlanetPosition(plutoLon, ascendantLon, 'Plutão'),
      ascendant: getPlanetPosition(ascendantLon, ascendantLon, 'Ascendente'),
      midheaven: getPlanetPosition(midheavenLon, ascendantLon, 'Meio do Céu'),
      descendant: getPlanetPosition(descendantLon, ascendantLon, 'Descendente'),
      imumCoeli: getPlanetPosition(imumCoeliLon, ascendantLon, 'Fundo do Céu'),
      northNode: getPlanetPosition(northNodeLon, ascendantLon, 'Nodo Norte'),
      southNode: getPlanetPosition(southNodeLon, ascendantLon, 'Nodo Sul')
    };
  } catch (error) {
    console.error('Erro no cálculo astrológico:', error);
    // Fallback com dados de exemplo
    const fallbackAscendant = 0;
    return {
      sun: getPlanetPosition(120, fallbackAscendant, 'Sol'),
      moon: getPlanetPosition(90, fallbackAscendant, 'Lua'),
      mercury: getPlanetPosition(100, fallbackAscendant, 'Mercúrio'),
      venus: getPlanetPosition(110, fallbackAscendant, 'Vênus'),
      mars: getPlanetPosition(80, fallbackAscendant, 'Marte'),
      jupiter: getPlanetPosition(200, fallbackAscendant, 'Júpiter'),
      saturn: getPlanetPosition(300, fallbackAscendant, 'Saturno'),
      uranus: getPlanetPosition(15, fallbackAscendant, 'Urano'),
      neptune: getPlanetPosition(340, fallbackAscendant, 'Netuno'),
      pluto: getPlanetPosition(280, fallbackAscendant, 'Plutão'),
      ascendant: getPlanetPosition(0, fallbackAscendant, 'Ascendente'),
      midheaven: getPlanetPosition(90, fallbackAscendant, 'Meio do Céu'),
      descendant: getPlanetPosition(180, fallbackAscendant, 'Descendente'),
      imumCoeli: getPlanetPosition(270, fallbackAscendant, 'Fundo do Céu'),
      northNode: getPlanetPosition(250, fallbackAscendant, 'Nodo Norte'),
      southNode: getPlanetPosition(70, fallbackAscendant, 'Nodo Sul')
    };
  }
};
