# Detail Implementasi Animasi Interaktif

## 1. Setup Dependencies

### 1.1 Package Installation
```bash
npm install framer-motion
npm install @types/intersection-observer
npm install lodash.debounce lodash.throttle
npm install @types/lodash.debounce @types/lodash.throttle
```

### 1.2 CSS Animation Base
```css
/* src/styles/animations.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --animation-duration-fast: 300ms;
  --animation-duration-normal: 600ms;
  --animation-duration-slow: 800ms;
  --animation-easing-ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --animation-easing-ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --animation-easing-ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --animation-stagger-delay: 100ms;
}

/* Hardware acceleration base classes */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --animation-duration-fast: 0ms;
    --animation-duration-normal: 0ms;
    --animation-duration-slow: 0ms;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Base animation classes */
.animate-fade-in {
  opacity: 0;
  animation: fadeIn var(--animation-duration-normal) var(--animation-easing-ease-out) forwards;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp var(--animation-duration-normal) var(--animation-easing-ease-out) forwards;
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.9);
  animation: scaleIn var(--animation-duration-fast) var(--animation-easing-ease-out) forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Stagger animation delays */
.stagger-1 { animation-delay: calc(var(--animation-stagger-delay) * 1); }
.stagger-2 { animation-delay: calc(var(--animation-stagger-delay) * 2); }
.stagger-3 { animation-delay: calc(var(--animation-stagger-delay) * 3); }
.stagger-4 { animation-delay: calc(var(--animation-stagger-delay) * 4); }
.stagger-5 { animation-delay: calc(var(--animation-stagger-delay) * 5); }
```

## 2. Custom Hooks Implementation

### 2.1 useScrollAnimation Hook
```typescript
// src/hooks/useScrollAnimation.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: number;
  disabled?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    stagger = 0,
    disabled = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleIntersection = useCallback(
    debounce((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      });
    }, 16), // ~60fps debounce
    [hasTriggered, triggerOnce]
  );

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin, disabled, prefersReducedMotion]);

  return {
    ref: elementRef,
    isVisible,
    style: {
      transitionDelay: stagger ? `${stagger}ms` : undefined,
    },
  };
};
```

### 2.2 useCarouselAnimation Hook
```typescript
// src/hooks/useCarouselAnimation.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { throttle } from 'lodash';

interface CarouselOptions {
  totalSlides: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  infinite?: boolean;
  touchEnabled?: boolean;
  swipeThreshold?: number;
}

export const useCarouselAnimation = (options: CarouselOptions) => {
  const {
    totalSlides,
    autoPlay = false,
    autoPlayInterval = 5000,
    infinite = true,
    touchEnabled = true,
    swipeThreshold = 50,
  } = options;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (!autoPlay) return;
    
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (infinite) {
          return (prev + 1) % totalSlides;
        }
        return prev < totalSlides - 1 ? prev + 1 : 0;
      });
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, totalSlides, infinite]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Navigation functions
  const goToSlide = useCallback((slideIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match CSS transition duration
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = infinite 
      ? (currentSlide + 1) % totalSlides
      : Math.min(currentSlide + 1, totalSlides - 1);
    goToSlide(nextIndex);
  }, [currentSlide, totalSlides, infinite, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = infinite
      ? currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
      : Math.max(currentSlide - 1, 0);
    goToSlide(prevIndex);
  }, [currentSlide, totalSlides, infinite, goToSlide]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!touchEnabled) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    stopAutoPlay();
  }, [touchEnabled, stopAutoPlay]);

  const handleTouchMove = useCallback(
    throttle((e: React.TouchEvent) => {
      if (!touchEnabled) return;
      setTouchEnd(e.targetTouches[0].clientX);
    }, 16),
    [touchEnabled]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !touchEnabled) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > swipeThreshold;
    const isRightSwipe = distance < -swipeThreshold;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    startAutoPlay();
  }, [touchStart, touchEnd, touchEnabled, swipeThreshold, nextSlide, prevSlide, startAutoPlay]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case ' ':
        e.preventDefault();
        autoPlay ? stopAutoPlay() : startAutoPlay();
        break;
    }
  }, [prevSlide, nextSlide, autoPlay, stopAutoPlay, startAutoPlay]);

  // Effects
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    currentSlide,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
    containerRef,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    autoPlayControls: {
      start: startAutoPlay,
      stop: stopAutoPlay,
      isPlaying: autoPlayRef.current !== null,
    },
  };
};
```

