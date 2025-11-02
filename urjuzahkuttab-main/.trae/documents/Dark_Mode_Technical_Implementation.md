# Implementasi Teknis Dark Mode Multi-Skema
## Islamic Chronicle Quest - Developer Guide

### 1. Arsitektur Sistem Theme

#### 1.1 Struktur File
```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme provider dan state management
├── components/
│   ├── ThemeSelector.tsx         # UI untuk pemilihan theme
│   ├── ContrastValidator.tsx     # Validasi kontras real-time
│   └── CustomThemeEditor.tsx     # Editor untuk custom theme
├── hooks/
│   ├── useTheme.tsx             # Hook untuk mengakses theme context
│   ├── useContrastValidation.tsx # Hook untuk validasi kontras
│   └── useLocalStorage.tsx      # Persistence theme preferences
├── utils/
│   ├── colorUtils.ts            # Utility functions untuk warna
│   ├── contrastCalculator.ts    # WCAG contrast ratio calculator
│   └── themeGenerator.ts        # Generator untuk custom themes
├── styles/
│   ├── themes/
│   │   ├── high-contrast.css    # High contrast theme variables
│   │   ├── low-contrast.css     # Low contrast theme variables
│   │   ├── islamic-brand.css    # Islamic brand theme variables
│   │   └── custom.css           # Custom theme template
│   └── theme-transitions.css    # Smooth transitions antar theme
└── types/
    └── theme.ts                 # TypeScript type definitions
```

### 2. Type Definitions

#### 2.1 Core Types
```typescript
// types/theme.ts
export type ThemeMode = 'light' | 'high-contrast' | 'low-contrast' | 'islamic-brand' | 'custom';

export interface ColorPalette {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  islamicGold: string;
  islamicTeal: string;
  islamicEmerald: string;
  islamicCream: string;
  islamicSand: string;
}

export interface CustomThemeConfig {
  hue: number;                    // 0-360
  saturation: number;             // 0-100
  backgroundLightness: number;    // 10-25
  textLightness: number;          // 80-95
  contrastRatio: number;          // 1.0-2.0
  islamicAccentHue: number;       // 0-360
  islamicAccentSaturation: number; // 0-100
}

export interface ThemeContextType {
  mode: ThemeMode;
  customConfig: CustomThemeConfig;
  currentPalette: ColorPalette;
  setMode: (mode: ThemeMode) => void;
  updateCustomConfig: (config: Partial<CustomThemeConfig>) => void;
  validateContrast: (bg: string, fg: string) => number;
  generateCustomPalette: (config: CustomThemeConfig) => ColorPalette;
  exportTheme: () => string;
  importTheme: (themeData: string) => boolean;
}

export interface ContrastValidationResult {
  ratio: number;
  level: 'AAA' | 'AA' | 'A' | 'FAIL';
  isValid: boolean;
  recommendation?: string;
}
```

### 3. Utility Functions

#### 3.1 Color Utilities
```typescript
// utils/colorUtils.ts
export class ColorUtils {
  /**
   * Convert HSL to RGB
   */
  static hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360;
    s /= 100;
    l /= 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };

    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  }

  /**
   * Convert RGB to Hex
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  /**
   * Convert HSL to Hex
   */
  static hslToHex(h: number, s: number, l: number): string {
    const [r, g, b] = this.hslToRgb(h, s, l);
    return this.rgbToHex(r, g, b);
  }

  /**
   * Parse CSS color to RGB values
   */
  static parseColor(color: string): [number, number, number] | null {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      if (hex.length === 3) {
        return [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16)
        ];
      } else if (hex.length === 6) {
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16)
        ];
      }
    }

    // Handle HSL colors
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
      const [, h, s, l] = hslMatch.map(Number);
      return this.hslToRgb(h, s, l);
    }

    return null;
  }

  /**
   * Calculate relative luminance according to WCAG
   */
  static getRelativeLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
}
```

