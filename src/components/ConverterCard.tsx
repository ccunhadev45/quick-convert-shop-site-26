
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConverterCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const ConverterCard = ({ title, description, icon: Icon, path, color }: ConverterCardProps) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    green: "text-green-600 bg-green-50 hover:bg-green-100",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-100",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-100",
    teal: "text-teal-600 bg-teal-50 hover:bg-teal-100",
    yellow: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100",
    indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
    pink: "text-pink-600 bg-pink-50 hover:bg-pink-100",
  };

  return (
    <Link to={path} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConverterCard;
