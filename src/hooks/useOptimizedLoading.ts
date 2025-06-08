import { useState, useEffect, useCallback } from "react";

interface LoadingState {
  isLoading: boolean;
  progress: number;
  stage: string;
  error: Error | null;
}

interface UseOptimizedLoadingOptions {
  stages?: string[];
  minDuration?: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export const useOptimizedLoading = (options: UseOptimizedLoadingOptions = {}) => {
  const {
    stages = ["Preparando...", "Carregando dados...", "Finalizando..."],
    minDuration = 500,
    onComplete,
    onError
  } = options;

  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    stage: stages[0],
    error: null
  });

  const startLoading = useCallback(async () => {
    const startTime = Date.now();
    
    setState({
      isLoading: true,
      progress: 0,
      stage: stages[0],
      error: null
    });

    try {
      // Simular progresso pelos estágios
      for (let i = 0; i < stages.length; i++) {
        setState(prev => ({
          ...prev,
          stage: stages[i],
          progress: ((i + 1) / stages.length) * 100
        }));
        
        // Aguardar um tempo mínimo para cada estágio
        await new Promise(resolve => setTimeout(resolve, minDuration / stages.length));
      }

      // Garantir duração mínima
      const elapsed = Date.now() - startTime;
      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        progress: 100
      }));

      onComplete?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Erro desconhecido");
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err
      }));
      onError?.(err);
    }
  }, [stages, minDuration, onComplete, onError]);

  const stopLoading = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoading: false
    }));
  }, []);

  const setStage = useCallback((stage: string, progress?: number) => {
    setState(prev => ({
      ...prev,
      stage,
      ...(progress !== undefined && { progress })
    }));
  }, []);

  return {
    ...state,
    startLoading,
    stopLoading,
    setStage
  };
};

// Hook para cache inteligente
export const useSmartCache = <T>(key: string, ttl: number = 5 * 60 * 1000) => {
  const [cache, setCache] = useState<{ [key: string]: { data: T; timestamp: number } }>({});

  const get = useCallback((cacheKey: string): T | null => {
    const cached = cache[cacheKey];
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > ttl) {
      // Cache expirado
      setCache(prev => {
        const { [cacheKey]: removed, ...rest } = prev;
        return rest;
      });
      return null;
    }
    
    return cached.data;
  }, [cache, ttl]);

  const set = useCallback((cacheKey: string, data: T) => {
    setCache(prev => ({
      ...prev,
      [cacheKey]: {
        data,
        timestamp: Date.now()
      }
    }));
  }, []);

  const clear = useCallback((cacheKey?: string) => {
    if (cacheKey) {
      setCache(prev => {
        const { [cacheKey]: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setCache({});
    }
  }, []);

  const has = useCallback((cacheKey: string): boolean => {
    const cached = cache[cacheKey];
    if (!cached) return false;
    
    const now = Date.now();
    return now - cached.timestamp <= ttl;
  }, [cache, ttl]);

  return { get, set, clear, has };
};

// Hook para preload de componentes
export const usePreloadPages = () => {
  const [preloadedPages] = useState(new Set<string>());

  const preload = useCallback(async (path: string) => {
    if (preloadedPages.has(path)) return;

    try {
      // Mapear rotas para imports dinâmicos
      const importMap: { [key: string]: () => Promise<any> } = {
        "/length": () => import("@/pages/LengthConverter"),
        "/temperature": () => import("@/pages/TemperatureConverter"),
        "/currency": () => import("@/pages/CurrencyConverter"),
        "/tip": () => import("@/pages/TipCalculator"),
        // Adicionar mais conforme necessário
      };

      const importFn = importMap[path];
      if (importFn) {
        await importFn();
        preloadedPages.add(path);
      }
    } catch (error) {
      console.warn(`Failed to preload page: ${path}`, error);
    }
  }, [preloadedPages]);

  const preloadMostUsed = useCallback(async () => {
    const mostUsedPages = ["/length", "/temperature", "/currency", "/tip"];
    
    // Preload com delay para não bloquear renderização inicial
    setTimeout(() => {
      mostUsedPages.forEach(page => preload(page));
    }, 2000);
  }, [preload]);

  return { preload, preloadMostUsed };
};