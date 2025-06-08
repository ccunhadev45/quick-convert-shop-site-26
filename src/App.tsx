
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import EnhancedLoadingSpinner from "@/components/EnhancedLoadingSpinner";
import ErrorFallback from "@/components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

// Páginas principais carregadas imediatamente
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Páginas de conversores com lazy loading
const LengthConverter = lazy(() => import("@/pages/LengthConverter"));
const TemperatureConverter = lazy(() => import("@/pages/TemperatureConverter"));
const TimeConverter = lazy(() => import("@/pages/TimeConverter"));
const AreaConverter = lazy(() => import("@/pages/AreaConverter"));
const VolumeConverter = lazy(() => import("@/pages/VolumeConverter"));
const WeightConverter = lazy(() => import("@/pages/WeightConverter"));
const SpeedConverter = lazy(() => import("@/pages/SpeedConverter"));
const NumberConverter = lazy(() => import("@/pages/NumberConverter"));
const CurrencyConverter = lazy(() => import("@/pages/CurrencyConverter"));
const FuelConsumption = lazy(() => import("@/pages/FuelConsumption"));
const CookingConverter = lazy(() => import("@/pages/CookingConverter"));
const TipCalculator = lazy(() => import("@/pages/TipCalculator"));
const LoanCalculator = lazy(() => import("@/pages/LoanCalculator"));
const MortgageCalculator = lazy(() => import("@/pages/MortgageCalculator"));
const InterestCalculator = lazy(() => import("@/pages/InterestCalculator"));

// Páginas adicionais
const EducationalUnits = lazy(() => import("@/pages/EducationalUnits"));
const DateCalculator = lazy(() => import("@/pages/DateCalculator"));

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Global error caught:", error, errorInfo);
      }}
    >
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="App">
            <Suspense fallback={<EnhancedLoadingSpinner />}>
              <Routes>
                {/* Páginas principais */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* Conversores de unidades */}
                <Route path="/length" element={<LengthConverter />} />
                <Route path="/temperature" element={<TemperatureConverter />} />
                <Route path="/time" element={<TimeConverter />} />
                <Route path="/area" element={<AreaConverter />} />
                <Route path="/volume" element={<VolumeConverter />} />
                <Route path="/weight" element={<WeightConverter />} />
                <Route path="/speed" element={<SpeedConverter />} />
                <Route path="/number" element={<NumberConverter />} />
                
                {/* Conversores financeiros */}
                <Route path="/currency" element={<CurrencyConverter />} />
                
                {/* Calculadoras */}
                <Route path="/fuel" element={<FuelConsumption />} />
                <Route path="/cooking" element={<CookingConverter />} />
                <Route path="/tip" element={<TipCalculator />} />
                <Route path="/loan" element={<LoanCalculator />} />
                <Route path="/mortgage" element={<MortgageCalculator />} />
                <Route path="/interest" element={<InterestCalculator />} />
                
                {/* Páginas adicionais */}
                <Route path="/educational-units" element={<EducationalUnits />} />
                <Route path="/date-calculator" element={<DateCalculator />} />
                
                {/* Rota catch-all para páginas não encontradas */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
                      <p className="text-muted-foreground mb-4">A página que você está procurando não existe.</p>
                      <a href="/" className="text-primary hover:underline">Voltar ao início</a>
                    </div>
                  </div>
                } />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
