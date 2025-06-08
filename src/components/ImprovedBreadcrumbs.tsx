import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { unifiedCategories } from "@/data/unifiedCategoriesData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
}

const ImprovedBreadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Início", href: "/", icon: Home }
    ];

    // Páginas especiais
    if (path === "/login") {
      breadcrumbs.push({ label: "Login" });
      return breadcrumbs;
    }
    
    if (path === "/dashboard") {
      breadcrumbs.push({ label: "Dashboard do Usuário" });
      return breadcrumbs;
    }
    
    if (path === "/admin") {
      breadcrumbs.push({ label: "Painel Administrativo" });
      return breadcrumbs;
    }

    // Encontrar categoria correspondente
    const category = unifiedCategories.find(cat => cat.path === path);
    
    if (category) {
      // Adicionar categoria pai baseada no tipo
      const typeLabels: { [key: string]: string } = {
        converter: "Conversores",
        financial: "Financeiro",
        health: "Saúde",
        scientific: "Científicas",
        engineering: "Engenharia",
        programming: "Programação",
        productivity: "Produtividade",
        gaming: "Gaming",
        travel: "Viagem",
        content: "Criadores",
        culinary: "Culinária",
        student: "Estudantes",
        astrology: "Astrologia",
        astronomical: "Astronomia",
        fashion: "Moda",
        sustainability: "Sustentabilidade",
        pets: "Pets"
      };

      const typeLabel = typeLabels[category.type];
      if (typeLabel) {
        breadcrumbs.push({ 
          label: typeLabel,
          href: `/?filter=${category.type}`
        });
      }

      breadcrumbs.push({ label: category.title });
    } else {
      // Página não encontrada
      breadcrumbs.push({ label: "Página não encontrada" });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Não mostrar breadcrumbs na página inicial
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-6 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href} className="flex items-center gap-2 hover:text-primary transition-colors">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default ImprovedBreadcrumbs;