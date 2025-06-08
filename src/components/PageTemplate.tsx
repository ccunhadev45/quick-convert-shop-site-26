import React from "react";
import { ArrowLeft, Construction, Star, Clock, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

interface PageTemplateProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  tags?: string[];
  premium?: boolean;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  icon: Icon,
  tags = [],
  premium = false
}) => {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Icon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                {title}
                {premium && <Star className="h-5 w-5 text-yellow-500" />}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Banner de desenvolvimento */}
          <Card className="border-dashed border-2 border-muted-foreground/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Construction className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">
                Em Desenvolvimento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
              </p>
              
              {premium && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold text-foreground">Funcionalidade Premium</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Esta será uma funcionalidade avançada disponível para usuários premium.
                  </p>
                </div>
              )}

              {tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Relacionado a:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Button asChild variant="default">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Início
                  </Link>
                </Button>
                
                <Button variant="outline" disabled>
                  <Clock className="h-4 w-4 mr-2" />
                  Notificar quando pronto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sugestões de funcionalidades similares */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Enquanto isso, explore estas funcionalidades:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/length" className="block">
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-foreground">Conversor de Comprimento</h3>
                    <p className="text-sm text-muted-foreground">Converter metros, pés, polegadas</p>
                  </div>
                </Link>
                
                <Link to="/currency" className="block">
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-foreground">Conversor de Moedas</h3>
                    <p className="text-sm text-muted-foreground">Converter entre diferentes moedas</p>
                  </div>
                </Link>
                
                <Link to="/tip" className="block">
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-foreground">Calculadora de Gorjeta</h3>
                    <p className="text-sm text-muted-foreground">Calcular gorjetas facilmente</p>
                  </div>
                </Link>
                
                <Link to="/fuel" className="block">
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-foreground">Consumo de Combustível</h3>
                    <p className="text-sm text-muted-foreground">Calcular consumo e custos</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AdSpace position="footer" />
    </div>
  );
};

export default PageTemplate;