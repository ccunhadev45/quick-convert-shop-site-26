
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
  Telescope
} from "lucide-react";

export type CategoryCard = {
  title: string;
  description: string;
  icon: any;
  path: string;
  type: string;
  color: string;
  tags?: string[];
  premium?: boolean;
};

const converterCategories: CategoryCard[] = [
  {
    title: "Conversor de Comprimento",
    description: "Converter entre diferentes unidades de comprimento",
    icon: Ruler,
    path: "/length",
    type: "converter",
    color: "blue",
    tags: ["comprimento", "metros", "polegadas", "pés"],
    premium: false
  },
  {
    title: "Conversor de Peso",
    description: "Converter entre diferentes unidades de peso",
    icon: Scale,
    path: "/weight",
    type: "converter",
    color: "green",
    tags: ["peso", "quilogramas", "gramas", "libras"],
    premium: false
  },
  {
    title: "Conversor de Volume",
    description: "Converter entre diferentes unidades de volume",
    icon: Package,
    path: "/volume",
    type: "converter",
    color: "purple",
    tags: ["volume", "litros", "mililitros", "galões"],
    premium: false
  },
  {
    title: "Conversor de Temperatura",
    description: "Converter entre diferentes unidades de temperatura",
    icon: Thermometer,
    path: "/temperature",
    type: "converter",
    color: "orange",
    tags: ["temperatura", "celsius", "fahrenheit", "kelvin"],
    premium: false
  },
  {
    title: "Conversor de Área",
    description: "Converter entre diferentes unidades de área",
    icon: LayoutDashboard,
    path: "/area",
    type: "converter",
    color: "teal",
    tags: ["área", "metros quadrados", "hectares", "acres"],
    premium: false
  },
  {
    title: "Conversor de Energia",
    description: "Converter entre diferentes unidades de energia",
    icon: Flame,
    path: "/energy",
    type: "converter",
    color: "yellow",
    tags: ["energia", "joules", "calorias", "watts"],
    premium: false
  },
  {
    title: "Conversor de Tempo",
    description: "Converter entre diferentes unidades de tempo",
    icon: Clock,
    path: "/time",
    type: "converter",
    color: "indigo",
    tags: ["tempo", "segundos", "minutos", "horas"],
    premium: false
  },
  {
    title: "Conversor de Velocidade",
    description: "Converter entre diferentes unidades de velocidade",
    icon: Gauge,
    path: "/speed",
    type: "converter",
    color: "pink",
    tags: ["velocidade", "km/h", "m/s", "mph"],
    premium: false
  }
];

const healthCategories: CategoryCard[] = [
  {
    title: "Calculadora de IMC",
    description: "Calcular o Índice de Massa Corporal (IMC)",
    icon: User,
    path: "/imc",
    type: "health",
    color: "pink",
    tags: ["imc", "índice de massa corporal", "peso", "altura"],
    premium: false
  },
  {
    title: "Calculadora de TMB",
    description: "Calcular a Taxa Metabólica Basal (TMB)",
    icon: Activity,
    path: "/tmb",
    type: "health",
    color: "purple",
    tags: ["tmb", "taxa metabólica basal", "energia", "metabolismo"],
    premium: false
  },
  {
    title: "Calculadora de Calorias",
    description: "Calcular as calorias diárias necessárias",
    icon: Flame,
    path: "/calories",
    type: "health",
    color: "orange",
    tags: ["calorias", "energia", "dieta", "nutrição"],
    premium: false
  }
];

const engineeringCategories: CategoryCard[] = [
  {
    title: "Calculadora de Concreto",
    description: "Calcular a quantidade de materiais para concreto",
    icon: Construction,
    path: "/concrete-calculator",
    type: "engineering",
    color: "stone",
    tags: ["concreto", "cimento", "areia", "brita"],
    premium: false
  },
  {
    title: "Calculadora de Área de Construção",
    description: "Calcular a área de construção de um edifício",
    icon: LayoutDashboard,
    path: "/construction-area",
    type: "engineering",
    color: "slate",
    tags: ["área", "construção", "edifício", "engenharia"],
    premium: false
  },
  {
    title: "Calculadora Estrutural",
    description: "Realizar cálculos estruturais básicos",
    icon: Waves,
    path: "/structural-calculator",
    type: "engineering",
    color: "zinc",
    tags: ["estrutural", "cálculo", "engenharia", "estrutura"],
    premium: false
  }
];

