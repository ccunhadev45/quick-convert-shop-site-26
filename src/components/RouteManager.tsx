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
  "/energy": lazy(() => import("@/pages/EnergyConverter")),
  "/number-base-converter": lazy(() => import("@/pages/NumberBaseConverter")),
  
  // Financeiros implementados
  "/currency": lazy(() => import("@/pages/CurrencyConverter")),
  "/crypto": lazy(() => import("@/pages/CryptoConverter")),
  "/interest": lazy(() => import("@/pages/InterestCalculator")),
  "/loan": lazy(() => import("@/pages/LoanCalculator")),
  "/mortgage": lazy(() => import("@/pages/MortgageCalculator")),
  "/dividend-calculator": lazy(() => import("@/pages/DividendCalculator")),
  "/inflation-calculator": lazy(() => import("@/pages/InflationCalculator")),
  
  // Saúde implementadas
  "/imc": lazy(() => import("@/pages/ImcCalculator")),
  "/tmb": lazy(() => import("@/pages/TmbCalculator")),
  "/calorie-calculator": lazy(() => import("@/pages/CalorieCalculator")),
  "/hydration-calculator": lazy(() => import("@/pages/HydrationCalculator")),
  "/nutrition-calculator": lazy(() => import("@/pages/NutritionCalculator")),
  
  // Calculadoras implementadas
  "/fuel": lazy(() => import("@/pages/FuelConsumption")),
  "/cooking": lazy(() => import("@/pages/CookingConverter")),
  "/tip": lazy(() => import("@/pages/TipCalculator")),
  "/age-calculator": lazy(() => import("@/pages/AgeCalculator")),
  "/recipe-converter": lazy(() => import("@/pages/RecipeConverter")),
  
  // Gaming implementadas
  "/fps-converter": lazy(() => import("@/pages/FpsConverter")),
  "/dps-calculator": lazy(() => import("@/pages/DpsCalculator")),
  "/engagement-calculator": lazy(() => import("@/pages/EngagementCalculator")),
  
  // Científicas implementadas
  "/physics-calculator": lazy(() => import("@/pages/PhysicsCalculator")),
  "/chemistry-calculator": lazy(() => import("@/pages/ChemistryCalculator")),
  "/math-calculator": lazy(() => import("@/pages/MathCalculator")),
  
  // Programação implementadas
  "/color-converter": lazy(() => import("@/pages/ColorConverter")),
  "/encoding-converter": lazy(() => import("@/pages/EncodingConverter")),
  
  // Engenharia implementadas
  "/concrete-calculator": lazy(() => import("@/pages/ConcreteCalculator")),
  "/construction-area-calculator": lazy(() => import("@/pages/ConstructionAreaCalculator")),
  "/structural-calculator": lazy(() => import("@/pages/StructuralCalculator")),
  
  // Viagem implementadas
  "/timezone-converter": lazy(() => import("@/pages/TimezoneConverter")),
  "/luggage-calculator": lazy(() => import("@/pages/LuggageCalculator")),
  
  // Pets implementadas
  "/pet-age-converter": lazy(() => import("@/pages/PetAgeConverter")),
  
  // Sustentabilidade implementadas
  "/recycling-calculator": lazy(() => import("@/pages/RecyclingCalculator")),
  
  // Logística implementadas
  "/logistics-calculator": lazy(() => import("@/pages/LogisticsCalculator")),
  
  // Media implementadas
  "/media-converter": lazy(() => import("@/pages/MediaConverter")),
  
  // Estudantes implementadas
  "/grade-converter": lazy(() => import("@/pages/GradeConverter")),
  
  // Agronegócio implementadas
  "/agribusiness-calculator": lazy(() => import("@/pages/AgribusinessCalculator")),
  
  // Outros implementados
  "/educational-units": lazy(() => import("@/pages/EducationalUnits")),
  "/date-calculator": lazy(() => import("@/pages/DateCalculator")),
  "/financial-indices": lazy(() => import("@/pages/FinancialIndicesPage")),
  "/fuel-calculator": lazy(() => import("@/pages/FuelCalculator"))
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