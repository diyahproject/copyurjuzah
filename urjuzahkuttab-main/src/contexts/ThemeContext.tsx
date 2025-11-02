import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeScheme = 'light' | 'dark';

interface ThemeContextType {
  scheme: ThemeScheme;
  setScheme: (scheme: ThemeScheme) => void;
  isLoading: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scheme, setScheme] = useState<ThemeScheme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference and font size
  useEffect(() => {
    const loadThemePreference = () => {
      try {
        const storedScheme = localStorage.getItem('theme-scheme') as ThemeScheme | null;
        const initialScheme: ThemeScheme = storedScheme === 'dark' ? 'dark' : 'light';
        setScheme(initialScheme);

        // Load and apply saved font size
        let savedFontSize = localStorage.getItem('fontSize') || 'medium';
        
        // Handle fallback for removed "extra-large" option
        if (savedFontSize === 'extra-large') {
          savedFontSize = 'large';
          localStorage.setItem('fontSize', 'large');
        }
        
        applyGlobalFontSize(savedFontSize);

        const oldTheme = localStorage.getItem('theme');
        if (oldTheme) {
          localStorage.removeItem('theme');
        }
      } catch (error) {
        // Error loading preferences
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Global font size application function
  const applyGlobalFontSize = (size: string) => {
    const root = document.documentElement;
    
    // Apply font size with optimal line-height for readability
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        root.style.lineHeight = '1.6';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        root.style.lineHeight = '1.6';
        break;
      case 'large':
        root.style.fontSize = '18px';
        root.style.lineHeight = '1.7';
        break;
      default:
        root.style.fontSize = '16px';
        root.style.lineHeight = '1.6';
    }
    
    // Apply consistent font settings for better readability
    root.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    root.style.letterSpacing = '0.01em';
    root.style.fontWeight = '400';
    
    // Ensure proper contrast and readability
    root.style.setProperty('--font-smoothing', 'antialiased');
    root.style.setProperty('-webkit-font-smoothing', 'antialiased');
    root.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
  };

  // Apply theme to document
  useEffect(() => {
    if (isLoading) return;

    const root = document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(scheme);

    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', scheme);

    // Save to localStorage
    localStorage.setItem('theme-scheme', scheme);
  }, [scheme, isLoading]);

  // No longer listen for system theme changes since we only support light theme
  
  const toggleTheme = () => {
    setScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{
      scheme,
      setScheme,
      isLoading,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
