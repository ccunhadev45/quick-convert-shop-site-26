
import { Ruler, Weight, Beaker, Thermometer, Square, Zap, Clock, Gauge, Calculator, Heart, Apple, DollarSign, TrendingUp, Bitcoin, Compass, Building } from "lucide-react";

export const allCategories = [
  // Conversores
  {
    title: "Comprimento",
    description: "Metro, pé, polegada, quilômetro",
    icon: Ruler,
    path: "/length",
    color: "blue",
    type: "converter",
    conversionExample: {
      from: "1 metro",
      to: "pés",
      value: "3.28084 ft"
    }
  },
  {
    title: "Peso",
    description: "Quilograma, libra, onça, tonelada",
    icon: Weight,
    path: "/weight",
    color: "green",
    type: "converter",
    conversionExample: {
      from: "1 kg",
      to: "libras",
      value: "2.20462 lb"
    }
  },
  {
    title: "Volume",
    description: "Litro, galão, mililitro, metro cúbico",
    icon: Beaker,
    path: "/volume",
    color: "purple",
    type: "converter",
    conversionExample: {
      from: "1 litro",
      to: "galões",
      value: "0.264172 gal"
    }
  },
  {
    title: "Temperatura",
    description: "Celsius, Fahrenheit, Kelvin",
    icon: Thermometer,
    path: "/temperature",
    color: "orange",
    type: "converter",
    conversionExample: {
      from: "0°C",
      to: "Fahrenheit",
      value: "32°F"
    }
  },
  {
    title: "Área",
    description: "Metro quadrado, acre, hectare",
    icon: Square,
    path: "/area",
    color: "teal",
    type: "converter",
    conversionExample: {
      from: "1 m²",
      to: "pés²",
      value: "10.7639 ft²"
    }
  },
  {
    title: "Energia",
    description: "Joule, caloria, watt-hora",
    icon: Zap,
    path: "/energy",
    color: "yellow",
    type: "converter",
    conversionExample: {
      from: "1 kWh",
      to: "joules",
      value: "3.6e+6 J"
    }
  },
  {
    title: "Tempo",
    description: "Segundo, minuto, hora, dia",
    icon: Clock,
    path: "/time",
    color: "indigo",
    type: "converter",
    conversionExample: {
      from: "1 hora",
      to: "segundos",
      value: "3600 s"
    }
  },
  {
    title: "Velocidade",
    description: "km/h, mph, m/s, nó",
    icon: Gauge,
    path: "/speed",
    color: "pink",
    type: "converter",
    conversionExample: {
      from: "100 km/h",
      to: "mph",
      value: "62.137 mph"
    }
  },
  // Conversores Financeiros
  {
    title: "Moedas Fiduciárias",
    description: "Real, Dólar, Euro, Libra",
    icon: DollarSign,
    path: "/currency",
    color: "cyan",
    type: "financial",
    conversionExample: {
      from: "1 USD",
      to: "BRL",
      value: "R$ 5.20"
    }
  },
  {
    title: "Criptomoedas",
    description: "Bitcoin, Ethereum, BNB, Cardano",
    icon: Bitcoin,
    path: "/crypto",
    color: "amber",
    type: "financial",
    conversionExample: {
      from: "1 BTC",
      to: "USD",
      value: "$42,500.00"
    }
  },
  {
    title: "Índices Financeiros",
    description: "Inflação, juros, taxas",
    icon: TrendingUp,
    path: "/financial-indices",
    color: "emerald",
    type: "financial",
    conversionExample: {
      from: "Taxa Selic",
      to: "Anual",
      value: "11.75%"
    }
  },
  // Calculadoras de Saúde
  {
    title: "Calculadora IMC",
    description: "Índice de Massa Corporal",
    icon: Calculator,
    path: "/imc",
    color: "red",
    type: "health"
  },
  {
    title: "Taxa Metabólica Basal",
    description: "Calorias diárias necessárias",
    icon: Heart,
    path: "/tmb",
    color: "emerald",
    type: "health"
  },
  {
    title: "Calculadora de Calorias",
    description: "Calorias e macros dos alimentos",
    icon: Apple,
    path: "/calories",
    color: "green",
    type: "health"
  },
  // Calculadoras para Arquitetura e Engenharia
  {
    title: "Calculadora de Concreto",
    description: "Volume e materiais para concreto",
    icon: Building,
    path: "/concrete-calculator",
    color: "slate",
    type: "engineering"
  },
  {
    title: "Calculadora de Área Construída",
    description: "Área total e útil de construções",
    icon: Compass,
    path: "/construction-area",
    color: "stone",
    type: "engineering"
  },
  {
    title: "Calculadora de Estruturas",
    description: "Cálculos de vigas e pilares",
    icon: Square,
    path: "/structural-calculator",
    color: "zinc",
    type: "engineering"
  }
];