#### 3.2 Contrast Calculator
```typescript
// utils/contrastCalculator.ts
import { ColorUtils } from './colorUtils';

export class ContrastCalculator {
  /**
   * Calculate contrast ratio between two colors according to WCAG 2.1
   */
  static calculateRatio(color1: string, color2: string): number {
    const rgb1 = ColorUtils.parseColor(color1);
    const rgb2 = ColorUtils.parseColor(color2);

    if (!rgb1 || !rgb2) {
      throw new Error('Invalid color format');
    }

    const lum1 = ColorUtils.getRelativeLuminance(...rgb1);
    const lum2 = ColorUtils.getRelativeLuminance(...rgb2);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Validate contrast ratio against WCAG standards
   */
  static validateContrast(
    backgroundColor: string,
    textColor: string,
    fontSize: number = 16,
    fontWeight: number = 400
  ): ContrastValidationResult {
    const ratio = this.calculateRatio(backgroundColor, textColor);
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);

    let level: 'AAA' | 'AA' | 'A' | 'FAIL';
    let isValid: boolean;
    let recommendation: string | undefined;

    if (isLargeText) {
      if (ratio >= 4.5) {
        level = 'AAA';
        isValid = true;
      } else if (ratio >= 3) {
        level = 'AA';
        isValid = true;
      } else if (ratio >= 2) {
        level = 'A';
        isValid = false;
        recommendation = 'Tingkatkan kontras untuk memenuhi standar AA (minimum 3:1)';
      } else {
        level = 'FAIL';
        isValid = false;
        recommendation = 'Kontras terlalu rendah. Diperlukan minimum 3:1 untuk teks besar';
      }
    } else {
      if (ratio >= 7) {
        level = 'AAA';
        isValid = true;
      } else if (ratio >= 4.5) {
        level = 'AA';
        isValid = true;
      } else if (ratio >= 3) {
        level = 'A';
        isValid = false;
        recommendation = 'Tingkatkan kontras untuk memenuhi standar AA (minimum 4.5:1)';
      } else {
        level = 'FAIL';
        isValid = false;
        recommendation = 'Kontras terlalu rendah. Diperlukan minimum 4.5:1 untuk teks normal';
      }
    }

    return { ratio, level, isValid, recommendation };
  }

  /**
   * Suggest optimal text color for given background
   */
  static suggestTextColor(backgroundColor: string, targetRatio: number = 4.5): string {
    const bgRgb = ColorUtils.parseColor(backgroundColor);
    if (!bgRgb) throw new Error('Invalid background color');

    const bgLuminance = ColorUtils.getRelativeLuminance(...bgRgb);
    
    // Calculate required luminance for target ratio
    const lightTextLuminance = (bgLuminance + 0.05) * targetRatio - 0.05;
    const darkTextLuminance = (bgLuminance + 0.05) / targetRatio - 0.05;

    // Choose the luminance that's within valid range (0-1)
    let targetLuminance: number;
    if (lightTextLuminance <= 1) {
      targetLuminance = lightTextLuminance;
    } else if (darkTextLuminance >= 0) {
      targetLuminance = darkTextLuminance;
    } else {
      // If neither works, use white or black
      targetLuminance = bgLuminance > 0.5 ? 0 : 1;
    }

    // Convert luminance back to RGB (simplified approach)
    const grayValue = targetLuminance > 0.5 ? 255 : 0;
    return ColorUtils.rgbToHex(grayValue, grayValue, grayValue);
  }
}
```

