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
  Speedometer,
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
    tags: ["comprimento", "metros", "polegadas", "pés"],
    premium: false
  },
  {
    title: "Conversor de Peso",
    description: "Converter entre diferentes unidades de peso",
    icon: Scale,
    path: "/weight",
    type: "converter",
    tags: ["peso", "quilogramas", "gramas", "libras"],
    premium: false
  },
  {
    title: "Conversor de Volume",
    description: "Converter entre diferentes unidades de volume",
    icon: Package,
    path: "/volume",
    type: "converter",
    tags: ["volume", "litros", "mililitros", "galões"],
    premium: false
  },
  {
    title: "Conversor de Temperatura",
    description: "Converter entre diferentes unidades de temperatura",
    icon: Thermometer,
    path: "/temperature",
    type: "converter",
    tags: ["temperatura", "celsius", "fahrenheit", "kelvin"],
    premium: false
  },
  {
    title: "Conversor de Área",
    description: "Converter entre diferentes unidades de área",
    icon: LayoutDashboard,
    path: "/area",
    type: "converter",
    tags: ["área", "metros quadrados", "hectares", "acres"],
    premium: false
  },
  {
    title: "Conversor de Energia",
    description: "Converter entre diferentes unidades de energia",
    icon: Flame,
    path: "/energy",
    type: "converter",
    tags: ["energia", "joules", "calorias", "watts"],
    premium: false
  },
  {
    title: "Conversor de Tempo",
    description: "Converter entre diferentes unidades de tempo",
    icon: Clock,
    path: "/time",
    type: "converter",
    tags: ["tempo", "segundos", "minutos", "horas"],
    premium: false
  },
  {
    title: "Conversor de Velocidade",
    description: "Converter entre diferentes unidades de velocidade",
    icon: Speedometer,
    path: "/speed",
    type: "converter",
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
    tags: ["imc", "índice de massa corporal", "peso", "altura"],
    premium: false
  },
  {
    title: "Calculadora de TMB",
    description: "Calcular a Taxa Metabólica Basal (TMB)",
    icon: Activity,
    path: "/tmb",
    type: "health",
    tags: ["tmb", "taxa metabólica basal", "energia", "metabolismo"],
    premium: false
  },
  {
    title: "Calculadora de Calorias",
    description: "Calcular as calorias diárias necessárias",
    icon: Flame,
    path: "/calories",
    type: "health",
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
    tags: ["concreto", "cimento", "areia", "brita"],
    premium: false
  },
  {
    title: "Calculadora de Área de Construção",
    description: "Calcular a área de construção de um edifício",
    icon: LayoutDashboard,
    path: "/construction-area",
    type: "engineering",
    tags: ["área", "construção", "edifício", "engenharia"],
    premium: false
  },
  {
    title: "Calculadora Estrutural",
    description: "Realizar cálculos estruturais básicos",
    icon: Waves,
    path: "/structural-calculator",
    type: "engineering",
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
    tags: ["física", "cálculo", "mecânica", "termodinâmica"],
    premium: false
  },
  {
    title: "Calculadora de Química",
    description: "Realizar cálculos de química básica",
    icon: Droplet,
    path: "/chemistry-calculator",
    type: "scientific",
    tags: ["química", "cálculo", "reações", "elementos"],
    premium: false
  },
  {
    title: "Calculadora de Matemática",
    description: "Realizar cálculos matemáticos básicos",
    icon: LineChart,
    path: "/math-calculator",
    type: "scientific",
    tags: ["matemática", "cálculo", "álgebra", "geometria"],
    premium: false
  },
  {
    title: "Conversor de Base Numérica",
    description: "Converter entre diferentes bases numéricas",
    icon: Code,
    path: "/number-base-converter",
    type: "scientific",
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
    tags: ["moedas", "dólar", "euro", "real"],
    premium: false
  },
  {
    title: "Conversor de Criptomoedas",
    description: "Converter entre diferentes criptomoedas",
    icon: Bitcoin,
    path: "/crypto",
    type: "financial",
    tags: ["criptomoedas", "bitcoin", "ethereum", "litecoin"],
    premium: false
  },
  {
    title: "Índices Financeiros",
    description: "Acompanhar os principais índices financeiros",
    icon: LineChart,
    path: "/financial-indices",
    type: "financial",
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
    tags: ["regra de três", "proporção", "cálculo", "matemática"],
    premium: false
  },
  {
    title: "Calculadora de Combustível",
    description: "Calcular o consumo de combustível de um veículo",
    icon: FileText,
    path: "/fuel-calculator",
    type: "productivity",
    tags: ["combustível", "consumo", "veículo", "gasolina"],
    premium: false
  },
  {
    title: "Conversor de Codificação",
    description: "Converter texto entre diferentes codificações",
    icon: Code,
    path: "/encoding-converter",
    type: "productivity",
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
    tags: ["notas", "escala", "conversão", "educação"],
    premium: false
  },
  {
    title: "Média de Notas",
    description: "Calcular a média de notas",
    icon: LineChart,
    path: "/grade-average",
    type: "student",
    tags: ["média", "notas", "cálculo", "educação"],
    premium: false
  },
  {
    title: "Unidades Educacionais",
    description: "Converter unidades educacionais (créditos, horas)",
    icon: Clock,
    path: "/educational-units",
    type: "student",
    tags: ["unidades", "créditos", "horas", "educação"],
    premium: false
  },
  {
    title: "Estatísticas Básicas",
    description: "Calcular estatísticas básicas (média, mediana, desvio)",
    icon: LineChart,
    path: "/basic-statistics",
    type: "student",
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
    tags: ["fps", "quadros", "conversão", "jogos"],
    premium: false
  },
  {
    title: "Moeda de Jogos",
    description: "Converter moedas de jogos",
    icon: Coins,
    path: "/game-currency",
    type: "gaming",
    tags: ["moeda", "jogos", "conversão", "virtual"],
    premium: false
  },
  {
    title: "DPS Calculator",
    description: "Calcular dano por segundo (DPS)",
    icon: Activity,
    path: "/dps-calculator",
    type: "gaming",
    tags: ["dps", "dano", "segundo", "jogos"],
    premium: false
  },
  {
    title: "Probabilidade Gaming",
    description: "Calcular probabilidades em jogos",
    icon: Percent,
    path: "/gaming-probability",
    type: "gaming",
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
    tags: ["fuso horário", "conversão", "tempo", "viagem"],
    premium: false
  },
  {
    title: "Calculadora de Gorjeta",
    description: "Calcular o valor da gorjeta",
    icon: Coins,
    path: "/tip-calculator",
    type: "travel",
    tags: ["gorjeta", "cálculo", "serviço", "viagem"],
    premium: false
  },
  {
    title: "Voltagem de Plugues",
    description: "Verificar a voltagem de plugues",
    icon: Plane,
    path: "/plug-voltage",
    type: "travel",
    tags: ["voltagem", "plugues", "energia", "viagem"],
    premium: false
  },
  {
    title: "Calculadora de Bagagem",
    description: "Calcular o tamanho da bagagem",
    icon: Package,
    path: "/luggage-calculator",
    type: "travel",
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
    tags: ["resolução", "vídeo", "conversão", "criação"],
    premium: false
  },
  {
    title: "Tempo de Upload",
    description: "Calcular o tempo de upload de vídeo",
    icon: Clock,
    path: "/upload-time",
    type: "content",
    tags: ["upload", "vídeo", "tempo", "internet"],
    premium: false
  },
  {
    title: "Conversor de Mídia",
    description: "Converter formatos de mídia",
    icon: Video,
    path: "/media-converter",
    type: "content",
    tags: ["mídia", "conversão", "formato", "áudio", "vídeo"],
    premium: false
  },
  {
    title: "Calculadora de Engajamento",
    description: "Calcular a taxa de engajamento",
    icon: LineChart,
    path: "/engagement-calculator",
    type: "content",
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
    tags: ["dividendos", "cálculo", "investimento", "ações"],
    premium: false
  },
  {
    title: "Stock Splits",
    description: "Calcular desdobramento de ações",
    icon: Percent,
    path: "/stock-splits",
    type: "investment",
    tags: ["desdobramento", "ações", "cálculo", "investimento"],
    premium: false
  },
  {
    title: "Inflation Calculator",
    description: "Calcular a inflação",
    icon: TrendingUp,
    path: "/inflation-calculator",
    type: "investment",
    tags: ["inflação", "cálculo", "economia", "investimento"],
    premium: false
  },
  {
    title: "Investment Comparison",
    description: "Comparar investimentos",
    icon: LineChart,
    path: "/investment-comparison",
    type: "investment",
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
    tags: ["receitas", "medidas", "conversão", "culinária"],
    premium: false
  },
  {
    title: "Ingredient Substitutes",
    description: "Encontrar substitutos para ingredientes",
    icon: ChefHat,
    path: "/ingredient-substitutes",
    type: "culinary",
    tags: ["ingredientes", "substitutos", "receitas", "culinária"],
    premium: false
  },
  {
    title: "Oven Conversions",
    description: "Converter temperaturas de forno",
    icon: Thermometer,
    path: "/oven-conversions",
    type: "culinary",
    tags: ["forno", "temperatura", "conversão", "culinária"],
    premium: false
  },
  {
    title: "Nutrition Calculator",
    description: "Calcular informações nutricionais",
    icon: Heart,
    path: "/nutrition-calculator",
    type: "culinary",
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
    tags: ["roupa", "tamanhos", "conversão", "moda"],
    premium: false
  },
  {
    title: "Hair Color",
    description: "Encontrar cores de cabelo",
    icon: Palette,
    path: "/hair-color",
    type: "fashion",
    tags: ["cabelo", "cor", "moda", "beleza"],
    premium: false
  },
  {
    title: "Body Measurements",
    description: "Calcular medidas corporais",
    icon: Ruler,
    path: "/body-measurements",
    type: "fashion",
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
    tags: ["carbono", "pegada", "meio ambiente", "sustentabilidade"],
    premium: false
  },
  {
    title: "Energy Savings",
    description: "Calcular economia de energia",
    icon: Flame,
    path: "/energy-savings",
    type: "sustainability",
    tags: ["energia", "economia", "meio ambiente", "sustentabilidade"],
    premium: false
  },
  {
    title: "Recycling Calculator",
    description: "Calcular reciclagem",
    icon: Leaf,
    path: "/recycling-calculator",
    type: "sustainability",
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
    tags: ["idade", "pet", "conversão", "animal"],
    premium: false
  },
  {
    title: "Vet Dosage",
    description: "Calcular dosagem veterinária",
    icon: PawPrint,
    path: "/vet-dosage",
    type: "pets",
    tags: ["dosagem", "veterinária", "pet", "animal"],
    premium: false
  },
  {
    title: "Pet Feeding",
    description: "Calcular alimentação de pets",
    icon: PawPrint,
    path: "/pet-feeding",
    type: "pets",
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
    tags: ["saúde", "ocupacional", "trabalho", "avaliação"],
    premium: true
  },
  {
    title: "Bem-Estar Mental",
    description: "Avaliações de bem-estar mental",
    icon: Brain,
    path: "/mental-wellness",
    type: "health-pro",
    tags: ["bem-estar", "mental", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Ergonomia",
    description: "Avaliações de ergonomia",
    icon: User,
    path: "/ergonomics",
    type: "health-pro",
    tags: ["ergonomia", "trabalho", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Segurança no Trabalho",
    description: "Avaliações de segurança no trabalho",
    icon: Shield,
    path: "/workplace-safety",
    type: "health-pro",
    tags: ["segurança", "trabalho", "saúde", "avaliação"],
    premium: true
  },
  {
    title: "Dosagem Médica",
    description: "Calcular dosagens de medicamentos",
    icon: Shield,
    path: "/medical-dosage",
    type: "health-pro",
    tags: ["dosagem", "medicamentos", "saúde", "cálculo"],
    premium: true
  },
  {
    title: "Conversões Laboratoriais",
    description: "Converter unidades de exames laboratoriais",
    icon: Shield,
    path: "/lab-conversions",
    type: "health-pro",
    tags: ["conversões", "laboratório", "saúde", "exames"],
    premium: true
  },
  {
    title: "IMC Especializado",
    description: "Calcular IMC para atletas, idosos, etc",
    icon: Heart,
    path: "/specialized-bmi",
    type: "health-pro",
    tags: ["imc", "especializado", "saúde", "cálculo"],
    premium: true
  },
  {
    title: "Cálculo de Hidratação",
    description: "Calcular a necessidade diária de água",
    icon: Droplet,
    path: "/hydration-calculator",
    type: "health-pro",
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
  // Categorias de estudantes
  ...studentCategories,
  // Categorias gaming
  ...gamingCategories,
  // Categorias viagem
  ...travelCategories,
  // Categorias criadores
  ...contentCreatorCategories,
  // Categorias investimentos
  ...investmentCategories,
  // Categorias culinária
  ...culinaryCategories,
  // Categorias moda
  ...fashionCategories,
  // Categorias sustentabilidade
  ...sustainabilityCategories,
  // Categorias pets
  ...petCategories,
  // Categorias saúde profissional
  ...healthProCategories,
  // Novos módulos
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
    
    // Adicionar novos grupos
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
