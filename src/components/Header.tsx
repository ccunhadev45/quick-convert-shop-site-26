import { Link } from "react-router-dom";
import { Calculator, Menu, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import ConversionHistory from "./ConversionHistory";

const Header = () => {
  const converterItems = [
    { name: "Comprimento", path: "/length" },
    { name: "Peso", path: "/weight" },
    { name: "Volume", path: "/volume" },
    { name: "Temperatura", path: "/temperature" },
    { name: "Área", path: "/area" },
    { name: "Energia", path: "/energy" },
    { name: "Tempo", path: "/time" },
    { name: "Velocidade", path: "/speed" },
  ];

  const financialItems = [
    { name: "Moedas", path: "/currency" },
    { name: "Criptomoedas", path: "/crypto" },
    { name: "Índices Financeiros", path: "/financial-indices" },
  ];

  const healthItems = [
    { name: "IMC", path: "/imc" },
    { name: "TMB", path: "/tmb" },
    { name: "Calorias", path: "/calories" },
  ];

  const engineeringItems = [
    { name: "Concreto", path: "/concrete-calculator" },
    { name: "Área de Construção", path: "/construction-area" },
    { name: "Estrutural", path: "/structural-calculator" },
  ];

  const scientificItems = [
    { name: "Física", path: "/physics-calculator" },
    { name: "Química", path: "/chemistry-calculator" },
    { name: "Matemática", path: "/math-calculator" },
    { name: "Base Numérica", path: "/number-base-converter" },
  ];

  const programmingItems = [
    { name: "Encoding", path: "/encoding-converter" },
    { name: "Cores", path: "/color-converter" },
  ];

  const productivityItems = [
    { name: "Combustível", path: "/fuel-calculator" },
    { name: "Regra de Três", path: "/regra-de-tres" },
  ];

  const specialtyItems = [
    { name: "Mapa Astral", path: "/birth-chart" },
    { name: "Distância Astronômica", path: "/astronomical-distance" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Super Conversor</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">de Unidades</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium text-sm"
            >
              Início
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Conversores</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Conversores de Unidades</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {converterItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Científicas</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Calculadoras Científicas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {scientificItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Programação</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Ferramentas de Programação</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {programmingItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Produtividade</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Ferramentas de Produtividade</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {productivityItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Financeiro</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Conversores Financeiros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {financialItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Saúde</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Calculadoras de Saúde</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {healthItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Engenharia</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Engenharia & Construção</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {engineeringItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Especialidades</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Ferramentas Especiais</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {specialtyItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center space-x-2">
              <ConversionHistory />
              <ThemeToggle />
              <Link
                to="/admin"
                className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80 bg-white dark:bg-gray-900">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    Início
                  </Link>
                  <div className="flex items-center space-x-2">
                    <ConversionHistory />
                    <ThemeToggle />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Conversores</h3>
                  <div className="pl-4 space-y-2">
                    {converterItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Científicas</h3>
                  <div className="pl-4 space-y-2">
                    {scientificItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Programação</h3>
                  <div className="pl-4 space-y-2">
                    {programmingItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Produtividade</h3>
                  <div className="pl-4 space-y-2">
                    {productivityItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Financeiro</h3>
                  <div className="pl-4 space-y-2">
                    {financialItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Saúde</h3>
                  <div className="pl-4 space-y-2">
                    {healthItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Engenharia</h3>
                  <div className="pl-4 space-y-2">
                    {engineeringItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Especialidades</h3>
                  <div className="pl-4 space-y-2">
                    {specialtyItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mt-4 pt-4 border-t dark:border-gray-700"
                >
                  <Settings className="h-5 w-5" />
                  <span>Administração</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
