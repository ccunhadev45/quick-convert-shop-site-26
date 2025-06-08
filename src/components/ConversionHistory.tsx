
import { useState } from "react";
import { History, Star, Trash2, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const ConversionHistory = () => {
  const { history, toggleFavorite, removeRecord, clearHistory, getFavorites } = useConversionHistory();
  const [filter, setFilter] = useState<'all' | 'favorites' | string>('all');
  const [isOpen, setIsOpen] = useState(false);

  const filteredHistory = filter === 'all' 
    ? history 
    : filter === 'favorites' 
    ? getFavorites()
    : history.filter(record => record.category === filter);

  const categories = Array.from(new Set(history.map(record => record.category)));

  const exportHistory = () => {
    const dataStr = JSON.stringify(filteredHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `conversions-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Histórico exportado",
      description: "Arquivo baixado com sucesso!",
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <History className="h-4 w-4" />
          <span className="sr-only">Histórico</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Histórico de Conversões</span>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 z-50">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="favorites">Favoritos</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportHistory}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="destructive" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma conversão encontrada</p>
            </div>
          ) : (
            filteredHistory.map((record) => (
              <Card key={record.id} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {record.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(record.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-medium mb-1">{record.title}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-mono">{record.input}</span>
                        {record.fromUnit && record.toUnit && (
                          <span className="mx-2">({record.fromUnit} → {record.toUnit})</span>
                        )}
                        <span className="mx-2">→</span>
                        <span className="font-mono font-semibold">{record.output}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(record.id)}
                        className="h-8 w-8"
                      >
                        <Star className={`h-4 w-4 ${record.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRecord(record.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConversionHistory;
