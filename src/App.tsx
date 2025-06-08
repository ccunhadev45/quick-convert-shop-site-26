
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import RegraDeTres from "./pages/RegraDeTres";
import LengthConverter from "./pages/LengthConverter";
import WeightConverter from "./pages/WeightConverter";
import VolumeConverter from "./pages/VolumeConverter";
import TemperatureConverter from "./pages/TemperatureConverter";
import AreaConverter from "./pages/AreaConverter";
import EnergyConverter from "./pages/EnergyConverter";
import TimeConverter from "./pages/TimeConverter";
import SpeedConverter from "./pages/SpeedConverter";
import CurrencyConverter from "./pages/CurrencyConverter";
import CryptoConverter from "./pages/CryptoConverter";
import FinancialIndicesPage from "./pages/FinancialIndicesPage";
import ImcCalculator from "./pages/ImcCalculator";
import TmbCalculator from "./pages/TmbCalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import ConcreteCalculator from "./pages/ConcreteCalculator";
import ConstructionAreaCalculator from "./pages/ConstructionAreaCalculator";
import StructuralCalculator from "./pages/StructuralCalculator";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import BirthChart from "./pages/BirthChart";
import AstronomicalDistance from "./pages/AstronomicalDistance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/regra-de-tres" element={<RegraDeTres />} />
            <Route path="/length" element={<LengthConverter />} />
            <Route path="/weight" element={<WeightConverter />} />
            <Route path="/volume" element={<VolumeConverter />} />
            <Route path="/temperature" element={<TemperatureConverter />} />
            <Route path="/area" element={<AreaConverter />} />
            <Route path="/energy" element={<EnergyConverter />} />
            <Route path="/time" element={<TimeConverter />} />
            <Route path="/speed" element={<SpeedConverter />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/crypto" element={<CryptoConverter />} />
            <Route path="/financial-indices" element={<FinancialIndicesPage />} />
            <Route path="/imc" element={<ImcCalculator />} />
            <Route path="/tmb" element={<TmbCalculator />} />
            <Route path="/calories" element={<CalorieCalculator />} />
            <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
            <Route path="/construction-area" element={<ConstructionAreaCalculator />} />
            <Route path="/structural-calculator" element={<StructuralCalculator />} />
            <Route path="/birth-chart" element={<BirthChart />} />
            <Route path="/astronomical-distance" element={<AstronomicalDistance />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
