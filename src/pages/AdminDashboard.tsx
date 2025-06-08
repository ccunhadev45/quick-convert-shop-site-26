
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Settings, MessageSquare, Users, LogOut, Database, Server, Book } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import AdSenseSettings from "@/components/admin/AdSenseSettings";
import ProductManager from "@/components/admin/ProductManager";
import UsageAnalytics from "@/components/admin/UsageAnalytics";
import UserFeedback from "@/components/admin/UserFeedback";
import SystemSettings from "@/components/admin/SystemSettings";
import DatabaseDocumentation from "@/components/admin/DatabaseDocumentation";
import ApiDocumentation from "@/components/admin/ApiDocumentation";
import SystemDocumentation from "@/components/admin/SystemDocumentation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminDashboard = () => {
  const { isAuthenticated, loading, logout, requireAuth } = useAdminAuth();

  useEffect(() => {
    requireAuth();
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-primary hover:text-primary/80">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Painel Administrativo
              </h1>
            </div>
          </div>
          
          <Button 
            onClick={logout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Uso
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Config
              </TabsTrigger>
              <TabsTrigger value="ads">Anúncios</TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Doc DB
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Doc API
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Doc Sistema
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visão Geral do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Métricas gerais e dados de performance do sistema expandido.
                    </p>
                    <AnalyticsDashboard />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <UsageAnalytics />
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <UserFeedback />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <SystemSettings />
            </TabsContent>

            <TabsContent value="ads" className="mt-6">
              <div className="space-y-6">
                <AdSenseSettings />
                <ProductManager />
              </div>
            </TabsContent>

            <TabsContent value="database" className="mt-6">
              <DatabaseDocumentation />
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <ApiDocumentation />
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <SystemDocumentation />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
