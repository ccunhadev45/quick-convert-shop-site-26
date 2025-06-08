
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Layers, Zap, Shield, Palette } from "lucide-react";

const SystemDocumentation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Book className="h-8 w-8 text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-bold text-foreground">Documentação do Sistema</h2>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="design">Design System</TabsTrigger>
          <TabsTrigger value="deployment">Deploy</TabsTrigger>
          <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Super Conversor Universal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-4">Sobre o Sistema</h4>
                <p className="text-muted-foreground mb-4">
                  O Super Conversor Universal é uma aplicação web Progressive Web App (PWA) desenvolvida 
                  em React + TypeScript que oferece uma ampla gama de conversores e calculadoras para 
                  diferentes áreas de conhecimento.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">🎯 Objetivo Principal</h5>
                    <p className="text-sm text-muted-foreground">
                      Fornecer uma plataforma centralizada para conversões de unidades, 
                      cálculos matemáticos e ferramentas utilitárias de alta qualidade.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">👥 Público-Alvo</h5>
                    <p className="text-sm text-muted-foreground">
                      Estudantes, profissionais, desenvolvedores e usuários gerais que 
                      precisam de ferramentas de conversão precisas e rápidas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">React 18</Badge>
                  </div>
                  <h4 className="font-semibold mb-1">Frontend</h4>
                  <p className="text-sm text-muted-foreground">
                    Interface moderna e responsiva construída com React, TypeScript e Tailwind CSS
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">PWA</Badge>
                  </div>
                  <h4 className="font-semibold mb-1">Progressive Web App</h4>
                  <p className="text-sm text-muted-foreground">
                    Funciona offline, instalável e otimizada para todos os dispositivos
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">shadcn/ui</Badge>
                  </div>
                  <h4 className="font-semibold mb-1">Design System</h4>
                  <p className="text-sm text-muted-foreground">
                    Componentes consistentes baseados em Radix UI com tema personalizável
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">📊 Categorias de Conversores</h4>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div className="space-y-1">
                    <p>• <strong>Básicos:</strong> Comprimento, Peso, Temperatura, Área, Volume</p>
                    <p>• <strong>Financeiros:</strong> Moedas, Criptomoedas, Investimentos</p>
                    <p>• <strong>Científicos:</strong> Física, Química, Matemática</p>
                    <p>• <strong>Estudantis:</strong> Notas, Estatísticas, Regra de Três</p>
                  </div>
                  <div className="space-y-1">
                    <p>• <strong>Gaming:</strong> FPS, DPS, Moedas Virtuais</p>
                    <p>• <strong>Saúde:</strong> IMC, TMB, Dosagens Médicas</p>
                    <p>• <strong>Programação:</strong> Cores, Encoding, Base Numérica</p>
                    <p>• <strong>Especialidades:</strong> Engenharia, Astronomia, Astrologia</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🚀 Recursos Principais</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Sistema de favoritos e histórico de conversões</li>
                  <li>• Busca inteligente com filtros por categoria</li>
                  <li>• Modo dark/light com persistência de preferências</li>
                  <li>• Interface responsiva otimizada para mobile</li>
                  <li>• Integração com APIs externas para dados em tempo real</li>
                  <li>• Sistema administrativo para gerenciamento</li>
                  <li>• Suporte a AdSense para monetização</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Arquitetura do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📁 Estrutura de Pastas</h4>
                <pre className="text-sm overflow-x-auto">
{`src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── admin/           # Componentes administrativos
│   └── astrology/       # Componentes específicos de astrologia
├── pages/               # Páginas da aplicação
├── hooks/               # Custom hooks
├── services/            # Serviços para APIs externas
├── data/                # Dados estáticos e configurações
├── lib/                 # Utilitários e configurações
├── providers/           # Context providers
└── main.tsx            # Ponto de entrada`}
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🏗️ Padrões Arquiteturais</h4>
                
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">1. Component-Driven Development</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Cada funcionalidade é desenvolvida como componente independente e reutilizável.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`// Exemplo: Conversor genérico
interface ConverterProps {
  title: string;
  units: Unit[];
  onConvert: (value: number, from: string, to: string) => number;
}