const scientificCategories: CategoryCard[] = [
  {
    title: "Calculadora de Física",
    description: "Realizar cálculos de física básica",
    icon: Aperture,
    path: "/physics-calculator",
    type: "scientific",
    color: "blue",
    tags: ["física", "cálculo", "mecânica", "termodinâmica"],
    premium: false
  },
  {
    title: "Calculadora de Química",
    description: "Realizar cálculos de química básica",
    icon: Droplet,
    path: "/chemistry-calculator",
    type: "scientific",
    color: "green",
    tags: ["química", "cálculo", "reações", "elementos"],
    premium: false
  },
  {
    title: "Calculadora de Matemática",
    description: "Realizar cálculos matemáticos básicos",
    icon: LineChart,
    path: "/math-calculator",
    type: "scientific",
    color: "purple",
    tags: ["matemática", "cálculo", "álgebra", "geometria"],
    premium: false
  },
  {
    title: "Conversor de Base Numérica",
    description: "Converter entre diferentes bases numéricas",
    icon: Code,
    path: "/number-base-converter",
    type: "scientific",
    color: "gray",
    tags: ["base numérica", "binário", "decimal", "hexadecimal"],
    premium: false
  }
];

const financialCategories: CategoryCard[] = [
  {
    title: "Conversor de Moedas",
    description: "Converter entre diferentes moedas",
    icon: Coins,
    path: "/currency",
    type: "financial",
    color: "emerald",
    tags: ["moedas", "dólar", "euro", "real"],
    premium: false
  },
  {
    title: "Conversor de Criptomoedas",
    description: "Converter entre diferentes criptomoedas",
    icon: Bitcoin,
    path: "/crypto",
    type: "financial",
    color: "amber",
    tags: ["criptomoedas", "bitcoin", "ethereum", "litecoin"],
    premium: false
  },
  {
    title: "Índices Financeiros",
    description: "Acompanhar os principais índices financeiros",
    icon: LineChart,
    path: "/financial-indices",
    type: "financial",
    color: "red",
    tags: ["índices financeiros", "ibovespa", "s&p 500", "dólar"],
    premium: false
  }
];

const productivityCategories: CategoryCard[] = [
  {
    title: "Calculadora de Regra de Três",
    description: "Resolver problemas de regra de três simples e composta",
    icon: Percent,
    path: "/regra-de-tres",
    type: "productivity",
    color: "indigo",
    tags: ["regra de três", "proporção", "cálculo", "matemática"],
    premium: false
  },
  {
    title: "Calculadora de Combustível",
    description: "Calcular o consumo de combustível de um veículo",
    icon: FileText,
    path: "/fuel-calculator",
    type: "productivity",
    color: "orange",
    tags: ["combustível", "consumo", "veículo", "gasolina"],
    premium: false
  },
  {
    title: "Conversor de Codificação",
    description: "Converter texto entre diferentes codificações",
    icon: Code,
    path: "/encoding-converter",
    type: "productivity",
    color: "indigo",
    tags: ["codificação", "texto", "ascii", "utf-8"],
    premium: false
  }
];

const programmingCategories: CategoryCard[] = [
  {
    title: "Conversor de Cores",
    description: "Converter entre diferentes formatos de cores",
    icon: Palette,
    path: "/color-converter",
    type: "programming",
    color: "pink",
    tags: ["cores", "hexadecimal", "rgb", "hsl"],
    premium: false
  }
];

const astrologyCategories: CategoryCard[] = [
  {
    title: "Mapa Astral",
    description: "Calcular o mapa astral de uma pessoa",
    icon: Star,
    path: "/birth-chart",
    type: "astrology",
    color: "purple",
    tags: ["mapa astral", "astrologia", "signos", "ascendente"],
    premium: false
  }
];

const astronomicalCategories: CategoryCard[] = [
  {
    title: "Distância Astronômica",
    description: "Calcular distâncias astronômicas",
    icon: Telescope,
    path: "/astronomical-distance",
    type: "astronomical",
    color: "cyan",
    tags: ["astronomia", "distância", "espaço", "luz"],
    premium: false
  }
];

