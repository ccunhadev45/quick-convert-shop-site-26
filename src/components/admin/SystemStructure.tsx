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

// Estrutura de arquivos da aplicação (baseada nos arquivos reais do projeto)
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
              'accordion.tsx': { type: 'file' as const, size: '2.1kb' },
              'alert-dialog.tsx': { type: 'file' as const, size: '3.2kb' },
              'alert.tsx': { type: 'file' as const, size: '1.8kb' },
              'aspect-ratio.tsx': { type: 'file' as const, size: '1.2kb' },
              'avatar.tsx': { type: 'file' as const, size: '1.9kb' },
              'badge.tsx': { type: 'file' as const, size: '1.2kb' },
              'breadcrumb.tsx': { type: 'file' as const, size: '2.5kb' },
              'button.tsx': { type: 'file' as const, size: '2.1kb' },
              'calendar.tsx': { type: 'file' as const, size: '4.2kb' },
              'card.tsx': { type: 'file' as const, size: '1.8kb' },
              'carousel.tsx': { type: 'file' as const, size: '5.1kb' },
              'chart.tsx': { type: 'file' as const, size: '3.8kb' },
              'checkbox.tsx': { type: 'file' as const, size: '1.6kb' },
              'collapsible.tsx': { type: 'file' as const, size: '1.4kb' },
              'command.tsx': { type: 'file' as const, size: '4.8kb' },
              'context-menu.tsx': { type: 'file' as const, size: '5.2kb' },
              'dialog.tsx': { type: 'file' as const, size: '3.2kb' },
              'drawer.tsx': { type: 'file' as const, size: '2.9kb' },
              'dropdown-menu.tsx': { type: 'file' as const, size: '4.2kb' },
              'form.tsx': { type: 'file' as const, size: '6.1kb' },
              'hover-card.tsx': { type: 'file' as const, size: '2.3kb' },
              'input-otp.tsx': { type: 'file' as const, size: '3.5kb' },
              'input.tsx': { type: 'file' as const, size: '1.5kb' },
              'label.tsx': { type: 'file' as const, size: '1.1kb' },
              'menubar.tsx': { type: 'file' as const, size: '4.7kb' },
              'navigation-menu.tsx': { type: 'file' as const, size: '5.9kb' },
              'pagination.tsx': { type: 'file' as const, size: '3.4kb' },
              'popover.tsx': { type: 'file' as const, size: '1.8kb' },
              'progress.tsx': { type: 'file' as const, size: '1.6kb' },
              'radio-group.tsx': { type: 'file' as const, size: '2.1kb' },
              'resizable.tsx': { type: 'file' as const, size: '3.2kb' },
              'scroll-area.tsx': { type: 'file' as const, size: '1.9kb' },
              'select.tsx': { type: 'file' as const, size: '4.1kb' },
              'separator.tsx': { type: 'file' as const, size: '0.8kb' },
              'sheet.tsx': { type: 'file' as const, size: '3.1kb' },
              'sidebar.tsx': { type: 'file' as const, size: '7.2kb' },
              'skeleton.tsx': { type: 'file' as const, size: '1.3kb' },
              'slider.tsx': { type: 'file' as const, size: '2.4kb' },
              'sonner.tsx': { type: 'file' as const, size: '1.8kb' },
              'switch.tsx': { type: 'file' as const, size: '1.7kb' },
              'table.tsx': { type: 'file' as const, size: '3.6kb' },
              'tabs.tsx': { type: 'file' as const, size: '2.5kb' },
              'textarea.tsx': { type: 'file' as const, size: '1.6kb' },
              'toast.tsx': { type: 'file' as const, size: '2.8kb' },
              'toaster.tsx': { type: 'file' as const, size: '1.4kb' },
              'toggle-group.tsx': { type: 'file' as const, size: '2.8kb' },
              'toggle.tsx': { type: 'file' as const, size: '1.9kb' },
              'tooltip.tsx': { type: 'file' as const, size: '1.7kb' },
              'use-toast.ts': { type: 'file' as const, size: '2.3kb' }
            }
          },
          'admin/': {
            type: 'folder' as const,
            children: {
              'AdSenseSettings.tsx': { type: 'file' as const, size: '4.2kb' },
              'AnalyticsDashboard.tsx': { type: 'file' as const, size: '8.5kb' },
              'ApiDocumentation.tsx': { type: 'file' as const, size: '5.3kb' },
              'DatabaseDocumentation.tsx': { type: 'file' as const, size: '4.7kb' },
              'ProductManager.tsx': { type: 'file' as const, size: '6.1kb' },
              'SystemDocumentation.tsx': { type: 'file' as const, size: '6.8kb' },
              'SystemSettings.tsx': { type: 'file' as const, size: '7.2kb' },
              'SystemStructure.tsx': { type: 'file' as const, size: '15.8kb' },
              'UsageAnalytics.tsx': { type: 'file' as const, size: '5.8kb' },
              'UserFeedback.tsx': { type: 'file' as const, size: '3.9kb' }
            }
          },
          'astrology/': {
            type: 'folder' as const,
            children: {
              'ChartMandala.tsx': { type: 'file' as const, size: '4.1kb' },
              'ChartSummary.tsx': { type: 'file' as const, size: '3.2kb' },
              'HousesDistribution.tsx': { type: 'file' as const, size: '2.8kb' },
              'PlanetDataTable.tsx': { type: 'file' as const, size: '3.5kb' },
              'planetConstants.ts': { type: 'file' as const, size: '1.9kb' }
            }
          },
          'pages/': {
            type: 'folder' as const,
            children: {
              'NumberBaseConverterPage.tsx': { type: 'file' as const, size: '5.2kb' }
            }
          },
          'user/': {
            type: 'folder' as const,
            children: {
              'UserFavorites.tsx': { type: 'file' as const, size: '3.8kb' },
              'UserFeedbackForm.tsx': { type: 'file' as const, size: '4.2kb' },
              'UserProfile.tsx': { type: 'file' as const, size: '5.1kb' }
            }
          },
          'AdSpace.tsx': { type: 'file' as const, size: '2.1kb' },
          'AstrologyChart.tsx': { type: 'file' as const, size: '6.8kb' },
          'AstrologyInterpretation.tsx': { type: 'file' as const, size: '4.2kb' },
          'BaseConverterPage.tsx': { type: 'file' as const, size: '7.1kb' },
          'CategorySection.tsx': { type: 'file' as const, size: '3.5kb' },
          'CityAutocomplete.tsx': { type: 'file' as const, size: '4.8kb' },
          'ConversionHistory.tsx': { type: 'file' as const, size: '3.2kb' },
          'ConverterCard.tsx': { type: 'file' as const, size: '2.9kb' },
          'EnhancedConverterCard.tsx': { type: 'file' as const, size: '3.8kb' },
          'EnhancedHeader.tsx': { type: 'file' as const, size: '15.2kb' },
          'EnhancedLoadingSpinner.tsx': { type: 'file' as const, size: '2.1kb' },
          'EnhancedSearchFilter.tsx': { type: 'file' as const, size: '4.5kb' },
          'ErrorBoundary.tsx': { type: 'file' as const, size: '3.5kb' },
          'ErrorFallback.tsx': { type: 'file' as const, size: '2.8kb' },
          'HeroSection.tsx': { type: 'file' as const, size: '4.2kb' },
          'ImprovedBreadcrumbs.tsx': { type: 'file' as const, size: '3.1kb' },
          'LoadingSpinner.tsx': { type: 'file' as const, size: '1.8kb' },
          'OptimizedCategorySection.tsx': { type: 'file' as const, size: '5.9kb' },
          'PWAInstaller.tsx': { type: 'file' as const, size: '3.2kb' },
          'PageTemplate.tsx': { type: 'file' as const, size: '4.6kb' },
          'ProductShowcase.tsx': { type: 'file' as const, size: '3.8kb' },
          'QuickConversions.tsx': { type: 'file' as const, size: '4.1kb' },
          'QuickFavorites.tsx': { type: 'file' as const, size: '3.5kb' },
          'RouteManager.tsx': { type: 'file' as const, size: '12.9kb' },
          'SearchFilter.tsx': { type: 'file' as const, size: '3.2kb' },
          'ThemeToggle.tsx': { type: 'file' as const, size: '2.1kb' }
        }
      },
      'pages/': {
        type: 'folder' as const,
        children: {
          'AdminDashboard.tsx': { type: 'file' as const, size: '7.8kb' },
          'AdvancedFinance.tsx': { type: 'file' as const, size: '8.5kb' },
          'AgeCalculator.tsx': { type: 'file' as const, size: '6.2kb' },
          'AgribusinessCalculator.tsx': { type: 'file' as const, size: '7.1kb' },
          'AreaConverter.tsx': { type: 'file' as const, size: '5.8kb' },
          'AstronomicalDistance.tsx': { type: 'file' as const, size: '6.4kb' },
          'BasicStatistics.tsx': { type: 'file' as const, size: '7.2kb' },
          'BirthChart.tsx': { type: 'file' as const, size: '12.5kb' },
          'BodyMeasurements.tsx': { type: 'file' as const, size: '8.1kb' },
          'CalorieCalculator.tsx': { type: 'file' as const, size: '9.2kb' },
          'CarbonFootprint.tsx': { type: 'file' as const, size: '8.8kb' },
          'ChemistryCalculator.tsx': { type: 'file' as const, size: '10.5kb' },
          'ClothingSizes.tsx': { type: 'file' as const, size: '6.9kb' },
          'ColorConverter.tsx': { type: 'file' as const, size: '8.2kb' },
          'ConcreteCalculator.tsx': { type: 'file' as const, size: '7.5kb' },
          'ConstructionAreaCalculator.tsx': { type: 'file' as const, size: '8.9kb' },
          'CookingConverter.tsx': { type: 'file' as const, size: '7.8kb' },
          'CryptoConverter.tsx': { type: 'file' as const, size: '9.1kb' },
          'CurrencyConverter.tsx': { type: 'file' as const, size: '8.1kb' },
          'DateCalculator.tsx': { type: 'file' as const, size: '7.4kb' },
          'DividendCalculator.tsx': { type: 'file' as const, size: '8.6kb' },
          'DocumentationAndImprovements.tsx': { type: 'file' as const, size: '5.2kb' },
          'DpsCalculator.tsx': { type: 'file' as const, size: '6.8kb' },
          'EducationalUnits.tsx': { type: 'file' as const, size: '7.2kb' },
          'EncodingConverter.tsx': { type: 'file' as const, size: '6.5kb' },
          'EnergyConverter.tsx': { type: 'file' as const, size: '6.8kb' },
          'EnergySavings.tsx': { type: 'file' as const, size: '8.2kb' },
          'EngagementCalculator.tsx': { type: 'file' as const, size: '7.5kb' },
          'Ergonomics.tsx': { type: 'file' as const, size: '8.1kb' },
          'FinancialIndicesPage.tsx': { type: 'file' as const, size: '9.2kb' },
          'FpsConverter.tsx': { type: 'file' as const, size: '5.9kb' },
          'FuelCalculator.tsx': { type: 'file' as const, size: '7.8kb' },
          'FuelConsumption.tsx': { type: 'file' as const, size: '7.2kb' },
          'GameCurrency.tsx': { type: 'file' as const, size: '6.5kb' },
          'GamingProbability.tsx': { type: 'file' as const, size: '8.8kb' },
          'GradeAverage.tsx': { type: 'file' as const, size: '6.9kb' },
          'GradeConverter.tsx': { type: 'file' as const, size: '6.1kb' },
          'HairColor.tsx': { type: 'file' as const, size: '5.8kb' },
          'HydrationCalculator.tsx': { type: 'file' as const, size: '7.5kb' },
          'ImcCalculator.tsx': { type: 'file' as const, size: '8.2kb' },
          'Index.tsx': { type: 'file' as const, size: '9.3kb' },
          'InflationCalculator.tsx': { type: 'file' as const, size: '8.9kb' },
          'IngredientSubstitutes.tsx': { type: 'file' as const, size: '7.1kb' },
          'InterestCalculator.tsx': { type: 'file' as const, size: '8.5kb' },
          'InvestmentComparison.tsx': { type: 'file' as const, size: '9.8kb' },
          'LabConversions.tsx': { type: 'file' as const, size: '7.2kb' },
          'LengthConverter.tsx': { type: 'file' as const, size: '6.7kb' },
          'LoanCalculator.tsx': { type: 'file' as const, size: '9.1kb' },
          'Login.tsx': { type: 'file' as const, size: '5.2kb' },
          'LogisticsCalculator.tsx': { type: 'file' as const, size: '8.8kb' },
          'LuggageCalculator.tsx': { type: 'file' as const, size: '6.9kb' },
          'MathCalculator.tsx': { type: 'file' as const, size: '10.2kb' },
          'MediaConverter.tsx': { type: 'file' as const, size: '7.5kb' },
          'MedicalDosage.tsx': { type: 'file' as const, size: '8.1kb' },
          'MentalWellness.tsx': { type: 'file' as const, size: '7.8kb' },
          'MortgageCalculator.tsx': { type: 'file' as const, size: '9.5kb' },
          'NotFound.tsx': { type: 'file' as const, size: '2.8kb' },
          'NumberBaseConverter.tsx': { type: 'file' as const, size: '7.4kb' },
          'NumberConverter.tsx': { type: 'file' as const, size: '6.8kb' },
          'NutritionCalculator.tsx': { type: 'file' as const, size: '9.2kb' },
          'OccupationalHealth.tsx': { type: 'file' as const, size: '8.5kb' },
          'OvenConversions.tsx': { type: 'file' as const, size: '6.2kb' },
          'PetAgeConverter.tsx': { type: 'file' as const, size: '5.9kb' },
          'PetFeeding.tsx': { type: 'file' as const, size: '7.1kb' },
          'PhysicsCalculator.tsx': { type: 'file' as const, size: '10.8kb' },
          'PlugVoltage.tsx': { type: 'file' as const, size: '6.5kb' },
          'RecipeConverter.tsx': { type: 'file' as const, size: '8.2kb' },
          'RecyclingCalculator.tsx': { type: 'file' as const, size: '7.9kb' },
          'RegraDeTres.tsx': { type: 'file' as const, size: '6.8kb' },
          'SpecializedBmi.tsx': { type: 'file' as const, size: '8.1kb' },
          'SpeedConverter.tsx': { type: 'file' as const, size: '6.2kb' },
          'StockSplits.tsx': { type: 'file' as const, size: '7.5kb' },
          'StructuralCalculator.tsx': { type: 'file' as const, size: '9.2kb' },
          'TemperatureConverter.tsx': { type: 'file' as const, size: '5.9kb' },
          'TimeConverter.tsx': { type: 'file' as const, size: '7.1kb' },
          'TimezoneConverter.tsx': { type: 'file' as const, size: '8.5kb' },
          'TipCalculator.tsx': { type: 'file' as const, size: '6.8kb' },
          'TmbCalculator.tsx': { type: 'file' as const, size: '8.9kb' },
          'UploadTime.tsx': { type: 'file' as const, size: '6.5kb' },
          'UserDashboard.tsx': { type: 'file' as const, size: '7.2kb' },
          'VetDosage.tsx': { type: 'file' as const, size: '7.8kb' },
          'VideoResolution.tsx': { type: 'file' as const, size: '6.1kb' },
          'VolumeConverter.tsx': { type: 'file' as const, size: '6.9kb' },
          'WeightConverter.tsx': { type: 'file' as const, size: '6.2kb' },
          'WorkplaceSafety.tsx': { type: 'file' as const, size: '8.8kb' }
        }
      },
      'data/': {
        type: 'folder' as const,
        children: {
          'categoriesData.ts': { type: 'file' as const, size: '12.8kb' },
          'enhancedCategoriesData.ts': { type: 'file' as const, size: '18.5kb' },
          'unifiedCategoriesData.ts': { type: 'file' as const, size: '45.2kb' }
        }
      },
      'hooks/': {
        type: 'folder' as const,
        children: {
          'use-mobile.tsx': { type: 'file' as const, size: '1.2kb' },
          'use-toast.ts': { type: 'file' as const, size: '2.3kb' },
          'useAdminAuth.ts': { type: 'file' as const, size: '1.8kb' },
          'useAuth.ts': { type: 'file' as const, size: '3.2kb' },
          'useConversionHistory.ts': { type: 'file' as const, size: '2.1kb' },
          'useFavorites.ts': { type: 'file' as const, size: '1.9kb' },
          'useLoading.ts': { type: 'file' as const, size: '1.5kb' },
          'useOptimizedLoading.ts': { type: 'file' as const, size: '1.9kb' }
        }
      },
      'lib/': {
        type: 'folder' as const,
        children: {
          'designTokens.ts': { type: 'file' as const, size: '2.1kb' },
          'utils.ts': { type: 'file' as const, size: '1.5kb' }
        }
      },
      'providers/': {
        type: 'folder' as const,
        children: {
          'ThemeProvider.tsx': { type: 'file' as const, size: '3.8kb' }
        }
      },
      'services/': {
        type: 'folder' as const,
        children: {
          'aspectsService.ts': { type: 'file' as const, size: '4.2kb' },
          'astrologyService.ts': { type: 'file' as const, size: '8.5kb' },
          'financialDataService.ts': { type: 'file' as const, size: '3.9kb' },
          'geocodingService.ts': { type: 'file' as const, size: '2.8kb' },
          'ibgeCitiesService.ts': { type: 'file' as const, size: '3.2kb' },
          'viaCepService.ts': { type: 'file' as const, size: '2.1kb' }
        }
      },
      'utils/': {
        type: 'folder' as const,
        children: {
          'routeGenerator.tsx': { type: 'file' as const, size: '5.8kb' }
        }
      },
      'App.css': { type: 'file' as const, size: '0.8kb' },
      'App.tsx': { type: 'file' as const, size: '4.2kb' },
      'index.css': { type: 'file' as const, size: '5.2kb' },
      'main.tsx': { type: 'file' as const, size: '1.8kb' },
      'vite-env.d.ts': { type: 'file' as const, size: '0.2kb' }
    }
  },
  'public/': {
    type: 'folder' as const,
    children: {
      'favicon.ico': { type: 'file' as const, size: '4.2kb' },
      'manifest.json': { type: 'file' as const, size: '2.1kb' },
      'placeholder.svg': { type: 'file' as const, size: '1.5kb' },
      'robots.txt': { type: 'file' as const, size: '0.4kb' }
    }
  },
  '.gitignore': { type: 'file' as const, size: '0.8kb' },
  'README.md': { type: 'file' as const, size: '2.1kb' },
  'bun.lockb': { type: 'file' as const, size: '125kb' },
  'components.json': { type: 'file' as const, size: '0.9kb' },
  'eslint.config.js': { type: 'file' as const, size: '1.2kb' },
  'index.html': { type: 'file' as const, size: '0.8kb' },
  'package-lock.json': { type: 'file' as const, size: '890kb' },
  'package.json': { type: 'file' as const, size: '3.8kb' },
  'postcss.config.js': { type: 'file' as const, size: '0.2kb' },
  'tailwind.config.ts': { type: 'file' as const, size: '1.9kb' },
  'tsconfig.app.json': { type: 'file' as const, size: '0.5kb' },
  'tsconfig.json': { type: 'file' as const, size: '0.8kb' },
  'tsconfig.node.json': { type: 'file' as const, size: '0.3kb' },
  'vite.config.ts': { type: 'file' as const, size: '1.2kb' }
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