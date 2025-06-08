import {
  Calculator,
  LayoutDashboard,
  LineChart,
  Percent,
  Scale,
  Thermometer,
  Ruler,
  Package,
  Clock,
  Gauge,
  Coins,
  Bitcoin,
  Activity,
  User,
  Flame,
  Aperture,
  Construction,
  Waves,
  Code,
  Palette,
  Droplet,
  FileText,
  Wheat,
  Truck,
  TrendingUp,
  Book,
  Gamepad2,
  Plane,
  Video,
  ChefHat,
  Shirt,
  Leaf,
  PawPrint,
  Heart,
  Brain,
  Shield,
  Star,
  Telescope,
  Globe
} from "lucide-react";

export interface CategoryCard {
  title: string;
  description: string;
  icon: any;
  path: string;
  type: string;
  color: string;
  tags?: string[];
  premium?: boolean;
  implemented: boolean; // Nova flag para distinguir páginas implementadas
}

// Dados unificados com flag de implementação
export const unifiedCategories: CategoryCard[] = [
  // Conversores de Unidades - IMPLEMENTADOS
  {
    title: "Conversor de Comprimento",
    description: "Converter entre diferentes unidades de comprimento",
    icon: Ruler,
    path: "/length",
    type: "converter",
    color: "blue",
    tags: ["comprimento", "metros", "polegadas", "pés"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Peso",
    description: "Converter entre diferentes unidades de peso",
    icon: Scale,
    path: "/weight",
    type: "converter",
    color: "green",
    tags: ["peso", "quilogramas", "gramas", "libras"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Volume",
    description: "Converter entre diferentes unidades de volume",
    icon: Package,
    path: "/volume",
    type: "converter",
    color: "purple",
    tags: ["volume", "litros", "mililitros", "galões"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Temperatura",
    description: "Converter entre diferentes unidades de temperatura",
    icon: Thermometer,
    path: "/temperature",
    type: "converter",
    color: "orange",
    tags: ["temperatura", "celsius", "fahrenheit", "kelvin"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Área",
    description: "Converter entre diferentes unidades de área",
    icon: LayoutDashboard,
    path: "/area",
    type: "converter",
    color: "teal",
    tags: ["área", "metros quadrados", "hectares", "acres"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Energia",
    description: "Converter entre diferentes unidades de energia",
    icon: Flame,
    path: "/energy",
    type: "converter",
    color: "yellow",
    tags: ["energia", "joules", "calorias", "watts"],
    premium: false,
    implemented: false
  },
  {
    title: "Conversor de Tempo",
    description: "Converter entre diferentes unidades de tempo",
    icon: Clock,
    path: "/time",
    type: "converter",
    color: "indigo",
    tags: ["tempo", "segundos", "minutos", "horas"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Velocidade",
    description: "Converter entre diferentes unidades de velocidade",
    icon: Gauge,
    path: "/speed",
    type: "converter",
    color: "pink",
    tags: ["velocidade", "km/h", "m/s", "mph"],
    premium: false,
    implemented: true
  },

  // Conversores de Base Numérica - ALTA PRIORIDADE
  {
    title: "Conversor de Base Numérica",
    description: "Converter entre diferentes bases numéricas",
    icon: Code,
    path: "/number-base-converter",
    type: "scientific",
    color: "gray",
    tags: ["base numérica", "binário", "decimal", "hexadecimal"],
    premium: false,
    implemented: false
  },

  // Saúde - IMPLEMENTADOS
  {
    title: "Calculadora de IMC",
    description: "Calcular o Índice de Massa Corporal (IMC)",
    icon: User,
    path: "/imc",
    type: "health",
    color: "pink",
    tags: ["imc", "índice de massa corporal", "peso", "altura"],
    premium: false,
    implemented: false
  },
  {
    title: "Calculadora de TMB",
    description: "Calcular a Taxa Metabólica Basal (TMB)",
    icon: Activity,
    path: "/tmb",
    type: "health",
    color: "purple",
    tags: ["tmb", "taxa metabólica basal", "energia", "metabolismo"],
    premium: false,
    implemented: false
  },
  {
    title: "Calculadora de Calorias",
    description: "Calcular as calorias diárias necessárias",
    icon: Flame,
    path: "/calorie-calculator",
    type: "health",
    color: "orange",
    tags: ["calorias", "energia", "dieta", "nutrição"],
    premium: false,
    implemented: false
  },

  // Financeiros - IMPLEMENTADOS PARCIALMENTE
  {
    title: "Conversor de Moedas",
    description: "Converter entre diferentes moedas",
    icon: Coins,
    path: "/currency",
    type: "financial",
    color: "emerald",
    tags: ["moedas", "dólar", "euro", "real"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor de Criptomoedas",
    description: "Converter entre diferentes criptomoedas",
    icon: Bitcoin,
    path: "/crypto",
    type: "financial",
    color: "amber",
    tags: ["criptomoedas", "bitcoin", "ethereum", "litecoin"],
    premium: false,
    implemented: false
  },
  {
    title: "Calculadora de Juros",
    description: "Calcular juros simples e compostos",
    icon: Calculator,
    path: "/interest",
    type: "financial",
    color: "blue",
    tags: ["juros", "investimento", "financeiro"],
    premium: false,
    implemented: true
  },

  // Calculadoras - IMPLEMENTADOS PARCIALMENTE
  {
    title: "Calculadora de Combustível",
    description: "Calcular o consumo de combustível de um veículo",
    icon: FileText,
    path: "/fuel",
    type: "productivity",
    color: "orange",
    tags: ["combustível", "consumo", "veículo", "gasolina"],
    premium: false,
    implemented: true
  },
  {
    title: "Conversor Culinário",
    description: "Converter medidas culinárias",
    icon: ChefHat,
    path: "/cooking",
    type: "culinary",
    color: "green",
    tags: ["culinária", "receitas", "medidas"],
    premium: false,
    implemented: true
  },
  {
    title: "Calculadora de Gorjeta",
    description: "Calcular o valor da gorjeta",
    icon: Coins,
    path: "/tip",
    type: "travel",
    color: "emerald",
    tags: ["gorjeta", "cálculo", "serviço", "viagem"],
    premium: false,
    implemented: true
  },

  // Calculadoras Avançadas - NÃO IMPLEMENTADAS
  {
    title: "Calculadora de Empréstimo",
    description: "Calcular parcelas e juros de empréstimos",
    icon: Calculator,
    path: "/loan",
    type: "financial",
    color: "red",
    tags: ["empréstimo", "financiamento", "parcelas"],
    premium: false,
    implemented: true
  },
  {
    title: "Calculadora de Hipoteca",
    description: "Calcular financiamento imobiliário",
    icon: Calculator,
    path: "/mortgage",
    type: "financial",
    color: "blue",
    tags: ["hipoteca", "imóvel", "financiamento"],
    premium: false,
    implemented: true
  },

  // Astrologia
  {
    title: "Mapa Astral",
    description: "Calcular o mapa astral de uma pessoa",
    icon: Star,
    path: "/birth-chart",
    type: "astrology",
    color: "purple",
    tags: ["mapa astral", "astrologia", "signos", "ascendente"],
    premium: false,
    implemented: false
  },

  // Astronomia
  {
    title: "Distância Astronômica",
    description: "Calcular distâncias astronômicas",
    icon: Telescope,
    path: "/astronomical-distance",
    type: "astronomical",
    color: "cyan",
    tags: ["astronomia", "distância", "espaço", "luz"],
    premium: false,
    implemented: false
  },

  // Educação
  {
    title: "Unidades Educacionais",
    description: "Converter unidades educacionais (créditos, horas)",
    icon: Clock,
    path: "/educational-units",
    type: "student",
    color: "indigo",
    tags: ["unidades", "créditos", "horas", "educação"],
    premium: false,
    implemented: true
  },
  {
    title: "Calculadora de Data",
    description: "Calcular diferenças entre datas",
    icon: Clock,
    path: "/date-calculator",
    type: "productivity",
    color: "blue",
    tags: ["data", "tempo", "cálculo"],
    premium: false,
    implemented: true
  },

  // Gaming
  {
    title: "FPS Converter",
    description: "Converter quadros por segundo (FPS)",
    icon: Gamepad2,
    path: "/fps-converter",
    type: "gaming",
    color: "blue",
    tags: ["fps", "quadros", "conversão", "jogos"],
    premium: false,
    implemented: false
  },
  {
    title: "Moeda de Jogos",
    description: "Converter moedas de jogos",
    icon: Coins,
    path: "/game-currency",
    type: "gaming",
    color: "emerald",
    tags: ["moeda", "jogos", "conversão", "virtual"],
    premium: false,
    implemented: false
  },

  // Científicas
  {
    title: "Calculadora de Física",
    description: "Realizar cálculos de física básica",
    icon: Aperture,
    path: "/physics-calculator",
    type: "scientific",
    color: "blue",
    tags: ["física", "cálculo", "mecânica", "termodinâmica"],
    premium: false,
    implemented: false
  },
  {
    title: "Calculadora de Química",
    description: "Realizar cálculos de química básica",
    icon: Droplet,
    path: "/chemistry-calculator",
    type: "scientific",
    color: "green",
    tags: ["química", "cálculo", "reações", "elementos"],
    premium: false,
    implemented: false
  },
  {
    title: "Calculadora de Matemática",
    description: "Realizar cálculos matemáticos básicos",
    icon: LineChart,
    path: "/math-calculator",
    type: "scientific",
    color: "purple",
    tags: ["matemática", "cálculo", "álgebra", "geometria"],
    premium: false,
    implemented: false
  },

  // Engenharia
  {
    title: "Calculadora de Concreto",
    description: "Calcular a quantidade de materiais para concreto",
    icon: Construction,
    path: "/concrete-calculator",
    type: "engineering",
    color: "stone",
    tags: ["concreto", "cimento", "areia", "brita"],
    premium: false,
    implemented: false
  },

  // Programação
  {
    title: "Conversor de Cores",
    description: "Converter entre diferentes formatos de cores",
    icon: Palette,
    path: "/color-converter",
    type: "programming",
    color: "pink",
    tags: ["cores", "hexadecimal", "rgb", "hsl"],
    premium: false,
    implemented: false
  },
  {
    title: "Conversor de Encoding",
    description: "Base64, URL encoding, HTML entities",
    icon: Code,
    path: "/encoding-converter",
    type: "programming",
    color: "indigo",
    tags: ["encoding", "base64", "url", "programação"],
    premium: false,
    implemented: false
  }
];

// Função para obter categorias agrupadas por tipo
export const getGroupedCategories = () => {
  const grouped: { [key: string]: CategoryCard[] } = {};
  
  unifiedCategories.forEach(category => {
    if (!grouped[category.type]) {
      grouped[category.type] = [];
    }
    grouped[category.type].push(category);
  });
  
  return grouped;
};

// Função para obter apenas categorias implementadas
export const getImplementedCategories = () => {
  return unifiedCategories.filter(category => category.implemented);
};

// Função para obter categorias não implementadas
export const getNotImplementedCategories = () => {
  return unifiedCategories.filter(category => !category.implemented);
};

// Função para verificar se uma rota está implementada
export const isRouteImplemented = (path: string) => {
  const category = unifiedCategories.find(cat => cat.path === path);
  return category ? category.implemented : false;
};

// Export compatível com o sistema atual
export const allEnhancedCategories = unifiedCategories;