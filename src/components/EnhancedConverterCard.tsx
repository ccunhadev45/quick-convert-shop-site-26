
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
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900",
    green: "text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:hover:bg-purple-900",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-400 dark:hover:bg-orange-900",
    teal: "text-teal-600 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950 dark:text-teal-400 dark:hover:bg-teal-900",
    yellow: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400 dark:hover:bg-yellow-900",
    indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-900",
    pink: "text-pink-600 bg-pink-50 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-400 dark:hover:bg-pink-900",
    red: "text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900",
    emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900",
    cyan: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-400 dark:hover:bg-cyan-900",
    amber: "text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:hover:bg-amber-900",
    slate: "text-slate-600 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900",
    stone: "text-stone-600 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:text-stone-400 dark:hover:bg-stone-900",
    zinc: "text-zinc-600 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border bg-card overflow-hidden">
      <CardContent className="p-6">
        <Link to={path} className="block group">
          <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EnhancedConverterCard;
