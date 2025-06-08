
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const RecipeConverter = () => {
  const [servings, setServings] = useState<string>("4");
  const [targetServings, setTargetServings] = useState<string>("6");
  const [ingredients, setIngredients] = useState<string>("");
  const [convertedRecipe, setConvertedRecipe] = useState<string>("");

  const convertRecipe = () => {
    const originalServings = parseFloat(servings);
    const newServings = parseFloat(targetServings);
    
    if (isNaN(originalServings) || isNaN(newServings) || originalServings <= 0) return;
    
    const multiplier = newServings / originalServings;
    
    // Parse ingredients and convert quantities
    const lines = ingredients.split('\n');
    const convertedLines = lines.map(line => {
      if (!line.trim()) return line;
      
      // Look for numbers (including fractions and decimals)
      const numberRegex = /(\d+(?:\.\d+)?(?:\/\d+)?)\s*((?:x?[íc]cara?s?|colheres?|gramas?|kg|ml|litros?|unidades?|dentes?|fatias?|pedaços?)\b)?/gi;
      
      return line.replace(numberRegex, (match, number, unit) => {
        const numValue = parseFloat(number);
        if (isNaN(numValue)) return match;
        
        const converted = (numValue * multiplier).toFixed(2);
        return `${converted}${unit ? ` ${unit}` : ''}`;
      });
    });
    
    setConvertedRecipe(convertedLines.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Conversor de Receitas</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Receita Original</CardTitle>
              <CardDescription>
                Digite a receita original e ajuste as porções
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servings">Porções originais</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="target">Porções desejadas</Label>
                  <Input
                    id="target"
                    type="number"
                    value={targetServings}
                    onChange={(e) => setTargetServings(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ingredients">Ingredientes (um por linha)</Label>
                <textarea
                  id="ingredients"
                  className="w-full h-64 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  placeholder="2 xícaras de farinha&#10;1 colher de açúcar&#10;500ml de leite&#10;3 ovos"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              
              <Button onClick={convertRecipe} className="w-full">
                Converter Receita
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita Convertida</CardTitle>
              <CardDescription>
                Ingredientes ajustados para {targetServings} porções
              </CardDescription>
            </CardHeader>
            <CardContent>
              {convertedRecipe ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {convertedRecipe}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  A receita convertida aparecerá aqui após a conversão
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
      </div>
      
      <AdSpace position="footer" />
    </div>
  );
};

export default RecipeConverter;