// Novas categorias
const studentCategories: CategoryCard[] = [
  {
    title: "Conversor de Notas",
    description: "Converter notas entre diferentes escalas",
    icon: Book,
    path: "/grade-converter",
    type: "student",
    color: "blue",
    tags: ["notas", "escala", "conversão", "educação"],
    premium: false
  },
  {
    title: "Média de Notas",
    description: "Calcular a média de notas",
    icon: LineChart,
    path: "/grade-average",
    type: "student",
    color: "green",
    tags: ["média", "notas", "cálculo", "educação"],
    premium: false
  },
  {
    title: "Unidades Educacionais",
    description: "Converter unidades educacionais (créditos, horas)",
    icon: Clock,
    path: "/educational-units",
    type: "student",
    color: "indigo",
    tags: ["unidades", "créditos", "horas", "educação"],
    premium: false
  },
  {
    title: "Estatísticas Básicas",
    description: "Calcular estatísticas básicas (média, mediana, desvio)",
    icon: LineChart,
    path: "/basic-statistics",
    type: "student",
    color: "purple",
    tags: ["estatísticas", "média", "mediana", "desvio", "educação"],
    premium: false
  }
];

const gamingCategories: CategoryCard[] = [
  {
    title: "FPS Converter",
    description: "Converter quadros por segundo (FPS)",
    icon: Gamepad2,
    path: "/fps-converter",
    type: "gaming",
    color: "blue",
    tags: ["fps", "quadros", "conversão", "jogos"],
    premium: false
  },
  {
    title: "Moeda de Jogos",
    description: "Converter moedas de jogos",
    icon: Coins,
    path: "/game-currency",
    type: "gaming",
    color: "emerald",
    tags: ["moeda", "jogos", "conversão", "virtual"],
    premium: false
  },
  {
    title: "DPS Calculator",
    description: "Calcular dano por segundo (DPS)",
    icon: Activity,
    path: "/dps-calculator",
    type: "gaming",
    color: "purple",
    tags: ["dps", "dano", "segundo", "jogos"],
    premium: false
  },
  {
    title: "Probabilidade Gaming",
    description: "Calcular probabilidades em jogos",
    icon: Percent,
    path: "/gaming-probability",
    type: "gaming",
    color: "indigo",
    tags: ["probabilidade", "jogos", "chance", "estatística"],
    premium: false
  }
];

const travelCategories: CategoryCard[] = [
  {
    title: "Timezone Converter",
    description: "Converter entre fusos horários",
    icon: Clock,
    path: "/timezone-converter",
    type: "travel",
    color: "indigo",
    tags: ["fuso horário", "conversão", "tempo", "viagem"],
    premium: false
  },
  {
    title: "Calculadora de Gorjeta",
    description: "Calcular o valor da gorjeta",
    icon: Coins,
    path: "/tip-calculator",
    type: "travel",
    color: "emerald",
    tags: ["gorjeta", "cálculo", "serviço", "viagem"],
    premium: false
  },
  {
    title: "Voltagem de Plugues",
    description: "Verificar a voltagem de plugues",
    icon: Plane,
    path: "/plug-voltage",
    type: "travel",
    color: "blue",
    tags: ["voltagem", "plugues", "energia", "viagem"],
    premium: false
  },
  {
    title: "Calculadora de Bagagem",
    description: "Calcular o tamanho da bagagem",
    icon: Package,
    path: "/luggage-calculator",
    type: "travel",
    color: "purple",
    tags: ["bagagem", "tamanho", "peso", "viagem"],
    premium: false
  }
];

const contentCreatorCategories: CategoryCard[] = [
  {
    title: "Resolução de Vídeo",
    description: "Converter resoluções de vídeo",
    icon: Video,
    path: "/video-resolution",
    type: "content",
    color: "blue",
    tags: ["resolução", "vídeo", "conversão", "criação"],
    premium: false
  },
  {
    title: "Tempo de Upload",
    description: "Calcular o tempo de upload de vídeo",
    icon: Clock,
    path: "/upload-time",
    type: "content",
    color: "indigo",
    tags: ["upload", "vídeo", "tempo", "internet"],
    premium: false
  },
  {
    title: "Conversor de Mídia",
    description: "Converter formatos de mídia",
    icon: Video,
    path: "/media-converter",
    type: "content",
    color: "purple",
    tags: ["mídia", "conversão", "formato", "áudio", "vídeo"],
    premium: false
  },
  {
    title: "Calculadora de Engajamento",
    description: "Calcular a taxa de engajamento",
    icon: LineChart,
    path: "/engagement-calculator",
    type: "content",
    color: "green",
    tags: ["engajamento", "taxa", "mídias sociais", "criação"],
    premium: false
  }
];

