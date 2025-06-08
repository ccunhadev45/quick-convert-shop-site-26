
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConverterCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
}

const ConverterCard = ({ title, description, icon: Icon, path, gradient }: ConverterCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className={`${gradient} p-6 text-white`}>
            <Icon className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/90 text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConverterCard;
