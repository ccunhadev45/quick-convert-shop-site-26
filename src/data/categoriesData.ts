
import { Calculator, Ruler, Weight, Thermometer, Square, Zap, Clock, Gauge, DollarSign, Bitcoin, TrendingUp, Heart, Activity, Utensils, Building, Home, Wrench, Users, Star, Globe } from "lucide-react";

export const allCategories = [
  // Conversores de Unidades
  { 
    title: "Regra de Três", 
    description: "Resolva problemas de proporcionalidade", 
    icon: Calculator, 
    path: "/regra-de-tres", 
    color: "indigo", 
    type: "converter",
    conversionExample: {
      from: "5 : 10",
      to: "x : 20",
      value: "x = 10"
    }
  },
  { 
    title: "Conversor de Comprimento", 
    description: "Converta metros, pés, polegadas e mais", 
    icon: Ruler, 
    path: "/length", 
    color: "blue", 
    type: "converter",
    conversionExample: {
      from: "1 metro",
      to: "centímetros",
      value: "100 cm"
    }
  },
  { 
    title: "Conversor de Peso", 
    description: "Converta quilos, libras, gramas e mais", 
    icon: Weight, 
    path: "/weight", 
    color: "green", 
    type: "converter",
    conversionExample: {
      from: "1 kg",
      to: "libras",
      value: "2.20 lbs"
    }
  },
  { 
    title: "Conversor de Volume", 
    description: "Converta litros, galões, mililitros e mais", 
    icon: Utensils, 
    path: "/volume", 
    color: "purple", 
    type: "converter",
    conversionExample: {
      from: "1 litro",
      to: "mililitros",
      value: "1000 ml"
    }
  },
  { 
    title: "Conversor de Temperatura", 
    description: "Converta Celsius, Fahrenheit e Kelvin", 
    icon: Thermometer, 
    path: "/temperature", 
    color: "orange", 
    type: "converter",
    conversionExample: {
      from: "25°C",
      to: "Fahrenheit",
      value: "77°F"
    }
  },
  { 
    title: "Conversor de Área", 
    description: "Converta metros quadrados, pés quadrados e mais", 
    icon: Square, 
    path: "/area", 
    color: "teal", 
    type: "converter",
    conversionExample: {
      from: "1 m²",
      to: "pés quadrados",
      value: "10.76 ft²"
    }
  },
  { 
    title: "Conversor de Energia", 
    description: "Converta joules, calorias, BTU e mais", 
    icon: Zap, 
    path: "/energy", 
    color: "yellow", 
    type: "converter",
    conversionExample: {
      from: "1 kWh",
      to: "joules",
      value: "3.6 MJ"
    }
  },
  { 
    title: "Conversor de Tempo", 
    description: "Converta segundos, minutos, horas e mais", 
    icon: Clock, 
    path: "/time", 
    color: "indigo", 
    type: "converter",
    conversionExample: {
      from: "1 hora",
      to: "minutos",
      value: "60 min"
    }
  },
  { 
    title: "Conversor de Velocidade", 
    description: "Converta km/h, mph, m/s e mais", 
    icon: Gauge, 
    path: "/speed", 
    color: "pink", 
    type: "converter",
    conversionExample: {
      from: "100 km/h",
      to: "m/s",
      value: "27.78 m/s"
    }
  },

  // Conversores Financeiros
  { 
    title: "Conversor de Moedas", 
    description: "Converta entre moedas com taxas atualizadas", 
    icon: DollarSign, 
    path: "/currency", 
    color: "emerald", 
    type: "financial",
    conversionExample: {
      from: "1 USD",
      to: "BRL",
      value: "R$ 5.60"
    }
  },
  { 
    title: "Conversor de Criptomoedas", 
    description: "Converta Bitcoin, Ethereum e outras cripto", 
    icon: Bitcoin, 
    path: "/crypto", 
    color: "amber", 
    type: "financial",
    conversionExample: {
      from: "1 BTC",
      to: "USD",
      value: "$105,543"
    }
  },
  { 
    title: "Índices Financeiros", 
    description: "Acompanhe Selic, CDI, IPCA e mais", 
    icon: TrendingUp, 
    path: "/financial-indices", 
    color: "red", 
    type: "financial",
    conversionExample: {
      from: "Taxa Selic",
      to: "atual",
      value: "14.75% a.a."
    }
  },

  // Calculadoras de Saúde
  { 
    title: "Calculadora de IMC", 
    description: "Calcule seu Índice de Massa Corporal", 
    icon: Heart, 
    path: "/imc", 
    color: "pink", 
    type: "health",
    conversionExample: {
      from: "70kg / 1.75m",
      to: "IMC",
      value: "22.9"
    }
  },
  { 
    title: "Calculadora de TMB", 
    description: "Calcule sua Taxa Metabólica Basal", 
    icon: Activity, 
    path: "/tmb", 
    color: "purple", 
    type: "health",
    conversionExample: {
      from: "Homem 30 anos",
      to: "TMB",
      value: "1,680 kcal/dia"
    }
  },
  { 
    title: "Calculadora de Calorias", 
    description: "Calcule suas necessidades calóricas diárias", 
    icon: Utensils, 
    path: "/calories", 
    color: "orange", 
    type: "health",
    conversionExample: {
      from: "Ativo moderado",
      to: "necessidade",
      value: "2,200 kcal/dia"
    }
  },

  // Calculadoras para Arquitetura e Engenharia
  { 
    title: "Calculadora de Concreto", 
    description: "Calcule materiais para concreto", 
    icon: Building, 
    path: "/concrete-calculator", 
    color: "stone", 
    type: "engineering",
    conversionExample: {
      from: "1 m³ concreto",
      to: "materiais",
      value: "320kg cimento"
    }
  },
  { 
    title: "Calculadora de Área de Construção", 
    description: "Calcule áreas e perímetros", 
    icon: Home, 
    path: "/construction-area", 
    color: "slate", 
    type: "engineering",
    conversionExample: {
      from: "10m x 12m",
      to: "área",
      value: "120 m²"
    }
  },
  { 
    title: "Calculadora Estrutural", 
    description: "Cálculos estruturais básicos", 
    icon: Wrench, 
    path: "/structural-calculator", 
    color: "zinc", 
    type: "engineering",
    conversionExample: {
      from: "Viga 6m",
      to: "carga max",
      value: "2.5 ton/m²"
    }
  },

  // Calculadoras de Astrologia
  { 
    title: "Mapa Astral", 
    description: "Gere seu mapa astral completo", 
    icon: Star, 
    path: "/birth-chart", 
    color: "purple", 
    type: "astrology",
    conversionExample: {
      from: "Data/hora/local",
      to: "mapa astral",
      value: "Sol em Leão"
    }
  },

  // Calculadoras Astronômicas
  { 
    title: "Distância dos Astros", 
    description: "Calcule distâncias e tempo de viagem espacial", 
    icon: Globe, 
    path: "/astronomical-distance", 
    color: "cyan", 
    type: "astronomical",
    conversionExample: {
      from: "Terra → Marte",
      to: "distância",
      value: "225 milhões km"
    }
  },
];