const investmentCategories: CategoryCard[] = [
  {
    title: "Dividend Calculator",
    description: "Calcular dividendos",
    icon: Coins,
    path: "/dividend-calculator",
    type: "investment",
    color: "emerald",
    tags: ["dividendos", "cálculo", "investimento", "ações"],
    premium: false
  },
  {
    title: "Stock Splits",
    description: "Calcular desdobramento de ações",
    icon: Percent,
    path: "/stock-splits",
    type: "investment",
    color: "indigo",
    tags: ["desdobramento", "ações", "cálculo", "investimento"],
    premium: false
  },
  {
    title: "Inflation Calculator",
    description: "Calcular a inflação",
    icon: TrendingUp,
    path: "/inflation-calculator",
    type: "investment",
    color: "red",
    tags: ["inflação", "cálculo", "economia", "investimento"],
    premium: false
  },
  {
    title: "Investment Comparison",
    description: "Comparar investimentos",
    icon: LineChart,
    path: "/investment-comparison",
    type: "investment",
    color: "green",
    tags: ["comparação", "investimento", "retorno", "risco"],
    premium: false
  }
];

const culinaryCategories: CategoryCard[] = [
  {
    title: "Recipe Converter",
    description: "Converter medidas de receitas",
    icon: ChefHat,
    path: "/recipe-converter",
    type: "culinary",
    color: "orange",
    tags: ["receitas", "medidas", "conversão", "culinária"],
    premium: false
  },
  {
    title: "Ingredient Substitutes",
    description: "Encontrar substitutos para ingredientes",
    icon: ChefHat,
    path: "/ingredient-substitutes",
    type: "culinary",
    color: "green",
    tags: ["ingredientes", "substitutos", "receitas", "culinária"],
    premium: false
  },
  {
    title: "Oven Conversions",
    description: "Converter temperaturas de forno",
    icon: Thermometer,
    path: "/oven-conversions",
    type: "culinary",
    color: "orange",
    tags: ["forno", "temperatura", "conversão", "culinária"],
    premium: false
  },
  {
    title: "Nutrition Calculator",
    description: "Calcular informações nutricionais",
    icon: Heart,
    path: "/nutrition-calculator",
    type: "culinary",
    color: "pink",
    tags: ["nutrição", "cálculo", "alimentos", "culinária"],
    premium: false
  }
];

const fashionCategories: CategoryCard[] = [
  {
    title: "Clothing Sizes",
    description: "Converter tamanhos de roupa",
    icon: Shirt,
    path: "/clothing-sizes",
    type: "fashion",
    color: "blue",
    tags: ["roupa", "tamanhos", "conversão", "moda"],
    premium: false
  },
  {
    title: "Hair Color",
    description: "Encontrar cores de cabelo",
    icon: Palette,
    path: "/hair-color",
    type: "fashion",
    color: "pink",
    tags: ["cabelo", "cor", "moda", "beleza"],
    premium: false
  },
  {
    title: "Body Measurements",
    description: "Calcular medidas corporais",
    icon: Ruler,
    path: "/body-measurements",
    type: "fashion",
    color: "blue",
    tags: ["medidas", "corpo", "moda", "beleza"],
    premium: false
  }
];

const sustainabilityCategories: CategoryCard[] = [
  {
    title: "Carbon Footprint",
    description: "Calcular pegada de carbono",
    icon: Leaf,
    path: "/carbon-footprint",
    type: "sustainability",
    color: "green",
    tags: ["carbono", "pegada", "meio ambiente", "sustentabilidade"],
    premium: false
  },
  {
    title: "Energy Savings",
    description: "Calcular economia de energia",
    icon: Flame,
    path: "/energy-savings",
    type: "sustainability",
    color: "yellow",
    tags: ["energia", "economia", "meio ambiente", "sustentabilidade"],
    premium: false
  },
  {
    title: "Recycling Calculator",
    description: "Calcular reciclagem",
    icon: Leaf,
    path: "/recycling-calculator",
    type: "sustainability",
    color: "green",
    tags: ["reciclagem", "cálculo", "meio ambiente", "sustentabilidade"],
    premium: false
  }
];