const GenericConverter: React.FC<ConverterProps> = ({ title, units, onConvert }) => {
  // Lógica de conversão padronizada
};`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">2. Custom Hooks para Estado</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Lógica de estado complexa encapsulada em hooks reutilizáveis.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`// useConversionHistory.ts
const useConversionHistory = () => {
  const [history, setHistory] = useState([]);
  
  const addConversion = useCallback((conversion) => {
    setHistory(prev => [conversion, ...prev.slice(0, 49)]);
    localStorage.setItem('conversion_history', JSON.stringify(history));
  }, []);
  
  return { history, addConversion };
};`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">3. Serviços para APIs</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Abstração de chamadas de API com cache e error handling.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`// services/currencyService.ts
class CurrencyService {
  private cache = new Map();
  
  async getExchangeRates(base: string): Promise<ExchangeRates> {
    const cacheKey = \`rates_\${base}\`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const rates = await this.fetchFromAPI(base);
    this.cache.set(cacheKey, rates);
    
    return rates;
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">⚡ Performance</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• <strong>Lazy Loading:</strong> Componentes carregados sob demanda</li>
                  <li>• <strong>Code Splitting:</strong> Bundle otimizado por rota</li>
                  <li>• <strong>Memoization:</strong> React.memo e useMemo para otimização</li>
                  <li>• <strong>Virtual DOM:</strong> Renderização eficiente do React</li>
                  <li>• <strong>PWA Caching:</strong> Service Worker para cache inteligente</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guia de Componentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">🧩 Componentes Base (shadcn/ui)</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-sm space-y-1">
                    <p><code>Button</code> - Botões com variantes</p>
                    <p><code>Input</code> - Campos de entrada</p>
                    <p><code>Card</code> - Containers de conteúdo</p>
                    <p><code>Badge</code> - Labels e tags</p>
                    <p><code>Tabs</code> - Navegação por abas</p>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><code>Select</code> - Dropdown de seleção</p>
                    <p><code>Dialog</code> - Modais e popups</p>
                    <p><code>Sheet</code> - Sidebar móvel</p>
                    <p><code>Tooltip</code> - Dicas contextuais</p>
                    <p><code>Switch</code> - Toggle switches</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🔧 Componentes Customizados</h4>
                
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">EnhancedConverterCard</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Card principal para exibição de conversores na página inicial.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`interface ConverterCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  premium?: boolean;
  tags?: string[];
}

<EnhancedConverterCard
  title="Conversor de Moedas"
  description="Converta entre diferentes moedas em tempo real"
  icon={DollarSign}
  path="/currency"
  tags={["moeda", "câmbio"]}
/>`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">SearchFilter</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Componente de busca com filtros inteligentes.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

// Busca por título, descrição, tags e tipo
const filteredCategories = categories.filter(category => 
  category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  category.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
);`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">AdSpace</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sistema de espaços publicitários configuráveis.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`interface AdSpaceProps {
  position: 'top' | 'middle' | 'sidebar' | 'footer' | 'category-top';
  width?: string;
  height?: string;
}

<AdSpace position="category-top" />
// Renderiza HTML do AdSense baseado nas configurações do admin`}
                  </pre>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">📋 Boas Práticas</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Usar TypeScript para tipagem forte</li>
                  <li>• Implementar PropTypes ou interfaces</li>
                  <li>• Manter componentes pequenos e focados</li>
                  <li>• Usar React.memo para componentes pesados</li>
                  <li>• Implementar fallbacks para loading e error</li>
                  <li>• Seguir padrões de acessibilidade (ARIA)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎨 Tokens de Design</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Todos os componentes seguem o design system definido em <code>index.css</code> e <code>tailwind.config.ts</code>
                </p>
                <pre className="text-xs overflow-x-auto">
{`/* CSS Variables (index.css) */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96%;
  --border: 214.3 31.8% 91.4%;
  /* ... mais tokens */
}

/* Modo Dark */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... tokens para dark mode */
}`}
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🎯 Princípios de Design</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">1. Consistência</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Espaçamentos padronizados (4, 8, 12, 16px)</li>
                      <li>• Tipografia hierárquica</li>
                      <li>• Paleta de cores semântica</li>
                      <li>• Componentes reutilizáveis</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">2. Acessibilidade</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Contraste mínimo WCAG AA</li>
                      <li>• Navegação por teclado</li>
                      <li>• Aria-labels descritivos</li>
                      <li>• Focus states visíveis</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">3. Responsividade</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mobile-first approach</li>
                      <li>• Breakpoints consistentes</li>
                      <li>• Touch-friendly interfaces</li>
                      <li>• Adaptive layouts</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">4. Performance</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CSS otimizado com Tailwind</li>
                      <li>• Lazy loading de imagens</li>
                      <li>• Componentes memoizados</li>
                      <li>• Bundle size otimizado</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">🔧 Uso do Design System</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`// ✅ Correto - Usar tokens semânticos
