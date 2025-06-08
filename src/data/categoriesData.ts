
import { Calculator, Ruler, Weight, Thermometer, Square, Zap, Clock, Gauge, DollarSign, Bitcoin, TrendingUp, Heart, Activity, Utensils, Building, Home, Wrench, Users } from "lucide-react";

export const allCategories = [
  // Conversores de Unidades
  { 
    title: "Regra de Três", 
    description: "Resolva problemas de proporcionalidade", 
    icon: Calculator, 
    path: "/regra-de-tres", 
    color: "indigo", 
    type: "converter" 
  },
  { 
    title: "Conversor de Comprimento", 
    description: "Converta metros, pés, polegadas e mais", 
    icon: Ruler, 
    path: "/length", 
    color: "blue", 
    type: "converter" 
  },
  { 
    title: "Conversor de Peso", 
    description: "Converta quilos, libras, gramas e mais", 
    icon: Weight, 
    path: "/weight", 
    color: "green", 
    type: "converter" 
  },
  { 
    title: "Conversor de Volume", 
    description: "Converta litros, galões, mililitros e mais", 
    icon: Utensils, 
    path: "/volume", 
    color: "purple", 
    type: "converter" 
  },
  { 
    title: "Conversor de Temperatura", 
    description: "Converta Celsius, Fahrenheit e Kelvin", 
    icon: Thermometer, 
    path: "/temperature", 
    color: "orange", 
    type: "converter" 
  },
  { 
    title: "Conversor de Área", 
    description: "Converta metros quadrados, pés quadrados e mais", 
    icon: Square, 
    path: "/area", 
    color: "teal", 
    type: "converter" 
  },
  { 
    title: "Conversor de Energia", 
    description: "Converta joules, calorias, BTU e mais", 
    icon: Zap, 
    path: "/energy", 
    color: "yellow", 
    type: "converter" 
  },
  { 
    title: "Conversor de Tempo", 
    description: "Converta segundos, minutos, horas e mais", 
    icon: Clock, 
    path: "/time", 
    color: "indigo", 
    type: "converter" 
  },
  { 
    title: "Conversor de Velocidade", 
    description: "Converta km/h, mph, m/s e mais", 
    icon: Gauge, 
    path: "/speed", 
    color: "pink", 
    type: "converter" 
  },

  // Conversores Financeiros
  { 
    title: "Conversor de Moedas", 
    description: "Converta entre moedas com taxas atualizadas", 
    icon: DollarSign, 
    path: "/currency", 
    color: "emerald", 
    type: "financial" 
  },
  { 
    title: "Conversor de Criptomoedas", 
    description: "Converta Bitcoin, Ethereum e outras cripto", 
    icon: Bitcoin, 
    path: "/crypto", 
    color: "amber", 
    type: "financial" 
  },
  { 
    title: "Índices Financeiros", 
    description: "Acompanhe Selic, CDI, IPCA e mais", 
    icon: TrendingUp, 
    path: "/financial-indices", 
    color: "red", 
    type: "financial" 
  },

  // Calculadoras de Saúde
  { 
    title: "Calculadora de IMC", 
    description: "Calcule seu Índice de Massa Corporal", 
    icon: Heart, 
    path: "/imc", 
    color: "pink", 
    type: "health" 
  },
  { 
    title: "Calculadora de TMB", 
    description: "Calcule sua Taxa Metabólica Basal", 
    icon: Activity, 
    path: "/tmb", 
    color: "purple", 
    type: "health" 
  },
  { 
    title: "Calculadora de Calorias", 
    description: "Calcule suas necessidades calóricas diárias", 
    icon: Utensils, 
    path: "/calories", 
    color: "orange", 
    type: "health" 
  },

  // Calculadoras para Arquitetura e Engenharia
  { 
    title: "Calculadora de Concreto", 
    description: "Calcule materiais para concreto", 
    icon: Building, 
    path: "/concrete-calculator", 
    color: "stone", 
    type: "engineering" 
  },
  { 
    title: "Calculadora de Área de Construção", 
    description: "Calcule áreas e perímetros", 
    icon: Home, 
    path: "/construction-area", 
    color: "slate", 
    type: "engineering" 
  },
  { 
    title: "Calculadora Estrutural", 
    description: "Cálculos estruturais básicos", 
    icon: Wrench, 
    path: "/structural-calculator", 
    color: "zinc", 
    type: "engineering" 
  },
];
