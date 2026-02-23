import React, { createContext, useContext, useCallback, useMemo, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UnitCategoryKey } from '@/constants/units';

const STORAGE_ITEMS = '@unitcalc/items';
const STORAGE_THEME = '@unitcalc/theme';
const STORAGE_LANG = '@unitcalc/language';

export type ThemeMode = 'light' | 'dark';
export type Language = 'ko' | 'en';

export interface ConversionItem {
  id: string;
  title?: string;
  categoryId: UnitCategoryKey;
  fromUnitId: string;
  toUnitId: string;
  order: number;
}

interface AppState {
  theme: ThemeMode;
  language: Language;
  items: ConversionItem[];
}

interface AppContextValue extends AppState {
  setTheme: (t: ThemeMode) => void;
  setLanguage: (l: Language) => void;
  setItems: (items: ConversionItem[]) => void;
  addItem: (item: Omit<ConversionItem, 'id' | 'order'>) => void;
  removeItem: (id: string) => void;
  reorderItems: (ordered: ConversionItem[]) => void;
  t: (key: string) => string;
}

const defaultState: AppState = {
  theme: 'light',
  language: 'ko',
  items: [],
};

const AppContext = createContext<AppContextValue | null>(null);

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [itemsJson, theme, lang] = await Promise.all([
          AsyncStorage.getItem(STORAGE_ITEMS),
          AsyncStorage.getItem(STORAGE_THEME),
          AsyncStorage.getItem(STORAGE_LANG),
        ]);
        const items: ConversionItem[] = itemsJson ? JSON.parse(itemsJson) : [];
        setState((s) => ({
          ...s,
          items,
          theme: (theme as ThemeMode) || 'light',
          language: (lang as Language) || 'ko',
        }));
      } catch (_) {
        // ignore
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_ITEMS, JSON.stringify(state.items));
  }, [loaded, state.items]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_THEME, state.theme);
  }, [loaded, state.theme]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_LANG, state.language);
  }, [loaded, state.language]);

  const setTheme = useCallback((theme: ThemeMode) => {
    setState((s) => ({ ...s, theme }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setState((s) => ({ ...s, language }));
  }, []);

  const setItems = useCallback((items: ConversionItem[]) => {
    setState((s) => ({ ...s, items }));
  }, []);

  const addItem = useCallback((item: Omit<ConversionItem, 'id' | 'order'>) => {
    const id = `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    setState((s) => {
      const maxOrder = s.items.length === 0 ? 0 : Math.max(...s.items.map((i) => i.order), 0);
      return {
        ...s,
        items: [...s.items, { ...item, id, order: maxOrder + 1 }],
      };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== id) }));
  }, []);

  const reorderItems = useCallback((ordered: ConversionItem[]) => {
    const withOrder = ordered.map((item, index) => ({ ...item, order: index }));
    setState((s) => ({ ...s, items: withOrder }));
  }, []);

  const translations = state.language === 'ko' ? require('@/i18n/ko').ko : require('@/i18n/en').en;
  const t = useCallback(
    (key: string) => getNested(translations as Record<string, unknown>, key) ?? key,
    [state.language]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setTheme,
      setLanguage,
      setItems,
      addItem,
      removeItem,
      reorderItems,
      t,
    }),
    [state, setTheme, setLanguage, setItems, addItem, removeItem, reorderItems, t]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