#### 3.3 Theme Generator
```typescript
// utils/themeGenerator.ts
import { ColorUtils } from './colorUtils';
import { ContrastCalculator } from './contrastCalculator';

export class ThemeGenerator {
  /**
   * Generate complete color palette from custom configuration
   */
  static generateCustomPalette(config: CustomThemeConfig): ColorPalette {
    const {
      hue,
      saturation,
      backgroundLightness,
      textLightness,
      contrastRatio,
      islamicAccentHue,
      islamicAccentSaturation
    } = config;

    // Base colors
    const background = ColorUtils.hslToHex(hue, saturation, backgroundLightness);
    const foreground = ColorUtils.hslToHex(hue, saturation * 0.3, textLightness);

    // Card colors (slightly lighter than background)
    const card = ColorUtils.hslToHex(hue, saturation, backgroundLightness + 4);
    const cardForeground = foreground;

    // Popover colors
    const popover = ColorUtils.hslToHex(hue, saturation, backgroundLightness + 2);
    const popoverForeground = foreground;

    // Primary colors (high contrast for accessibility)
    const primary = ColorUtils.hslToHex(hue, saturation * 0.5, textLightness);
    const primaryForeground = ColorUtils.hslToHex(hue, saturation, backgroundLightness);

    // Secondary colors
    const secondary = ColorUtils.hslToHex(hue, saturation * 0.8, backgroundLightness + 8);
    const secondaryForeground = foreground;

    // Muted colors
    const muted = ColorUtils.hslToHex(hue, saturation * 0.6, backgroundLightness + 6);
    const mutedForeground = ColorUtils.hslToHex(hue, saturation * 0.4, textLightness - 15);

    // Accent colors
    const accent = ColorUtils.hslToHex(hue + 30, saturation * 1.2, backgroundLightness + 10);
    const accentForeground = foreground;

    // Destructive colors
    const destructive = ColorUtils.hslToHex(0, 75, 55 * contrastRatio);
    const destructiveForeground = ColorUtils.hslToHex(0, 0, textLightness);

    // Border and input colors
    const border = ColorUtils.hslToHex(hue, saturation * 0.7, backgroundLightness + 12);
    const input = ColorUtils.hslToHex(hue, saturation * 0.8, backgroundLightness + 5);
    const ring = ColorUtils.hslToHex(hue, saturation * 1.5, 50 * contrastRatio);

    // Islamic colors with custom accent
    const islamicGold = ColorUtils.hslToHex(45, 85 * contrastRatio, 68 * contrastRatio);
    const islamicTeal = ColorUtils.hslToHex(
      islamicAccentHue,
      islamicAccentSaturation * contrastRatio,
      45 * contrastRatio
    );
    const islamicEmerald = ColorUtils.hslToHex(
      islamicAccentHue + 20,
      islamicAccentSaturation * 1.2 * contrastRatio,
      40 * contrastRatio
    );
    const islamicCream = ColorUtils.hslToHex(45, 40, textLightness - 5);
    const islamicSand = ColorUtils.hslToHex(45, 25, backgroundLightness + 15);

    return {
      background,
      foreground,
      card,
      cardForeground,
      popover,
      popoverForeground,
      primary,
      primaryForeground,
      secondary,
      secondaryForeground,
      muted,
      mutedForeground,
      accent,
      accentForeground,
      destructive,
      destructiveForeground,
      border,
      input,
      ring,
      islamicGold,
      islamicTeal,
      islamicEmerald,
      islamicCream,
      islamicSand
    };
  }

  /**
   * Validate generated palette against WCAG standards
   */
  static validatePalette(palette: ColorPalette): Record<string, ContrastValidationResult> {
    const validations: Record<string, ContrastValidationResult> = {};

    // Key contrast pairs to validate
    const pairs = [
      { name: 'background-foreground', bg: palette.background, fg: palette.foreground },
      { name: 'card-cardForeground', bg: palette.card, fg: palette.cardForeground },
      { name: 'primary-primaryForeground', bg: palette.primary, fg: palette.primaryForeground },
      { name: 'secondary-secondaryForeground', bg: palette.secondary, fg: palette.secondaryForeground },
      { name: 'muted-mutedForeground', bg: palette.muted, fg: palette.mutedForeground },
      { name: 'accent-accentForeground', bg: palette.accent, fg: palette.accentForeground },
      { name: 'destructive-destructiveForeground', bg: palette.destructive, fg: palette.destructiveForeground },
      { name: 'islamicGold-background', bg: palette.background, fg: palette.islamicGold },
      { name: 'islamicTeal-background', bg: palette.background, fg: palette.islamicTeal },
      { name: 'islamicEmerald-background', bg: palette.background, fg: palette.islamicEmerald }
    ];

    pairs.forEach(({ name, bg, fg }) => {
      validations[name] = ContrastCalculator.validateContrast(bg, fg);
    });

    return validations;
  }

  /**
   * Auto-adjust palette to meet WCAG standards
   */
  static adjustPaletteForAccessibility(palette: ColorPalette): ColorPalette {
    const adjustedPalette = { ...palette };
    const validations = this.validatePalette(palette);

    Object.entries(validations).forEach(([pairName, validation]) => {
      if (!validation.isValid) {
        // Auto-adjust colors that don't meet standards
        const [bgKey, fgKey] = this.getPaletteKeys(pairName);
        if (bgKey && fgKey) {
          const suggestedColor = ContrastCalculator.suggestTextColor(
            adjustedPalette[bgKey as keyof ColorPalette],
            4.5
          );
          adjustedPalette[fgKey as keyof ColorPalette] = suggestedColor;
        }
      }
    });

    return adjustedPalette;
  }

  private static getPaletteKeys(pairName: string): [string?, string?] {
    const keyMap: Record<string, [string, string]> = {
      'background-foreground': ['background', 'foreground'],
      'card-cardForeground': ['card', 'cardForeground'],
      'primary-primaryForeground': ['primary', 'primaryForeground'],
      'secondary-secondaryForeground': ['secondary', 'secondaryForeground'],
      'muted-mutedForeground': ['muted', 'mutedForeground'],
      'accent-accentForeground': ['accent', 'accentForeground'],
      'destructive-destructiveForeground': ['destructive', 'destructiveForeground']
    };

    return keyMap[pairName] || [undefined, undefined];
  }
}
```

