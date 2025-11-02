import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { timelineEvents } from '@/data/timelineEvents';

// Import images for location categories
import kaabaMecca from '@/assets/kaaba-mecca.jpg';
import masjidNabawi from '@/assets/masjid-nabawi.jpg';
import domeOfRock from '@/assets/dome-of-rock-hero.jpg';
import islamicExpansion from '@/assets/islamic-expansion.jpg';
import baniSaad from '@/assets/bani-saad.jpg';
import birthLight from '@/assets/birth-light.jpg';

interface LocationData {
  location: string;
  displayName: string;
  events: number;
  highlighted: boolean;
  images: string[];
}

interface LocationCarouselProps {
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
  className?: string;
}

const LocationCarousel: React.FC<LocationCarouselProps> = ({
  selectedLocation,
  onLocationSelect,
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

  // Process timeline events to create location data
  const locationData = useMemo(() => {
    const makkahEvents = timelineEvents.filter(event => 
      event.phase === 'makkah' || 
      event.location?.toLowerCase().includes('makkah') ||
      event.location?.toLowerCase().includes('mekkah')
    );
    
    const madinahEvents = timelineEvents.filter(event => 
      event.phase === 'madinah' || 
      event.location?.toLowerCase().includes('madinah')
    );
    
    const otherEvents = timelineEvents.filter(event => 
      !makkahEvents.includes(event) && 
      !madinahEvents.includes(event) &&
      event.location && 
      event.location.trim() !== ''
    );

    const locations: LocationData[] = [
      {
        location: 'makkah',
        displayName: 'Makkah',
        events: makkahEvents.length,
        highlighted: false,
        images: [kaabaMecca, birthLight, islamicExpansion] // Max 3 images
      },
      {
        location: 'madinah',
        displayName: 'Madinah',
        events: madinahEvents.length,
        highlighted: false,
        images: [masjidNabawi, domeOfRock, islamicExpansion] // Max 3 images
      },
      {
        location: 'other',
        displayName: 'Lokasi Lain',
        events: otherEvents.length,
        highlighted: false,
        images: [baniSaad, islamicExpansion, domeOfRock] // Max 3 images
      }
    ];

    return locations;
  }, []);

  const carouselMetrics = useMemo(() => {
    const gap = windowWidth >= 1024 ? 28 : windowWidth >= 640 ? 24 : 12;
    const cardWidth = windowWidth >= 640 ? 512 : 224;
    const locationsLength = locationData?.length || 0;
    const totalWidth = locationsLength * cardWidth + Math.max(0, locationsLength - 1) * gap;
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
  }, [viewportWidth, windowWidth, locationData?.length]);

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

  const locationsLength = locationData?.length || 0;
  const atStart = scrollPosition <= 1;
  const atEnd = carouselMetrics.maxScroll - scrollPosition <= 1;
  const controlsDisabled = carouselMetrics.step === 0;

  const getClampedIndex = (position: number) => {
    if (!locationsLength || carouselMetrics.step === 0) return 0;
    const rawIndex = Math.round(position / carouselMetrics.step);
    return Math.max(0, Math.min(locationsLength - 1, rawIndex));
  };

  const selectLocationByIndex = (index: number) => {
    const locationInfo = locationData?.[index];
    if (!locationInfo) return;
    if (locationInfo.location !== selectedLocation) {
      onLocationSelect(locationInfo.location);
    }
  };

  const goToIndex = (
    index: number,
    {
      withFlip = false,
      duration = withFlip ? 400 : 250,
    }: { withFlip?: boolean; duration?: number } = {}
  ) => {
    if (!locationsLength || carouselMetrics.step === 0) return;

    const clampedIndex = Math.max(0, Math.min(locationsLength - 1, index));
    const targetPosition = clampedIndex * carouselMetrics.step;

    if (Math.abs(targetPosition - scrollPosition) < 1) {
      selectLocationByIndex(clampedIndex);
      return;
    }

    if (withFlip) {
      if (isFlipping) return;
      const currentIndex = getClampedIndex(scrollPosition);
      setIsFlipping(true);
      setFlipDirection(clampedIndex > currentIndex ? 'next' : 'prev');

      setTimeout(() => {
        animateToPosition(targetPosition, duration);
        selectLocationByIndex(clampedIndex);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, duration);
      }, 200);
    } else {
      animateToPosition(targetPosition, duration);
      selectLocationByIndex(clampedIndex);
    }
  };

  const scrollCards = (direction: 'left' | 'right', withFlip: boolean = false) => {
    if (carouselMetrics.step === 0 || !locationsLength) return;
    if (withFlip && isFlipping) return;

    const currentIndex = getClampedIndex(scrollPosition);
    const targetIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(locationsLength - 1, currentIndex + 1);

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
    if (!locationsLength || carouselMetrics.step === 0) return;
    const nearestIndex = getClampedIndex(scrollPosition);
    const targetPosition = nearestIndex * carouselMetrics.step;
    animateToPosition(targetPosition, duration);
    selectLocationByIndex(nearestIndex);
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
    if (!locationsLength || carouselMetrics.step === 0) return;
    const targetIndex = locationData.findIndex(
      (locationInfo) => locationInfo.location === selectedLocation
    );
    if (targetIndex === -1) return;

    const targetPosition = targetIndex * carouselMetrics.step;
    if (Math.abs(targetPosition - scrollPosition) > 1) {
      animateToPosition(targetPosition, 0);
    }
  }, [
    selectedLocation,
    locationData,
    carouselMetrics.step,
    scrollPosition,
    locationsLength,
  ]);

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
            {locationData?.map((locationInfo, index) => {
              const cardCenter =
                index * carouselMetrics.step + carouselMetrics.cardWidth / 2;
              const distance = Math.abs(viewportCenter - cardCenter);
              const ratio = Math.min(distance / maxDistance, 1);
              const intensity =
                carouselMetrics.step > 0
                  ? 1 - ratio
                  : locationInfo.location === selectedLocation
                  ? 1
                  : 0;
              const scale = 0.9 + intensity * 0.1;
              const translateY = (1 - intensity) * 16;
              const opacity = 0.6 + intensity * 0.4;

              // Get the primary image for this location (first image in the array)
              const primaryImage = locationInfo.images[0];

              return (
                <div
                  key={locationInfo.location}
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
                      selectedLocation === locationInfo.location
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
                          src={primaryImage}
                          alt={`Lokasi ${locationInfo.displayName}`}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out"
                          style={{
                            transform: `scale(${1 + intensity * 0.05})`,
                            filter: `brightness(${0.85 + intensity * 0.15})`,
                          }}
                        />
                        <div
                          className={`absolute inset-0 ${
                            selectedLocation === locationInfo.location
                              ? "bg-gradient-to-br from-black/30 via-black/20 to-black/30"
                              : "bg-gradient-to-br from-black/10 to-black/5"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-center bg-primary text-primary-foreground py-2">
                      <span className="font-bold text-[20px] sm:text-[40px] md:text-[40px] lg:text-[40px]">
                        {locationInfo.displayName}
                      </span>
                      <div className="text-xs sm:text-sm opacity-90">
                        {locationInfo.events} Peristiwa
                      </div>
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

export default LocationCarousel;