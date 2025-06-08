
import { 
  Calculator, Ruler, Weight, Thermometer, Square, Zap, Clock, Gauge, 
  DollarSign, Bitcoin, TrendingUp, Heart, Activity, Utensils, Building, 
  Home, Wrench, Users, Star, Globe, FlaskRound, Binary, FileCode, 
  Palette, Fuel, GraduationCap, Stethoscope, Gamepad2, Plane, Camera, 
  PiggyBank, Pizza, Car, Smartphone, BookOpen, Target, Trophy, 
  Calendar, MapPin, Settings, Briefcase, Music, Video, TrendingDown,
  Coffee, Moon, Sun, Cloud, Droplet, Wind, Compass, Mountain,
  Scissors, PaintBucket, Shirt, Baby, Dog, Leaf, Recycle
} from "lucide-react";

export interface Category {
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
  type: string;
  conversionExample?: {
    from: string;
    to: string;
    value: string;
  };
  tags?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  premium?: boolean;
}

export const allEnhancedCategories: Category[] = [
  // === CONVERSORES DE UNIDADES ===
  { 
    title: "Regra de Três", 
    description: "Resolva problemas de proporcionalidade", 
    icon: Calculator, 
    path: "/regra-de-tres", 
    color: "indigo", 
    type: "converter",
    tags: ["matemática", "proporção", "básico"],
    difficulty: "basic",
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
    tags: ["medidas", "distância", "construção"],
    difficulty: "basic",
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
    tags: ["peso", "massa", "culinária"],
    difficulty: "basic",
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
    tags: ["volume", "líquidos", "culinária"],
    difficulty: "basic",
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
    tags: ["temperatura", "clima", "ciência"],
    difficulty: "basic",
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
    tags: ["área", "terreno", "construção"],
    difficulty: "basic",
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
    tags: ["energia", "física", "elétrica"],
    difficulty: "intermediate",
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
    tags: ["tempo", "duração", "básico"],
    difficulty: "basic",
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
    tags: ["velocidade", "trânsito", "física"],
    difficulty: "basic",
    conversionExample: {
      from: "100 km/h",
      to: "m/s",
      value: "27.78 m/s"
    }
  },

  // === ESTUDANTES ===
  { 
    title: "Conversor de Notas", 
    description: "Converta notas entre diferentes sistemas educacionais", 
    icon: GraduationCap, 
    path: "/grade-converter", 
    color: "blue", 
    type: "student",
    tags: ["educação", "notas", "estudante"],
    difficulty: "basic",
    conversionExample: {
      from: "8.5 (0-10)",
      to: "GPA 4.0",
      value: "3.4 GPA"
    }
  },
  { 
    title: "Calculadora de Média", 
    description: "Calcule média escolar, ponderada e simples", 
    icon: Target, 
    path: "/grade-average", 
    color: "green", 
    type: "student",
    tags: ["média", "notas", "estudante"],
    difficulty: "basic",
    conversionExample: {
      from: "4 notas",
      to: "média",
      value: "7.8"
    }
  },
  { 
    title: "Conversor Educacional", 
    description: "Sistemas de medida por país para estudos", 
    icon: Globe, 
    path: "/educational-units", 
    color: "purple", 
    type: "student",
    tags: ["educação", "geografia", "cultura"],
    difficulty: "intermediate",
    conversionExample: {
      from: "1 milha (EUA)",
      to: "quilômetros",
      value: "1.61 km"
    }
  },
  { 
    title: "Estatística Básica", 
    description: "Média, mediana, moda e desvio padrão", 
    icon: TrendingUp, 
    path: "/basic-statistics", 
    color: "orange", 
    type: "student",
    tags: ["estatística", "matemática", "dados"],
    difficulty: "intermediate",
    conversionExample: {
      from: "dataset",
      to: "média",
      value: "15.6"
    }
  },

  // === SAÚDE PROFISSIONAL ===
  { 
    title: "Dosagens Médicas", 
    description: "Calcule dosagens por peso corporal", 
    icon: Stethoscope, 
    path: "/medical-dosage", 
    color: "red", 
    type: "health-pro",
    tags: ["medicina", "dosagem", "profissional"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "10mg/kg",
      to: "70kg paciente",
      value: "700mg"
    }
  },
  { 
    title: "Conversões Laboratoriais", 
    description: "Unidades de laboratório clínico", 
    icon: FlaskRound, 
    path: "/lab-conversions", 
    color: "teal", 
    type: "health-pro",
    tags: ["laboratório", "medicina", "exames"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "100 mg/dL",
      to: "mmol/L",
      value: "5.55 mmol/L"
    }
  },
  { 
    title: "IMC Especializado", 
    description: "IMC infantil, geriátrico e atletas", 
    icon: Heart, 
    path: "/specialized-bmi", 
    color: "pink", 
    type: "health-pro",
    tags: ["IMC", "saúde", "especializado"],
    difficulty: "intermediate",
    conversionExample: {
      from: "Criança 7 anos",
      to: "percentil",
      value: "P75"
    }
  },
  { 
    title: "Cálculos de Hidratação", 
    description: "Necessidades hídricas por idade e peso", 
    icon: Droplet, 
    path: "/hydration-calculator", 
    color: "cyan", 
    type: "health-pro",
    tags: ["hidratação", "saúde", "nutrição"],
    difficulty: "intermediate",
    conversionExample: {
      from: "Adulto 70kg",
      to: "água/dia",
      value: "2.5L"
    }
  },

  // === GAMERS ===
  { 
    title: "Conversor de FPS", 
    description: "Frame rate e performance de jogos", 
    icon: Gamepad2, 
    path: "/fps-converter", 
    color: "violet", 
    type: "gaming",
    tags: ["games", "performance", "fps"],
    difficulty: "basic",
    conversionExample: {
      from: "60 FPS",
      to: "frame time",
      value: "16.67ms"
    }
  },
  { 
    title: "Moedas de Jogos", 
    description: "Converta moedas virtuais entre jogos", 
    icon: Trophy, 
    path: "/game-currency", 
    color: "amber", 
    type: "gaming",
    tags: ["games", "moedas", "virtual"],
    difficulty: "basic",
    conversionExample: {
      from: "1000 V-Bucks",
      to: "reais",
      value: "R$ 50"
    }
  },
  { 
    title: "Calculadora de DPS", 
    description: "Damage per second e builds", 
    icon: Target, 
    path: "/dps-calculator", 
    color: "red", 
    type: "gaming",
    tags: ["games", "damage", "build"],
    difficulty: "intermediate",
    conversionExample: {
      from: "Arma + Stats",
      to: "DPS",
      value: "450 DPS"
    }
  },
  { 
    title: "Probabilidades Gaming", 
    description: "Chance de drops e loot boxes", 
    icon: Star, 
    path: "/gaming-probability", 
    color: "yellow", 
    type: "gaming",
    tags: ["games", "probabilidade", "drops"],
    difficulty: "intermediate",
    conversionExample: {
      from: "0.5% drop",
      to: "100 tentativas",
      value: "39.3% chance"
    }
  },

  // === VIAJANTES ===
  { 
    title: "Fusos Horários", 
    description: "Converta horários entre países", 
    icon: Clock, 
    path: "/timezone-converter", 
    color: "blue", 
    type: "travel",
    tags: ["viagem", "tempo", "fuso"],
    difficulty: "basic",
    conversionExample: {
      from: "14:00 BR",
      to: "Japão",
      value: "02:00+1"
    }
  },
  { 
    title: "Calculadora de Gorjetas", 
    description: "Gorjetas por país e costume local", 
    icon: DollarSign, 
    path: "/tip-calculator", 
    color: "green", 
    type: "travel",
    tags: ["viagem", "gorjeta", "cultura"],
    difficulty: "basic",
    conversionExample: {
      from: "R$ 100 (EUA)",
      to: "gorjeta 18%",
      value: "R$ 18"
    }
  },
  { 
    title: "Tomadas e Voltagem", 
    description: "Adaptadores e voltagens por país", 
    icon: Zap, 
    path: "/plug-voltage", 
    color: "orange", 
    type: "travel",
    tags: ["viagem", "elétrica", "adaptador"],
    difficulty: "basic",
    conversionExample: {
      from: "Brasil → EUA",
      to: "adaptador",
      value: "Tipo A/B"
    }
  },
  { 
    title: "Calculadora de Bagagem", 
    description: "Limites de peso e dimensões", 
    icon: Plane, 
    path: "/luggage-calculator", 
    color: "purple", 
    type: "travel",
    tags: ["viagem", "bagagem", "peso"],
    difficulty: "basic",
    conversionExample: {
      from: "23kg + 55cm",
      to: "status",
      value: "Permitido"
    }
  },

  // === CRIADORES DE CONTEÚDO ===
  { 
    title: "Resoluções de Vídeo", 
    description: "Converta entre formatos e resoluções", 
    icon: Video, 
    path: "/video-resolution", 
    color: "red", 
    type: "content",
    tags: ["vídeo", "resolução", "criador"],
    difficulty: "intermediate",
    conversionExample: {
      from: "1920x1080",
      to: "aspect ratio",
      value: "16:9"
    }
  },
  { 
    title: "Tempo de Upload", 
    description: "Calcule tempo de upload por velocidade", 
    icon: Cloud, 
    path: "/upload-time", 
    color: "cyan", 
    type: "content",
    tags: ["upload", "internet", "tempo"],
    difficulty: "basic",
    conversionExample: {
      from: "1GB / 10Mbps",
      to: "tempo",
      value: "13.3 min"
    }
  },
  { 
    title: "Conversor de Mídia", 
    description: "Tamanhos e formatos de arquivo", 
    icon: FileCode, 
    path: "/media-converter", 
    color: "indigo", 
    type: "content",
    tags: ["mídia", "formato", "arquivo"],
    difficulty: "intermediate",
    conversionExample: {
      from: "MP4 1GB",
      to: "MOV",
      value: "~1.1GB"
    }
  },
  { 
    title: "Engajamento Social", 
    description: "Calcule taxas de engajamento", 
    icon: Users, 
    path: "/engagement-calculator", 
    color: "pink", 
    type: "content",
    tags: ["social", "engajamento", "métricas"],
    difficulty: "intermediate",
    conversionExample: {
      from: "1000 likes / 50k",
      to: "taxa",
      value: "2%"
    }
  },

  // === INVESTIDORES ===
  { 
    title: "Calculadora de Dividendos", 
    description: "Rendimentos e yield de dividendos", 
    icon: PiggyBank, 
    path: "/dividend-calculator", 
    color: "emerald", 
    type: "investment",
    tags: ["investimento", "dividendo", "renda"],
    difficulty: "intermediate",
    premium: true,
    conversionExample: {
      from: "100 ações R$2/ação",
      to: "mensal",
      value: "R$ 200"
    }
  },
  { 
    title: "Splits e Bonificações", 
    description: "Cálculos de desdobramentos", 
    icon: TrendingUp, 
    path: "/stock-splits", 
    color: "green", 
    type: "investment",
    tags: ["ações", "split", "bonificação"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "100 ações 1:2",
      to: "novo total",
      value: "200 ações"
    }
  },
  { 
    title: "Correção da Inflação", 
    description: "Poder de compra ao longo do tempo", 
    icon: TrendingDown, 
    path: "/inflation-calculator", 
    color: "orange", 
    type: "investment",
    tags: ["inflação", "poder", "compra"],
    difficulty: "intermediate",
    conversionExample: {
      from: "R$ 100 (2020)",
      to: "hoje",
      value: "R$ 135"
    }
  },
  { 
    title: "Comparador de Investimentos", 
    description: "Compare rentabilidade de investimentos", 
    icon: Briefcase, 
    path: "/investment-comparison", 
    color: "purple", 
    type: "investment",
    tags: ["investimento", "comparação", "rentabilidade"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "CDB vs Tesouro",
      to: "melhor opção",
      value: "CDB +15%"
    }
  },

  // === CULINÁRIA AVANÇADA ===
  { 
    title: "Conversor de Receitas", 
    description: "Ajuste ingredientes por porções", 
    icon: Pizza, 
    path: "/recipe-converter", 
    color: "orange", 
    type: "culinary",
    tags: ["culinária", "receita", "porções"],
    difficulty: "basic",
    conversionExample: {
      from: "4 porções → 8",
      to: "farinha",
      value: "400g → 800g"
    }
  },
  { 
    title: "Substituições Culinárias", 
    description: "Substitutos de ingredientes", 
    icon: Coffee, 
    path: "/ingredient-substitutes", 
    color: "amber", 
    type: "culinary",
    tags: ["culinária", "substituto", "ingrediente"],
    difficulty: "intermediate",
    conversionExample: {
      from: "1 ovo",
      to: "substituto",
      value: "3 tbsp aquafaba"
    }
  },
  { 
    title: "Conversões de Forno", 
    description: "Temperaturas e tempos de cozimento", 
    icon: Thermometer, 
    path: "/oven-conversions", 
    color: "red", 
    type: "culinary",
    tags: ["forno", "temperatura", "tempo"],
    difficulty: "basic",
    conversionExample: {
      from: "180°C gas",
      to: "forno elétrico",
      value: "200°C"
    }
  },
  { 
    title: "Nutrição por Porção", 
    description: "Calcule valores nutricionais", 
    icon: Heart, 
    path: "/nutrition-calculator", 
    color: "green", 
    type: "culinary",
    tags: ["nutrição", "calorias", "porção"],
    difficulty: "intermediate",
    conversionExample: {
      from: "100g arroz",
      to: "calorias",
      value: "130 kcal"
    }
  },

  // === MODA E BELEZA ===
  { 
    title: "Tamanhos de Roupa", 
    description: "Converta tamanhos entre países", 
    icon: Shirt, 
    path: "/clothing-sizes", 
    color: "pink", 
    type: "fashion",
    tags: ["roupa", "tamanho", "moda"],
    difficulty: "basic",
    conversionExample: {
      from: "M Brasil",
      to: "EUA",
      value: "Size 8"
    }
  },
  { 
    title: "Cores para Cabelo", 
    description: "Tonalidades e misturas", 
    icon: Palette, 
    path: "/hair-color", 
    color: "purple", 
    type: "fashion",
    tags: ["cabelo", "cor", "beleza"],
    difficulty: "intermediate",
    conversionExample: {
      from: "7.0 + 8.1",
      to: "resultado",
      value: "7.5 louro"
    }
  },
  { 
    title: "Medidas Corporais", 
    description: "Circunferências e proporções", 
    icon: Ruler, 
    path: "/body-measurements", 
    color: "teal", 
    type: "fashion",
    tags: ["corpo", "medida", "proporção"],
    difficulty: "basic",
    conversionExample: {
      from: "90-60-90",
      to: "tipo corpo",
      value: "Ampulheta"
    }
  },

  // === PETS E VETERINÁRIA ===
  { 
    title: "Idade de Pets", 
    description: "Converta idade animal para humana", 
    icon: Dog, 
    path: "/pet-age-converter", 
    color: "amber", 
    type: "pets",
    tags: ["pet", "idade", "animal"],
    difficulty: "basic",
    conversionExample: {
      from: "3 anos cão",
      to: "idade humana",
      value: "28 anos"
    }
  },
  { 
    title: "Dosagem Veterinária", 
    description: "Medicamentos para animais", 
    icon: Stethoscope, 
    path: "/vet-dosage", 
    color: "green", 
    type: "pets",
    tags: ["veterinária", "dosagem", "medicamento"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "5mg/kg gato 4kg",
      to: "dose total",
      value: "20mg"
    }
  },
  { 
    title: "Ração e Alimentação", 
    description: "Quantidades por peso e idade", 
    icon: Utensils, 
    path: "/pet-feeding", 
    color: "orange", 
    type: "pets",
    tags: ["ração", "alimentação", "pet"],
    difficulty: "basic",
    conversionExample: {
      from: "Cão 15kg adulto",
      to: "ração/dia",
      value: "300g"
    }
  },

  // === SUSTENTABILIDADE ===
  { 
    title: "Pegada de Carbono", 
    description: "Calcule emissões de CO2", 
    icon: Leaf, 
    path: "/carbon-footprint", 
    color: "green", 
    type: "sustainability",
    tags: ["carbono", "sustentabilidade", "co2"],
    difficulty: "intermediate",
    conversionExample: {
      from: "100km carro",
      to: "CO2",
      value: "23kg CO2"
    }
  },
  { 
    title: "Economia de Energia", 
    description: "Consumo elétrico e economia", 
    icon: Zap, 
    path: "/energy-savings", 
    color: "yellow", 
    type: "sustainability",
    tags: ["energia", "economia", "consumo"],
    difficulty: "basic",
    conversionExample: {
      from: "LED vs Incandescente",
      to: "economia/ano",
      value: "R$ 180"
    }
  },
  { 
    title: "Reciclagem", 
    description: "Equivalências de materiais recicláveis", 
    icon: Recycle, 
    path: "/recycling-calculator", 
    color: "teal", 
    type: "sustainability",
    tags: ["reciclagem", "material", "sustentável"],
    difficulty: "basic",
    conversionExample: {
      from: "1kg plástico",
      to: "garrafas PET",
      value: "25 garrafas"
    }
  },

  // === CONVERSORES FINANCEIROS ORIGINAIS ===
  { 
    title: "Conversor de Moedas", 
    description: "Converta entre moedas com taxas atualizadas", 
    icon: DollarSign, 
    path: "/currency", 
    color: "emerald", 
    type: "financial",
    tags: ["moeda", "câmbio", "internacional"],
    difficulty: "basic",
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
    tags: ["cripto", "bitcoin", "ethereum"],
    difficulty: "intermediate",
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
    tags: ["índice", "selic", "economia"],
    difficulty: "intermediate",
    conversionExample: {
      from: "Taxa Selic",
      to: "atual",
      value: "14.75% a.a."
    }
  },

  // === SAÚDE BÁSICA ORIGINAL ===
  { 
    title: "Calculadora de IMC", 
    description: "Calcule seu Índice de Massa Corporal", 
    icon: Heart, 
    path: "/imc", 
    color: "pink", 
    type: "health",
    tags: ["IMC", "peso", "saúde"],
    difficulty: "basic",
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
    tags: ["TMB", "metabolismo", "caloria"],
    difficulty: "intermediate",
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
    tags: ["caloria", "dieta", "nutrição"],
    difficulty: "basic",
    conversionExample: {
      from: "Ativo moderado",
      to: "necessidade",
      value: "2,200 kcal/dia"
    }
  },

  // === ENGENHARIA ORIGINAL ===
  { 
    title: "Calculadora de Concreto", 
    description: "Calcule materiais para concreto", 
    icon: Building, 
    path: "/concrete-calculator", 
    color: "stone", 
    type: "engineering",
    tags: ["concreto", "construção", "material"],
    difficulty: "intermediate",
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
    tags: ["área", "construção", "perímetro"],
    difficulty: "basic",
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
    tags: ["estrutura", "carga", "viga"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "Viga 6m",
      to: "carga max",
      value: "2.5 ton/m²"
    }
  },

  // === CIENTÍFICAS ORIGINAIS ===
  { 
    title: "Calculadora de Física", 
    description: "Força, energia, movimento e mais", 
    icon: Calculator, 
    path: "/physics-calculator", 
    color: "blue", 
    type: "scientific",
    tags: ["física", "força", "energia"],
    difficulty: "intermediate",
    conversionExample: {
      from: "F = m × a",
      to: "10kg × 9.8m/s²",
      value: "98 N"
    }
  },
  { 
    title: "Calculadora de Química", 
    description: "Molaridade, pH, massa molar", 
    icon: FlaskRound, 
    path: "/chemistry-calculator", 
    color: "green", 
    type: "scientific",
    tags: ["química", "pH", "molaridade"],
    difficulty: "advanced",
    conversionExample: {
      from: "0.1 M [H+]",
      to: "pH",
      value: "pH = 1"
    }
  },
  { 
    title: "Calculadora Matemática", 
    description: "Geometria, trigonometria e mais", 
    icon: Calculator, 
    path: "/math-calculator", 
    color: "purple", 
    type: "scientific",
    tags: ["matemática", "geometria", "trigonometria"],
    difficulty: "intermediate",
    conversionExample: {
      from: "r = 5",
      to: "área círculo",
      value: "78.54 u²"
    }
  },
  { 
    title: "Conversor de Base Numérica", 
    description: "Binário, octal, decimal, hexadecimal", 
    icon: Binary, 
    path: "/number-base-converter", 
    color: "slate", 
    type: "scientific",
    tags: ["base", "binário", "hexadecimal"],
    difficulty: "intermediate",
    conversionExample: {
      from: "255 (decimal)",
      to: "binário",
      value: "11111111"
    }
  },

  // === PROGRAMAÇÃO ORIGINAL ===
  { 
    title: "Conversor de Encoding", 
    description: "Base64, URL encoding, HTML entities", 
    icon: FileCode, 
    path: "/encoding-converter", 
    color: "indigo", 
    type: "programming",
    tags: ["encoding", "base64", "html"],
    difficulty: "intermediate",
    conversionExample: {
      from: "Hello World",
      to: "Base64",
      value: "SGVsbG8gV29ybGQ="
    }
  },
  { 
    title: "Conversor de Cores", 
    description: "HEX, RGB, HSL, CMYK", 
    icon: Palette, 
    path: "/color-converter", 
    color: "pink", 
    type: "programming",
    tags: ["cor", "hex", "rgb"],
    difficulty: "basic",
    conversionExample: {
      from: "#FF5733",
      to: "RGB",
      value: "255, 87, 51"
    }
  },

  // === PRODUTIVIDADE ORIGINAL ===
  { 
    title: "Calculadora de Combustível", 
    description: "Consumo, custos e comparações", 
    icon: Fuel, 
    path: "/fuel-calculator", 
    color: "orange", 
    type: "productivity",
    tags: ["combustível", "consumo", "custo"],
    difficulty: "basic",
    conversionExample: {
      from: "100km, 12km/L",
      to: "combustível",
      value: "8.33 L"
    }
  },

  // === ASTROLOGIA ORIGINAL ===
  { 
    title: "Mapa Astral", 
    description: "Gere seu mapa astral completo", 
    icon: Star, 
    path: "/birth-chart", 
    color: "purple", 
    type: "astrology",
    tags: ["astrologia", "mapa", "astral"],
    difficulty: "advanced",
    premium: true,
    conversionExample: {
      from: "Data/hora/local",
      to: "mapa astral",
      value: "Sol em Leão"
    }
  },

  // === ASTRONOMIA ORIGINAL ===
  { 
    title: "Distância dos Astros", 
    description: "Calcule distâncias e tempo de viagem espacial", 
    icon: Globe, 
    path: "/astronomical-distance", 
    color: "cyan", 
    type: "astronomical",
    tags: ["astronomia", "distância", "espaço"],
    difficulty: "advanced",
    conversionExample: {
      from: "Terra → Marte",
      to: "distância",
      value: "225 milhões km"
    }
  },
];

// Função para agrupar categorias
export const getGroupedCategories = () => {
  const grouped = allEnhancedCategories.reduce((acc, category) => {
    if (!acc[category.type]) {
      acc[category.type] = [];
    }
    acc[category.type].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return grouped;
};

// Função para filtrar por tags
export const getCategoriesByTags = (tags: string[]) => {
  return allEnhancedCategories.filter(category =>
    category.tags?.some(tag => tags.includes(tag))
  );
};

// Função para categorias premium
export const getPremiumCategories = () => {
  return allEnhancedCategories.filter(category => category.premium);
};

// Função para categorias por dificuldade
export const getCategoriesByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
  return allEnhancedCategories.filter(category => category.difficulty === difficulty);
};
