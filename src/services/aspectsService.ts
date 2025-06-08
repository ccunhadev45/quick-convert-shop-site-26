
export interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: AspectType;
  orb: number;
  description: string;
  meaning: string;
}

export type AspectType = 'conjuncao' | 'oposicao' | 'trigono' | 'quadratura' | 'sextil' | 'quinquincio';

const ASPECT_DEFINITIONS = {
  conjuncao: { angle: 0, orb: 8, name: 'Conjunção', symbol: '☌' },
  oposicao: { angle: 180, orb: 8, name: 'Oposição', symbol: '☍' },
  trigono: { angle: 120, orb: 6, name: 'Trígono', symbol: '△' },
  quadratura: { angle: 90, orb: 6, name: 'Quadratura', symbol: '□' },
  sextil: { angle: 60, orb: 4, name: 'Sextil', symbol: '⚹' },
  quinquincio: { angle: 150, orb: 3, name: 'Quinquíncio', symbol: '⚻' }
};

const ASPECT_MEANINGS = {
  conjuncao: 'União e intensificação das energias planetárias',
  oposicao: 'Tensão e polarização que busca equilíbrio',
  trigono: 'Fluxo harmonioso e facilidade natural',
  quadratura: 'Desafio que promove crescimento através do esforço',
  sextil: 'Oportunidade e cooperação harmoniosa',
  quinquincio: 'Ajuste necessário entre energias incompatíveis'
};

export const calculateAspects = (planets: Record<string, { degree: number; planet: string }>): Aspect[] => {
  const aspects: Aspect[] = [];
  const planetKeys = Object.keys(planets);
  
  for (let i = 0; i < planetKeys.length; i++) {
    for (let j = i + 1; j < planetKeys.length; j++) {
      const planet1 = planets[planetKeys[i]];
      const planet2 = planets[planetKeys[j]];
      
      const angle = Math.abs(planet1.degree - planet2.degree);
      const normalizedAngle = angle > 180 ? 360 - angle : angle;
      
      Object.entries(ASPECT_DEFINITIONS).forEach(([type, definition]) => {
        const orb = Math.abs(normalizedAngle - definition.angle);
        if (orb <= definition.orb) {
          aspects.push({
            planet1: planet1.planet,
            planet2: planet2.planet,
            angle: normalizedAngle,
            type: type as AspectType,
            orb,
            description: `${planet1.planet} ${definition.symbol} ${planet2.planet}`,
            meaning: ASPECT_MEANINGS[type as AspectType]
          });
        }
      });
    }
  }
  
  return aspects.sort((a, b) => a.orb - b.orb);
};