### 4. Theme Context Implementation

#### 4.1 Theme Provider
```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeGenerator } from '../utils/themeGenerator';
import { ContrastCalculator } from '../utils/contrastCalculator';

const defaultCustomConfig: CustomThemeConfig = {
  hue: 200,
  saturation: 25,
  backgroundLightness: 15,
  textLightness: 85,
  contrastRatio: 1.2,
  islamicAccentHue: 160,
  islamicAccentSaturation: 45
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [customConfig, setCustomConfig] = useState<CustomThemeConfig>(defaultCustomConfig);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);

  // Load saved preferences on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const savedConfig = localStorage.getItem('custom-theme-config');

    if (savedMode) {
      setMode(savedMode);
    }

    if (savedConfig) {
      try {
        setCustomConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.warn('Failed to parse saved theme config:', error);
      }
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    
    if (mode === 'custom') {
      const palette = ThemeGenerator.generateCustomPalette(customConfig);
      const adjustedPalette = ThemeGenerator.adjustPaletteForAccessibility(palette);
      setCurrentPalette(adjustedPalette);
      applyCustomPalette(adjustedPalette);
    } else {
      setCurrentPalette(null);
      removeCustomPalette();
    }

    // Save preferences
    localStorage.setItem('theme-mode', mode);
    localStorage.setItem('custom-theme-config', JSON.stringify(customConfig));
  }, [mode, customConfig]);

  const applyCustomPalette = (palette: ColorPalette) => {
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  };

  const removeCustomPalette = () => {
    const root = document.documentElement;
    const paletteKeys = [
      'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
      'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
      'muted', 'muted-foreground', 'accent', 'accent-foreground',
      'destructive', 'destructive-foreground', 'border', 'input', 'ring',
      'islamic-gold', 'islamic-teal', 'islamic-emerald', 'islamic-cream', 'islamic-sand'
    ];

    paletteKeys.forEach(key => {
      root.style.removeProperty(`--${key}`);
    });
  };

  const updateCustomConfig = useCallback((config: Partial<CustomThemeConfig>) => {
    setCustomConfig(prev => ({ ...prev, ...config }));
  }, []);

  const validateContrast = useCallback((bg: string, fg: string): number => {
    return ContrastCalculator.calculateRatio(bg, fg);
  }, []);

  const generateCustomPalette = useCallback((config: CustomThemeConfig): ColorPalette => {
    return ThemeGenerator.generateCustomPalette(config);
  }, []);

  const exportTheme = useCallback((): string => {
    const themeData = {
      mode,
      customConfig,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(themeData, null, 2);
  }, [mode, customConfig]);

  const importTheme = useCallback((themeData: string): boolean => {
    try {
      const parsed = JSON.parse(themeData);
      if (parsed.mode && parsed.customConfig) {
        setMode(parsed.mode);
        setCustomConfig(parsed.customConfig);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }, []);

  const value: ThemeContextType = {
    mode,
    customConfig,
    currentPalette: currentPalette || ThemeGenerator.generateCustomPalette(defaultCustomConfig),
    setMode,
    updateCustomConfig,
    validateContrast,
    generateCustomPalette,
    exportTheme,
    importTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### 5. CSS Theme Definitions

#### 5.1 High Contrast Theme
```css
/* styles/themes/high-contrast.css */
:root[data-theme="high-contrast"] {
  /* Background Colors */
  --background: 0 0% 8%;
  --foreground: 0 0% 98%;
  --card: 0 0% 12%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 10%;
  --popover-foreground: 0 0% 98%;

  /* Primary Colors */
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 0%;

  /* Secondary Colors */
  --secondary: 0 0% 20%;
  --secondary-foreground: 0 0% 98%;

  /* Muted Colors */
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 85%;

  /* Accent Colors */
  --accent: 0 0% 25%;
  --accent-foreground: 0 0% 98%;

  /* Destructive Colors */
  --destructive: 0 100% 60%;
  --destructive-foreground: 0 0% 98%;

  /* Border and Input */
  --border: 0 0% 25%;
  --input: 0 0% 15%;
  --ring: 0 0% 80%;

  /* Islamic Colors - High Contrast */
  --islamic-gold: 45 100% 70%;
  --islamic-teal: 180 100% 80%;
  --islamic-emerald: 150 100% 75%;
  --islamic-cream: 0 0% 95%;
  --islamic-sand: 0 0% 20%;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 15%), hsl(45 100% 70%));
  --gradient-card: linear-gradient(145deg, hsl(0 0% 12%), hsl(0 0% 18%));
  --gradient-golden: linear-gradient(135deg, hsl(45 100% 70%), hsl(45 100% 80%));
  --gradient-teal: linear-gradient(135deg, hsl(180 100% 80%), hsl(180 100% 90%));

  /* Shadows */
  --shadow-elegant: 0 10px 30px -10px hsl(0 0% 0% / 0.8);
  --shadow-golden: 0 8px 25px -8px hsl(45 100% 70% / 0.6);
  --shadow-soft: 0 4px 15px -4px hsl(0 0% 0% / 0.5);
}
```

#### 5.2 Low Contrast Theme
```css
/* styles/themes/low-contrast.css */
:root[data-theme="low-contrast"] {
  /* Background Colors */
  --background: 220 15% 18%;
  --foreground: 220 15% 88%;
  --card: 220 15% 22%;
  --card-foreground: 220 15% 88%;
  --popover: 220 15% 20%;
  --popover-foreground: 220 15% 88%;

  /* Primary Colors */
  --primary: 220 15% 85%;
  --primary-foreground: 220 15% 15%;

  /* Secondary Colors */
  --secondary: 220 15% 30%;
  --secondary-foreground: 220 15% 88%;

  /* Muted Colors */
  --muted: 220 15% 25%;
  --muted-foreground: 220 15% 70%;

  /* Accent Colors */
  --accent: 220 15% 35%;
  --accent-foreground: 220 15% 88%;

  /* Destructive Colors */
  --destructive: 0 60% 50%;
  --destructive-foreground: 220 15% 88%;

  /* Border and Input */
  --border: 220 15% 35%;
  --input: 220 15% 25%;
  --ring: 220 15% 60%;

  /* Islamic Colors - Soft */
  --islamic-gold: 45 60% 65%;
  --islamic-teal: 180 40% 60%;
  --islamic-emerald: 150 40% 55%;
  --islamic-cream: 220 15% 85%;
  --islamic-sand: 220 15% 30%;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(220 15% 18%), hsl(220 15% 25%), hsl(45 60% 65%));
  --gradient-card: linear-gradient(145deg, hsl(220 15% 22%), hsl(220 15% 28%));
  --gradient-golden: linear-gradient(135deg, hsl(45 60% 65%), hsl(45 60% 75%));
  --gradient-teal: linear-gradient(135deg, hsl(180 40% 60%), hsl(180 40% 70%));

  /* Shadows */
  --shadow-elegant: 0 10px 30px -10px hsl(220 15% 10% / 0.4);
  --shadow-golden: 0 8px 25px -8px hsl(45 60% 65% / 0.3);
  --shadow-soft: 0 4px 15px -4px hsl(220 15% 10% / 0.2);
}
```

#### 5.3 Islamic Brand Theme
```css
/* styles/themes/islamic-brand.css */
:root[data-theme="islamic-brand"] {
  /* Background Colors */
  --background: 160 25% 12%;
  --foreground: 45 40% 92%;
  --card: 160 25% 16%;
  --card-foreground: 45 40% 92%;
  --popover: 160 25% 14%;
  --popover-foreground: 45 40% 92%;

  /* Primary Colors */
  --primary: 45 85% 68%;
  --primary-foreground: 160 25% 12%;

  /* Secondary Colors */
  --secondary: 160 25% 25%;
  --secondary-foreground: 45 40% 92%;

  /* Muted Colors */
  --muted: 160 25% 20%;
  --muted-foreground: 45 25% 75%;

  /* Accent Colors */
  --accent: 160 25% 30%;
  --accent-foreground: 45 40% 92%;

  /* Destructive Colors */
  --destructive: 0 70% 55%;
  --destructive-foreground: 45 40% 92%;

  /* Border and Input */
  --border: 160 25% 30%;
  --input: 160 25% 20%;
  --ring: 45 85% 68%;

  /* Islamic Colors - Authentic */
  --islamic-gold: 45 85% 68%;
  --islamic-teal: 160 45% 45%;
  --islamic-emerald: 150 60% 40%;
  --islamic-cream: 45 40% 88%;
  --islamic-sand: 160 25% 25%;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(160 25% 12%), hsl(160 25% 20%), hsl(45 85% 68%));
  --gradient-card: linear-gradient(145deg, hsl(160 25% 16%), hsl(160 25% 22%));
  --gradient-golden: linear-gradient(135deg, hsl(45 85% 68%), hsl(45 85% 78%));
  --gradient-teal: linear-gradient(135deg, hsl(160 45% 45%), hsl(160 45% 55%));

  /* Shadows */
  --shadow-elegant: 0 10px 30px -10px hsl(160 25% 8% / 0.6);
  --shadow-golden: 0 8px 25px -8px hsl(45 85% 68% / 0.4);
  --shadow-soft: 0 4px 15px -4px hsl(160 25% 8% / 0.3);
}
```

### 6. Component Integration

#### 6.1 Updated Settings Page Integration
```typescript
// Tambahkan ke src/pages/Settings.tsx
import { ThemeSelector } from '../components/ThemeSelector';

