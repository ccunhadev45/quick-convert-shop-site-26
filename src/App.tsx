import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";
import LengthConverter from "@/pages/LengthConverter";
import TemperatureConverter from "@/pages/TemperatureConverter";
import TimeConverter from "@/pages/TimeConverter";
import AreaConverter from "@/pages/AreaConverter";
import VolumeConverter from "@/pages/VolumeConverter";
import WeightConverter from "@/pages/WeightConverter";
import SpeedConverter from "@/pages/SpeedConverter";
import NumberConverter from "@/pages/NumberConverter";
import CurrencyConverter from "@/pages/CurrencyConverter";
import FuelConsumption from "@/pages/FuelConsumption";
import CookingConverter from "@/pages/CookingConverter";
import AgeCalculator from "@/pages/AgeCalculator";
import DateCalculator from "@/pages/DateCalculator";
import PercentageCalculator from "@/pages/PercentageCalculator";
import DiscountCalculator from "@/pages/DiscountCalculator";
import TipCalculator from "@/pages/TipCalculator";
import GPA from "@/pages/GPA";
import CGPA from "@/pages/CGPA";
import Salary from "@/pages/Salary";
import Body from "@/pages/Body";
import IdealWeight from "@/pages/IdealWeight";
import BMR from "@/pages/BMR";
import Calorie from "@/pages/Calorie";
import LoanCalculator from "@/pages/LoanCalculator";
import MortgageCalculator from "@/pages/MortgageCalculator";
import InterestCalculator from "@/pages/InterestCalculator";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/length" element={<LengthConverter />} />
            <Route path="/temperature" element={<TemperatureConverter />} />
            <Route path="/time" element={<TimeConverter />} />
            <Route path="/area" element={<AreaConverter />} />
            <Route path="/volume" element={<VolumeConverter />} />
            <Route path="/weight" element={<WeightConverter />} />
            <Route path="/speed" element={<SpeedConverter />} />
            <Route path="/number" element={<NumberConverter />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/fuel" element={<FuelConsumption />} />
            <Route path="/cooking" element={<CookingConverter />} />
            <Route path="/age" element={<AgeCalculator />} />
            <Route path="/date" element={<DateCalculator />} />
            <Route path="/percentage" element={<PercentageCalculator />} />
            <Route path="/discount" element={<DiscountCalculator />} />
            <Route path="/tip" element={<TipCalculator />} />
            <Route path="/gpa" element={<GPA />} />
            <Route path="/cgpa" element={<CGPA />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/body" element={<Body />} />
            <Route path="/ideal-weight" element={<IdealWeight />} />
            <Route path="/bmr" element={<BMR />} />
            <Route path="/calorie" element={<Calorie />} />
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/mortgage" element={<MortgageCalculator />} />
            <Route path="/interest" element={<InterestCalculator />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
