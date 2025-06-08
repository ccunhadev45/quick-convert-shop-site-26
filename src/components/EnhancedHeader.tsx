import { Link } from "react-router-dom";
import { Calculator, Menu, Settings, Search, User, Star, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { allEnhancedCategories, getGroupedCategories } from "@/data/unifiedCategoriesData";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const EnhancedHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
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
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Super Conversor</span>
              <div className="text-xs text-muted-foreground">Universal</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex relative flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar conversores, calculadoras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 bg-background border-border"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {searchTerm && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredResults.map((result) => (
                  <Link
                    key={result.path}
                    to={result.path}
                    className="flex items-center space-x-3 p-3 hover:bg-accent border-b border-border last:border-b-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <result.icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium text-popover-foreground">{result.title}</div>
                      <div className="text-sm text-muted-foreground">{result.description}</div>
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
          <div className="hidden lg:flex items-center space-x-4">
            {megaMenuCategories.slice(0, 4).map((category) => (
              <DropdownMenu key={category.key}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 relative group">
                    <span>{category.title}</span>
                    {category.premium && <Star className="h-3 w-3 text-yellow-500" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-popover border border-border shadow-lg z-[100]">
                  <DropdownMenuLabel className="border-b pb-3 mb-3">
                    <h3 className="font-semibold text-popover-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </DropdownMenuLabel>
                  <div className="max-h-96 overflow-y-auto">
                    {groupedCategories[category.key]?.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors w-full"
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-popover-foreground">{item.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                          </div>
                          {item.premium && <Star className="h-3 w-3 text-yellow-500" />}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Mais</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 bg-popover border border-border shadow-lg z-[100]">
                <div className="grid grid-cols-2 gap-6 p-6">
                  {megaMenuCategories.slice(4).map((category) => (
                    <div key={category.key} className="space-y-2">
                      <h4 className="font-semibold text-popover-foreground flex items-center space-x-2">
                        <span>{category.title}</span>
                        {category.premium && <Star className="h-3 w-3 text-yellow-500" />}
                      </h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="space-y-1">
                        {groupedCategories[category.key]?.slice(0, 3).map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden lg:flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border border-border shadow-lg z-[100]">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={user?.role === 'admin' ? "/admin" : "/dashboard"} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" className="hidden lg:flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Entrar</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-background overflow-y-auto">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  {megaMenuCategories.map((category) => (
                    <div key={category.key} className="space-y-3">
                      <h3 className="font-semibold text-foreground flex items-center space-x-2">
                        <span>{category.title}</span>
                        {category.premium && <Star className="h-4 w-4 text-yellow-500" />}
                      </h3>
                      <div className="pl-4 space-y-2">
                        {groupedCategories[category.key]?.slice(0, 5).map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.premium && <Star className="h-3 w-3 text-yellow-500" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to={user?.role === 'admin' ? "/admin" : "/dashboard"}
                          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={logout}
                          className="flex items-center space-x-2 text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sair</span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center space-x-2 text-sm text-primary font-medium"
                        >
                          <LogIn className="h-4 w-4" />
                          <span>Entrar</span>
                        </Link>
                      </>
                    )}
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
