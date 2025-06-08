
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { allEnhancedCategories } from "@/data/enhancedCategoriesData";

interface Favorite {
  id: string;
  path: string;
  title: string;
  description: string;
  addedAt: string;
}

const UserFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem('converter-favorites');
      if (stored) {
        try {
          const favoriteIds = JSON.parse(stored);
          const favoriteConverters = allEnhancedCategories.filter(conv => 
            favoriteIds.includes(conv.path)
          ).map(conv => ({
            id: conv.path,
            path: conv.path,
            title: conv.title,
            description: conv.description,
            addedAt: new Date().toISOString() // Simular data de adição
          }));
          setFavorites(favoriteConverters);
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      }
    };

    loadFavorites();
    
    // Escutar mudanças no localStorage
    const handleStorageChange = () => loadFavorites();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFavorite = (path: string) => {
    const stored = localStorage.getItem('converter-favorites');
    if (stored) {
      try {
        const currentFavorites = JSON.parse(stored);
        const updatedFavorites = currentFavorites.filter((fav: string) => fav !== path);
        localStorage.setItem('converter-favorites', JSON.stringify(updatedFavorites));
        setFavorites(prev => prev.filter(fav => fav.path !== path));
      } catch (error) {
        console.error('Erro ao remover favorito:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-foreground">Meus Favoritos</h2>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-muted-foreground mb-4">
              Adicione conversores aos seus favoritos para acessá-los rapidamente aqui.
            </p>
            <Link to="/">
              <Button>Explorar Conversores</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{favorite.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {favorite.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(favorite.path)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Adicionado em {new Date(favorite.addedAt).toLocaleDateString('pt-BR')}
                  </span>
                  <Link to={favorite.path}>
                    <Button size="sm" className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      Abrir
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
