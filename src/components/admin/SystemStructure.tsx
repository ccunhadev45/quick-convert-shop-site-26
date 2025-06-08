import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Folder, 
  FileText, 
  Download, 
  Code, 
  FolderOpen,
  Copy,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Estrutura de arquivos da aplicação
const fileStructure = {
  'src/': {
    type: 'folder' as const,
    children: {
      'components/': {
        type: 'folder' as const,
        children: {
          'ui/': {
            type: 'folder' as const,
            children: {
              'button.tsx': { type: 'file' as const, size: '2.1kb' },
              'card.tsx': { type: 'file' as const, size: '1.8kb' },
              'dialog.tsx': { type: 'file' as const, size: '3.2kb' },
              'input.tsx': { type: 'file' as const, size: '1.5kb' },
              'toast.tsx': { type: 'file' as const, size: '2.8kb' },
              'badge.tsx': { type: 'file' as const, size: '1.2kb' },
              'scroll-area.tsx': { type: 'file' as const, size: '1.9kb' },
              'separator.tsx': { type: 'file' as const, size: '0.8kb' },
              'tabs.tsx': { type: 'file' as const, size: '2.5kb' },
              'sheet.tsx': { type: 'file' as const, size: '3.1kb' },
              'dropdown-menu.tsx': { type: 'file' as const, size: '4.2kb' },
              'use-toast.ts': { type: 'file' as const, size: '2.3kb' }
            }
          },
          'admin/': {
            type: 'folder' as const,
            children: {
              'AnalyticsDashboard.tsx': { type: 'file' as const, size: '8.5kb' },
              'AdSenseSettings.tsx': { type: 'file' as const, size: '4.2kb' },
              'ProductManager.tsx': { type: 'file' as const, size: '6.1kb' },
              'UsageAnalytics.tsx': { type: 'file' as const, size: '5.8kb' },
              'UserFeedback.tsx': { type: 'file' as const, size: '3.9kb' },
              'SystemSettings.tsx': { type: 'file' as const, size: '7.2kb' },
              'DatabaseDocumentation.tsx': { type: 'file' as const, size: '4.7kb' },
              'ApiDocumentation.tsx': { type: 'file' as const, size: '5.3kb' },
              'SystemDocumentation.tsx': { type: 'file' as const, size: '6.8kb' },
              'SystemStructure.tsx': { type: 'file' as const, size: '12.4kb' }
            }
          },
          'RouteManager.tsx': { type: 'file' as const, size: '8.9kb' },
          'EnhancedHeader.tsx': { type: 'file' as const, size: '15.2kb' },
          'PageTemplate.tsx': { type: 'file' as const, size: '4.6kb' },
          'EnhancedLoadingSpinner.tsx': { type: 'file' as const, size: '2.1kb' },
          'ErrorBoundary.tsx': { type: 'file' as const, size: '3.5kb' }
        }
      },
      'pages/': {
        type: 'folder' as const,
        children: {
          'AdminDashboard.tsx': { type: 'file' as const, size: '7.8kb' },
          'Index.tsx': { type: 'file' as const, size: '9.3kb' },
          'Login.tsx': { type: 'file' as const, size: '5.2kb' },
          'LengthConverter.tsx': { type: 'file' as const, size: '6.7kb' },
          'TemperatureConverter.tsx': { type: 'file' as const, size: '5.9kb' },
          'CurrencyConverter.tsx': { type: 'file' as const, size: '8.1kb' },
          'NumberBaseConverter.tsx': { type: 'file' as const, size: '7.4kb' },
          'NotFound.tsx': { type: 'file' as const, size: '2.8kb' }
        }
      },
      'data/': {
        type: 'folder' as const,
        children: {
          'unifiedCategoriesData.ts': { type: 'file' as const, size: '23.5kb' },
          'categoriesData.ts': { type: 'file' as const, size: '12.8kb' }
        }
      },
      'hooks/': {
        type: 'folder' as const,
        children: {
          'useAuth.ts': { type: 'file' as const, size: '3.2kb' },
          'useAdminAuth.ts': { type: 'file' as const, size: '1.8kb' },
          'use-toast.ts': { type: 'file' as const, size: '2.3kb' },
          'useOptimizedLoading.ts': { type: 'file' as const, size: '1.9kb' }
        }
      },
      'lib/': {
        type: 'folder' as const,
        children: {
          'utils.ts': { type: 'file' as const, size: '1.5kb' },
          'designTokens.ts': { type: 'file' as const, size: '2.1kb' }
        }
      },
      'App.tsx': { type: 'file' as const, size: '4.2kb' },
      'main.tsx': { type: 'file' as const, size: '1.8kb' },
      'index.css': { type: 'file' as const, size: '5.2kb' }
    }
  },
  'public/': {
    type: 'folder' as const,
    children: {
      'manifest.json': { type: 'file' as const, size: '0.8kb' },
      'robots.txt': { type: 'file' as const, size: '0.2kb' },
      'favicon.ico': { type: 'file' as const, size: '4.2kb' }
    }
  },
  'package.json': { type: 'file' as const, size: '2.8kb' },
  'tailwind.config.ts': { type: 'file' as const, size: '1.9kb' },
  'vite.config.ts': { type: 'file' as const, size: '1.2kb' },
  'tsconfig.json': { type: 'file' as const, size: '1.5kb' },
  'README.md': { type: 'file' as const, size: '2.1kb' }
};

