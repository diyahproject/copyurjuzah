# Dark Mode Color System Refactor Guide
## Islamic Chronicle Quest - Panduan Refactor Sistem Warna

### 1. Tujuan Refactor

Melakukan refactor seluruh sistem warna untuk dark mode agar tampilan lebih konsisten, kontras seimbang, dan tidak saling berbenturan. Fokus pada koreksi warna UI berdasarkan prinsip desain modern dan aksesibilitas (WCAG 2.1 AA).

**Prinsip Utama:**
- Pertahankan struktur layout dan typography yang sudah ada
- Perbaiki palet warna dark mode agar proporsional, kontras tinggi, dan tidak berantakan
- Jangan ubah tema terang - hanya tambahkan atau koreksi variabel warna dark mode

### 2. Sistem Token Warna Dark Mode

#### 2.1 Palet Warna Utama

| Token Variable | Nilai Warna | Penggunaan | Kontras Ratio |
|----------------|-------------|------------|---------------|
| `--color-bg-primary` | `#000000` | Latar belakang utama (hitam pekat) | Base |
| `--color-surface` | `#131300` | Permukaan sekunder (panel dan card) | 1.2:1 |
| `--color-surface-alt` | `#ccc4b2` | Konten dalam (beige lembut) | 15.8:1 |
| `--color-accent` | `#435e46` | Tombol aktif, ikon, link utama | 4.8:1 |
| `--color-text-primary` | `#ccc4b2` | Teks utama | 15.8:1 |
| `--color-text-secondary` | `rgba(204,196,178,0.7)` | Label dan teks minor | 11.1:1 |
| `--color-border` | `rgba(67,94,70,0.45)` | Border elemen | 2.2:1 |

#### 2.2 Warna Navigasi

| Token Variable | Nilai Warna | Penggunaan |
|----------------|-------------|------------|
| `--color-nav-icon-default` | `rgba(204,196,178,0.55)` | Ikon navigasi default |
| `--color-nav-icon-active` | `#435e46` | Ikon navigasi aktif |
| `--color-nav-bg-active` | `rgba(67,94,70,0.18)` | Background navigasi aktif |
| `--color-nav-label-active` | `#ccc4b2` | Label navigasi aktif |

### 3. Aturan Kontras dan Aksesibilitas

#### 3.1 Aturan Kontras Warna

**Teks di atas Background Beige:**
- Gunakan `#131300` (gelap) untuk memastikan kontras tinggi
- Rasio kontras: 15.8:1 (AAA level)

**Teks di atas Background Gelap:**
- Gunakan `#ccc4b2` (beige) atau putih lembut
- Hindari abu-abu yang dapat mengurangi kontras

**Elemen Interaktif:**
- Tombol dan link aktif: gunakan `#435e46` (aksen hijau tua)
- Hover state: tingkatkan brightness ±10%
- Rasio kontras minimum: 4.5:1 (AA level)

#### 3.2 Hirarki Visual

```
Level 1: Background Primary (#000000)
├── Level 2: Surface (#131300)
│   ├── Level 3: Surface Alt (#ccc4b2)
│   │   └── Text: Dark (#131300)
│   └── Text: Primary (#ccc4b2)
└── Accent Elements (#435e46)
```

### 4. Implementasi CSS Variables

#### 4.1 Root Variables Definition

```css
:root {
  /* Light mode colors (existing - DO NOT MODIFY) */
  --color-bg-light: #ffffff;
  --color-text-light: #000000;
  
  /* Dark mode color tokens */
  --color-bg-primary: #000000;
  --color-surface: #131300;
  --color-surface-alt: #ccc4b2;
  --color-accent: #435e46;
  --color-accent-hover: #4a6b4e;
  --color-text-primary: #ccc4b2;
  --color-text-secondary: rgba(204, 196, 178, 0.7);
  --color-text-on-beige: #131300;
  --color-border: rgba(67, 94, 70, 0.45);
  
  /* Navigation specific */
  --color-nav-icon-default: rgba(204, 196, 178, 0.55);
  --color-nav-icon-active: #435e46;
  --color-nav-bg-active: rgba(67, 94, 70, 0.18);
  --color-nav-label-active: #ccc4b2;
  
  /* Transitions */
  --transition-colors: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out;
}
```

#### 4.2 Dark Mode Application

```css
.dark {
  /* Background layers */
  --bg-primary: var(--color-bg-primary);
  --bg-surface: var(--color-surface);
  --bg-surface-alt: var(--color-surface-alt);
  
  /* Text colors */
  --text-primary: var(--color-text-primary);
  --text-secondary: var(--color-text-secondary);
  --text-on-beige: var(--color-text-on-beige);
  
  /* Interactive elements */
  --accent: var(--color-accent);
  --accent-hover: var(--color-accent-hover);
  --border: var(--color-border);
}
```

### 5. Audit dan Perbaikan Komponen

#### 5.1 Komponen yang Perlu Diaudit

| Komponen | File Location | Fokus Perbaikan |
|----------|---------------|-----------------|
| **Navigation** | `BottomNavigation.tsx` | Ikon dan label navigasi |
| **Cards** | `Timeline.tsx`, `Quiz.tsx` | Background dan teks card |
| **Buttons** | Semua komponen | Warna tombol aktif dan hover |
| **Quiz Interface** | `InteractiveQuiz.tsx` | Background quiz box |
| **Hero Section** | `HeroSection.tsx` | Kontras teks dan background |
| **Settings Panel** | `Settings.tsx` | Panel beige dan teks |

#### 5.2 Pola Perbaikan Umum

**Sebelum (Contoh):**
```css
.card {
  background-color: #1a1a1a; /* Statis */
  color: #888888; /* Kontras rendah */
}
```

**Sesudah:**
```css
.card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  transition: var(--transition-colors);
}
```

### 6. Checklist Implementasi

#### 6.1 Phase 1: Setup Token System
- [ ] Tambahkan CSS variables ke `index.css`
- [ ] Update `tailwind.config.ts` dengan custom colors
- [ ] Verifikasi tidak ada konflik dengan tema terang

#### 6.2 Phase 2: Component Refactoring
- [ ] **BottomNavigation.tsx**: Seragamkan warna ikon dan label
- [ ] **Timeline.tsx**: Perbaiki kontras card dan teks
- [ ] **Quiz.tsx**: Update background quiz dan tombol
- [ ] **InteractiveQuiz.tsx**: Konsistensi warna quiz box
- [ ] **Settings.tsx**: Perbaiki panel beige dan teks
- [ ] **HeroSection.tsx**: Kontras hero text

#### 6.3 Phase 3: Validation
- [ ] Test kontras ratio dengan tools aksesibilitas
- [ ] Verifikasi konsistensi di semua halaman
- [ ] Test transisi smooth antara light/dark mode
- [ ] Validasi tidak ada perubahan pada tema terang

### 7. Testing dan Validasi

#### 7.1 Contrast Ratio Testing

Gunakan tools berikut untuk validasi:
- WebAIM Contrast Checker
- Chrome DevTools Accessibility
- axe DevTools

**Target Minimum:**
- Normal text: 4.5:1 (AA)
- Large text: 3:1 (AA)
- Interactive elements: 4.5:1 (AA)

#### 7.2 Visual Testing Checklist

- [ ] Semua teks terbaca dengan jelas
- [ ] Ikon navigasi konsisten di semua halaman
- [ ] Tidak ada "teks beige di atas beige"
- [ ] Tombol dan link memiliki hover state yang jelas
- [ ] Transisi warna smooth dan tidak jarring
- [ ] Panel beige memiliki teks gelap yang kontras

### 8. Maintenance Guidelines

#### 8.1 Aturan Penggunaan Warna Baru

1. **Selalu gunakan CSS variables**, jangan hardcode hex values
2. **Test kontras** sebelum commit perubahan
3. **Konsistensi navigasi** - gunakan token yang sama di semua halaman
4. **Dokumentasi perubahan** - update guide ini jika ada token baru

#### 8.2 Common Pitfalls to Avoid

- ❌ Menggunakan `text-gray-400` di dark mode
- ❌ Hardcode warna tanpa CSS variables
- ❌ Mengubah tema terang secara tidak sengaja
- ❌ Mengabaikan contrast ratio testing
- ❌ Inkonsistensi warna navigasi antar halaman

### 9. Implementation Priority

**High Priority (Critical):**
1. Navigation icons consistency
2. Text contrast on beige backgrounds
3. Interactive elements (buttons, links)

**Medium Priority:**
4. Card backgrounds and borders
5. Secondary text elements
6. Hover states and transitions

**Low Priority:**
7. Decorative elements
8. Non-critical UI components

---

**Note**: Dokumen ini harus diikuti secara ketat untuk memastikan konsistensi sistem warna dark mode yang accessible dan professional.