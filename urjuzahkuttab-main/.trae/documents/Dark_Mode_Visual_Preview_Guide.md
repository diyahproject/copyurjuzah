# Panduan Visual Preview Dark Mode Schemes
## Islamic Chronicle Quest - Visual Design Reference

### 1. Overview Skema Warna

Aplikasi Islamic Chronicle Quest akan menyediakan 4 skema dark mode yang berbeda, masing-masing dirancang untuk memenuhi kebutuhan spesifik pengguna sambil mempertahankan identitas visual Islamic yang kuat.

### 2. High-Contrast Theme (Aksesibilitas Maksimal)

#### 2.1 Color Palette
```
Background Colors:
├── Primary Background: #141414 (HSL: 0, 0%, 8%)
├── Card Background: #1f1f1f (HSL: 0, 0%, 12%)
├── Popover Background: #1a1a1a (HSL: 0, 0%, 10%)
└── Input Background: #262626 (HSL: 0, 0%, 15%)

Text Colors:
├── Primary Text: #fafafa (HSL: 0, 0%, 98%)
├── Secondary Text: #d9d9d9 (HSL: 0, 0%, 85%)
└── Muted Text: #b3b3b3 (HSL: 0, 0%, 70%)

Islamic Accent Colors:
├── Gold: #ffcc33 (HSL: 45, 100%, 70%)
├── Teal: #33cccc (HSL: 180, 100%, 80%)
├── Emerald: #33ff99 (HSL: 150, 100%, 75%)
└── Cream: #f2f2f2 (HSL: 0, 0%, 95%)

Interactive Elements:
├── Primary Button: #ffffff (HSL: 0, 0%, 100%)
├── Border: #404040 (HSL: 0, 0%, 25%)
└── Focus Ring: #cccccc (HSL: 0, 0%, 80%)
```

#### 2.2 Visual Characteristics
- **Kontras Ratio**: 13.7:1 (Background vs Text)
- **WCAG Level**: AAA+ (Exceeds requirements)
- **Best For**: Pengguna dengan gangguan penglihatan, kondisi cahaya terang
- **Visual Impact**: Sangat tajam, kontras maksimal

#### 2.3 Component Preview Description
```
┌─────────────────────────────────────────────────────────┐
│ Header Navigation                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [🏠] Islamic Chronicle Quest    [☰] [🔍] [⚙️]      │ │ ← Pure white text on black
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Hero Section                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │           Sejarah Islam Interaktif                  │ │ ← Bright gold gradient text
│ │        ═══════════════════════════                  │ │
│ │   Jelajahi perjalanan peradaban Islam dengan        │ │ ← High contrast white text
│ │        teknologi modern dan interaktif              │ │
│ │                                                     │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ 🔍 Telusuri Peristiwa Sejarah Islam...    [🔍] │ │ │ ← White input with black text
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Content Cards                                           │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│ │ Periode Mekah   │ │ Periode Madinah │ │ Ekspansi    │ │ ← Dark gray cards
│ │ ═══════════════ │ │ ═══════════════ │ │ ═══════════ │ │   with white text
│ │ Awal mula...    │ │ Pembentukan...  │ │ Penyebaran..│ │
│ │                 │ │                 │ │             │ │
│ │ [Pelajari] 📖   │ │ [Pelajari] 📖   │ │ [Pelajari]📖│ │ ← Bright gold buttons
│ └─────────────────┘ └─────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3. Low-Contrast Theme (Nuansa Halus)

#### 3.1 Color Palette
```
Background Colors:
├── Primary Background: #2a2d35 (HSL: 220, 15%, 18%)
├── Card Background: #343842 (HSL: 220, 15%, 22%)
├── Popover Background: #2f323b (HSL: 220, 15%, 20%)
└── Input Background: #3d424d (HSL: 220, 15%, 25%)

Text Colors:
├── Primary Text: #dde0e6 (HSL: 220, 15%, 88%)
├── Secondary Text: #a8adb8 (HSL: 220, 15%, 70%)
└── Muted Text: #8a9099 (HSL: 220, 15%, 60%)

Islamic Accent Colors:
├── Gold: #d4b366 (HSL: 45, 60%, 65%)
├── Teal: #66a3a3 (HSL: 180, 40%, 60%)
├── Emerald: #5c9973 (HSL: 150, 40%, 55%)
└── Cream: #d1d5db (HSL: 220, 15%, 85%)

Interactive Elements:
├── Primary Button: #d1d5db (HSL: 220, 15%, 85%)
├── Border: #525761 (HSL: 220, 15%, 35%)
└── Focus Ring: #a8adb8 (HSL: 220, 15%, 70%)
```

#### 3.2 Visual Characteristics
- **Kontras Ratio**: 5.8:1 (Background vs Text)
- **WCAG Level**: AA+ (Comfortable reading)
- **Best For**: Penggunaan jangka panjang, kondisi cahaya rendah
- **Visual Impact**: Lembut, nyaman untuk mata

#### 3.3 Component Preview Description
```
┌─────────────────────────────────────────────────────────┐
│ Header Navigation                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [🏠] Islamic Chronicle Quest    [☰] [🔍] [⚙️]      │ │ ← Soft light gray text
│ └─────────────────────────────────────────────────────┘ │   on blue-gray background
│                                                         │
│ Hero Section                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │           Sejarah Islam Interaktif                  │ │ ← Warm gold gradient
│ │        ═══════════════════════════                  │ │   (muted saturation)
│ │   Jelajahi perjalanan peradaban Islam dengan        │ │ ← Soft light text
│ │        teknologi modern dan interaktif              │ │   easy on eyes
│ │                                                     │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ 🔍 Telusuri Peristiwa Sejarah Islam...    [🔍] │ │ │ ← Subtle input styling
│ │ └─────────────────────────────────────────────────┘ │ │   with soft borders
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Content Cards                                           │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│ │ Periode Mekah   │ │ Periode Madinah │ │ Ekspansi    │ │ ← Gentle card elevation
│ │ ═══════════════ │ │ ═══════════════ │ │ ═══════════ │ │   with soft shadows
│ │ Awal mula...    │ │ Pembentukan...  │ │ Penyebaran..│ │
│ │                 │ │                 │ │             │ │
│ │ [Pelajari] 📖   │ │ [Pelajari] 📖   │ │ [Pelajari]📖│ │ ← Muted gold buttons
│ └─────────────────┘ └─────────────────┘ └─────────────┘ │   with subtle hover
└─────────────────────────────────────────────────────────┘
```

### 4. Islamic Brand Theme (Identitas Visual)

#### 4.1 Color Palette
```
Background Colors:
├── Primary Background: #1a2e1f (HSL: 160, 25%, 12%)
├── Card Background: #233a29 (HSL: 160, 25%, 16%)
├── Popover Background: #1e3424 (HSL: 160, 25%, 14%)
└── Input Background: #2b4233 (HSL: 160, 25%, 20%)

Text Colors:
├── Primary Text: #f0ead6 (HSL: 45, 40%, 92%)
├── Secondary Text: #c7b99c (HSL: 45, 25%, 75%)
└── Muted Text: #a69885 (HSL: 45, 20%, 65%)

Islamic Accent Colors:
├── Gold: #e6c547 (HSL: 45, 85%, 68%)
├── Teal: #3d7a52 (HSL: 160, 45%, 45%)
├── Emerald: #2d8f47 (HSL: 150, 60%, 40%)
└── Cream: #e8dcc0 (HSL: 45, 40%, 88%)

Interactive Elements:
├── Primary Button: #e6c547 (HSL: 45, 85%, 68%)
├── Border: #3d5c47 (HSL: 160, 25%, 30%)
└── Focus Ring: #e6c547 (HSL: 45, 85%, 68%)
```

#### 4.2 Visual Characteristics
- **Kontras Ratio**: 8.2:1 (Background vs Text)
- **WCAG Level**: AAA (Excellent accessibility)
- **Best For**: Mencerminkan identitas Islamic, pengalaman immersive
- **Visual Impact**: Autentik, hangat, spiritual

#### 4.3 Component Preview Description
```
┌─────────────────────────────────────────────────────────┐
│ Header Navigation                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [🏠] Islamic Chronicle Quest    [☰] [🔍] [⚙️]      │ │ ← Warm cream text on
│ └─────────────────────────────────────────────────────┘ │   deep forest green
│                                                         │
│ Hero Section                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │           Sejarah Islam Interaktif                  │ │ ← Rich Islamic gold
│ │        ═══════════════════════════                  │ │   reminiscent of
│ │   Jelajahi perjalanan peradaban Islam dengan        │ │   traditional calligraphy
│ │        teknologi modern dan interaktif              │ │ ← Warm cream text
│ │                                                     │ │   like parchment
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ 🔍 Telusuri Peristiwa Sejarah Islam...    [🔍] │ │ │ ← Earth-toned input
│ │ └─────────────────────────────────────────────────┘ │ │   with natural feel
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Content Cards                                           │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐ │
│ │ Periode Mekah   │ │ Periode Madinah │ │ Ekspansi    │ │ ← Rich emerald cards
│ │ ═══════════════ │ │ ═══════════════ │ │ ═══════════ │ │   with Islamic patterns
│ │ Awal mula...    │ │ Pembentukan...  │ │ Penyebaran..│ │
│ │                 │ │                 │ │             │ │
│ │ [Pelajari] 📖   │ │ [Pelajari] 📖   │ │ [Pelajari]📖│ │ ← Authentic gold buttons
│ └─────────────────┘ └─────────────────┘ └─────────────┘ │   with Arabic-inspired
└─────────────────────────────────────────────────────────┘   styling
```

### 5. Custom Theme (Konfigurasi Pengguna)

#### 5.1 Customizable Parameters
```
User Controls:
├── Base Hue: 0-360° (Color wheel selection)
├── Saturation: 0-100% (Color intensity)
├── Background Lightness: 10-25% (Darkness level)
├── Text Lightness: 80-95% (Text brightness)
├── Contrast Ratio: 1.0-2.0x (Accessibility multiplier)
├── Islamic Accent Hue: 0-360° (Accent color base)
└── Islamic Accent Saturation: 0-100% (Accent intensity)

Real-time Validation:
├── WCAG Contrast Checker
├── Color Blindness Simulation
├── Accessibility Score
└── Readability Assessment
```

#### 5.2 Visual Characteristics
- **Kontras Ratio**: Variable (4.5:1 minimum enforced)
- **WCAG Level**: AA minimum (automatically validated)
- **Best For**: Personal preference, specific accessibility needs
- **Visual Impact**: Fully customizable, user-defined

#### 5.3 Custom Theme Editor Interface
```
┌─────────────────────────────────────────────────────────┐
│ Custom Theme Editor                                     │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Live Preview                                        │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ [🏠] Islamic Chronicle Quest    [☰] [🔍] [⚙️]  │ │ │ ← Real-time preview
│ │ └─────────────────────────────────────────────────┘ │ │   updates as user
│ │                                                     │ │   adjusts settings
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │           Sejarah Islam Interaktif              │ │ │
│ │ │        ═══════════════════════════              │ │ │
│ │ │   Jelajahi perjalanan peradaban Islam...        │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Color Controls                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Base Hue: [████████████████████████] 200°          │ │ ← Color wheel slider
│ │ Saturation: [████████████████████] 25%             │ │ ← Intensity control
│ │ Background: [████████] 15%                         │ │ ← Darkness level
│ │ Text Brightness: [████████████████████] 85%        │ │ ← Text visibility
│ │ Contrast Boost: [████████████] 1.2x                │ │ ← Accessibility multiplier
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Accessibility Validation                                │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ✅ WCAG AA Compliant (Contrast: 5.8:1)             │ │ ← Real-time validation
│ │ ✅ Large Text Readable (Contrast: 5.8:1)           │ │   with pass/fail status
│ │ ✅ Interactive Elements Visible (Contrast: 4.2:1)  │ │
│ │ ⚠️  Color Blind Friendly: Partial                   │ │ ← Accessibility warnings
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Actions                                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Reset to Default] [Export Theme] [Import Theme]    │ │ ← Theme management
│ │ [Save as Preset] [Apply Changes] [Cancel]           │ │   controls
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 6. Comparative Analysis