interface FileNode {
  type: 'file' | 'folder';
  size?: string;
  children?: { [key: string]: FileNode };
}

interface FileTreeProps {
  name: string;
  node: FileNode;
  path: string;
  level: number;
  onFileClick: (path: string, name: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ name, node, path, level, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(level < 2);

  if (node.type === 'file') {
    return (
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-accent cursor-pointer`}
        style={{ marginLeft: `${level * 20}px` }}
        onClick={() => onFileClick(path, name)}
      >
        <FileText className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-foreground">{name}</span>
        <Badge variant="outline" className="text-xs ml-auto">
          {node.size}
        </Badge>
      </div>
    );
  }

  return (
    <div>
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-accent cursor-pointer`}
        style={{ marginLeft: `${level * 20}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FolderOpen className="h-4 w-4 text-yellow-500" />
        ) : (
          <Folder className="h-4 w-4 text-yellow-500" />
        )}
        <span className="text-sm font-medium text-foreground">{name}</span>
        <Badge variant="secondary" className="text-xs ml-auto">
          {Object.keys(node.children || {}).length} itens
        </Badge>
      </div>
      
      {isOpen && node.children && (
        <div>
          {Object.entries(node.children).map(([childName, childNode]) => (
            <FileTree
              key={childName}
              name={childName}
              node={childNode}
              path={`${path}${childName}`}
              level={level + 1}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SystemStructure: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ path: string; name: string } | null>(null);
  const { toast } = useToast();

  const handleFileClick = (path: string, name: string) => {
    setSelectedFile({ path, name });
  };

  const handleDownloadCode = () => {
    // Simular download do código completo
    const link = document.createElement('a');
    const content = `
# Super Conversor - Código Completo

Este é um arquivo de exemplo que representaria todo o código da aplicação.
Em uma implementação real, isso seria gerado dinamicamente.

## Estrutura do Projeto
- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI

## Principais Componentes
- Sistema de conversores universais
- Painel administrativo
- Autenticação de usuários
- Interface responsiva

## Total de arquivos: ${getTotalFiles(fileStructure)}
## Tamanho estimado: ${getTotalSize(fileStructure)}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.download = 'super-conversor-codigo-completo.txt';
    link.click();
    
    toast({
      title: "Download iniciado",
      description: "O arquivo com o código completo está sendo baixado.",
    });
  };

  const getTotalFiles = (structure: any): number => {
    let count = 0;
    const traverse = (node: any) => {
      if (node.type === 'file') {
        count++;
      } else if (node.children) {
        Object.values(node.children).forEach(traverse);
      }
    };
    Object.values(structure).forEach(traverse);
    return count;
  };

  const getTotalSize = (structure: any): string => {
    return "~150kb"; // Estimativa
  };

  const getFileContent = (filePath: string, fileName: string): string => {
    // Em uma implementação real, isso buscaria o conteúdo real do arquivo
    return `// ${fileName}
// Localização: ${filePath}

// Este é um exemplo do conteúdo do arquivo.
// Em uma implementação real, o conteúdo seria carregado dinamicamente.

${fileName.endsWith('.tsx') || fileName.endsWith('.ts') ? `
import React from 'react';

// Componente ou função principal
export default function ${fileName.replace(/\.(tsx?|js)$/, '')}() {
  return (
    <div>
      <h1>Conteúdo do arquivo ${fileName}</h1>
      <p>Este arquivo está localizado em: {filePath}</p>
    </div>
  );
}
` : fileName.endsWith('.json') ? `
{
  "name": "super-conversor",
  "version": "1.0.0",
  "description": "Sistema de conversores universais"
}
` : `
# ${fileName}

Conteúdo do arquivo ${fileName} localizado em ${filePath}
`}`;
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Estrutura do Sistema
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Visualize toda a estrutura de arquivos da aplicação
            </p>
          </div>
          <Button onClick={handleDownloadCode} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Completo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Árvore de Arquivos */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Folder className="h-5 w-5 text-yellow-500" />
                Estrutura de Arquivos
              </h3>
              <Card className="h-[600px]">
                <ScrollArea className="h-full p-4">
                  {Object.entries(fileStructure).map(([name, node]) => (
                    <FileTree
                      key={name}
                      name={name}
                      node={node}
                      path={name}
                      level={0}
                      onFileClick={handleFileClick}
                    />
                  ))}
                </ScrollArea>
              </Card>
            </div>

            {/* Visualizador de Arquivo */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Visualizador de Código
              </h3>
              <Card className="h-[600px]">
                {selectedFile ? (
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b bg-accent/50 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{selectedFile.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedFile.path}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(getFileContent(selectedFile.path, selectedFile.name))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                        <code>{getFileContent(selectedFile.path, selectedFile.name)}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium mb-2">Selecione um arquivo</h4>
                      <p className="text-muted-foreground text-sm">
                        Clique em qualquer arquivo na árvore à esquerda para visualizar seu conteúdo
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{getTotalFiles(fileStructure)}</p>
                <p className="text-sm text-muted-foreground">Total de Arquivos</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <Folder className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pastas</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <Code className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{getTotalSize(fileStructure)}</p>
                <p className="text-sm text-muted-foreground">Tamanho Total</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStructure;