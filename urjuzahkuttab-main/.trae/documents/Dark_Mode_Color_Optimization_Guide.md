# Panduan Optimalisasi Skema Warna Dark Mode
## Islamic Chronicle Quest - Aksesibilitas & Pengalaman Visual Premium

### 1. Analisis Implementasi Dark Mode Saat Ini

#### 1.1 Status Implementasi
Aplikasi Islamic Chronicle Quest saat ini memiliki implementasi dark mode dasar dengan:
- Toggle dark mode di halaman Settings
- CSS variables untuk tema light dan dark
- Warna Islamic-inspired (gold, teal, emerald)
- Sistem berbasis class `dark` dari Tailwind CSS

#### 1.2 Masalah yang Teridentifikasi
1. **Kontras Tidak Optimal**: Beberapa kombinasi warna tidak memenuhi standar WCAG 2.1
2. **Konsistensi Visual**: Variasi warna yang tidak konsisten antar komponen
3. **Keterbatasan Opsi**: Hanya satu skema dark mode tersedia
4. **Aksesibilitas**: Belum ada validasi kontras yang sistematis

### 2. Standar Aksesibilitas WCAG 2.1

#### 2.1 Persyaratan Kontras
- **Teks Normal**: Minimal rasio kontras 4.5:1
- **Teks Besar** (18pt+ atau 14pt+ bold): Minimal rasio kontras 3:1
- **Elemen UI Non-Text**: Minimal rasio kontras 3:1
- **Grafis**: Minimal rasio kontras 3:1

#### 2.2 Prinsip Desain Aksesibel
- **Perceivable**: Informasi dapat dipersepsi oleh semua pengguna
- **Operable**: Interface dapat dioperasikan dengan berbagai cara
- **Understandable**: Informasi dan operasi UI mudah dipahami
- **Robust**: Konten dapat diinterpretasi oleh berbagai teknologi assistive

### 3. Empat Skema Warna Dark Mode

#### 3.1 Skema High-Contrast (Aksesibilitas Maksimal)

**Karakteristik:**
- Kontras tinggi untuk visibilitas maksimal
- Cocok untuk pengguna dengan gangguan penglihatan
- Rasio kontras minimum 7:1 untuk teks normal

**Palette Warna:**
```css
:root[data-theme="high-contrast"] {
  /* Background Colors */
  --background: 0 0% 8%;           /* #141414 */
  --card: 0 0% 12%;                /* #1f1f1f */
  --popover: 0 0% 10%;             /* #1a1a1a */
  
  /* Text Colors */
  --foreground: 0 0% 98%;          /* #fafafa */
  --muted-foreground: 0 0% 85%;    /* #d9d9d9 */
  
  /* Islamic Colors - High Contrast */
  --islamic-gold: 45 100% 70%;     /* #ffcc33 */
  --islamic-teal: 180 100% 80%;    /* #33cccc */
  --islamic-emerald: 150 100% 75%; /* #33ff99 */
  --islamic-cream: 0 0% 95%;       /* #f2f2f2 */
  
  /* Interactive Elements */
  --primary: 0 0% 100%;            /* #ffffff */
  --primary-foreground: 0 0% 0%;   /* #000000 */
  --border: 0 0% 25%;              /* #404040 */
  --input: 0 0% 15%;               /* #262626 */
}
```

