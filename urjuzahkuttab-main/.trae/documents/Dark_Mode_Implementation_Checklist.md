# Dark Mode Implementation Checklist
## Islamic Chronicle Quest - Checklist Implementasi Sistem Warna

### 🎯 Pre-Implementation Setup

#### Environment Check
- [ ] Development server running (`npm run dev`)
- [ ] Git working directory clean
- [ ] Backup created for critical files
- [ ] Browser DevTools accessibility panel enabled

#### Tools Required
- [ ] WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)
- [ ] Chrome DevTools
- [ ] axe DevTools extension
- [ ] Color picker tool

---

### 📋 Phase 1: CSS Variables Setup

#### 1.1 Update `src/index.css`
- [ ] Add CSS variables section to `:root`
- [ ] Define all color tokens:
  - [ ] `--color-bg-primary: #000000`
  - [ ] `--color-surface: #131300`
  - [ ] `--color-surface-alt: #ccc4b2`
  - [ ] `--color-accent: #435e46`
  - [ ] `--color-accent-hover: #4a6b4e`
  - [ ] `--color-text-primary: #ccc4b2`
  - [ ] `--color-text-secondary: rgba(204,196,178,0.7)`
  - [ ] `--color-text-on-beige: #131300`
  - [ ] `--color-border: rgba(67,94,70,0.45)`
- [ ] Add navigation-specific variables:
  - [ ] `--color-nav-icon-default: rgba(204,196,178,0.55)`
  - [ ] `--color-nav-icon-active: #435e46`
  - [ ] `--color-nav-bg-active: rgba(67,94,70,0.18)`
  - [ ] `--color-nav-label-active: #ccc4b2`
- [ ] Add transition variable:
  - [ ] `--transition-colors: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out`
- [ ] Add `.dark` class with variable mappings
- [ ] Test CSS compilation without errors

#### 1.2 Update `tailwind.config.ts`
- [ ] Add custom colors to theme.extend.colors
- [ ] Map CSS variables to Tailwind classes
- [ ] Add transition properties
- [ ] Verify Tailwind compilation
- [ ] Test IntelliSense for new classes

#### 1.3 Validation
- [ ] No console errors in browser
- [ ] CSS variables accessible in DevTools
- [ ] Light mode unchanged
- [ ] Dark mode toggle functional

---

### 📋 Phase 2: Component Refactoring

#### 2.1 BottomNavigation.tsx (HIGH PRIORITY)
**Current Issues to Fix:**
- [ ] Inconsistent icon colors across pages
- [ ] Active state not using accent color
- [ ] Missing hover transitions

**Implementation:**
- [ ] Update icon default state: `dark:text-dark-nav-icon-default`
- [ ] Update icon active state: `dark:text-dark-nav-icon-active`
- [ ] Update active background: `dark:bg-dark-nav-bg-active`
- [ ] Update label active state: `dark:text-dark-nav-label-active`
- [ ] Add transition classes: `transition-colors`
- [ ] Test navigation on all pages (Home, Timeline, Quiz, Settings)

**Validation:**
- [ ] All navigation icons same color when inactive
- [ ] Active state uses accent green (#435e46)
- [ ] Smooth transitions on state changes
- [ ] Consistent across all pages

#### 2.2 Timeline.tsx (MEDIUM PRIORITY)
**Current Issues to Fix:**
- [ ] Card backgrounds not following hierarchy
- [ ] Text contrast issues on beige sections
- [ ] Inconsistent border colors

**Implementation:**
- [ ] Update card containers: `dark:bg-dark-bg-surface`
- [ ] Update beige sections text: `text-dark-text-on-beige`
- [ ] Update regular text: `dark:text-dark-text-primary`
- [ ] Update borders: `dark:border-dark-border`
- [ ] Add transition classes where missing

**Validation:**
- [ ] Card hierarchy visible (primary → surface → surface-alt)
- [ ] Text on beige backgrounds uses dark color (#131300)
- [ ] Text on dark backgrounds uses beige (#ccc4b2)
- [ ] Borders subtle but visible

#### 2.3 Quiz.tsx (MEDIUM PRIORITY)
**Current Issues to Fix:**
- [ ] Quiz card backgrounds
- [ ] Button color consistency
- [ ] Text contrast in quiz content

**Implementation:**
- [ ] Update quiz cards: `dark:bg-dark-bg-surface`
- [ ] Update quiz content with beige bg: text color to `text-dark-text-on-beige`
- [ ] Update buttons: `dark:bg-dark-accent dark:hover:bg-dark-accent-hover`
- [ ] Update secondary text: `dark:text-dark-text-secondary`

**Validation:**
- [ ] Quiz interface clearly readable
- [ ] Buttons use accent color consistently
- [ ] No beige text on beige background
- [ ] Hover states work properly

#### 2.4 InteractiveQuiz.tsx (MEDIUM PRIORITY)
**Current Issues to Fix:**
- [ ] Quiz box background
- [ ] Question text contrast
- [ ] Answer button states

**Implementation:**
- [ ] Update quiz container: `dark:bg-dark-bg-surface`
- [ ] Update question text: `dark:text-dark-text-primary`
- [ ] Update answer buttons: `dark:bg-dark-accent` for active
- [ ] Update progress indicators: use accent colors

**Validation:**
- [ ] Quiz box stands out from main background
- [ ] All text clearly readable
- [ ] Interactive elements obvious
- [ ] Progress indicators visible

#### 2.5 Settings.tsx (MEDIUM PRIORITY)
**Current Issues to Fix:**
- [ ] Settings panel backgrounds
- [ ] Icon colors consistency
- [ ] Toggle switch colors

**Implementation:**
- [ ] Update settings cards: `dark:bg-dark-bg-surface`
- [ ] Update icons: `dark:text-dark-nav-icon-default`
- [ ] Update active toggles: `dark:bg-dark-accent`
- [ ] Update panel text: `dark:text-dark-text-primary`

**Validation:**
- [ ] Settings panels clearly defined
- [ ] Icons match navigation style
- [ ] Toggle states obvious
- [ ] Text hierarchy clear

#### 2.6 HeroSection.tsx (LOW PRIORITY)
**Current Issues to Fix:**
- [ ] Hero text contrast
- [ ] Overlay backgrounds

**Implementation:**
- [ ] Update hero text: `dark:text-dark-text-primary`
- [ ] Update overlays: use surface colors
- [ ] Ensure text readable over images

**Validation:**
- [ ] Hero text clearly visible
- [ ] No contrast issues with background images
- [ ] Overlay doesn't interfere with readability

---

### 📋 Phase 3: Testing and Validation

#### 3.1 Contrast Ratio Testing
**Use WebAIM Contrast Checker for each combination:**

- [ ] **Text on Dark Background**
  - Background: #000000, Text: #ccc4b2
  - Expected: ≥15.8:1 ✅ AAA
  
- [ ] **Text on Beige Background**
  - Background: #ccc4b2, Text: #131300
  - Expected: ≥15.8:1 ✅ AAA
  
- [ ] **Accent on Dark Background**
  - Background: #000000, Text: #435e46
  - Expected: ≥4.8:1 ✅ AA
  
- [ ] **Secondary Text on Dark**
  - Background: #000000, Text: rgba(204,196,178,0.7)
  - Expected: ≥11.1:1 ✅ AAA
  
- [ ] **Navigation Icons Default**
  - Background: #000000, Text: rgba(204,196,178,0.55)
  - Expected: ≥4.5:1 ✅ AA

#### 3.2 Visual Consistency Testing

**Navigation Testing:**
- [ ] Home page navigation colors
- [ ] Timeline page navigation colors
- [ ] Quiz page navigation colors
- [ ] Settings page navigation colors
- [ ] All pages use same color tokens

**Card Hierarchy Testing:**
- [ ] Primary background (#000000) clearly darkest
- [ ] Surface background (#131300) slightly lighter
- [ ] Surface-alt background (#ccc4b2) clearly lightest
- [ ] Visual hierarchy obvious at first glance

**Interactive Elements Testing:**
- [ ] All buttons use accent color (#435e46)
- [ ] Hover states 10% brighter
- [ ] Focus states visible and accessible
- [ ] Active states clearly distinguished

#### 3.3 Functional Testing

**Theme Switching:**
- [ ] Light to dark transition smooth
- [ ] Dark to light transition smooth
- [ ] No layout shifts during transition
- [ ] All elements transition properly
- [ ] No flash of unstyled content

**Cross-Page Consistency:**
- [ ] Navigate between all pages in dark mode
- [ ] Colors consistent across pages
- [ ] No jarring color differences
- [ ] Navigation state preserved

#### 3.4 Accessibility Testing

**Screen Reader Testing:**
- [ ] Color information not sole indicator
- [ ] Focus indicators visible
- [ ] Interactive elements identifiable
- [ ] Text alternatives present

**Keyboard Navigation:**
- [ ] All interactive elements reachable
- [ ] Focus indicators visible in dark mode
- [ ] Tab order logical
- [ ] No keyboard traps

---

### 📋 Phase 4: Performance and Optimization

#### 4.1 Performance Check
- [ ] No significant bundle size increase
- [ ] CSS variables don't cause layout thrashing
- [ ] Transitions don't impact performance
- [ ] No memory leaks from theme switching

#### 4.2 Browser Compatibility
- [ ] Chrome: All features working
- [ ] Firefox: All features working
- [ ] Safari: All features working
- [ ] Edge: All features working
- [ ] Mobile browsers: Responsive and functional

---

### 📋 Phase 5: Documentation and Cleanup

#### 5.1 Code Documentation
- [ ] Add comments to CSS variables
- [ ] Document component changes
- [ ] Update README if necessary
- [ ] Add JSDoc comments for new props

#### 5.2 Final Validation
- [ ] All checklist items completed
- [ ] No console errors or warnings
- [ ] Light mode completely unchanged
- [ ] Dark mode meets all requirements
- [ ] Performance acceptable
- [ ] Accessibility standards met

#### 5.3 Deployment Preparation
- [ ] All changes committed to git
- [ ] Descriptive commit messages
- [ ] No sensitive information exposed
- [ ] Ready for production deployment

---

### 🚨 Common Issues and Solutions

#### Issue: Text not visible (beige on beige)
**Solution:** Use `text-dark-text-on-beige` for text on beige backgrounds

#### Issue: Navigation icons inconsistent
**Solution:** Use `dark:text-dark-nav-icon-default` and `dark:text-dark-nav-icon-active`

#### Issue: Transitions not smooth
**Solution:** Add `transition-colors` class to all color-changing elements

#### Issue: Contrast ratio too low
**Solution:** Use provided color tokens that meet WCAG AA standards

#### Issue: Theme switching causes layout shift
**Solution:** Ensure all elements have defined colors in both modes

---

### ✅ Success Criteria

**The implementation is successful when:**
- [ ] All contrast ratios meet WCAG 2.1 AA standards (≥4.5:1)
- [ ] Navigation colors consistent across all pages
- [ ] No "beige text on beige background" issues
- [ ] Smooth transitions between light and dark modes
- [ ] Visual hierarchy clear and obvious
- [ ] Interactive elements easily identifiable
- [ ] Performance impact minimal
- [ ] Light mode completely unchanged
- [ ] All accessibility requirements met
- [ ] Code maintainable and well-documented

**Estimated Total Time:** 7-11 hours
**Priority Order:** Navigation → Cards → Interactive Elements → Polish