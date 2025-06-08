
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Save, Camera, Mail, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSave = () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As novas senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    // Simular verificação de senha atual (em produção, validar no backend)
    if (formData.newPassword && !formData.currentPassword) {
      toast({
        title: "Erro",
        description: "Digite sua senha atual para alterá-la.",
        variant: "destructive"
      });
      return;
    }

    updateProfile({
      name: formData.name,
      email: formData.email
    });

    setIsEditing(false);
    setFormData(prev => ({ 
      ...prev, 
      currentPassword: "", 
      newPassword: "", 
      confirmPassword: "" 
    }));
    
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-foreground">Meu Perfil</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full p-2"
                  onClick={() => toast({ title: "Em breve", description: "Funcionalidade de upload de foto em desenvolvimento." })}
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Editar Informações
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input
                id="current-password"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Digite sua senha atual"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Digite sua nova senha"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirme sua nova senha"
              />
            </div>
            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            >
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Tipo de Conta</p>
                  <p className="text-sm text-muted-foreground">
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Membro desde</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
