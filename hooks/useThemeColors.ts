import { useApp } from '@/context/AppContext';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

export const lightColors = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666',
  border: '#e0e0e0',
  primary: '#2563eb',
  danger: '#dc2626',
  placeholder: '#9ca3af',
};

export const darkColors = {
  background: '#111111',
  card: '#1f1f1f',
  text: '#f5f5f5',
  textSecondary: '#a3a3a3',
  border: '#333',
  primary: '#3b82f6',
  danger: '#ef4444',
  placeholder: '#6b7280',
};

export function useThemeColors() {
  const { theme } = useApp();
  const system = useColorScheme();
  return useMemo(() => {
    const isDark = theme === 'dark' ? true : theme === 'light' ? false : system === 'dark';
    return isDark ? darkColors : lightColors;
  }, [theme, system]);
}
