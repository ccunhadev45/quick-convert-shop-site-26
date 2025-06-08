
import { Link } from "react-router-dom";
import { Calculator, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { name: "Início", path: "/" },
    { name: "Comprimento", path: "/length" },
    { name: "Peso", path: "/weight" },
    { name: "Volume", path: "/volume" },
    { name: "Temperatura", path: "/temperature" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Super Conversor</span>
              <div className="text-xs text-gray-500">de Unidades</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-lg text-gray-600 hover:text-blue-600 transition-colors duration-200 mt-4 pt-4 border-t"
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
