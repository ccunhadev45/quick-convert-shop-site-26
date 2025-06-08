
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LengthConverter from "./pages/LengthConverter";
import WeightConverter from "./pages/WeightConverter";
import VolumeConverter from "./pages/VolumeConverter";
import TemperatureConverter from "./pages/TemperatureConverter";
import ImcCalculator from "./pages/ImcCalculator";
import TmbCalculator from "./pages/TmbCalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/length" element={<LengthConverter />} />
          <Route path="/weight" element={<WeightConverter />} />
          <Route path="/volume" element={<VolumeConverter />} />
          <Route path="/temperature" element={<TemperatureConverter />} />
          <Route path="/imc" element={<ImcCalculator />} />
          <Route path="/tmb" element={<TmbCalculator />} />
          <Route path="/calories" element={<CalorieCalculator />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
