
import { useState, useEffect, useCallback } from 'react';

export interface ConversionRecord {
  id: string;
  type: 'conversion' | 'calculation';
  category: string;
  title: string;
  input: string;
  output: string;
  fromUnit?: string;
  toUnit?: string;
  timestamp: string;
  isFavorite?: boolean;
}

const HISTORY_KEY = 'super-conversor-history';
const MAX_HISTORY_ITEMS = 100;

export const useConversionHistory = () => {
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        localStorage.removeItem(HISTORY_KEY);
      }
    }
  }, []);

  const saveHistory = useCallback((newHistory: ConversionRecord[]) => {
    // Manter apenas os últimos MAX_HISTORY_ITEMS
    const limitedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
    setHistory(limitedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
  }, []);

  const addRecord = useCallback((record: Omit<ConversionRecord, 'id' | 'timestamp'>) => {
    const newRecord: ConversionRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => {
      const newHistory = [newRecord, ...prev];
      saveHistory(newHistory);
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, [saveHistory]);

  const toggleFavorite = useCallback((id: string) => {
    setHistory(prev => {
      const newHistory = prev.map(record => 
        record.id === id 
          ? { ...record, isFavorite: !record.isFavorite }
          : record
      );
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const removeRecord = useCallback((id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(record => record.id !== id);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const getFavorites = useCallback(() => {
    return history.filter(record => record.isFavorite);
  }, [history]);

  const getByCategory = useCallback((category: string) => {
    return history.filter(record => record.category === category);
  }, [history]);

  return {
    history,
    addRecord,
    toggleFavorite,
    removeRecord,
    clearHistory,
    getFavorites,
    getByCategory
  };
};