#### 6.1 Accessibility Comparison
```
Theme Comparison Chart:

                    │ High-Contrast │ Low-Contrast │ Islamic Brand │ Custom
────────────────────┼───────────────┼──────────────┼───────────────┼────────
Contrast Ratio      │ 13.7:1        │ 5.8:1        │ 8.2:1         │ 4.5:1+
WCAG Level          │ AAA+          │ AA+          │ AAA           │ AA+
Eye Strain (1-10)   │ 3             │ 9            │ 7             │ Variable
Readability (1-10)  │ 10            │ 8            │ 9             │ Variable
Brand Consistency   │ 5             │ 7            │ 10            │ Variable
Customization       │ 1             │ 1            │ 1             │ 10
```

#### 6.2 Use Case Recommendations
```
User Scenarios:

👁️ Visual Impairment:
   ├── Primary: High-Contrast Theme
   ├── Secondary: Custom Theme (max contrast)
   └── Avoid: Low-Contrast Theme

🌙 Night Usage:
   ├── Primary: Low-Contrast Theme
   ├── Secondary: Islamic Brand Theme
   └── Avoid: High-Contrast Theme

🕌 Cultural Immersion:
   ├── Primary: Islamic Brand Theme
   ├── Secondary: Custom Theme (green/gold)
   └── Alternative: Any theme with Islamic colors

⚙️ Personal Preference:
   ├── Primary: Custom Theme
   ├── Secondary: Based on specific needs
   └── Fallback: Low-Contrast Theme

📱 Mobile Usage:
   ├── Primary: Low-Contrast Theme
   ├── Secondary: Islamic Brand Theme
   └── Consider: Battery impact of high contrast

💻 Desktop Usage:
   ├── Primary: Any theme based on preference
   ├── Secondary: Consider ambient lighting
   └── Optimize: For extended reading sessions
```

### 7. Implementation Visual Guidelines

#### 7.1 Transition Effects
```css
/* Smooth theme transitions */
.theme-transition {
  transition: 
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Islamic-inspired animations */
.islamic-glow {
  animation: islamic-pulse 2s ease-in-out infinite;
}

@keyframes islamic-pulse {
  0%, 100% {
    box-shadow: 0 0 20px var(--islamic-gold);
  }
  50% {
    box-shadow: 0 0 40px var(--islamic-gold), 0 0 60px var(--islamic-teal);
  }
}
```

#### 7.2 Component State Variations
```
Button States (All Themes):

Default State:
├── High-Contrast: White bg, black text, sharp borders
├── Low-Contrast: Soft gray bg, light text, subtle borders
├── Islamic Brand: Gold bg, dark text, warm shadows
└── Custom: User-defined with validation

Hover State:
├── High-Contrast: Inverted colors, high contrast maintained
├── Low-Contrast: Gentle brightness increase, soft glow
├── Islamic Brand: Deeper gold, enhanced Islamic patterns
└── Custom: Calculated hover state based on base colors

Focus State:
├── High-Contrast: Thick white outline, maximum visibility
├── Low-Contrast: Subtle ring, comfortable for eyes
├── Islamic Brand: Golden ring with Islamic motifs
└── Custom: Accessible ring color auto-calculated

Disabled State:
├── High-Contrast: 50% opacity, maintains contrast
├── Low-Contrast: Reduced saturation, gentle fade
├── Islamic Brand: Muted earth tones, respectful styling
└── Custom: Proportional reduction based on theme
```

