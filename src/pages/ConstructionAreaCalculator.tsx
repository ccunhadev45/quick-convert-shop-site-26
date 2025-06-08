
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Room {
  id: number;
  name: string;
  length: string;
  width: string;
}

const ConstructionAreaCalculator = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: "Sala", length: "", width: "" }
  ]);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const totalArea = rooms.reduce((sum, room) => {
      const length = parseFloat(room.length) || 0;
      const width = parseFloat(room.width) || 0;
      return sum + (length * width);
    }, 0);

    if (totalArea > 0) {
      setResults({
        totalArea: totalArea,
        builtArea: totalArea * 1.3, // Área construída inclui paredes
        usefulArea: totalArea * 0.85, // Área útil desconta paredes
        rooms: rooms.map(room => ({
          ...room,
          area: (parseFloat(room.length) || 0) * (parseFloat(room.width) || 0)
        })).filter(room => room.area > 0)
      });
    } else {
      setResults(null);
    }
  }, [rooms]);

  const addRoom = () => {
    const newId = Math.max(...rooms.map(r => r.id)) + 1;
    setRooms([...rooms, { id: newId, name: "", length: "", width: "" }]);
  };

  const removeRoom = (id: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const updateRoom = (id: number, field: keyof Room, value: string) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Calculadora de Área Construída
              </CardTitle>
              <p className="text-gray-600">
                Calcule a área total e útil de sua construção
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Cômodos</h3>
                  <Button onClick={addRoom} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cômodo
                  </Button>
                </div>

                {rooms.map((room, index) => (
                  <div key={room.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Nome do Cômodo</Label>
                      <Input
                        placeholder="Ex: Sala"
                        value={room.name}
                        onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Comprimento (m)</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 4"
                        value={room.length}
                        onChange={(e) => updateRoom(room.id, 'length', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Largura (m)</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 3"
                        value={room.width}
                        onChange={(e) => updateRoom(room.id, 'width', e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeRoom(room.id)}
                        disabled={rooms.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {results && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Resultados:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Área dos Cômodos</p>
                          <p className="text-xl font-bold text-blue-900">{results.totalArea.toFixed(2)} m²</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.totalArea.toFixed(2)} m²`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Área Construída</p>
                          <p className="text-xl font-bold text-green-900">{results.builtArea.toFixed(2)} m²</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.builtArea.toFixed(2)} m²`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Área Útil</p>
                          <p className="text-xl font-bold text-orange-900">{results.usefulArea.toFixed(2)} m²</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${results.usefulArea.toFixed(2)} m²`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">Detalhamento por Cômodo:</h4>
                    <div className="space-y-2">
                      {results.rooms.map((room: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{room.name || `Cômodo ${index + 1}`}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{room.area.toFixed(2)} m²</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(`${room.area.toFixed(2)} m²`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default ConstructionAreaCalculator;
