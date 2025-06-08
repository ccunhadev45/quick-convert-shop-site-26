
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const IngredientSubstitutes = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const substitutes = {
    "açúcar": [
      { substitute: "Mel", ratio: "3/4 xícara", notes: "Reduza líquidos em 1/4" },
      { substitute: "Stevia", ratio: "1 colher de chá", notes: "Para 1 xícara de açúcar" },
      { substitute: "Açúcar mascavo", ratio: "1:1", notes: "Mesmo volume" }
    ],
    "farinha de trigo": [
      { substitute: "Farinha de amêndoa", ratio: "1:1", notes: "Para receitas sem glúten" },
      { substitute: "Farinha de aveia", ratio: "1:1", notes: "Triture aveia até ficar pó" },
      { substitute: "Farinha de arroz", ratio: "3/4 xícara", notes: "Para 1 xícara de trigo" }
    ],
    "ovos": [
      { substitute: "Aquafaba", ratio: "3 colheres", notes: "Para 1 ovo" },
      { substitute: "Linhaça + água", ratio: "1 colher + 3 colheres", notes: "Deixe descansar 5 min" },
      { substitute: "Purê de maçã", ratio: "1/4 xícara", notes: "Para 1 ovo" }
    ],
    "manteiga": [
      { substitute: "Óleo de coco", ratio: "3/4 da quantidade", notes: "Use sólido ou derretido" },
      { substitute: "Azeite", ratio: "3/4 da quantidade", notes: "Para receitas salgadas" },
      { substitute: "Purê de banana", ratio: "1/2 da quantidade", notes: "Adiciona doçura" }
    ],
    "leite": [
      { substitute: "Leite de amêndoa", ratio: "1:1", notes: "Mesmo volume" },
      { substitute: "Leite de aveia", ratio: "1:1", notes: "Boa para panificação" },
      { substitute: "Leite de coco", ratio: "1:1", notes: "Adiciona cremosidade" }
    ],
    "creme de leite": [
      { substitute: "Leite de coco", ratio: "1:1", notes: "Use a parte sólida" },
      { substitute: "Cashew + água", ratio: "1 xícara + 1/2 xícara", notes: "Bata no liquidificador" },
      { substitute: "Iogurte grego", ratio: "1:1", notes: "Para receitas frias" }
    ]
  };

  const filteredSubstitutes = Object.entries(substitutes).filter(([ingredient]) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Substitutos de Ingredientes</h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buscar Substitutos</CardTitle>
            <CardDescription>
              Encontre alternativas para ingredientes que você não tem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Digite o ingrediente que quer substituir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {filteredSubstitutes.map(([ingredient, substitutes]) => (
            <Card key={ingredient}>
              <CardHeader>
                <CardTitle className="capitalize">{ingredient}</CardTitle>
                <CardDescription>
                  {substitutes.length} alternativas encontradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {substitutes.map((sub, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="font-semibold text-green-600 dark:text-green-400 mb-2">
                        {sub.substitute}
                      </div>
                      <div className="text-sm mb-2">
                        <Badge variant="outline">{sub.ratio}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {sub.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubstitutes.length === 0 && searchTerm && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum substituto encontrado para "{searchTerm}"
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Tente buscar por ingredientes como: açúcar, farinha, ovos, manteiga, leite
              </p>
            </CardContent>
          </Card>
        )}

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default IngredientSubstitutes;