### 8. Responsive Design Considerations

#### 8.1 Mobile Optimizations
```
Mobile-Specific Adjustments:

Touch Targets:
├── Minimum 44px height for all interactive elements
├── Increased padding for better finger navigation
├── Enhanced focus indicators for accessibility
└── Swipe-friendly card layouts

Typography:
├── Larger base font sizes (16px minimum)
├── Increased line height for readability
├── Optimized contrast for outdoor viewing
└── Reduced text density for mobile screens

Color Adjustments:
├── Higher contrast ratios for bright environments
├── Reduced saturation to prevent eye strain
├── Battery-conscious color choices
└── OLED-optimized dark backgrounds
```

#### 8.2 Desktop Enhancements
```
Desktop-Specific Features:

Enhanced Interactions:
├── Subtle hover animations and transitions
├── Keyboard navigation indicators
├── Multi-level dropdown menus
├── Advanced tooltip systems

Visual Richness:
├── Gradient backgrounds and textures
├── Islamic geometric patterns
├── Enhanced shadow systems
├── Parallax scrolling effects

Productivity Features:
├── Sidebar navigation with theme controls
├── Quick theme switching shortcuts
├── Advanced search with theme-aware highlighting
└── Multi-panel layouts with consistent theming
```

### 9. Accessibility Testing Checklist

#### 9.1 Visual Testing
- [ ] All text meets minimum contrast ratios
- [ ] Focus indicators are clearly visible
- [ ] Color is not the only way to convey information
- [ ] UI elements have sufficient size and spacing
- [ ] Animations can be disabled for motion sensitivity

#### 9.2 Screen Reader Testing
- [ ] All themes work with NVDA/JAWS
- [ ] Color information is conveyed through text
- [ ] Theme switching is announced properly
- [ ] Custom theme controls are accessible
- [ ] Error messages are clear and helpful

#### 9.3 Cognitive Accessibility
- [ ] Consistent navigation across all themes
- [ ] Clear visual hierarchy maintained
- [ ] Reduced cognitive load in design
- [ ] Familiar Islamic visual patterns
- [ ] Intuitive theme selection interface

### 10. Future Enhancements

#### 10.1 Advanced Features
```
Planned Improvements:

AI-Powered Themes:
├── Automatic theme suggestion based on usage patterns
├── Ambient light sensor integration
├── Time-based theme switching
└── Accessibility need detection

Cultural Variations:
├── Regional Islamic art style themes
├── Calligraphy-inspired typography themes
├── Historical period-specific color schemes
└── Festival and occasion-themed variants

Advanced Customization:
├── Component-level color customization
├── Pattern and texture overlays
├── Advanced typography controls
└── Export themes for sharing
```

#### 10.2 Integration Possibilities
```
External Integrations:

Operating System:
├── Respect system dark mode preferences
├── Integrate with OS accessibility settings
├── Support for high contrast system modes
└── Color profile awareness

Browser Features:
├── CSS prefers-color-scheme support
├── prefers-reduced-motion compliance
├── prefers-contrast integration
└── Color gamut optimization

Third-party Tools:
├── Color blindness simulation tools
├── Accessibility audit integrations
├── Design system export capabilities
└── Analytics for theme usage patterns
```

Dokumentasi visual ini memberikan panduan komprehensif untuk implementasi dan penggunaan sistem dark mode multi-skema yang akan meningkatkan aksesibilitas dan pengalaman pengguna aplikasi Islamic Chronicle Quest.