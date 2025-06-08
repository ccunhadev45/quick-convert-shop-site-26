import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Star, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import EnhancedConverterCard from "@/components/EnhancedConverterCard";
import { CategoryCard } from "@/data/unifiedCategoriesData";

interface OptimizedCategorySectionProps {
  title: string;
  description: string;
  cards: CategoryCard[];
  defaultExpanded?: boolean;
  showStats?: boolean;
}

const OptimizedCategorySection: React.FC<OptimizedCategorySectionProps> = ({
  title,
  description,
  cards,
  defaultExpanded = true,
  showStats = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Estatísticas das categorias
  const stats = useMemo(() => {
    const implemented = cards.filter(card => card.implemented).length;
    const premium = cards.filter(card => card.premium).length;
    const total = cards.length;
    
    return {
      implemented,
      premium,
      total,
      implementedPercentage: total > 0 ? Math.round((implemented / total) * 100) : 0
    };
  }, [cards]);

  // Ordenar cards: implementados primeiro, depois premium, depois alfabético
  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => {
      // Primeiro: implementados
      if (a.implemented !== b.implemented) {
        return b.implemented ? 1 : -1;
      }
      
      // Segundo: premium
      if (a.premium !== b.premium) {
        return a.premium ? 1 : -1;
      }
      
      // Terceiro: alfabético
      return a.title.localeCompare(b.title);
    });
  }, [cards]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              
              {showStats && (
                <div className="flex gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {stats.implemented}/{stats.total}
                  </Badge>
                  
                  {stats.premium > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {stats.premium} Premium
                    </Badge>
                  )}
                  
                  <Badge 
                    variant={stats.implementedPercentage >= 75 ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {stats.implementedPercentage}% Completo
                  </Badge>
                </div>
              )}
            </div>
            
            <p className="text-muted-foreground">{description}</p>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-4">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCards.map((card, index) => (
              <div key={card.path} className="relative">
                <EnhancedConverterCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  path={card.path}
                  color={card.color}
                  premium={card.premium}
                />
                
                {/* Badge de status */}
                <div className="absolute top-3 right-3">
                  {card.implemented ? (
                    <Badge 
                      variant="default" 
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Ativo
                    </Badge>
                  ) : (
                    <Badge 
                      variant="secondary" 
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      Em breve
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Estatísticas expandidas */}
          {showStats && isExpanded && stats.total > 0 && (
            <Card className="mt-6 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas da Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stats.implemented}</div>
                    <div className="text-sm text-muted-foreground">Implementadas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{stats.total - stats.implemented}</div>
                    <div className="text-sm text-muted-foreground">Em desenvolvimento</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.premium}</div>
                    <div className="text-sm text-muted-foreground">Premium</div>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso de Implementação</span>
                    <span>{stats.implementedPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${stats.implementedPercentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default OptimizedCategorySection;