### 2.3 usePerformanceOptimization Hook
```typescript
// src/hooks/usePerformanceOptimization.ts
import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  prefersReducedMotion: boolean;
  isLowEndDevice: boolean;
  connectionSpeed: 'slow' | 'fast';
  memoryInfo?: any;
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    prefersReducedMotion: false,
    isLowEndDevice: false,
    connectionSpeed: 'fast',
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end devices
    const isLowEndDevice = (() => {
      // Check hardware concurrency (CPU cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        return true;
      }

      // Check memory (if available)
      const memory = (navigator as any).deviceMemory;
      if (memory && memory <= 2) {
        return true;
      }

      // Check connection speed
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        return true;
      }

      return false;
    })();

    // Determine connection speed
    const connectionSpeed = (() => {
      const connection = (navigator as any).connection;
      if (!connection) return 'fast';
      
      return connection.effectiveType === '4g' || connection.effectiveType === '3g' ? 'fast' : 'slow';
    })();

    // Get memory info if available
    const memoryInfo = (performance as any).memory;

    setMetrics({
      prefersReducedMotion,
      isLowEndDevice,
      connectionSpeed,
      memoryInfo,
    });
  }, []);

  const shouldAnimate = !metrics.prefersReducedMotion && !metrics.isLowEndDevice;
  const shouldUseComplexAnimations = shouldAnimate && metrics.connectionSpeed === 'fast';

  return {
    ...metrics,
    shouldAnimate,
    shouldUseComplexAnimations,
  };
};
```

## 3. Component Implementation Examples

### 3.1 Animated Card Component
```typescript
// src/components/AnimatedCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, usePerformanceOptimization } from '@/hooks';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { shouldAnimate, shouldUseComplexAnimations } = usePerformanceOptimization();
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    disabled: !shouldAnimate,
  });

  if (!shouldAnimate) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} will-change-transform`}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: shouldUseComplexAnimations ? 0.6 : 0.3,
        delay: delay / 1000,
        ease: [0.0, 0.0, 0.2, 1],
      }}
      whileHover={shouldUseComplexAnimations ? { scale: 1.02 } : undefined}
      whileTap={shouldUseComplexAnimations ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
};
```

### 3.2 Smooth Carousel Component
```typescript
// src/components/SmoothCarousel.tsx
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarouselAnimation, usePerformanceOptimization } from '@/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string;
  content: React.ReactNode;
  image?: string;
}

interface SmoothCarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  className?: string;
}

export const SmoothCarousel: React.FC<SmoothCarouselProps> = ({
  slides,
  autoPlay = false,
  className = '',
}) => {
  const { shouldAnimate, shouldUseComplexAnimations } = usePerformanceOptimization();
  
  const {
    currentSlide,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
    containerRef,
    touchHandlers,
    autoPlayControls,
  } = useCarouselAnimation({
    totalSlides: slides.length,
    autoPlay,
    touchEnabled: shouldAnimate,
  });

  const slideVariants = useMemo(() => ({
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }), []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!shouldAnimate) {
    return (
      <div className={`relative ${className}`}>
        <div className="overflow-hidden">
          {slides[currentSlide]?.content}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className} will-change-transform`}
      {...touchHandlers}
      tabIndex={0}
    >
      <div className="relative h-64 overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={shouldUseComplexAnimations ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {slides[currentSlide]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-300'
            }`}
            whileHover={shouldUseComplexAnimations ? { scale: 1.2 } : undefined}
            whileTap={shouldUseComplexAnimations ? { scale: 0.9 } : undefined}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play controls */}
      {autoPlay && (
        <div className="absolute top-2 right-2">
          <button
            onClick={autoPlayControls.isPlaying ? autoPlayControls.stop : autoPlayControls.start}
            className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            aria-label={autoPlayControls.isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {autoPlayControls.isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      )}
    </div>
  );
};
```

## 4. Performance Optimization Techniques

### 4.1 Lazy Loading Implementation
```typescript
// src/utils/lazyLoading.ts
export class LazyLoadManager {
  private observer: IntersectionObserver;
  private loadedElements = new Set<Element>();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loadedElements.has(entry.target)) {
            this.loadElement(entry.target);
            this.loadedElements.add(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );
  }

  observe(element: Element) {
    this.observer.observe(element);
  }

  private loadElement(element: Element) {
    // Load images
    const img = element.querySelector('img[data-src]') as HTMLImageElement;
    if (img) {
      img.src = img.dataset.src!;
      img.removeAttribute('data-src');
    }

    // Load background images
    const bgElement = element.querySelector('[data-bg]') as HTMLElement;
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${bgElement.dataset.bg})`;
      bgElement.removeAttribute('data-bg');
    }

    // Trigger animations
    element.classList.add('loaded');
  }

  disconnect() {
    this.observer.disconnect();
    this.loadedElements.clear();
  }
}
```

