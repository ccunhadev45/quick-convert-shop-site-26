
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { useFavorites } from "@/hooks/useFavorites";

const QuickFavorites = () => {
  const { getFavorites } = useConversionHistory();
  const { favorites } = useFavorites();
  
  const conversionFavorites = getFavorites().slice(0, 3);
  const toolFavorites = favorites.slice(0, 3);

  if (conversionFavorites.length === 0 && toolFavorites.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Seus Favoritos
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Acesso rápido às suas conversões e ferramentas favoritas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversões Favoritas */}
        {conversionFavorites.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                Conversões Favoritas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversionFavorites.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {record.category}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="font-mono">{record.input}</span>
                      <ArrowRight className="inline h-3 w-3 mx-2" />
                      <span className="font-mono font-semibold">{record.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Ferramentas Favoritas */}
        {toolFavorites.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                Ferramentas Favoritas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {toolFavorites.map((favorite) => (
                <div key={favorite.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {favorite.category}
                      </Badge>
                    </div>
                    <div className="font-medium">{favorite.title}</div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={favorite.path}>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuickFavorites;