<div className="bg-background text-foreground border border-border">
  <h1 className="text-primary">Título</h1>
  <p className="text-muted-foreground">Descrição</p>
</div>

// ❌ Incorreto - Cores hardcoded
<div className="bg-white text-black border border-gray-200">
  <h1 className="text-blue-600">Título</h1>
  <p className="text-gray-500">Descrição</p>
</div>

// ✅ Correto - Espaçamentos padronizados
<div className="p-6 space-y-4">
  <div className="mb-8">Content</div>
</div>

// ❌ Incorreto - Valores arbitrários
<div className="p-[23px] space-y-[13px]">
  <div className="mb-[31px]">Content</div>
</div>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Deploy e Produção
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🚀 Build para Produção</h4>
                <pre className="text-sm overflow-x-auto">
{`# Instalar dependências
npm install

# Build otimizado
npm run build

# Preview local do build
npm run preview

# Análise do bundle
npm run build -- --analyze`}
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">☁️ Opções de Deploy</h4>
                
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">1. Vercel (Recomendado)</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deploy automático com Git integration e otimizações.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`# vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">2. Netlify</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosting estático com CI/CD integrado.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">3. GitHub Pages</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deploy gratuito direto do repositório GitHub.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`}
                  </pre>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🔧 Configurações de Produção</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Configurar variáveis de ambiente para APIs</li>
                  <li>• Habilitar compressão gzip/brotli</li>
                  <li>• Configurar Service Worker para PWA</li>
                  <li>• Implementar analytics (Google Analytics)</li>
                  <li>• Configurar domínio customizado</li>
                  <li>• Certificado SSL automático</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Manutenção e Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">🔄 Atualizações Regulares</h4>
                
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Dependências</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Manter bibliotecas atualizadas para segurança e performance.
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded">
{`# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update

# Atualizar versões major com cuidado
npm install react@latest @types/react@latest

# Verificar vulnerabilidades
npm audit
npm audit fix`}
                  </pre>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Dados de APIs</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Monitorar e atualizar integrações com APIs externas.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Verificar limites de rate limiting</li>
                    <li>• Atualizar chaves de API expiradas</li>
                    <li>• Testar endpoints regularmente</li>
                    <li>• Implementar fallbacks para APIs offline</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">📊 Monitoramento</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Performance</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Lighthouse scores</li>
                      <li>• Core Web Vitals</li>
                      <li>• Bundle size analysis</li>
                      <li>• Load time monitoring</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Erros</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Console errors</li>
                      <li>• API failures</li>
                      <li>• User feedback</li>
                      <li>• Browser compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🛠️ Tarefas de Manutenção</h4>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Checklist Mensal</h5>
                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div className="space-y-1">
                      <p>☐ Atualizar dependências</p>
                      <p>☐ Revisar analytics</p>
                      <p>☐ Testar APIs externas</p>
                      <p>☐ Backup de configurações</p>
                    </div>
                    <div className="space-y-1">
                      <p>☐ Verificar performance</p>
                      <p>☐ Revisar feedback de usuários</p>
                      <p>☐ Testar em devices</p>
                      <p>☐ Documentação atualizada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ Troubleshooting</h4>
                <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                  <p><strong>Build Errors:</strong> Verificar tipos TypeScript e dependências</p>
                  <p><strong>API Failures:</strong> Implementar fallbacks e cache</p>
                  <p><strong>Performance Issues:</strong> Analisar bundle e lazy loading</p>
                  <p><strong>Mobile Issues:</strong> Testar em dispositivos reais</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemDocumentation;