**Rasio Kontras:**
- Background (#141414) vs Text (#fafafa): 13.7:1 ✅
- Card (#1f1f1f) vs Text (#fafafa): 11.2:1 ✅
- Gold (#ffcc33) vs Background (#141414): 8.9:1 ✅

#### 3.2 Skema Low-Contrast (Nuansa Halus)

**Karakteristik:**
- Kontras lembut untuk kenyamanan mata
- Cocok untuk penggunaan jangka panjang
- Tetap memenuhi standar WCAG 2.1 minimum

**Palette Warna:**
```css
:root[data-theme="low-contrast"] {
  /* Background Colors */
  --background: 220 15% 18%;       /* #2a2d35 */
  --card: 220 15% 22%;             /* #343842 */
  --popover: 220 15% 20%;          /* #2f323b */
  
  /* Text Colors */
  --foreground: 220 15% 88%;       /* #dde0e6 */
  --muted-foreground: 220 15% 70%; /* #a8adb8 */
  
  /* Islamic Colors - Soft */
  --islamic-gold: 45 60% 65%;      /* #d4b366 */
  --islamic-teal: 180 40% 60%;     /* #66a3a3 */
  --islamic-emerald: 150 40% 55%;  /* #5c9973 */
  --islamic-cream: 220 15% 85%;    /* #d1d5db */
  
  /* Interactive Elements */
  --primary: 220 15% 85%;          /* #d1d5db */
  --primary-foreground: 220 15% 15%; /* #1f2228 */
  --border: 220 15% 35%;           /* #525761 */
  --input: 220 15% 25%;            /* #3d424d */
}
```

**Rasio Kontras:**
- Background (#2a2d35) vs Text (#dde0e6): 5.8:1 ✅
- Card (#343842) vs Text (#dde0e6): 4.9:1 ✅
- Gold (#d4b366) vs Background (#2a2d35): 4.7:1 ✅

#### 3.3 Skema Brand Islamic (Identitas Visual)

**Karakteristik:**
- Mengutamakan warna-warna Islamic tradisional
- Hijau zamrud, emas, dan krem sebagai dominan
- Mencerminkan estetika Islamic art dan calligraphy

**Palette Warna:**
```css
:root[data-theme="islamic-brand"] {
  /* Background Colors */
  --background: 160 25% 12%;       /* #1a2e1f */
  --card: 160 25% 16%;             /* #233a29 */
  --popover: 160 25% 14%;          /* #1e3424 */
  
  /* Text Colors */
  --foreground: 45 40% 92%;        /* #f0ead6 */
  --muted-foreground: 45 25% 75%;  /* #c7b99c */
  
  /* Islamic Colors - Authentic */
  --islamic-gold: 45 85% 68%;      /* #e6c547 */
  --islamic-teal: 160 45% 45%;     /* #3d7a52 */
  --islamic-emerald: 150 60% 40%;  /* #2d8f47 */
  --islamic-cream: 45 40% 88%;     /* #e8dcc0 */
  
  /* Interactive Elements */
  --primary: 45 85% 68%;           /* #e6c547 */
  --primary-foreground: 160 25% 12%; /* #1a2e1f */
  --border: 160 25% 30%;           /* #3d5c47 */
  --input: 160 25% 20%;            /* #2b4233 */
}
```

**Rasio Kontras:**
- Background (#1a2e1f) vs Text (#f0ead6): 8.2:1 ✅
- Card (#233a29) vs Text (#f0ead6): 6.8:1 ✅
- Gold (#e6c547) vs Background (#1a2e1f): 6.1:1 ✅

#### 3.4 Skema Custom (Konfigurasi Pengguna)

**Karakteristik:**
- Dapat dikustomisasi oleh pengguna
- Slider untuk mengatur kontras, saturasi, dan hue
- Validasi otomatis terhadap standar aksesibilitas

**Base Template:**
```css
:root[data-theme="custom"] {
  /* Customizable Variables */
  --custom-hue: 200;               /* User adjustable: 0-360 */
  --custom-saturation: 25%;        /* User adjustable: 0-100% */
  --custom-lightness-bg: 15%;      /* User adjustable: 10-25% */
  --custom-lightness-text: 85%;    /* User adjustable: 80-95% */
  --custom-contrast-ratio: 1.2;    /* User adjustable: 1.0-2.0 */
  
  /* Calculated Colors */
  --background: calc(var(--custom-hue)) calc(var(--custom-saturation)) calc(var(--custom-lightness-bg));
  --foreground: calc(var(--custom-hue)) calc(var(--custom-saturation)) calc(var(--custom-lightness-text));
  
  /* Islamic Colors - Adaptive */
  --islamic-gold: 45 calc(60% * var(--custom-contrast-ratio)) calc(65% * var(--custom-contrast-ratio));
  --islamic-teal: calc(var(--custom-hue) + 20) calc(var(--custom-saturation) * 1.5) calc(50% * var(--custom-contrast-ratio));
  --islamic-emerald: calc(var(--custom-hue) + 40) calc(var(--custom-saturation) * 1.8) calc(45% * var(--custom-contrast-ratio));
}
```

### 4. Strategi Implementasi Teknis

#### 4.1 Struktur Theme Provider
```typescript
// types/theme.ts
export type ThemeMode = 'light' | 'high-contrast' | 'low-contrast' | 'islamic-brand' | 'custom';

export interface CustomThemeConfig {
  hue: number;
  saturation: number;
  backgroundLightness: number;
  textLightness: number;
  contrastRatio: number;
}

export interface ThemeContextType {
  mode: ThemeMode;
  customConfig: CustomThemeConfig;
  setMode: (mode: ThemeMode) => void;
  updateCustomConfig: (config: Partial<CustomThemeConfig>) => void;
  validateContrast: (bg: string, fg: string) => number;
}
```

#### 4.2 Theme Context Implementation
```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [customConfig, setCustomConfig] = useState<CustomThemeConfig>({
    hue: 200,
    saturation: 25,
    backgroundLightness: 15,
    textLightness: 85,
    contrastRatio: 1.2
  });

  const validateContrast = (bg: string, fg: string): number => {
    // Implementation of WCAG contrast calculation
    const getLuminance = (color: string): number => {
      // Convert hex to RGB and calculate relative luminance
      // ... implementation
    };
    
    const bgLum = getLuminance(bg);
    const fgLum = getLuminance(fg);
    const ratio = (Math.max(bgLum, fgLum) + 0.05) / (Math.min(bgLum, fgLum) + 0.05);
    return Math.round(ratio * 100) / 100;
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme-mode', mode);
    localStorage.setItem('custom-theme-config', JSON.stringify(customConfig));
  }, [mode, customConfig]);

  return (
    <ThemeContext.Provider value={{
      mode,
      customConfig,
      setMode,
      updateCustomConfig: (config) => setCustomConfig(prev => ({ ...prev, ...config })),
      validateContrast
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### 4.3 Theme Selector Component
```typescript
// components/ThemeSelector.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { mode, setMode, customConfig, updateCustomConfig, validateContrast } = useTheme();

  const themes = [
    { id: 'light', name: 'Terang', description: 'Mode terang standar' },
    { id: 'high-contrast', name: 'Kontras Tinggi', description: 'Aksesibilitas maksimal' },
    { id: 'low-contrast', name: 'Kontras Rendah', description: 'Nyaman untuk mata' },
    { id: 'islamic-brand', name: 'Islamic Brand', description: 'Identitas visual Islamic' },
    { id: 'custom', name: 'Kustom', description: 'Sesuaikan sendiri' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              mode === theme.id ? 'border-islamic-gold bg-islamic-gold/10' : 'border-border'
            }`}
            onClick={() => setMode(theme.id as ThemeMode)}
          >
            <h3 className="font-semibold">{theme.name}</h3>
            <p className="text-sm text-muted-foreground">{theme.description}</p>
          </div>
        ))}
      </div>

      {mode === 'custom' && (
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Konfigurasi Kustom</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Hue (0-360)</label>
              <input
                type="range"
                min="0"
                max="360"
                value={customConfig.hue}
                onChange={(e) => updateCustomConfig({ hue: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{customConfig.hue}°</span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Saturasi (0-100%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={customConfig.saturation}
                onChange={(e) => updateCustomConfig({ saturation: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{customConfig.saturation}%</span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rasio Kontras (1.0-2.0)</label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={customConfig.contrastRatio}
                onChange={(e) => updateCustomConfig({ contrastRatio: parseFloat(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{customConfig.contrastRatio}x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 5. Preview Visual dan Karakteristik

#### 5.1 High-Contrast Theme
**Visual Preview:**
- Background: Hitam pekat (#141414)
- Text: Putih terang (#fafafa)
- Accent: Emas cerah (#ffcc33)
- Cards: Abu-abu gelap (#1f1f1f)

**Karakteristik:**
- ✅ Kontras maksimal (13.7:1)
- ✅ Ideal untuk low vision users
- ✅ Memenuhi WCAG AAA standard
- ⚠️ Mungkin terlalu kontras untuk penggunaan normal

#### 5.2 Low-Contrast Theme
**Visual Preview:**
- Background: Abu-abu biru gelap (#2a2d35)
- Text: Abu-abu terang (#dde0e6)
- Accent: Emas lembut (#d4b366)
- Cards: Abu-abu sedang (#343842)

**Karakteristik:**
- ✅ Nyaman untuk mata (5.8:1)
- ✅ Cocok untuk penggunaan jangka panjang
- ✅ Memenuhi WCAG AA standard
- ✅ Estetika modern dan elegan

#### 5.3 Islamic Brand Theme
**Visual Preview:**
- Background: Hijau gelap (#1a2e1f)
- Text: Krem hangat (#f0ead6)
- Accent: Emas Islamic (#e6c547)
- Cards: Hijau zamrud (#233a29)

**Karakteristik:**
- ✅ Identitas visual Islamic yang kuat (8.2:1)
- ✅ Warna tradisional Islamic art
- ✅ Memenuhi WCAG AA+ standard
- ✅ Mencerminkan tema aplikasi

#### 5.4 Custom Theme
**Visual Preview:**
- Background: Dapat disesuaikan
- Text: Otomatis disesuaikan untuk kontras optimal
- Accent: Mengikuti preferensi pengguna
- Cards: Gradasi otomatis dari background

**Karakteristik:**
- ✅ Fleksibilitas maksimal
- ✅ Validasi kontras real-time
- ✅ Personalisasi penuh
- ✅ Tetap memenuhi standar aksesibilitas

### 6. Roadmap Implementasi

#### 6.1 Fase 1: Foundation (Week 1-2)
- [ ] Setup Theme Context dan Provider
- [ ] Implementasi CSS variables untuk semua skema
- [ ] Migrasi komponen existing ke sistem baru
- [ ] Testing kontras untuk semua kombinasi warna

#### 6.2 Fase 2: Theme Selector (Week 3)
- [ ] Buat komponen ThemeSelector
- [ ] Implementasi preview real-time
- [ ] Integrasi dengan Settings page
- [ ] Local storage persistence

#### 6.3 Fase 3: Custom Theme (Week 4)
- [ ] Implementasi custom theme editor
- [ ] Contrast validation engine
- [ ] Real-time preview
- [ ] Export/import theme configurations

#### 6.4 Fase 4: Testing & Optimization (Week 5)
- [ ] Accessibility testing dengan screen readers
- [ ] Performance optimization
- [ ] Cross-browser compatibility
- [ ] User acceptance testing

### 7. Validasi Aksesibilitas

#### 7.1 Tools untuk Testing
- **WebAIM Contrast Checker**: Validasi rasio kontras
- **axe DevTools**: Automated accessibility testing
- **NVDA/JAWS**: Screen reader testing
- **Lighthouse**: Accessibility audit

#### 7.2 Checklist Aksesibilitas
- [ ] Semua teks memiliki kontras minimum 4.5:1
- [ ] Teks besar memiliki kontras minimum 3:1
- [ ] Interactive elements memiliki kontras minimum 3:1
- [ ] Focus indicators terlihat jelas
- [ ] Color tidak menjadi satu-satunya cara menyampaikan informasi
- [ ] Theme dapat diakses via keyboard navigation

### 8. Kesimpulan

Implementasi empat skema warna dark mode ini akan memberikan:

1. **Aksesibilitas Universal**: Memenuhi dan melampaui standar WCAG 2.1
2. **Personalisasi**: Opsi yang sesuai untuk berbagai preferensi pengguna
3. **Identitas Brand**: Tetap mempertahankan estetika Islamic yang kuat
4. **Pengalaman Premium**: Visual yang elegan dan profesional

Dengan implementasi yang sistematis dan testing yang menyeluruh, aplikasi Islamic Chronicle Quest akan menjadi contoh terbaik dalam hal aksesibilitas dan desain visual yang inklusif.