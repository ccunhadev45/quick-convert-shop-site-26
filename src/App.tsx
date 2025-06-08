
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy loading para todas as páginas
const Index = lazy(() => import("./pages/Index"));
const RegraDeTres = lazy(() => import("./pages/RegraDeTres"));
const LengthConverter = lazy(() => import("./pages/LengthConverter"));
const WeightConverter = lazy(() => import("./pages/WeightConverter"));
const VolumeConverter = lazy(() => import("./pages/VolumeConverter"));
const TemperatureConverter = lazy(() => import("./pages/TemperatureConverter"));
const AreaConverter = lazy(() => import("./pages/AreaConverter"));
const EnergyConverter = lazy(() => import("./pages/EnergyConverter"));
const TimeConverter = lazy(() => import("./pages/TimeConverter"));
const SpeedConverter = lazy(() => import("./pages/SpeedConverter"));
const CurrencyConverter = lazy(() => import("./pages/CurrencyConverter"));
const CryptoConverter = lazy(() => import("./pages/CryptoConverter"));
const FinancialIndicesPage = lazy(() => import("./pages/FinancialIndicesPage"));
const ImcCalculator = lazy(() => import("./pages/ImcCalculator"));
const TmbCalculator = lazy(() => import("./pages/TmbCalculator"));
const CalorieCalculator = lazy(() => import("./pages/CalorieCalculator"));
const ConcreteCalculator = lazy(() => import("./pages/ConcreteCalculator"));
const ConstructionAreaCalculator = lazy(() => import("./pages/ConstructionAreaCalculator"));
const StructuralCalculator = lazy(() => import("./pages/StructuralCalculator"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BirthChart = lazy(() => import("./pages/BirthChart"));
const AstronomicalDistance = lazy(() => import("./pages/AstronomicalDistance"));
const PhysicsCalculator = lazy(() => import("./pages/PhysicsCalculator"));
const ChemistryCalculator = lazy(() => import("./pages/ChemistryCalculator"));
const MathCalculator = lazy(() => import("./pages/MathCalculator"));
const NumberBaseConverter = lazy(() => import("./pages/NumberBaseConverter"));
const EncodingConverter = lazy(() => import("./pages/EncodingConverter"));
const ColorConverter = lazy(() => import("./pages/ColorConverter"));
const FuelCalculator = lazy(() => import("./pages/FuelCalculator"));
const GradeConverter = lazy(() => import("./pages/GradeConverter"));
const GradeAverage = lazy(() => import("./pages/GradeAverage"));
const FpsConverter = lazy(() => import("./pages/FpsConverter"));
const TimezoneConverter = lazy(() => import("./pages/TimezoneConverter"));
const DividendCalculator = lazy(() => import("./pages/DividendCalculator"));
const GameCurrency = lazy(() => import("./pages/GameCurrency"));
const DpsCalculator = lazy(() => import("./pages/DpsCalculator"));
const GamingProbability = lazy(() => import("./pages/GamingProbability"));
const TipCalculator = lazy(() => import("./pages/TipCalculator"));
const PlugVoltage = lazy(() => import("./pages/PlugVoltage"));
const LuggageCalculator = lazy(() => import("./pages/LuggageCalculator"));
const VideoResolution = lazy(() => import("./pages/VideoResolution"));
const UploadTime = lazy(() => import("./pages/UploadTime"));
const MediaConverter = lazy(() => import("./pages/MediaConverter"));
const EngagementCalculator = lazy(() => import("./pages/EngagementCalculator"));
const StockSplits = lazy(() => import("./pages/StockSplits"));
const InflationCalculator = lazy(() => import("./pages/InflationCalculator"));
const InvestmentComparison = lazy(() => import("./pages/InvestmentComparison"));
const RecipeConverter = lazy(() => import("./pages/RecipeConverter"));
const IngredientSubstitutes = lazy(() => import("./pages/IngredientSubstitutes"));
const OvenConversions = lazy(() => import("./pages/OvenConversions"));
const NutritionCalculator = lazy(() => import("./pages/NutritionCalculator"));
const EducationalUnits = lazy(() => import("./pages/EducationalUnits"));
const BasicStatistics = lazy(() => import("./pages/BasicStatistics"));
const ClothingSizes = lazy(() => import("./pages/ClothingSizes"));
const HairColor = lazy(() => import("./pages/HairColor"));
const BodyMeasurements = lazy(() => import("./pages/BodyMeasurements"));
const CarbonFootprint = lazy(() => import("./pages/CarbonFootprint"));
const EnergySavings = lazy(() => import("./pages/EnergySavings"));
const RecyclingCalculator = lazy(() => import("./pages/RecyclingCalculator"));
const PetAgeConverter = lazy(() => import("./pages/PetAgeConverter"));
const VetDosage = lazy(() => import("./pages/VetDosage"));
const PetFeeding = lazy(() => import("./pages/PetFeeding"));
const OccupationalHealth = lazy(() => import("./pages/OccupationalHealth"));
const MentalWellness = lazy(() => import("./pages/MentalWellness"));
const Ergonomics = lazy(() => import("./pages/Ergonomics"));
const WorkplaceSafety = lazy(() => import("./pages/WorkplaceSafety"));
const MedicalDosage = lazy(() => import("./pages/MedicalDosage"));
const LabConversions = lazy(() => import("./pages/LabConversions"));
const SpecializedBmi = lazy(() => import("./pages/SpecializedBmi"));
const HydrationCalculator = lazy(() => import("./pages/HydrationCalculator"));
const DocumentationAndImprovements = lazy(() => import("./pages/DocumentationAndImprovements"));
const AgribusinessCalculator = lazy(() => import("./pages/AgribusinessCalculator"));
const LogisticsCalculator = lazy(() => import("./pages/LogisticsCalculator"));
const AdvancedFinance = lazy(() => import("./pages/AdvancedFinance"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
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
                <Route path="/grade-converter" element={<GradeConverter />} />
                <Route path="/grade-average" element={<GradeAverage />} />
                <Route path="/educational-units" element={<EducationalUnits />} />
                <Route path="/basic-statistics" element={<BasicStatistics />} />
                <Route path="/fps-converter" element={<FpsConverter />} />
                <Route path="/game-currency" element={<GameCurrency />} />
                <Route path="/dps-calculator" element={<DpsCalculator />} />
                <Route path="/gaming-probability" element={<GamingProbability />} />
                <Route path="/timezone-converter" element={<TimezoneConverter />} />
                <Route path="/tip-calculator" element={<TipCalculator />} />
                <Route path="/plug-voltage" element={<PlugVoltage />} />
                <Route path="/luggage-calculator" element={<LuggageCalculator />} />
                <Route path="/video-resolution" element={<VideoResolution />} />
                <Route path="/upload-time" element={<UploadTime />} />
                <Route path="/media-converter" element={<MediaConverter />} />
                <Route path="/engagement-calculator" element={<EngagementCalculator />} />
                <Route path="/dividend-calculator" element={<DividendCalculator />} />
                <Route path="/stock-splits" element={<StockSplits />} />
                <Route path="/inflation-calculator" element={<InflationCalculator />} />
                <Route path="/investment-comparison" element={<InvestmentComparison />} />
                <Route path="/recipe-converter" element={<RecipeConverter />} />
                <Route path="/ingredient-substitutes" element={<IngredientSubstitutes />} />
                <Route path="/oven-conversions" element={<OvenConversions />} />
                <Route path="/nutrition-calculator" element={<NutritionCalculator />} />
                <Route path="/clothing-sizes" element={<ClothingSizes />} />
                <Route path="/hair-color" element={<HairColor />} />
                <Route path="/body-measurements" element={<BodyMeasurements />} />
                <Route path="/carbon-footprint" element={<CarbonFootprint />} />
                <Route path="/energy-savings" element={<EnergySavings />} />
                <Route path="/recycling-calculator" element={<RecyclingCalculator />} />
                <Route path="/pet-age-converter" element={<PetAgeConverter />} />
                <Route path="/vet-dosage" element={<VetDosage />} />
                <Route path="/pet-feeding" element={<PetFeeding />} />
                <Route path="/occupational-health" element={<OccupationalHealth />} />
                <Route path="/mental-wellness" element={<MentalWellness />} />
                <Route path="/ergonomics" element={<Ergonomics />} />
                <Route path="/workplace-safety" element={<WorkplaceSafety />} />
                <Route path="/medical-dosage" element={<MedicalDosage />} />
                <Route path="/lab-conversions" element={<LabConversions />} />
                <Route path="/specialized-bmi" element={<SpecializedBmi />} />
                <Route path="/hydration-calculator" element={<HydrationCalculator />} />
                <Route path="/agribusiness-calculator" element={<AgribusinessCalculator />} />
                <Route path="/logistics-calculator" element={<LogisticsCalculator />} />
                <Route path="/advanced-finance" element={<AdvancedFinance />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/documentation" element={<DocumentationAndImprovements />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
