
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface AdSenseConfig {
  publisherId: string;
  enabledPositions: {
    top: boolean;
    middle: boolean;
    sidebar: boolean;
    footer: boolean;
  };
  adUnits: {
    top: string;
    middle: string;
    sidebar: string;
    footer: string;
  };
}

const AdSenseSettings = () => {
  const [config, setConfig] = useState<AdSenseConfig>({
    publisherId: '',
    enabledPositions: {
      top: true,
      middle: true,
      sidebar: false,
      footer: true
    },
    adUnits: {
      top: '',
      middle: '',
      sidebar: '',
      footer: ''
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem('adsense_config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('adsense_config', JSON.stringify(config));
    alert('Configurações salvas com sucesso!');
  };

  const updatePosition = (position: keyof typeof config.enabledPositions, enabled: boolean) => {
    setConfig({
      ...config,
      enabledPositions: {
        ...config.enabledPositions,
        [position]: enabled
      }
    });
  };

  const updateAdUnit = (position: keyof typeof config.adUnits, value: string) => {
    setConfig({
      ...config,
      adUnits: {
        ...config.adUnits,
        [position]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Configurações do AdSense</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuração Geral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="publisherId">Publisher ID do Google AdSense</Label>
            <Input
              id="publisherId"
              value={config.publisherId}
              onChange={(e) => setConfig({...config, publisherId: e.target.value})}
              placeholder="ca-pub-xxxxxxxxxxxxxxxxx"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posições dos Anúncios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(config.enabledPositions).map(([position, enabled]) => (
            <div key={position} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor={position} className="capitalize">
                  {position === 'top' && 'Topo da Página'}
                  {position === 'middle' && 'Meio da Página'}
                  {position === 'sidebar' && 'Barra Lateral'}
                  {position === 'footer' && 'Rodapé'}
                </Label>
                <Switch
                  id={position}
                  checked={enabled}
                  onCheckedChange={(checked) => updatePosition(position as keyof typeof config.enabledPositions, checked)}
                />
              </div>
              
              {enabled && (
                <div>
                  <Label htmlFor={`adunit-${position}`}>Código do Ad Unit</Label>
                  <Textarea
                    id={`adunit-${position}`}
                    value={config.adUnits[position as keyof typeof config.adUnits]}
                    onChange={(e) => updateAdUnit(position as keyof typeof config.adUnits, e.target.value)}
                    placeholder="Cole aqui o código HTML do Google AdSense..."
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Como configurar:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Acesse sua conta do Google AdSense</li>
              <li>2. Crie ad units para cada posição desejada</li>
              <li>3. Copie o código HTML gerado</li>
              <li>4. Cole nos campos correspondentes acima</li>
              <li>5. Ative as posições desejadas</li>
              <li>6. Salve as configurações</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>Salvar Configurações</span>
      </Button>
    </div>
  );
};

export default AdSenseSettings;
