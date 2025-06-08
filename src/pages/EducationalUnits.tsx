
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const EducationalUnits = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold">Unidades Educacionais</h1>
        </div>
        
        <AdSpace position="middle" />
        
        <p>Em desenvolvimento...</p>
        
        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default EducationalUnits;
