
import { Link } from "react-router-dom";
import { Calculator, Menu, Settings, Search, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "./ThemeToggle";
import ConversionHistory from "./ConversionHistory";
import { allEnhancedCategories, getGroupedCategories } from "@/data/enhancedCategoriesData";
import { useState } from "react";

const EnhancedHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const groupedCategories = getGroupedCategories();

  const megaMenuCategories = [
    {
      title: "Conversores",
      key: "converter",
      description: "Unidades básicas de medida",
      color: "blue"
    },
    {
      title: "Estudantes",
      key: "student", 
      description: "Ferramentas acadêmicas",
      color: "green"
    },
    {
      title: "Saúde Pro",
      key: "health-pro",
      description: "Profissionais médicos",
      color: "red",
      premium: true
    },
    {
      title: "Gaming",
      key: "gaming",
      description: "Mundo dos jogos",
      color: "purple"
    },
    {
      title: "Viagem",
      key: "travel",
      description: "Ferramentas de viagem",
      color: "cyan"
    },
    {
      title: "Criadores",
      key: "content",
      description: "Criação de conteúdo",
      color: "pink"
    },
    {
      title: "Investimentos",
      key: "investment",
      description: "Mercado financeiro",
      color: "emerald",
      premium: true
    },
    {
      title: "Culinária",
      key: "culinary",
      description: "Arte gastronômica",
      color: "orange"
    }
  ];

  const filteredResults = allEnhancedCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(0, 8);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Super Conversor</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">Universal</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex relative flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar conversores, calculadoras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {searchTerm && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredResults.map((result) => (
                  <Link
                    key={result.path}
                    to={result.path}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <result.icon className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{result.description}</div>
                    </div>
                    {result.premium && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        PRO
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {megaMenuCategories.slice(0, 4).map((category) => (
                <NavigationMenuItem key={category.key}>
                  <NavigationMenuTrigger className="flex items-center space-x-2 relative group">
                    <span>{category.title}</span>
                    {category.premium && <Star className="h-3 w-3 text-yellow-500" />}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-0 mt-2 z-[100]">
                    <div className="grid gap-3 p-6 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                      <div className="border-b pb-3 mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                      </div>
                      <div className="grid gap-2 max-h-96 overflow-y-auto">
                        {groupedCategories[category.key]?.map((item) => (
                          <NavigationMenuLink key={item.path} asChild>
                            <Link
                              to={item.path}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-gray-400" />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</div>
                              </div>
                              {item.premium && <Star className="h-3 w-3 text-yellow-500" />}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Mais</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 mt-2 z-[100]">
                  <div className="grid grid-cols-2 gap-6 p-6 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    {megaMenuCategories.slice(4).map((category) => (
                      <div key={category.key} className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                          <span>{category.title}</span>
                          {category.premium && <Star className="h-3 w-3 text-yellow-500" />}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                        <div className="space-y-1">
                          {groupedCategories[category.key]?.slice(0, 3).map((item) => (
                            <NavigationMenuLink key={item.path} asChild>
                              <Link
                                to={item.path}
                                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {item.title}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ConversionHistory />
            <ThemeToggle />
            
            <Button variant="ghost" size="sm" className="hidden lg:flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </Button>
            
            <Link
              to="/admin-login"
              className="hidden lg:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-white dark:bg-gray-900 overflow-y-auto">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  {megaMenuCategories.map((category) => (
                    <div key={category.key} className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{category.title}</span>
                        {category.premium && <Star className="h-4 w-4 text-yellow-500" />}
                      </h3>
                      <div className="pl-4 space-y-2">
                        {groupedCategories[category.key]?.slice(0, 5).map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.premium && <Star className="h-3 w-3 text-yellow-500" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Perfil</span>
                    </Button>
                    <Link
                      to="/admin-login"
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
