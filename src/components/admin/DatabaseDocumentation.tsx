
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Table, Users, Activity, Settings } from "lucide-react";

const DatabaseDocumentation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-foreground">Documentação do Banco de Dados</h2>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="express">Express + PostgreSQL</TabsTrigger>
          <TabsTrigger value="mongodb">MongoDB</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Table className="h-5 w-5" />
                Estrutura do Banco de Dados Recomendada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Recomendação: Supabase</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Para este sistema de conversores, recomendamos o Supabase por oferecer PostgreSQL gerenciado, 
                  autenticação integrada, APIs REST automáticas e real-time subscriptions.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">1. Tabela: users</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único do usuário</p>
                    <p>• email (VARCHAR) - Email do usuário</p>
                    <p>• full_name (VARCHAR) - Nome completo</p>
                    <p>• avatar_url (TEXT) - URL do avatar</p>
                    <p>• is_premium (BOOLEAN) - Status premium</p>
                    <p>• created_at (TIMESTAMP) - Data de criação</p>
                    <p>• updated_at (TIMESTAMP) - Última atualização</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">2. Tabela: conversion_history</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• user_id (UUID, FK) - Referência ao usuário</p>
                    <p>• converter_type (VARCHAR) - Tipo de conversor usado</p>
                    <p>• input_value (DECIMAL) - Valor de entrada</p>
                    <p>• input_unit (VARCHAR) - Unidade de entrada</p>
                    <p>• output_value (DECIMAL) - Valor de saída</p>
                    <p>• output_unit (VARCHAR) - Unidade de saída</p>
                    <p>• created_at (TIMESTAMP) - Data da conversão</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">3. Tabela: favorites</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• user_id (UUID, FK) - Referência ao usuário</p>
                    <p>• converter_path (VARCHAR) - Caminho do conversor</p>
                    <p>• converter_title (VARCHAR) - Título do conversor</p>
                    <p>• created_at (TIMESTAMP) - Data de adição aos favoritos</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">4. Tabela: user_feedback</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• user_id (UUID, FK, opcional) - Referência ao usuário</p>
                    <p>• email (VARCHAR) - Email para feedback anônimo</p>
                    <p>• subject (VARCHAR) - Assunto do feedback</p>
                    <p>• message (TEXT) - Mensagem do feedback</p>
                    <p>• rating (INTEGER) - Avaliação (1-5)</p>
                    <p>• status (ENUM) - Status: pending, reviewed, resolved</p>
                    <p>• created_at (TIMESTAMP) - Data do feedback</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">5. Tabela: usage_analytics</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• user_id (UUID, FK, opcional) - Referência ao usuário</p>
                    <p>• converter_path (VARCHAR) - Caminho do conversor usado</p>
                    <p>• session_id (VARCHAR) - ID da sessão</p>
                    <p>• device_type (VARCHAR) - Tipo de dispositivo</p>
                    <p>• browser (VARCHAR) - Navegador usado</p>
                    <p>• country (VARCHAR) - País do usuário</p>
                    <p>• created_at (TIMESTAMP) - Data do uso</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">6. Tabela: system_settings</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• key (VARCHAR) - Chave da configuração</p>
                    <p>• value (JSONB) - Valor da configuração</p>
                    <p>• description (TEXT) - Descrição da configuração</p>
                    <p>• updated_at (TIMESTAMP) - Última atualização</p>
                    <p>• updated_by (UUID, FK) - Usuário que atualizou</p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">7. Tabela: adsense_config</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• id (UUID, PK) - Identificador único</p>
                    <p>• publisher_id (VARCHAR) - ID do publisher AdSense</p>
                    <p>• position (VARCHAR) - Posição do anúncio</p>
                    <p>• ad_unit_code (TEXT) - Código HTML do ad unit</p>
                    <p>• is_enabled (BOOLEAN) - Status de ativação</p>
                    <p>• created_at (TIMESTAMP) - Data de criação</p>
                    <p>• updated_at (TIMESTAMP) - Última atualização</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="express" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Express.js + PostgreSQL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Configuração do Ambiente</h4>
                <pre className="text-sm bg-muted p-3 rounded mt-2 overflow-x-auto">
{`# Dependências necessárias
npm install express pg dotenv cors helmet bcryptjs jsonwebtoken
npm install -D @types/node @types/express @types/pg nodemon

# Estrutura do projeto
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── migrations/
└── seeds/`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Configuração do Banco (config/database.js)</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Schema SQL</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversion_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  converter_type VARCHAR(100) NOT NULL,
  input_value DECIMAL(20,10) NOT NULL,
  input_unit VARCHAR(50) NOT NULL,
  output_value DECIMAL(20,10) NOT NULL,
  output_unit VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversion_history_user_id ON conversion_history(user_id);
CREATE INDEX idx_conversion_history_created_at ON conversion_history(created_at);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mongodb" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>MongoDB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Configuração MongoDB</h4>
                <pre className="text-sm bg-muted p-3 rounded mt-2 overflow-x-auto">
{`# Dependências
npm install mongodb mongoose express dotenv

# Conexão (config/mongodb.js)
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro de conexão:', error);
    process.exit(1);
  }
};`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Schema de Usuário (models/User.js)</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: String,
  avatarUrl: String,
  isPremium: { type: Boolean, default: false },
  preferences: {
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'pt-BR' },
    notifications: { type: Boolean, default: true }
  }
}, { 
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Schema de Histórico (models/ConversionHistory.js)</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`const mongoose = require('mongoose');

const conversionHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  converterType: { type: String, required: true },
  conversion: {
    input: {
      value: { type: Number, required: true },
      unit: { type: String, required: true }
    },
    output: {
      value: { type: Number, required: true },
      unit: { type: String, required: true }
    }
  },
  metadata: {
    deviceType: String,
    browser: String,
    country: String
  }
}, { 
  timestamps: true,
  collection: 'conversion_history'
});

conversionHistorySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ConversionHistory', conversionHistorySchema);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supabase" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Supabase (Recomendado)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Vantagens do Supabase</h4>
                <ul className="text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                  <li>• PostgreSQL gerenciado com backups automáticos</li>
                  <li>• APIs REST e GraphQL automáticas</li>
                  <li>• Autenticação integrada (email, OAuth, magic links)</li>
                  <li>• Real-time subscriptions</li>
                  <li>• Row Level Security (RLS) nativo</li>
                  <li>• Storage para arquivos</li>
                  <li>• Edge Functions para lógica de backend</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Configuração SQL no Supabase</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`-- Criar tabelas no SQL Editor do Supabase

-- Tabela de perfis de usuário (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy para usuários acessarem seus próprios dados
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Cliente JavaScript</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Exemplo: Salvar histórico de conversão
export const saveConversion = async (conversionData) => {
  const { data, error } = await supabase
    .from('conversion_history')
    .insert([{
      converter_type: conversionData.type,
      input_value: conversionData.input.value,
      input_unit: conversionData.input.unit,
      output_value: conversionData.output.value,
      output_unit: conversionData.output.unit
    }]);
  
  return { data, error };
};`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Edge Function Exemplo</h4>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`// supabase/functions/analytics/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  if (req.method === 'POST') {
    const { converter_path, device_type, country } = await req.json();
    
    const { data, error } = await supabase
      .from('usage_analytics')
      .insert([{
        converter_path,
        device_type,
        country,
        session_id: crypto.randomUUID()
      }]);

    return new Response(JSON.stringify({ data, error }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
});`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseDocumentation;
