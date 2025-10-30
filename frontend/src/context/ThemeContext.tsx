import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  bgColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState('blue');

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600',
    pink: 'bg-rose-600',
    purple: 'bg-purple-600',
    green: 'bg-emerald-600',
    orange: 'bg-orange-600',
  };

  // ✅ Save theme in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('adminTheme');
    if (stored) setThemeColor(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminTheme', themeColor);
  }, [themeColor]);

  const bgColor = colorMap[themeColor] || 'bg-blue-600';

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, bgColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