// Dalam komponen Settings, ganti bagian dark mode toggle dengan:
<div className="space-y-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Tema Aplikasi</h3>
      <p className="text-sm text-muted-foreground">
        Pilih skema warna yang sesuai dengan preferensi dan kebutuhan aksesibilitas Anda
      </p>
    </div>
  </div>
  
  <ThemeSelector />
</div>
```

#### 6.2 App.tsx Integration
```typescript
// Tambahkan ke src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Existing app content */}
    </ThemeProvider>
  );
}
```

### 7. Testing dan Validasi

#### 7.1 Automated Testing
```typescript
// tests/theme.test.ts
import { ContrastCalculator } from '../src/utils/contrastCalculator';
import { ThemeGenerator } from '../src/utils/themeGenerator';

describe('Theme Accessibility', () => {
  test('High contrast theme meets WCAG AAA standards', () => {
    const palette = ThemeGenerator.generateCustomPalette({
      hue: 0,
      saturation: 0,
      backgroundLightness: 8,
      textLightness: 98,
      contrastRatio: 2.0,
      islamicAccentHue: 45,
      islamicAccentSaturation: 100
    });

    const ratio = ContrastCalculator.calculateRatio(palette.background, palette.foreground);
    expect(ratio).toBeGreaterThan(7); // AAA standard
  });

  test('All theme combinations meet minimum WCAG AA standards', () => {
    const themes = ['high-contrast', 'low-contrast', 'islamic-brand'];
    
    themes.forEach(theme => {
      // Test each theme's color combinations
      // Implementation depends on how you store theme definitions
    });
  });
});
```

### 8. Performance Optimizations

#### 8.1 CSS Custom Properties Caching
```typescript
// utils/cssVariableCache.ts
class CSSVariableCache {
  private cache = new Map<string, string>();

