
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Settings, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import AdSenseSettings from "@/components/admin/AdSenseSettings";
import ProductManager from "@/components/admin/ProductManager";
import UsageAnalytics from "@/components/admin/UsageAnalytics";
import UserFeedback from "@/components/admin/UserFeedback";
import SystemSettings from "@/components/admin/SystemSettings";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Painel Administrativo
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
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
          </Tabs>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default AdminDashboard;
