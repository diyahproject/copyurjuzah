import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

// Import images
import hijriyah0 from '@/assets/birth-light.jpg';
import hijriyah1 from '@/assets/hijriyah-1.jpg';
import hijriyah2 from '@/assets/hijriyah-2.jpg';
import hijriyah3 from '@/assets/hijriyah-3.jpg';
import hijriyah4 from '@/assets/hijriyah-4.jpg';
import hijriyah5 from '@/assets/hijriyah-5.jpg';
import hijriyah6 from '@/assets/hijriyah-6.jpg';
import hijriyah7 from '@/assets/hijriyah-7.jpg';
import hijriyah8 from '@/assets/hijriyah-8.jpg';
import hijriyah9 from '@/assets/islamic-expansion.jpg';
import hijriyah10 from '@/assets/dome-of-rock-hero.jpg';
import hijriyah11 from '@/assets/masjid-nabawi.jpg';

interface YearData {
  year: number;
  events: number;
  highlighted: boolean;
  image: string;
}

interface YearCarouselProps {
  hijriyahYears: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
  className?: string;
}

const YearCarousel: React.FC<YearCarouselProps> = ({
  hijriyahYears = [],
  selectedYear,
  onYearSelect,
  className = ""
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const momentumAnimationRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTouchRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchStartScrollRef = useRef<number>(0);

  const { windowWidth } = useWindowSize();

  // Setup viewport observer
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setViewportWidth(entry.contentRect.width);
      }
    });

    setViewportWidth(node.getBoundingClientRect().width);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const carouselMetrics = useMemo(() => {
    const gap = windowWidth >= 1024 ? 28 : windowWidth >= 640 ? 24 : 12;
    const cardWidth = windowWidth >= 640 ? 512 : 224;
    const yearsLength = hijriyahYears?.length || 0;
    const totalWidth = yearsLength * cardWidth + Math.max(0, yearsLength - 1) * gap;
    const usableViewport = viewportWidth > 0 ? viewportWidth : cardWidth;
    const maxScroll = usableViewport > 0 ? Math.max(0, totalWidth - usableViewport) : 0;
    const step = cardWidth + gap;

    return {
      cardWidth,
      gap,
      totalWidth,
      maxScroll,
      step,
    };
  }, [viewportWidth, windowWidth, hijriyahYears?.length]);

  useEffect(() => {
    setScrollPosition((prev) =>
      prev > carouselMetrics.maxScroll ? carouselMetrics.maxScroll : prev
    );
  }, [carouselMetrics.maxScroll]);

  useEffect(() => {
    return () => {
      if (momentumAnimationRef.current) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
    };
  }, []);

  const yearsLength = hijriyahYears?.length || 0;
  const atStart = scrollPosition <= 1;
  const atEnd = carouselMetrics.maxScroll - scrollPosition <= 1;
  const controlsDisabled = carouselMetrics.step === 0;

  const getClampedIndex = (position: number) => {
    if (!yearsLength || carouselMetrics.step === 0) return 0;
    const rawIndex = Math.round(position / carouselMetrics.step);
    return Math.max(0, Math.min(yearsLength - 1, rawIndex));
  };

  const selectYearByIndex = (index: number) => {
    const yearData = hijriyahYears?.[index];
    if (!yearData) return;
    if (yearData.year !== selectedYear) {
      onYearSelect(yearData.year);
    }
  };

  const goToIndex = (
    index: number,
    {
      withFlip = false,
      duration = withFlip ? 400 : 250,
    }: { withFlip?: boolean; duration?: number } = {}
  ) => {
    if (!yearsLength || carouselMetrics.step === 0) return;

    const clampedIndex = Math.max(0, Math.min(yearsLength - 1, index));
    const targetPosition = clampedIndex * carouselMetrics.step;

    if (Math.abs(targetPosition - scrollPosition) < 1) {
      selectYearByIndex(clampedIndex);
      return;
    }

    if (withFlip) {
      if (isFlipping) return;
      const currentIndex = getClampedIndex(scrollPosition);
      setIsFlipping(true);
      setFlipDirection(clampedIndex > currentIndex ? 'next' : 'prev');

      setTimeout(() => {
        animateToPosition(targetPosition, duration);
        selectYearByIndex(clampedIndex);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, duration);
      }, 200);
    } else {
      animateToPosition(targetPosition, duration);
      selectYearByIndex(clampedIndex);
    }
  };

  const scrollCards = (direction: 'left' | 'right', withFlip: boolean = false) => {
    if (carouselMetrics.step === 0 || !yearsLength) return;
    if (withFlip && isFlipping) return;

    const currentIndex = getClampedIndex(scrollPosition);
    const targetIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(yearsLength - 1, currentIndex + 1);

    if (targetIndex === currentIndex) return;

    goToIndex(targetIndex, { withFlip });
  };

  const animateToPosition = (targetPosition: number, duration: number = 0) => {
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }

    if (duration === 0) {
      setScrollPosition(targetPosition);
      return;
    }

    const startPosition = scrollPosition;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentPosition = startPosition + distance * easeOutCubic;

      setScrollPosition(currentPosition);

      if (progress < 1) {
        momentumAnimationRef.current = requestAnimationFrame(animate);
      }
    };

    momentumAnimationRef.current = requestAnimationFrame(animate);
  };

  const snapToNearestCard = (duration: number = 200) => {
    if (!yearsLength || carouselMetrics.step === 0) return;
    const nearestIndex = getClampedIndex(scrollPosition);
    const targetPosition = nearestIndex * carouselMetrics.step;
    animateToPosition(targetPosition, duration);
    selectYearByIndex(nearestIndex);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const positionSnapshot = scrollPosition;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    };
    lastTouchRef.current = touchStartRef.current;
    touchStartScrollRef.current = positionSnapshot;
    setIsSwiping(false);

    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
      momentumAnimationRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const currentTouch = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    };
    lastTouchRef.current = currentTouch;

    const deltaX = touchStartRef.current.x - currentTouch.x;
    const deltaY = Math.abs(touchStartRef.current.y - currentTouch.y);

    if (Math.abs(deltaX) > 10 && deltaY < 120) {
      setIsSwiping(true);
      e.preventDefault();

      const newPosition = Math.max(
        0,
        Math.min(
          carouselMetrics.maxScroll,
          touchStartScrollRef.current + deltaX
        )
      );
      setScrollPosition(newPosition);
    }
  };

  const handleTouchEnd = () => {
    const touchStartData = touchStartRef.current;
    const touchEndData = lastTouchRef.current || touchStartData;

    if (!touchStartData || !touchEndData) {
      snapToNearestCard();
      setIsSwiping(false);
      return;
    }

    const deltaX = touchStartData.x - touchEndData.x;
    const deltaY = Math.abs(touchStartData.y - touchEndData.y);
    const elapsed = Math.max(touchEndData.time - touchStartData.time, 1);
    const velocity = Math.abs(deltaX) / elapsed;

    const isHorizontalSwipe = Math.abs(deltaX) > 40 && deltaY < 120;
    const isFastSwipe = velocity > 0.35;

    let handled = false;

    if ((isHorizontalSwipe || isFastSwipe) && Math.abs(deltaX) > 20) {
      const startIndex = getClampedIndex(touchStartScrollRef.current);
      if (deltaX > 0 && !atEnd) {
        goToIndex(startIndex + 1, { withFlip: true });
        handled = true;
      } else if (deltaX < 0 && !atStart) {
        goToIndex(startIndex - 1, { withFlip: true });
        handled = true;
      }
    }

    if (!handled) {
      snapToNearestCard();
    }

    touchStartRef.current = null;
    lastTouchRef.current = null;
    setIsSwiping(false);
  };

  useEffect(() => {
    if (!yearsLength || carouselMetrics.step === 0) return;
    const targetIndex = hijriyahYears.findIndex(
      (yearData) => yearData.year === selectedYear
    );
    if (targetIndex === -1) return;

    const targetPosition = targetIndex * carouselMetrics.step;
    if (Math.abs(targetPosition - scrollPosition) > 1) {
      animateToPosition(targetPosition, 0);
    }
  }, [
    selectedYear,
    hijriyahYears,
    carouselMetrics.step,
    scrollPosition,
    yearsLength,
  ]);

  const hijriyahImages = [
    hijriyah0, hijriyah1, hijriyah2, hijriyah3, hijriyah4, hijriyah5,
    hijriyah6, hijriyah7, hijriyah8, hijriyah9, hijriyah10, hijriyah11
  ];
  const viewportCenter =
    scrollPosition + (viewportWidth || carouselMetrics.cardWidth) / 2;
  const maxDistance =
    carouselMetrics.step > 0
      ? carouselMetrics.step * 1.5
      : Math.max(1, carouselMetrics.cardWidth);

  return (
    <div className={`relative mb-8 perspective-1000 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 ${className}`}>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => scrollCards('left', true)} 
          disabled={atStart || isFlipping || controlsDisabled} 
          className="shrink-0 hidden sm:flex touch-feedback"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={viewportRef}
          className="overflow-hidden w-full sm:w-[calc(100%-120px)]"
        >
          <div 
            ref={scrollContainerRef}
            className={`flex gap-3 sm:gap-4 px-4 sm:px-0 swipe-indicator ${isSwiping ? 'swiping' : ''}`}
            style={{ 
              transform: `translateX(-${scrollPosition}px)`,
              width: 'max-content'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {hijriyahYears?.map((yearData, index) => {
              const cardCenter =
                index * carouselMetrics.step + carouselMetrics.cardWidth / 2;
              const distance = Math.abs(viewportCenter - cardCenter);
              const ratio = Math.min(distance / maxDistance, 1);
              const intensity =
                carouselMetrics.step > 0
                  ? 1 - ratio
                  : yearData.year === selectedYear
                  ? 1
                  : 0;
              const scale = 0.9 + intensity * 0.1;
              const translateY = (1 - intensity) * 16;
              const opacity = 0.6 + intensity * 0.4;

              return (
                <div
                  key={yearData.year}
                  className="transition-all duration-300 ease-out"
                  style={{
                    width: `${carouselMetrics.cardWidth}px`,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(intensity * 10) + 1,
                    transition:
                      "transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease",
                  }}
                >
                  <Card
                    className={`flex h-full flex-col cursor-pointer overflow-hidden touch-feedback card-3d-hover snap-center preserve-3d ${
                      selectedYear === yearData.year
                        ? "ring-2 ring-primary shadow-elegant"
                        : ""
                    }`}
                    onClick={() => {
                      if (!isFlipping) {
                        goToIndex(index, { withFlip: false, duration: 200 });
                      }
                    }}
                  >
                    <div className="relative aspect-video">
                      <div className="absolute inset-0">
                        <img
                          src={hijriyahImages[index] || hijriyah0}
                          alt={`Tahun ${yearData.year} Hijriyah`}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out"
                          style={{
                            transform: `scale(${1 + intensity * 0.05})`,
                            filter: `brightness(${0.85 + intensity * 0.15})`,
                          }}
                        />
                        <div
                          className={`absolute inset-0 ${
                            selectedYear === yearData.year
                              ? "bg-gradient-to-br from-black/30 via-black/20 to-black/30"
                              : "bg-gradient-to-br from-black/10 to-black/5"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-center bg-primary text-primary-foreground py-2">
                      <span className="font-bold text-[20px] sm:text-[40px] md:text-[40px] lg:text-[40px]">
                        {yearData.year === 0
                          ? "Pra Kenabian"
                          : `${yearData.year} Hijriyah`}
                      </span>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => scrollCards('right', true)} 
          disabled={atEnd || isFlipping || controlsDisabled} 
          className="shrink-0 hidden sm:flex touch-feedback"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default YearCarousel;
