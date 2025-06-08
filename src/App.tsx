
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
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import BirthChart from "./pages/BirthChart";
import AstronomicalDistance from "./pages/AstronomicalDistance";
import PhysicsCalculator from "./pages/PhysicsCalculator";
import ChemistryCalculator from "./pages/ChemistryCalculator";
import MathCalculator from "./pages/MathCalculator";
import NumberBaseConverter from "./pages/NumberBaseConverter";
import EncodingConverter from "./pages/EncodingConverter";
import ColorConverter from "./pages/ColorConverter";
import FuelCalculator from "./pages/FuelCalculator";

// Novas páginas
import GradeConverter from "./pages/GradeConverter";
import GradeAverage from "./pages/GradeAverage";
import FpsConverter from "./pages/FpsConverter";
import TimezoneConverter from "./pages/TimezoneConverter";
import DividendCalculator from "./pages/DividendCalculator";
import GameCurrency from "./pages/GameCurrency";
import DpsCalculator from "./pages/DpsCalculator";
import GamingProbability from "./pages/GamingProbability";
import TipCalculator from "./pages/TipCalculator";
import PlugVoltage from "./pages/PlugVoltage";
import LuggageCalculator from "./pages/LuggageCalculator";
import VideoResolution from "./pages/VideoResolution";
import UploadTime from "./pages/UploadTime";
import MediaConverter from "./pages/MediaConverter";
import EngagementCalculator from "./pages/EngagementCalculator";
import StockSplits from "./pages/StockSplits";
import InflationCalculator from "./pages/InflationCalculator";
import InvestmentComparison from "./pages/InvestmentComparison";
import RecipeConverter from "./pages/RecipeConverter";
import IngredientSubstitutes from "./pages/IngredientSubstitutes";
import OvenConversions from "./pages/OvenConversions";
import NutritionCalculator from "./pages/NutritionCalculator";
import EducationalUnits from "./pages/EducationalUnits";
import BasicStatistics from "./pages/BasicStatistics";

// Novas páginas de Moda & Beleza
import ClothingSizes from "./pages/ClothingSizes";
import HairColor from "./pages/HairColor";
import BodyMeasurements from "./pages/BodyMeasurements";
import CarbonFootprint from "./pages/CarbonFootprint";
import EnergySavings from "./pages/EnergySavings";
import RecyclingCalculator from "./pages/RecyclingCalculator";
import PetAgeConverter from "./pages/PetAgeConverter";
import VetDosage from "./pages/VetDosage";
import PetFeeding from "./pages/PetFeeding";

// Novas páginas de Saúde Profissional
import OccupationalHealth from "./pages/OccupationalHealth";
import MentalWellness from "./pages/MentalWellness";
import Ergonomics from "./pages/Ergonomics";
import WorkplaceSafety from "./pages/WorkplaceSafety";
import MedicalDosage from "./pages/MedicalDosage";
import LabConversions from "./pages/LabConversions";
import SpecializedBmi from "./pages/SpecializedBmi";
import HydrationCalculator from "./pages/HydrationCalculator";

// Página administrativa
import DocumentationAndImprovements from "./pages/DocumentationAndImprovements";

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
            <Route path="/physics-calculator" element={<PhysicsCalculator />} />
            <Route path="/chemistry-calculator" element={<ChemistryCalculator />} />
            <Route path="/math-calculator" element={<MathCalculator />} />
            <Route path="/number-base-converter" element={<NumberBaseConverter />} />
            <Route path="/encoding-converter" element={<EncodingConverter />} />
            <Route path="/color-converter" element={<ColorConverter />} />
            <Route path="/fuel-calculator" element={<FuelCalculator />} />
            
            {/* Novas rotas - Estudantes */}
            <Route path="/grade-converter" element={<GradeConverter />} />
            <Route path="/grade-average" element={<GradeAverage />} />
            <Route path="/educational-units" element={<EducationalUnits />} />
            <Route path="/basic-statistics" element={<BasicStatistics />} />
            
            {/* Novas rotas - Gaming */}
            <Route path="/fps-converter" element={<FpsConverter />} />
            <Route path="/game-currency" element={<GameCurrency />} />
            <Route path="/dps-calculator" element={<DpsCalculator />} />
            <Route path="/gaming-probability" element={<GamingProbability />} />
            
            {/* Novas rotas - Viagem */}
            <Route path="/timezone-converter" element={<TimezoneConverter />} />
            <Route path="/tip-calculator" element={<TipCalculator />} />
            <Route path="/plug-voltage" element={<PlugVoltage />} />
            <Route path="/luggage-calculator" element={<LuggageCalculator />} />
            
            {/* Novas rotas - Criadores */}
            <Route path="/video-resolution" element={<VideoResolution />} />
            <Route path="/upload-time" element={<UploadTime />} />
            <Route path="/media-converter" element={<MediaConverter />} />
            <Route path="/engagement-calculator" element={<EngagementCalculator />} />
            
            {/* Novas rotas - Investimentos */}
            <Route path="/dividend-calculator" element={<DividendCalculator />} />
            <Route path="/stock-splits" element={<StockSplits />} />
            <Route path="/inflation-calculator" element={<InflationCalculator />} />
            <Route path="/investment-comparison" element={<InvestmentComparison />} />
            
            {/* Novas rotas - Culinária */}
            <Route path="/recipe-converter" element={<RecipeConverter />} />
            <Route path="/ingredient-substitutes" element={<IngredientSubstitutes />} />
            <Route path="/oven-conversions" element={<OvenConversions />} />
            <Route path="/nutrition-calculator" element={<NutritionCalculator />} />
            
            {/* Novas rotas - Moda & Beleza */}
            <Route path="/clothing-sizes" element={<ClothingSizes />} />
            <Route path="/hair-color" element={<HairColor />} />
            <Route path="/body-measurements" element={<BodyMeasurements />} />
            
            {/* Novas rotas - Sustentabilidade */}
            <Route path="/carbon-footprint" element={<CarbonFootprint />} />
            <Route path="/energy-savings" element={<EnergySavings />} />
            <Route path="/recycling-calculator" element={<RecyclingCalculator />} />
            
            {/* Novas rotas - Pets & Veterinária */}
            <Route path="/pet-age-converter" element={<PetAgeConverter />} />
            <Route path="/vet-dosage" element={<VetDosage />} />
            <Route path="/pet-feeding" element={<PetFeeding />} />
            
            {/* Novas rotas - Saúde Profissional */}
            <Route path="/occupational-health" element={<OccupationalHealth />} />
            <Route path="/mental-wellness" element={<MentalWellness />} />
            <Route path="/ergonomics" element={<Ergonomics />} />
            <Route path="/workplace-safety" element={<WorkplaceSafety />} />
            
            {/* Administração */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/documentation" element={<DocumentationAndImprovements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