### 4.2 Hardware Acceleration Utilities
```typescript
// src/utils/hardwareAcceleration.ts
export const enableHardwareAcceleration = (element: HTMLElement) => {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
  element.style.willChange = 'transform';
};

export const disableHardwareAcceleration = (element: HTMLElement) => {
  element.style.transform = '';
  element.style.backfaceVisibility = '';
  element.style.perspective = '';
  element.style.willChange = 'auto';
};

export const optimizeForAnimation = (element: HTMLElement) => {
  // Enable hardware acceleration
  enableHardwareAcceleration(element);
  
  // Add GPU layer
  element.classList.add('gpu-accelerated');
  
  // Return cleanup function
  return () => {
    disableHardwareAcceleration(element);
    element.classList.remove('gpu-accelerated');
  };
};
```

### 4.3 Animation Queue Manager
```typescript
// src/utils/animationQueue.ts
interface QueuedAnimation {
  id: string;
  element: HTMLElement;
  animation: () => Promise<void>;
  priority: 'low' | 'normal' | 'high';
}

export class AnimationQueue {
  private queue: QueuedAnimation[] = [];
  private running = false;
  private maxConcurrent = 3;
  private currentlyRunning = 0;

  add(animation: QueuedAnimation) {
    this.queue.push(animation);
    this.queue.sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    this.processQueue();
  }

  private async processQueue() {
    if (this.running || this.currentlyRunning >= this.maxConcurrent) {
      return;
    }

    const animation = this.queue.shift();
    if (!animation) return;

    this.currentlyRunning++;
    
    try {
      await animation.animation();
    } catch (error) {
      console.warn('Animation failed:', error);
    } finally {
      this.currentlyRunning--;
      
      // Process next animation
      if (this.queue.length > 0) {
        requestAnimationFrame(() => this.processQueue());
      }
    }
  }

  clear() {
    this.queue.length = 0;
  }

  pause() {
    this.running = false;
  }

  resume() {
    this.running = true;
    this.processQueue();
  }
}

export const animationQueue = new AnimationQueue();
```

## 5. Accessibility dan Browser Support

### 5.1 Accessibility Implementation
```typescript
// src/utils/accessibility.ts
export const setupAccessibilityFeatures = () => {
  // Respect reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleReducedMotion = (e: MediaQueryListEvent) => {
    document.documentElement.classList.toggle('reduce-motion', e.matches);
  };

  mediaQuery.addListener(handleReducedMotion);
  handleReducedMotion(mediaQuery as any);

  // Add focus management for carousel
  const setupCarouselAccessibility = (carousel: HTMLElement) => {
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Image carousel');
    
    const slides = carousel.querySelectorAll('[data-slide]');
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
    });
  };

  return { setupCarouselAccessibility };
};
```

### 5.2 Browser Compatibility
```typescript
// src/utils/browserSupport.ts
export const checkBrowserSupport = () => {
  const support = {
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    cssTransforms: CSS.supports('transform', 'translateX(0)'),
    cssTransitions: CSS.supports('transition', 'opacity 0.3s'),
    touchEvents: 'ontouchstart' in window,
    passiveEvents: (() => {
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
    })(),
  };

  return support;
};

export const setupPolyfills = () => {
  // Intersection Observer polyfill
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer');
  }

  // RequestAnimationFrame polyfill
  if (!('requestAnimationFrame' in window)) {
    (window as any).requestAnimationFrame = (callback: FrameRequestCallback) => {
      return setTimeout(callback, 1000 / 60);
    };
  }
};
```

Dokumentasi ini memberikan panduan lengkap untuk implementasi animasi interaktif yang optimal, dengan fokus pada performa, aksesibilitas, dan pengalaman pengguna yang halus.