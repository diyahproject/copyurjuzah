# Panduan Deployment dan Maintenance Animasi

## 1. Persiapan Production Build

### 1.1 Optimasi Bundle Size
```json
// package.json - Production dependencies
{
  "dependencies": {
    "framer-motion": "^10.16.4",
    "lodash.debounce": "^4.0.8",
    "lodash.throttle": "^4.1.1"
  },
  "devDependencies": {
    "@types/lodash.debounce": "^4.0.7",
    "@types/lodash.throttle": "^4.1.1"
  }
}
```

### 1.2 Webpack/Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate animation libraries
          'animation-vendor': ['framer-motion'],
          'utils-vendor': ['lodash.debounce', 'lodash.throttle'],
        },
      },
    },
    // Enable code splitting
    chunkSizeWarningLimit: 1000,
  },
  // Optimize for production
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
```

### 1.3 CSS Optimization
```css
/* src/styles/animations-production.css */
/* Critical animation styles - inline in HTML */
.critical-animations {
  /* Hero section animations */
  .hero-fade-in {
    opacity: 0;
    animation: heroFadeIn 0.8s ease-out forwards;
  }
  
  @keyframes heroFadeIn {
    to { opacity: 1; }
  }
  
  /* Loading states */
  .skeleton-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
}

/* Non-critical animations - load asynchronously */
.non-critical-animations {
  /* Complex hover effects */
  .complex-hover:hover {
    transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
    transition: transform 0.3s ease-out;
  }
  
  /* Parallax effects */
  .parallax-element {
    will-change: transform;
    transform: translateZ(0);
  }
}
```

## 2. Performance Monitoring

### 2.1 Animation Performance Metrics
```typescript
// src/utils/performanceMonitor.ts
interface AnimationMetrics {
  fps: number;
  frameDrops: number;
  memoryUsage: number;
  animationDuration: number;
  elementCount: number;
}

export class AnimationPerformanceMonitor {
  private metrics: AnimationMetrics = {
    fps: 0,
    frameDrops: 0,
    memoryUsage: 0,
    animationDuration: 0,
    elementCount: 0,
  };
  
  private frameCount = 0;
  private lastTime = performance.now();
  private animationStartTime = 0;

  startMonitoring() {
    this.animationStartTime = performance.now();
    this.measureFPS();
    this.measureMemory();
  }

  private measureFPS() {
    const measure = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastTime;
      
      if (deltaTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
        
        // Detect frame drops (target: 60fps)
        if (this.metrics.fps < 55) {
          this.metrics.frameDrops++;
          this.handlePerformanceIssue('low_fps', this.metrics.fps);
        }
        
        this.frameCount = 0;
        this.lastTime = currentTime;
      }
      
      this.frameCount++;
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  }

  private measureMemory() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1048576; // MB
      
      // Alert if memory usage is high
      if (this.metrics.memoryUsage > 100) {
        this.handlePerformanceIssue('high_memory', this.metrics.memoryUsage);
      }
    }
  }

  private handlePerformanceIssue(type: string, value: number) {
    console.warn(`Animation performance issue: ${type}`, value);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'animation_performance_issue', {
        issue_type: type,
        value: value,
        user_agent: navigator.userAgent,
      });
    }
    
    // Auto-optimize if needed
    this.autoOptimize(type);
  }

  private autoOptimize(issueType: string) {
    switch (issueType) {
      case 'low_fps':
        // Reduce animation complexity
        document.documentElement.classList.add('reduce-animations');
        break;
      case 'high_memory':
        // Clean up unused animations
        this.cleanupAnimations();
        break;
    }
  }

  private cleanupAnimations() {
    // Remove completed animations
    const completedAnimations = document.querySelectorAll('.animation-completed');
    completedAnimations.forEach(el => {
      el.classList.remove('animation-completed');
      (el as HTMLElement).style.willChange = 'auto';
    });
  }

  getMetrics(): AnimationMetrics {
    return { ...this.metrics };
  }
}

// Global instance
export const animationMonitor = new AnimationPerformanceMonitor();
```

### 2.2 Error Tracking
```typescript
// src/utils/animationErrorTracker.ts
interface AnimationError {
  type: 'animation_failed' | 'performance_degraded' | 'browser_incompatible';
  message: string;
  element?: string;
  timestamp: number;
  userAgent: string;
  url: string;
}

export class AnimationErrorTracker {
  private errors: AnimationError[] = [];

  trackError(error: Partial<AnimationError>) {
    const fullError: AnimationError = {
      type: error.type || 'animation_failed',
      message: error.message || 'Unknown animation error',
      element: error.element,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errors.push(fullError);
    this.reportError(fullError);
  }

  private reportError(error: AnimationError) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Animation Error:', error);
    }

    // Send to error tracking service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: `${error.type}: ${error.message}`,
        fatal: false,
      });
    }

    // Send to custom analytics
    fetch('/api/animation-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error),
    }).catch(() => {
      // Silently fail if analytics endpoint is unavailable
    });
  }

  getErrors(): AnimationError[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

export const animationErrorTracker = new AnimationErrorTracker();
```

## 3. Browser Compatibility Testing

### 3.1 Feature Detection
```typescript
// src/utils/browserCompatibility.ts
export interface BrowserCapabilities {
  intersectionObserver: boolean;
  requestAnimationFrame: boolean;
  cssTransforms: boolean;
  cssTransitions: boolean;
  cssAnimations: boolean;
  touchEvents: boolean;
  passiveEvents: boolean;
  webGL: boolean;
  hardwareAcceleration: boolean;
}

export const detectBrowserCapabilities = (): BrowserCapabilities => {
  const capabilities: BrowserCapabilities = {
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    cssTransforms: CSS.supports('transform', 'translateX(0)'),
    cssTransitions: CSS.supports('transition', 'opacity 0.3s'),
    cssAnimations: CSS.supports('animation', 'fadeIn 1s'),
    touchEvents: 'ontouchstart' in window,
    passiveEvents: checkPassiveEventSupport(),
    webGL: checkWebGLSupport(),
    hardwareAcceleration: checkHardwareAcceleration(),
  };

  return capabilities;
};

function checkPassiveEventSupport(): boolean {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return false;
      }
    });
    window.addEventListener('testPassive', () => {}, opts);
    window.removeEventListener('testPassive', () => {}, opts);
  } catch (e) {}
  return supportsPassive;
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
             (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function checkHardwareAcceleration(): boolean {
  const testElement = document.createElement('div');
  testElement.style.transform = 'translateZ(0)';
  document.body.appendChild(testElement);
  
  const computedStyle = window.getComputedStyle(testElement);
  const hasAcceleration = computedStyle.transform !== 'none';
  
  document.body.removeChild(testElement);
  return hasAcceleration;
}

// Apply fallbacks based on capabilities
export const applyCompatibilityFallbacks = (capabilities: BrowserCapabilities) => {
  const root = document.documentElement;

  if (!capabilities.cssTransforms) {
    root.classList.add('no-transforms');
  }

  if (!capabilities.cssTransitions) {
    root.classList.add('no-transitions');
  }

  if (!capabilities.cssAnimations) {
    root.classList.add('no-animations');
  }

  if (!capabilities.hardwareAcceleration) {
    root.classList.add('no-hardware-acceleration');
  }

  if (!capabilities.intersectionObserver) {
    // Load polyfill
    import('intersection-observer');
  }
};
```

### 3.2 Fallback CSS
```css
/* src/styles/fallbacks.css */
/* Fallbacks for browsers without transform support */
.no-transforms .transform-element {
  /* Use position-based animations instead */
  position: relative;
  transition: left 0.3s ease, top 0.3s ease;
}

.no-transforms .scale-animation {
  /* Use width/height instead of scale */
  transition: width 0.3s ease, height 0.3s ease;
}

/* Fallbacks for browsers without transition support */
.no-transitions .animated-element {
  /* Instant changes without animation */
  transition: none !important;
}

/* Fallbacks for browsers without animation support */
.no-animations .keyframe-animation {
  animation: none !important;
}

/* Fallbacks for browsers without hardware acceleration */
.no-hardware-acceleration .gpu-accelerated {
  transform: none;
  will-change: auto;
}

/* Reduced motion fallbacks */
@media (prefers-reduced-motion: reduce) {
  .respect-motion-preference {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Low-end device optimizations */
.reduce-animations .complex-animation {
  animation: none !important;
  transform: none !important;
  transition: opacity 0.2s ease !important;
}

.reduce-animations .parallax-element {
  transform: none !important;
  will-change: auto !important;
}
```

## 4. Deployment Checklist

### 4.1 Pre-deployment Testing
```bash
#!/bin/bash
# scripts/test-animations.sh

echo "🧪 Testing Animation Performance..."

# Build production version
npm run build

# Run Lighthouse CI for performance testing
npx lhci autorun --config=.lighthouserc.js

# Test on different browsers (using Playwright)
npx playwright test tests/animations/

# Check bundle size
npx bundlesize

# Validate accessibility
npx axe-cli dist/

echo "✅ Animation tests completed"
```

### 4.2 Lighthouse Configuration
```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/timeline', 'http://localhost:3000/quiz'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### 4.3 Animation Testing Suite
```typescript
// tests/animations/performance.test.ts
import { test, expect } from '@playwright/test';

test.describe('Animation Performance', () => {
  test('Hero section loads within performance budget', async ({ page }) => {
    await page.goto('/');
    
    // Measure First Contentful Paint
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
          }
        }).observe({ entryTypes: ['paint'] });
      });
    });
    
    expect(fcp).toBeLessThan(2000); // 2 seconds
  });

  test('Carousel animations are smooth', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to carousel
    await page.click('[data-testid="carousel-next"]');
    
    // Check for frame drops
    const frameDrops = await page.evaluate(() => {
      let frameCount = 0;
      let lastTime = performance.now();
      
      return new Promise((resolve) => {
        const checkFrames = () => {
          const currentTime = performance.now();
          const deltaTime = currentTime - lastTime;
          
          if (deltaTime > 16.67) { // More than 60fps threshold
            frameCount++;
          }
          
          lastTime = currentTime;
          
          if (frameCount > 100) { // After 100 frames
            resolve(frameCount);
          } else {
            requestAnimationFrame(checkFrames);
          }
        };
        
        requestAnimationFrame(checkFrames);
      });
    });
    
    expect(frameDrops).toBeLessThan(5); // Allow max 5% frame drops
  });

  test('Scroll animations trigger correctly', async ({ page }) => {
    await page.goto('/timeline');
    
    // Scroll to trigger animations
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Wait for animations to trigger
    await page.waitForTimeout(500);
    
    // Check if elements are visible
    const visibleElements = await page.$$eval('.timeline-event', elements => 
      elements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.opacity === '1' && style.transform !== 'none';
      }).length
    );
    
    expect(visibleElements).toBeGreaterThan(0);
  });
});
```

## 5. Maintenance Guidelines

### 5.1 Regular Performance Audits
```typescript
// scripts/performance-audit.ts
import { chromium } from 'playwright';

async function runPerformanceAudit() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Enable performance monitoring
  await page.addInitScript(() => {
    window.performanceMetrics = [];
    
    const observer = new PerformanceObserver((list) => {
      window.performanceMetrics.push(...list.getEntries());
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  });
  
  await page.goto('http://localhost:3000');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Get performance metrics
  const metrics = await page.evaluate(() => window.performanceMetrics);
  
  // Analyze metrics
  const analysis = analyzeMetrics(metrics);
  
  // Generate report
  generateReport(analysis);
  
  await browser.close();
}

function analyzeMetrics(metrics: any[]) {
  const paintMetrics = metrics.filter(m => m.entryType === 'paint');
  const navigationMetrics = metrics.filter(m => m.entryType === 'navigation');
  
  return {
    fcp: paintMetrics.find(m => m.name === 'first-contentful-paint')?.startTime,
    lcp: paintMetrics.find(m => m.name === 'largest-contentful-paint')?.startTime,
    loadTime: navigationMetrics[0]?.loadEventEnd - navigationMetrics[0]?.loadEventStart,
    recommendations: generateRecommendations(metrics),
  };
}

function generateRecommendations(metrics: any[]) {
  const recommendations = [];
  
  // Check for slow animations
  const longAnimations = metrics.filter(m => 
    m.entryType === 'measure' && m.duration > 100
  );
  
  if (longAnimations.length > 0) {
    recommendations.push('Consider optimizing long-running animations');
  }
  
  return recommendations;
}

// Run audit
runPerformanceAudit().catch(console.error);
```

### 5.2 Animation Library Updates
```json
{
  "scripts": {
    "update-animations": "npm update framer-motion && npm run test:animations",
    "check-animation-deps": "npm audit --audit-level moderate",
    "optimize-bundle": "npm run build && npx webpack-bundle-analyzer dist/static/js/*.js"
  }
}
```

### 5.3 Monitoring Dashboard
```typescript
// src/utils/animationDashboard.ts
export class AnimationDashboard {
  private metrics = new Map();
  
  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name).push({
      value,
      timestamp: Date.now(),
    });
    
    // Keep only last 100 entries
    const entries = this.metrics.get(name);
    if (entries.length > 100) {
      entries.shift();
    }
  }
  
  getAverageMetric(name: string): number {
    const entries = this.metrics.get(name) || [];
    if (entries.length === 0) return 0;
    
    const sum = entries.reduce((acc, entry) => acc + entry.value, 0);
    return sum / entries.length;
  }
  
  generateReport() {
    const report = {
      averageFPS: this.getAverageMetric('fps'),
      averageMemoryUsage: this.getAverageMetric('memory'),
      animationErrors: this.getAverageMetric('errors'),
      timestamp: new Date().toISOString(),
    };
    
    // Send to monitoring service
    fetch('/api/animation-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    
    return report;
  }
}
```

Panduan ini memastikan animasi tetap optimal dan dapat dipelihara dengan baik dalam lingkungan production.