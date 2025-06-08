
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Download, Upload, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('system-settings');
    return stored ? JSON.parse(stored) : {
      siteName: 'Super Conversor de Unidades',
      enableAnalytics: true,
      maxHistoryRecords: 1000,
      enableNotifications: true,
      maintenanceMode: false,
      welcomeMessage: 'Bem-vindo ao Super Conversor!',
      enableAdvancedFeatures: false,
      autoBackup: true
    };
  });

  const saveSettings = () => {
    localStorage.setItem('system-settings', JSON.stringify(settings));
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso."
    });
  };

  const exportData = () => {
    const allData = {
      settings,
      history: JSON.parse(localStorage.getItem('conversion-history') || '[]'),
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
      feedbacks: JSON.parse(localStorage.getItem('user-feedbacks') || '[]'),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `super-conversor-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Backup exportado!",
      description: "Dados exportados com sucesso."
    });
  };

  const clearAllData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      setSettings({
        siteName: 'Super Conversor de Unidades',
        enableAnalytics: true,
        maxHistoryRecords: 1000,
        enableNotifications: true,
        maintenanceMode: false,
        welcomeMessage: 'Bem-vindo ao Super Conversor!',
        enableAdvancedFeatures: false,
        autoBackup: true
      });
      toast({
        title: "Dados limpos!",
        description: "Todos os dados foram removidos.",
        variant: "destructive"
      });
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Nome do Site</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
            <Textarea
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => updateSetting('welcomeMessage', e.target.value)}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="maxHistory">Máximo de Registros no Histórico</Label>
            <Input
              id="maxHistory"
              type="number"
              value={settings.maxHistoryRecords}
              onChange={(e) => updateSetting('maxHistoryRecords', parseInt(e.target.value) || 1000)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics e Métricas</Label>
              <p className="text-sm text-muted-foreground">Coletar dados de uso para melhorias</p>
            </div>
            <Switch
              checked={settings.enableAnalytics}
              onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações</Label>
              <p className="text-sm text-muted-foreground">Mostrar toasts e alertas</p>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Funcionalidades Avançadas</Label>
              <p className="text-sm text-muted-foreground">Habilitar recursos experimentais</p>
            </div>
            <Switch
              checked={settings.enableAdvancedFeatures}
              onCheckedChange={(checked) => updateSetting('enableAdvancedFeatures', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">Fazer backup automático dos dados</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Modo de Manutenção</Label>
              <p className="text-sm text-muted-foreground">Desabilitar funcionalidades temporariamente</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestão de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveSettings} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
            
            <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Backup
            </Button>
            
            <Button onClick={clearAllData} variant="destructive" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Limpar Todos os Dados
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Badge variant={settings.enableAnalytics ? "default" : "secondary"}>
                Analytics
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {settings.enableAnalytics ? "Ativo" : "Inativo"}
              </p>
            </div>
            
            <div className="text-center">
              <Badge variant={settings.enableNotifications ? "default" : "secondary"}>
                Notificações
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {settings.enableNotifications ? "Ativo" : "Inativo"}
              </p>
            </div>
            
            <div className="text-center">
              <Badge variant={settings.autoBackup ? "default" : "secondary"}>
                Auto Backup
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {settings.autoBackup ? "Ativo" : "Inativo"}
              </p>
            </div>
            
            <div className="text-center">
              <Badge variant={settings.maintenanceMode ? "destructive" : "default"}>
                Sistema
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {settings.maintenanceMode ? "Manutenção" : "Operacional"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
