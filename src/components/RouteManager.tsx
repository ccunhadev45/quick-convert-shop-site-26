import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { unifiedCategories, isRouteImplemented } from "@/data/unifiedCategoriesData";
import EnhancedLoadingSpinner from "@/components/EnhancedLoadingSpinner";
import PageTemplate from "@/components/PageTemplate";
import NotFound from "@/pages/NotFound";

// Import de páginas principais
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Lazy loading das páginas implementadas
const lazyPages = {
  // Conversores implementados
  "/length": lazy(() => import("@/pages/LengthConverter")),
  "/temperature": lazy(() => import("@/pages/TemperatureConverter")),
  "/time": lazy(() => import("@/pages/TimeConverter")),
  "/area": lazy(() => import("@/pages/AreaConverter")),
  "/volume": lazy(() => import("@/pages/VolumeConverter")),
  "/weight": lazy(() => import("@/pages/WeightConverter")),
  "/speed": lazy(() => import("@/pages/SpeedConverter")),
  "/number": lazy(() => import("@/pages/NumberConverter")),
  
  // Financeiros implementados
  "/currency": lazy(() => import("@/pages/CurrencyConverter")),
  "/interest": lazy(() => import("@/pages/InterestCalculator")),
  "/loan": lazy(() => import("@/pages/LoanCalculator")),
  "/mortgage": lazy(() => import("@/pages/MortgageCalculator")),
  
  // Calculadoras implementadas
  "/fuel": lazy(() => import("@/pages/FuelConsumption")),
  "/cooking": lazy(() => import("@/pages/CookingConverter")),
  "/tip": lazy(() => import("@/pages/TipCalculator")),
  
  // Outros implementados
  "/educational-units": lazy(() => import("@/pages/EducationalUnits")),
  "/date-calculator": lazy(() => import("@/pages/DateCalculator"))
};

interface RouteComponentProps {
  category: any;
}

const RouteComponent: React.FC<RouteComponentProps> = ({ category }) => {
  const LazyPage = lazyPages[category.path as keyof typeof lazyPages];
  
  if (LazyPage && category.implemented) {
    return (
      <Suspense fallback={<EnhancedLoadingSpinner />}>
        <LazyPage />
      </Suspense>
    );
  }
  
  // Página não implementada - usar template
  return (
    <PageTemplate 
      title={category.title}
      description={category.description}
      icon={category.icon}
      tags={category.tags}
      premium={category.premium}
    />
  );
};

const RouteManager: React.FC = () => {
  return (
    <Routes>
      {/* Páginas principais */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Rotas dinâmicas baseadas nos dados */}
      {unifiedCategories.map((category) => (
        <Route
          key={category.path}
          path={category.path}
          element={<RouteComponent category={category} />}
        />
      ))}
      
      {/* Rota catch-all para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteManager;