import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@knitting_counters';

export interface Counter {
  id: string;
  name: string;
  value: number;
  goal: number | null;
  color: string;
  createdAt: number;
}

const COUNTER_COLORS = [
  '#8B5CF6',
  '#EC4899',
  '#6366F1',
  '#14B8A6',
  '#F59E0B',
  '#EF4444',
  '#10B981',
  '#3B82F6',
];

function generateId(): string {
  return `counter_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function pickColor(existingCounters: Counter[]): string {
  const usedColors = existingCounters.map(c => c.color);
  const available = COUNTER_COLORS.filter(c => !usedColors.includes(c));
  if (available.length > 0) {
    return available[0];
  }
  return COUNTER_COLORS[existingCounters.length % COUNTER_COLORS.length];
}

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        if (raw) {
          const parsed: Counter[] = JSON.parse(raw);
          setCounters(parsed);
        } else {
          // Seed with a default row counter
          const defaultCounter: Counter = {
            id: generateId(),
            name: 'Row Counter',
            value: 0,
            goal: null,
            color: COUNTER_COLORS[0],
            createdAt: Date.now(),
          };
          setCounters([defaultCounter]);
        }
      })
      .catch(() => {
        // Storage error — start fresh
        setCounters([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Persist whenever counters change
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(counters)).catch(
        () => {},
      );
    }
  }, [counters, loading]);

  const addCounter = useCallback(
    (name: string, goal: number | null = null) => {
      const newCounter: Counter = {
        id: generateId(),
        name: name.trim() || 'Counter',
        value: 0,
        goal,
        color: pickColor(counters),
        createdAt: Date.now(),
      };
      setCounters(prev => [...prev, newCounter]);
    },
    [counters],
  );

  const increment = useCallback((id: string) => {
    setCounters(prev =>
      prev.map(c => (c.id === id ? {...c, value: c.value + 1} : c)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setCounters(prev =>
      prev.map(c =>
        c.id === id ? {...c, value: Math.max(0, c.value - 1)} : c,
      ),
    );
  }, []);

  const reset = useCallback((id: string) => {
    setCounters(prev =>
      prev.map(c => (c.id === id ? {...c, value: 0} : c)),
    );
  }, []);

  const resetAll = useCallback(() => {
    setCounters(prev => prev.map(c => ({...c, value: 0})));
  }, []);

  const updateCounter = useCallback(
    (id: string, updates: Partial<Pick<Counter, 'name' | 'goal'>>) => {
      setCounters(prev =>
        prev.map(c => (c.id === id ? {...c, ...updates} : c)),
      );
    },
    [],
  );

  const removeCounter = useCallback((id: string) => {
    setCounters(prev => prev.filter(c => c.id !== id));
  }, []);

  return {
    counters,
    loading,
    addCounter,
    increment,
    decrement,
    reset,
    resetAll,
    updateCounter,
    removeCounter,
  };
}