const petCategories: CategoryCard[] = [
  {
    title: "Pet Age Converter",
    description: "Converter idade de pets",
    icon: PawPrint,
    path: "/pet-age-converter",
    type: "pets",
    color: "orange",
    tags: ["idade", "pet", "conversão", "animal"],
    premium: false
  },
  {
    title: "Vet Dosage",
    description: "Calcular dosagem veterinária",
    icon: PawPrint,
    path: "/vet-dosage",
    type: "pets",
    color: "blue",
    tags: ["dosagem", "veterinária", "pet", "animal"],
    premium: false
  },
  {
    title: "Pet Feeding",
    description: "Calcular alimentação de pets",
    icon: PawPrint,
    path: "/pet-feeding",
    type: "pets",
    color: "green",
    tags: ["alimentação", "pet", "cálculo", "animal"],
    premium: false
  }
];

const healthProCategories: CategoryCard[] = [
  {
    title: "Saúde Ocupacional",
    description: "Avaliações de saúde ocupacional",
    icon: Shield,
    path: "/occupational-health",
    type: "health-pro",
    color: "blue",
    tags: ["saúde", "ocupacional", "trabalho", "avaliação"],
    premium: true
  },
  {
    title: "Bem-Estar Mental",
    description: "Avaliações de bem-estar mental",
    icon: Brain,
    path: "/mental-wellness",
    type: "health-pro",
    color: "purple",
    tags: ["bem-estar", "mental", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Ergonomia",
    description: "Avaliações de ergonomia",
    icon: User,
    path: "/ergonomics",
    type: "health-pro",
    color: "pink",
    tags: ["ergonomia", "trabalho", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Segurança no Trabalho",
    description: "Avaliações de segurança no trabalho",
    icon: Shield,
    path: "/workplace-safety",
    type: "health-pro",
    color: "red",
    tags: ["segurança", "trabalho", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Dosagem Médica",
    description: "Calcular dosagens de medicamentos",
    icon: Shield,
    path: "/medical-dosage",
    type: "health-pro",
    color: "green",
    tags: ["dosagem", "medicamentos", "saúde", "cálculo"],
    premium: true
  },
  {
    title: "Conversões Laboratoriais",
    description: "Converter unidades de exames laboratoriais",
    icon: Shield,
    path: "/lab-conversions",
    type: "health-pro",
    color: "blue",
    tags: ["conversões", "laboratório", "saúde", "exames"],
    premium: true
  },
  {
    title: "IMC Especializado",
    description: "Calcular IMC para atletas, idosos, etc",
    icon: Heart,
    path: "/specialized-bmi",
    type: "health-pro",
    color: "pink",
    tags: ["imc", "especializado", "saúde", "cálculo"],
    premium: true
  },
  {
    title: "Cálculo de Hidratação",
    description: "Calcular a necessidade diária de água",
    icon: Droplet,
    path: "/hydration-calculator",
    type: "health-pro",
    color: "cyan",
    tags: ["hidratação", "água", "saúde", "cálculo"],
    premium: true
  }
];

// Novos módulos
const agribusinessCategories: CategoryCard[] = [
  {
    title: "Calculadora de Agronegócio",
    description: "Plantio, fertilização e cálculos agrícolas",
    icon: Wheat,
    path: "/agribusiness-calculator",
    type: "agribusiness",
    color: "green",
    tags: ["agro", "plantio", "fertilizante", "agricultura"],
    premium: false
  }
];

const logisticsCategories: CategoryCard[] = [
  {
    title: "Calculadora de Logística", 
    description: "Frete, rotas, capacidade e tempo de entrega",
    icon: Truck,
    path: "/logistics-calculator", 
    type: "logistics",
    color: "orange",
    tags: ["frete", "logística", "transporte", "entrega"],
    premium: false
  }
];

const advancedFinanceCategories: CategoryCard[] = [
  {
    title: "Finanças Avançadas",
    description: "Empréstimos, aposentadoria e análise de viabilidade",
    icon: TrendingUp,
    path: "/advanced-finance",
    type: "finance-advanced", 
    color: "red",
    tags: ["empréstimo", "aposentadoria", "finanças", "investimento"],
    premium: true
  }
];

// Atualizar allEnhancedCategories para incluir as novas categorias
export const allEnhancedCategories = [
  ...converterCategories,
  ...healthCategories,
  ...engineeringCategories,
  ...scientificCategories,
  ...financialCategories,
  ...productivityCategories,
  ...programmingCategories,
  ...astrologyCategories,
  ...astronomicalCategories,
  ...studentCategories,
  ...gamingCategories,
  ...travelCategories,
  ...contentCreatorCategories,
  ...investmentCategories,
  ...culinaryCategories,
  ...fashionCategories,
  ...sustainabilityCategories,
  ...petCategories,
  ...healthProCategories,
  ...agribusinessCategories,
  ...logisticsCategories,
  ...advancedFinanceCategories
];

export const getGroupedCategories = () => {
  const grouped: { [key: string]: CategoryCard[] } = {};
  
  allEnhancedCategories.forEach(category => {
    if (category.type === "converter") {
      if (!grouped.converter) grouped.converter = [];
      grouped.converter.push(category);
    }
    if (category.type === "health") {
      if (!grouped.health) grouped.health = [];
      grouped.health.push(category);
    }
    if (category.type === "engineering") {
      if (!grouped.engineering) grouped.engineering = [];
      grouped.engineering.push(category);
    }
    if (category.type === "scientific") {
      if (!grouped.scientific) grouped.scientific = [];
      grouped.scientific.push(category);
    }
    if (category.type === "financial") {
      if (!grouped.financial) grouped.financial = [];
      grouped.financial.push(category);
    }
    if (category.type === "productivity") {
      if (!grouped.productivity) grouped.productivity = [];
      grouped.productivity.push(category);
    }
    if (category.type === "programming") {
      if (!grouped.programming) grouped.programming = [];
      grouped.programming.push(category);
    }
    if (category.type === "astrology") {
      if (!grouped.astrology) grouped.astrology = [];
      grouped.astrology.push(category);
    }
    if (category.type === "astronomical") {
      if (!grouped.astronomical) grouped.astronomical = [];
      grouped.astronomical.push(category);
    }
    if (category.type === "student") {
      if (!grouped.student) grouped.student = [];
      grouped.student.push(category);
    }
    if (category.type === "gaming") {
      if (!grouped.gaming) grouped.gaming = [];
      grouped.gaming.push(category);
    }
    if (category.type === "travel") {
      if (!grouped.travel) grouped.travel = [];
      grouped.travel.push(category);
    }
    if (category.type === "content") {
      if (!grouped.content) grouped.content = [];
      grouped.content.push(category);
    }
    if (category.type === "investment") {
      if (!grouped.investment) grouped.investment = [];
      grouped.investment.push(category);
    }
    if (category.type === "culinary") {
      if (!grouped.culinary) grouped.culinary = [];
      grouped.culinary.push(category);
    }
    if (category.type === "fashion") {
      if (!grouped.fashion) grouped.fashion = [];
      grouped.fashion.push(category);
    }
    if (category.type === "sustainability") {
      if (!grouped.sustainability) grouped.sustainability = [];
      grouped.sustainability.push(category);
    }
    if (category.type === "pets") {
      if (!grouped.pets) grouped.pets = [];
      grouped.pets.push(category);
    }
    if (category.type === "health-pro") {
      if (!grouped["health-pro"]) grouped["health-pro"] = [];
      grouped["health-pro"].push(category);
    }
    if (category.type === "agribusiness") {
      if (!grouped.agribusiness) grouped.agribusiness = [];
      grouped.agribusiness.push(category);
    }
    if (category.type === "logistics") {
      if (!grouped.logistics) grouped.logistics = [];
      grouped.logistics.push(category);
    }
    if (category.type === "finance-advanced") {
      if (!grouped["finance-advanced"]) grouped["finance-advanced"] = [];
      grouped["finance-advanced"].push(category);
    }
  });
  
  return grouped;
};