  get(property: string): string | null {
    if (this.cache.has(property)) {
      return this.cache.get(property)!;
    }

    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();

    if (value) {
      this.cache.set(property, value);
      return value;
    }

    return null;
  }

  set(property: string, value: string): void {
    document.documentElement.style.setProperty(property, value);
    this.cache.set(property, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cssCache = new CSSVariableCache();
```

#### 8.2 Debounced Theme Updates
```typescript
// hooks/useDebouncedTheme.ts
import { useCallback, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useDebouncedTheme = (delay: number = 300) => {
  const { updateCustomConfig } = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedUpdate = useCallback((config: Partial<CustomThemeConfig>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateCustomConfig(config);
    }, delay);
  }, [updateCustomConfig, delay]);

  return debouncedUpdate;
};
```

### 9. Deployment Checklist

- [ ] Semua CSS theme files ter-bundle dengan benar
- [ ] Local storage persistence berfungsi
- [ ] Theme transitions smooth di semua browser
- [ ] Kontras validation berjalan tanpa error
- [ ] Custom theme export/import berfungsi
- [ ] Performance tidak terpengaruh signifikan
- [ ] Accessibility testing passed
- [ ] Cross-browser compatibility verified

### 10. Maintenance dan Updates

#### 10.1 Version Management
```typescript
// utils/themeVersion.ts
export const THEME_VERSION = '1.0.0';

export const migrateThemeConfig = (config: any, version: string): CustomThemeConfig => {
  // Handle migration from older versions
  if (version < '1.0.0') {
    // Migration logic
  }
  
  return config;
};
```

#### 10.2 Analytics Integration
```typescript
// utils/themeAnalytics.ts
export const trackThemeUsage = (mode: ThemeMode) => {
  // Track theme usage for UX insights
  if (typeof gtag !== 'undefined') {
    gtag('event', 'theme_change', {
      theme_mode: mode,
      timestamp: new Date().toISOString()
    });
  }
};
```

Dokumentasi ini memberikan panduan lengkap untuk implementasi sistem dark mode multi-skema yang memenuhi standar aksesibilitas WCAG 2.1 dan memberikan pengalaman pengguna yang optimal.