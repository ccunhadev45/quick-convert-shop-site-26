
import { lazy } from "react";
import { allEnhancedCategories } from "@/data/enhancedCategoriesData";

// Mapeamento de páginas existentes
const pageComponents = {
  "/length": lazy(() => import("@/pages/LengthConverter")),
  "/temperature": lazy(() => import("@/pages/TemperatureConverter")),
  "/time": lazy(() => import("@/pages/TimeConverter")),
  "/area": lazy(() => import("@/pages/AreaConverter")),
  "/volume": lazy(() => import("@/pages/VolumeConverter")),
  "/weight": lazy(() => import("@/pages/WeightConverter")),
  "/speed": lazy(() => import("@/pages/SpeedConverter")),
  "/number": lazy(() => import("@/pages/NumberConverter")),
  "/currency": lazy(() => import("@/pages/CurrencyConverter")),
  "/fuel": lazy(() => import("@/pages/FuelConsumption")),
  "/cooking": lazy(() => import("@/pages/CookingConverter")),
  "/age": lazy(() => import("@/pages/AgeCalculator")),
  "/date": lazy(() => import("@/pages/DateCalculator")),
  "/tip": lazy(() => import("@/pages/TipCalculator")),
  "/loan": lazy(() => import("@/pages/LoanCalculator")),
  "/mortgage": lazy(() => import("@/pages/MortgageCalculator")),
  "/interest": lazy(() => import("@/pages/InterestCalculator"))
};

export const getAvailableRoutes = () => {
  return allEnhancedCategories
    .filter(category => pageComponents[category.path as keyof typeof pageComponents])
    .map(category => ({
      path: category.path,
      component: pageComponents[category.path as keyof typeof pageComponents],
      title: category.title
    }));
};

export const isRouteAvailable = (path: string) => {
  return Object.keys(pageComponents).includes(path);
};
