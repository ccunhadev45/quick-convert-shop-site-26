
import { Calculator, Zap, Globe, Smartphone } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Conversor Universal
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          A plataforma mais completa de conversores e calculadoras do Brasil. 
          Mais de 100 ferramentas para facilitar seu dia a dia.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mais de 100 Conversores</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unidades de medida, moedas, temperaturas e muito mais
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resultados Instantâneos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Conversões e cálculos em tempo real
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Totalmente Gratuito</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Acesso completo sem custos ou cadastros
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Smartphone className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Responsivo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Funciona perfeitamente em qualquer dispositivo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
