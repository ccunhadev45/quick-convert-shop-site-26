
import { useState } from "react";
import { Link } from "react-router-dom";
import { LucideIcon, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface EnhancedConverterCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  conversionExample?: {
    from: string;
    to: string;
    value: string;
  };
}

const EnhancedConverterCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  color, 
  conversionExample 
}: EnhancedConverterCardProps) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    green: "text-green-600 bg-green-50 hover:bg-green-100",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-100",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-100",
    teal: "text-teal-600 bg-teal-50 hover:bg-teal-100",
    yellow: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100",
    indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
    pink: "text-pink-600 bg-pink-50 hover:bg-pink-100",
    red: "text-red-600 bg-red-50 hover:bg-red-100",
    emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
    cyan: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100",
    amber: "text-amber-600 bg-amber-50 hover:bg-amber-100",
    slate: "text-slate-600 bg-slate-50 hover:bg-slate-100",
    stone: "text-stone-600 bg-stone-50 hover:bg-stone-100",
    zinc: "text-zinc-600 bg-zinc-50 hover:bg-zinc-100",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <CardContent className="p-6">
        <Link to={path} className="block group">
          <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EnhancedConverterCard;
