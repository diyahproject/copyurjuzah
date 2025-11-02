import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Target,
  PenTool,
  Star,
  Sword,
  Shield,
  Mountain,
  Users,
  Zap,
  Heart,
  Award,
  Flag,
  Home,
  Globe,
  Crown,
  Building,
  Volume2,
  Square,
  Share2,
  MessageCircle,
  Twitter,
  Facebook,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import YearCarousel from "@/components/YearCarousel";
import LocationCarousel from "@/components/LocationCarousel";

import BottomNavigation from "@/components/BottomNavigation";
import { timelineEvents } from "@/data/timelineEvents";
import { useToast } from "@/hooks/use-toast";
import AOS from "aos";

// Import gambar hijriyah
import hijriyah0 from "@/assets/birth-light.jpg";
import hijriyah1 from "@/assets/hijriyah-1.jpg";
import hijriyah2 from "@/assets/hijriyah-2.jpg";
import hijriyah3 from "@/assets/hijriyah-3.jpg";
import hijriyah4 from "@/assets/hijriyah-4.jpg";
import hijriyah5 from "@/assets/hijriyah-5.jpg";
import hijriyah6 from "@/assets/hijriyah-6.jpg";
import hijriyah7 from "@/assets/hijriyah-7.jpg";
import hijriyah8 from "@/assets/hijriyah-8.jpg";
// Using existing images as placeholders for years 9-11
import hijriyah9 from "@/assets/islamic-expansion.jpg";
import hijriyah10 from "@/assets/dome-of-rock-hero.jpg";
import hijriyah11 from "@/assets/masjid-nabawi.jpg";

// Import gambar untuk setiap phase lokasi
import kaabaImage from "@/assets/kaaba-mecca.jpg";
import madinahImage from "@/assets/masjid-nabawi.jpg";
import expansionImage from "@/assets/islamic-expansion.jpg";

// Mapping gambar untuk setiap phase lokasi
const locationImages = {
  makkah: kaabaImage,
  madinah: madinahImage,
  expansion: expansionImage,
};

// Array gambar hijriyah
const hijriyahImages = [
  hijriyah0,
  hijriyah1,
  hijriyah2,
  hijriyah3,
  hijriyah4,
  hijriyah5,
  hijriyah6,
  hijriyah7,
  hijriyah8,
  hijriyah9,
  hijriyah10,
  hijriyah11,
];

// Define the TimelineEvent interface based on the data structure
interface TimelineEvent {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  hijriyahYear: number;
  gregorianYear: number;
  month: string;
  location: string;
  parties: string[];
  description: string;
  facts: string;
  references?: string[];
  phase: string;
  duration: string;
  author?: string; // Optional property for event author
}

const hijriyahYears = [
  { year: 0, events: 14, highlighted: false, image: "/images/hijriyah/0.jpg" },
  { year: 1, events: 10, highlighted: false, image: "/images/hijriyah/1.jpg" },
  { year: 2, events: 6, highlighted: false, image: "/images/hijriyah/2.jpg" },
  { year: 3, events: 1, highlighted: false, image: "/images/hijriyah/3.jpg" },
  { year: 4, events: 1, highlighted: false, image: "/images/hijriyah/4.jpg" },
  { year: 5, events: 1, highlighted: false, image: "/images/hijriyah/5.jpg" },
  { year: 6, events: 1, highlighted: false, image: "/images/hijriyah/6.jpg" },
  { year: 7, events: 1, highlighted: false, image: "/images/hijriyah/7.jpg" },
  { year: 8, events: 1, highlighted: false, image: "/images/hijriyah/8.jpg" },
  { year: 9, events: 5, highlighted: false, image: "/images/hijriyah/9.jpg" },
  { year: 10, events: 3, highlighted: false, image: "/images/hijriyah/10.jpg" },
  { year: 11, events: 2, highlighted: false, image: "/images/hijriyah/11.jpg" },
];

// Timeline events are now imported from external data file
// Local array removed to use imported timelineEvents from @/data/timelineEvents

const locationPhases = [
  {
    phase: "makkah",
    title: "Makkah Al-Mukarramah",
    events: 6,
    color: "bg-red-500",
  },
  {
    phase: "madinah",
    title: "Madinah Al-Munawwarah",
    events: 18,
    color: "bg-[#435e46]",
  },
  {
    phase: "expansion",
    title: "Ekspansi Islam",
    events: 3,
    color: "bg-[#435e46]",
  },
];

// Filter events by year using imported timelineEvents
const yearEvents = {
  0: timelineEvents.filter((event) => event.hijriyahYear === 0),
  1: timelineEvents.filter((event) => event.hijriyahYear === 1),
  2: timelineEvents.filter((event) => event.hijriyahYear === 2),
  3: timelineEvents.filter((event) => event.hijriyahYear === 3),
  4: timelineEvents.filter((event) => event.hijriyahYear === 4),
  5: timelineEvents.filter((event) => event.hijriyahYear === 5),
  6: timelineEvents.filter((event) => event.hijriyahYear === 6),
  7: timelineEvents.filter((event) => event.hijriyahYear === 7),
  8: timelineEvents.filter((event) => event.hijriyahYear === 8),
  9: timelineEvents.filter((event) => event.hijriyahYear === 9),
  10: timelineEvents.filter((event) => event.hijriyahYear === 10),
  11: timelineEvents.filter((event) => event.hijriyahYear === 11),
};

// Filter events by location using imported timelineEvents
const locationEvents = {
  makkah: timelineEvents.filter((event) => event.phase === "makkah"),
  madinah: timelineEvents.filter((event) => event.phase === "madinah"),
  expansion: timelineEvents.filter((event) => event.phase === "expansion"),
};

// Helper function to get events by location phase
const getEventsByLocation = (phase: string) => {
  return locationEvents[phase as keyof typeof locationEvents] || [];
};

// Helper untuk merender paragraf terpisah berdasarkan pemisah baris kosong (\n\n)
const renderParagraphs = (text: string, className = "") => {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs.map((para, idx) => (
    <p
      key={idx}
      className={`${className} ${idx < paragraphs.length - 1 ? "mb-5" : ""}`}
    >
      {para.trim()}
    </p>
  ));
};

// Function to render brief description for location tab (max 2 lines)
const renderBriefDescription = (text: string, className = "") => {
  if (!text) return null;

  // Remove line breaks and clean text
  const cleanText = text.replace(/\n+/g, " ").trim();

  // Split into words and limit to approximately 2 lines (around 120 characters)
  const words = cleanText.split(" ");
  let briefText = "";
  let charCount = 0;

  for (const word of words) {
    if (charCount + word.length + 1 > 120) break;
    briefText += (briefText ? " " : "") + word;
    charCount += word.length + 1;
  }

  // Add ellipsis if text was truncated
  if (briefText.length < cleanText.length) {
    briefText += "...";
  }

  return (
    <div className={className}>
      <div className="line-clamp-2">{briefText}</div>
    </div>
  );
};

// Location coordinates mapping
const locationCoordinates: {
  [key: string]: { lat: number; lng: number; name: string };
} = {
  makkah: { lat: 21.4225, lng: 39.8262, name: "Makkah, Saudi Arabia" },
  madinah: { lat: 24.4539, lng: 39.604, name: "Madinah, Saudi Arabia" },
  abwa: { lat: 23.2, lng: 39.2, name: "Abwa, Saudi Arabia" },
  syams: { lat: 33.5138, lng: 36.2765, name: "Damascus, Syria" },
  hauran: { lat: 32.52, lng: 36.35, name: "Hauran, Syria" },
  bushra: { lat: 32.52, lng: 36.35, name: "Bushra, Syria" },
  ethiopia: { lat: 14.1319, lng: 38.7267, name: "Aksum, Ethiopia" },
  aksum: { lat: 14.1319, lng: 38.7267, name: "Aksum, Ethiopia" },
  badr: { lat: 23.75, lng: 38.7833, name: "Badr, Saudi Arabia" },
  uhud: { lat: 24.4858, lng: 39.6158, name: "Uhud, Saudi Arabia" },
  hudaibiyah: { lat: 21.44, lng: 39.78, name: "Hudaibiyah, Saudi Arabia" },
  qadisiyyah: { lat: 31.99, lng: 44.94, name: "Al-Qadisiyyah, Iraq" },
  irak: { lat: 31.99, lng: 44.94, name: "Iraq" },
  mesir: { lat: 30.0444, lng: 31.2357, name: "Cairo, Egypt" },
  egypt: { lat: 30.0444, lng: 31.2357, name: "Cairo, Egypt" },
  "jazirah arab": { lat: 23.8859, lng: 45.0792, name: "Arabian Peninsula" },
  yerusalem: { lat: 31.7683, lng: 35.2137, name: "Jerusalem" },
  jerusalem: { lat: 31.7683, lng: 35.2137, name: "Jerusalem" },
  "sidratul muntaha": {
    lat: 21.4225,
    lng: 39.8262,
    name: "Makkah, Saudi Arabia",
  }, // Spiritual location, defaulting to Makkah
  "darun nabighah": {
    lat: 24.4539,
    lng: 39.604,
    name: "Madinah, Saudi Arabia",
  }, // Historical location in Madinah
  "bani saad": { lat: 21.5, lng: 40.0, name: "Bani Saad, Saudi Arabia" }, // Tribal area near Makkah
  "gua hira": { lat: 21.4594, lng: 39.8578, name: "Gua Hira, Makkah" }, // Cave Hira near Makkah
  "syib abi thalib": {
    lat: 21.4225,
    lng: 39.8262,
    name: "Syib Abi Thalib, Makkah",
  }, // Valley in Makkah
};

// Function to get Google Maps embed URL based on location
const getMapEmbedUrl = (location: string): string => {
  if (!location) {
    // Default to Makkah if no location provided
    const defaultCoords = locationCoordinates["makkah"];
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.856!2d${
      defaultCoords.lng
    }!3d${
      defaultCoords.lat
    }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${encodeURIComponent(
      defaultCoords.name
    )}!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`;
  }

  // Normalize location string for matching
  const normalizedLocation = location
    .toLowerCase()
    .replace(/[,\s]+/g, " ")
    .trim();

  // Try to find exact match first
  let coords = null;
  for (const [key, value] of Object.entries(locationCoordinates)) {
    if (normalizedLocation.includes(key.toLowerCase())) {
      coords = value;
      break;
    }
  }

  // If no match found, try partial matching
  if (!coords) {
    for (const [key, value] of Object.entries(locationCoordinates)) {
      if (
        key.toLowerCase().includes(normalizedLocation) ||
        normalizedLocation.includes(key.toLowerCase())
      ) {
        coords = value;
        break;
      }
    }
  }

  // Fallback to Makkah if still no match
  if (!coords) {
    coords = locationCoordinates["makkah"];
  }

  // Generate Google Maps embed URL
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.856!2d${
    coords.lng
  }!3d${
    coords.lat
  }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${encodeURIComponent(
    coords.name
  )}!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`;
};

// Preload images function
const preloadImages = () => {
  hijriyahImages.forEach((imageSrc, index) => {
    const img = new Image();
    img.src = imageSrc;
  });
};

const Timeline: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedLocationPhase, setSelectedLocationPhase] =
    useState<string>("makkah");
  const [locationScrollPosition, setLocationScrollPosition] =
    useState<number>(0);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>("tahun");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [currentlyPlayingEventId, setCurrentlyPlayingEventId] = useState<
    string | null
  >(null);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [locationViewportWidth, setLocationViewportWidth] = useState(0);
  const locationScrollContainerRef = useRef<HTMLDivElement>(null);
  const locationViewportRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Preload images on component mount
  useEffect(() => {
    preloadImages();
  }, []);
  const [locationTouchStart, setLocationTouchStart] = useState<{
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const [locationTouchEnd, setLocationTouchEnd] = useState<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  // Flip animation states
  const [isLocationFlipping, setIsLocationFlipping] = useState(false);
  const [locationFlipDirection, setLocationFlipDirection] = useState<
    "next" | "prev" | null
  >(null);
  const [isLocationSwiping, setIsLocationSwiping] = useState(false);

  // Refs for momentum scrolling
  const locationMomentumRef = useRef<number | null>(null);
  const locationTouchScrollStartRef = useRef<number>(0);
  const locationLastTouchRef = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const locationSelectionChangeRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    const node = locationViewportRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setLocationViewportWidth(entry.contentRect.width);
      }
    });

    setLocationViewportWidth(node.getBoundingClientRect().width);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const resolveCardConfig = (width: number) => {
    if (width >= 1024) {
      return { cardWidth: 416, gap: 32 };  // doubled desktop
    }
    if (width >= 768) {
      return { cardWidth: 384, gap: 28 };  // doubled tablet landscape
    }
    if (width >= 640) {
      return { cardWidth: 352, gap: 24 };  // doubled tablet portrait
    }
    return { cardWidth: 160, gap: 12 };    // mobile retains original size
  };



  const locationMetrics = useMemo(() => {
    const { cardWidth, gap } = resolveCardConfig(windowWidth);
    const totalWidth =
      locationPhases.length * cardWidth +
      (locationPhases.length - 1) * gap;
    const viewport =
      locationViewportWidth > 0 ? locationViewportWidth : cardWidth;
    const maxScroll =
      viewport > 0 ? Math.max(0, totalWidth - viewport) : 0;
    const step = cardWidth + gap;

    return { cardWidth, gap, totalWidth, maxScroll, step };
  }, [windowWidth, locationViewportWidth]);



  useEffect(() => {
    setLocationScrollPosition((prev) =>
      prev > locationMetrics.maxScroll ? locationMetrics.maxScroll : prev
    );
  }, [locationMetrics.maxScroll]);

  useEffect(() => {
    return () => {
      if (locationMomentumRef.current) {
        cancelAnimationFrame(locationMomentumRef.current);
      }
    };
  }, []);



  const atLocationStart = locationScrollPosition <= 1;
  const atLocationEnd =
    locationMetrics.maxScroll - locationScrollPosition <= 1;
  const canScrollLocationLeft = !atLocationStart;
  const canScrollLocationRight = !atLocationEnd;
  const locationViewportCenter =
    locationScrollPosition +
    (locationViewportWidth || locationMetrics.cardWidth) / 2;
  const locationMaxDistance =
    locationMetrics.step > 0
      ? locationMetrics.step * 1.5
      : Math.max(1, locationMetrics.cardWidth);

  // Enhanced swipe detection constants - more sensitive for mobile
  const minSwipeDistance = windowWidth < 640 ? 20 : 30;
  const maxVerticalSwipe = windowWidth < 640 ? 60 : 80;
  const minSwipeVelocity = windowWidth < 640 ? 0.2 : 0.3;

  const animateToPosition = (targetPosition: number, duration: number = 0) => {
    const metrics = locationMetrics;

    if (locationMomentumRef.current) {
      cancelAnimationFrame(locationMomentumRef.current);
      locationMomentumRef.current = null;
    }

    const clampedTarget = Math.max(
      0,
      Math.min(metrics.maxScroll, targetPosition)
    );

    if (duration === 0) {
      setLocationScrollPosition(clampedTarget);
      return;
    }

    const startPosition = locationScrollPosition;
    const distance = clampedTarget - startPosition;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentPosition = startPosition + distance * easeOutCubic;

      setLocationScrollPosition(currentPosition);

      if (progress < 1) {
        locationMomentumRef.current = requestAnimationFrame(animate);
      }
    };

    locationMomentumRef.current = requestAnimationFrame(animate);
  };

  const getLocationClampedIndex = (position: number) => {
    if (locationMetrics.step === 0) return 0;
    const rawIndex = Math.round(position / locationMetrics.step);
    return Math.max(
      0,
      Math.min(locationPhases.length - 1, rawIndex)
    );
  };

  const selectLocationByIndex = (index: number) => {
    const phaseData = locationPhases[index];
    if (!phaseData) return;
    if (phaseData.phase !== selectedLocationPhase) {
      locationSelectionChangeRef.current = true;
      setSelectedLocationPhase(phaseData.phase);
    }
  };

  const goToLocationIndex = (
    index: number,
    {
      withFlip = false,
      duration = withFlip ? 400 : 250,
    }: { withFlip?: boolean; duration?: number } = {}
  ) => {
    if (locationMetrics.step === 0) return;

    const clampedIndex = Math.max(
      0,
      Math.min(locationPhases.length - 1, index)
    );
    const targetPosition = clampedIndex * locationMetrics.step;

    if (Math.abs(targetPosition - locationScrollPosition) < 1) {
      selectLocationByIndex(clampedIndex);
      return;
    }

    if (withFlip) {
      if (isLocationFlipping) return;
      const currentIndex = getLocationClampedIndex(locationScrollPosition);
      setIsLocationFlipping(true);
      setLocationFlipDirection(
        clampedIndex > currentIndex ? "next" : "prev"
      );

      document.body.classList.add("haptic-feedback");
      setTimeout(
        () => document.body.classList.remove("haptic-feedback"),
        100
      );

      setTimeout(() => {
        animateToPosition(targetPosition, duration);
        selectLocationByIndex(clampedIndex);
        setTimeout(() => {
          setIsLocationFlipping(false);
          setLocationFlipDirection(null);
        }, duration);
      }, 200);
    } else {
      animateToPosition(targetPosition, duration);
      selectLocationByIndex(clampedIndex);
    }
  };

  const snapToNearestCard = (duration: number = 200) => {
    if (locationMetrics.step === 0) return;
    const nearestIndex = getLocationClampedIndex(locationScrollPosition);
    const targetPosition = nearestIndex * locationMetrics.step;
    animateToPosition(targetPosition, duration);
    selectLocationByIndex(nearestIndex);
  };



  // Enhanced touch event handlers for location carousel
  const handleLocationTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); // Prevent scroll conflicts on mobile
    setLocationTouchEnd(null);
    setIsLocationSwiping(false);

    const touch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: performance.now(),
    };

    setLocationTouchStart({
      x: touch.x,
      y: touch.y,
      time: touch.time,
    });
    locationTouchScrollStartRef.current = locationScrollPosition;
    locationLastTouchRef.current = touch;

    if (locationMomentumRef.current) {
      cancelAnimationFrame(locationMomentumRef.current);
      locationMomentumRef.current = null;
    }

    // Add swipe indicator
    document.body.classList.add("swipe-indicator");
  };

  const handleLocationTouchMove = (e: React.TouchEvent) => {
    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: performance.now(),
    };
    setLocationTouchEnd(currentTouch);
    locationLastTouchRef.current = currentTouch;

    // If user is moving significantly, prevent click events and set swiping state
    if (locationTouchStart) {
      const distanceX = Math.abs(locationTouchStart.x - currentTouch.x);
      const distanceY = Math.abs(locationTouchStart.y - currentTouch.y);
      
      // Prevent vertical scrolling during horizontal swipes
      if (distanceX > distanceY && distanceX > 5) {
        e.preventDefault();
      }
      
      if (distanceX > 10 || distanceY > 10) {
        setIsLocationSwiping(true);
      }

      if (distanceX > distanceY && distanceX > 5) {
        const deltaX = locationTouchStart.x - currentTouch.x;
        const targetPosition =
          locationTouchScrollStartRef.current + deltaX;
        const clampedPosition = Math.max(
          0,
          Math.min(locationMetrics.maxScroll, targetPosition)
        );
        setLocationScrollPosition(clampedPosition);
      }
    }
  };

  const handleLocationTouchEnd = () => {
    document.body.classList.remove("swipe-indicator");

    const touchStartData = locationTouchStart;
    const touchEndData =
      locationLastTouchRef.current || locationTouchEnd || locationTouchStart;

    if (!touchStartData || !touchEndData) {
      snapToNearestCard();
      setIsLocationSwiping(false);
      setLocationTouchStart(null);
      setLocationTouchEnd(null);
      locationLastTouchRef.current = null;
      return;
    }

    const distanceX = touchStartData.x - touchEndData.x;
    const distanceY = Math.abs(touchStartData.y - touchEndData.y);
    const timeElapsed = Math.max(touchEndData.time - touchStartData.time, 1);
    const velocity = Math.abs(distanceX) / timeElapsed;

    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isHorizontalSwipe =
      Math.abs(distanceX) > minSwipeDistance && distanceY < maxVerticalSwipe;
    const isFastSwipe = velocity > minSwipeVelocity;

    let handled = false;

    if (isHorizontalSwipe || isFastSwipe) {
      const baseIndex = getLocationClampedIndex(
        locationTouchScrollStartRef.current
      );

      if (isLeftSwipe && baseIndex < locationPhases.length - 1) {
        goToLocationIndex(baseIndex + 1, { withFlip: true });
        handled = true;
      } else if (isRightSwipe && baseIndex > 0) {
        goToLocationIndex(baseIndex - 1, { withFlip: true });
        handled = true;
      }
    }

    if (!handled) {
      snapToNearestCard();
    }

    setIsLocationSwiping(false);
    setLocationTouchStart(null);
    setLocationTouchEnd(null);
    locationLastTouchRef.current = null;
  };

  useEffect(() => {
    if (locationSelectionChangeRef.current) {
      locationSelectionChangeRef.current = false;
      return;
    }

    if (locationMetrics.step === 0) return;

    const targetIndex = locationPhases.findIndex(
      (phase) => phase.phase === selectedLocationPhase
    );

    if (targetIndex === -1) return;

    const targetPosition = targetIndex * locationMetrics.step;
    if (Math.abs(targetPosition - locationScrollPosition) > 1) {
      animateToPosition(targetPosition, 0);
    }
  }, [selectedLocationPhase, locationMetrics.step, locationScrollPosition]);

  // Handle URL parameters from HijriyahSection navigation, HistoricalPhases navigation, and search suggestions
  useEffect(() => {
    const eventTitle = searchParams.get("event");
    const eventYear = searchParams.get("year");
    const eventPhase = searchParams.get("phase");
    const tab = searchParams.get("tab");
    const eventId = searchParams.get("eventId");

    // Handle search suggestion navigation with eventId
    if (eventId) {
      // Find the event by ID in timelineEvents
      const targetEvent = timelineEvents.find((event) => event.id === eventId);

      if (targetEvent) {
        // Determine the appropriate tab based on event data
        if (targetEvent.hijriyahYear !== undefined) {
          // Year-based event
          setActiveTab("tahun");
          setSelectedYear(targetEvent.hijriyahYear);
        } else if (targetEvent.phase) {
          // Location-based event
          setActiveTab("lokasi");
          setSelectedLocationPhase(targetEvent.phase);
        }

        // Auto-expand the target event with a delay to ensure DOM is ready
        setTimeout(() => {
          setExpandedEvents(new Set([eventId]));

          // Scroll to the event after another delay
          setTimeout(() => {
            const eventElement = document.getElementById(`event-${eventId}`);
            if (eventElement) {
              eventElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            } else {
              // Retry after another delay
              setTimeout(() => {
                const retryElement = document.getElementById(
                  `event-${eventId}`
                );
                if (retryElement) {
                  retryElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }, 1000);
            }
          }, 500);
        }, 100);
      }
    }
    // Handle tab navigation from HistoricalPhases
    else if (tab === "lokasi" && eventPhase) {
      setActiveTab("lokasi");
      setSelectedLocationPhase(eventPhase);
    } else if (eventTitle && eventYear) {
      // Set the year tab and selected year
      setActiveTab("tahun");
      setSelectedYear(parseInt(eventYear));

      // Find the event in yearEvents using exact title match
      const yearEventsData =
        yearEvents[parseInt(eventYear) as keyof typeof yearEvents];
      if (yearEventsData) {
        const targetEvent = yearEventsData.find(
          (event) => event.title === eventTitle
        );

        if (targetEvent) {
          // Use the actual event ID from the data
          const eventId = targetEvent.id;

          // Auto-expand the target event
          setExpandedEvents(new Set([eventId]));

          // Scroll to the event after a short delay
          setTimeout(() => {
            const eventElement = document.getElementById(`event-${eventId}`);
            if (eventElement) {
              eventElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 500);
        }
      }
    } else if (eventTitle && eventPhase) {
      // Handle location-based events
      setActiveTab("lokasi");
      setSelectedLocationPhase(eventPhase);

      // Find the event in locationEvents using exact title match
      const locationEventsData =
        locationEvents[eventPhase as keyof typeof locationEvents];
      if (locationEventsData) {
        const targetEventIndex = locationEventsData.findIndex(
          (event) => event.title === eventTitle
        );

        if (targetEventIndex !== -1) {
          const eventId = `location-${eventPhase}-${targetEventIndex}`;

          // Auto-expand the target event
          setExpandedEvents(new Set([eventId]));

          // Scroll to the event after a short delay
          setTimeout(() => {
            const eventElement = document.getElementById(
              `event-location-${eventPhase}-${eventTitle
                .replace(/\s+/g, "-")
                .toLowerCase()}`
            );
            if (eventElement) {
              eventElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 500);
        }
      }
    }
  }, [searchParams]);



  // Speech synthesis functions
  const speakEventDetails = (event: TimelineEvent) => {
    if ("speechSynthesis" in window) {
      const text = `${event.title}. ${event.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const pauseSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.pause();
    }
  };

  const resumeSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.resume();
    }
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  };

  // Helper function to normalize text for filename matching
  const normalizeForFilename = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .trim();
  };

  // Function to get audio file path for an event
  const getAudioFilePath = (eventTitle: string): string | null => {
    // Available audio files in public/audio/timeline/
    const availableAudioFiles = [
      "Awal_Cahaya_dan_Takdir_yang_Menyapa.mp3",
      "Awal_Shalat_Jumat__Simbol_Kesatuan_dan_Kepemimpinan_128kbps.mp3",
      "Dada_yang_Terbelah,_Tanda_bagi_Jiwa_yang_Akan_Memikul_Amanah.mp3",
      "Kakek_yang_Pergi_dan_Allah_yang_Menjadi_Penjaga_Sejati.mp3",
      "Kasih_Halimah_dan_Didikan_Alam_Fitrah.mp3",
      "Kasih_Halimah_dan_Didikan_Alam_Fitrah_128kbps.mp3",
      "Kepulangan_dari_Habasyah__Saat_Dua_Hijrah_Bertemu_dalam_Satu_Misi_dakwah_128kbps.mp3",
      "Ketika_Gajah_Tersungkur_dan_Langit_Menyatakan_Siapa_yang_Dijaga.mp3",
      "Lahirnya_Sang_Pembawa_Cahaya.mp3",
      "Masjid_Quba__Awal_Peradaban_di_Atas_Taqwa_128kbps.mp3",
      "Padang_Bani_Sa'ad_Sekolah_Kesederhanaan_dan_Keikhlasan.mp3",
      "Padang_Bani_Sa'ad_Sekolah_Kesederhanaan_dan_Keikhlasan_128kbps.mp3",
      "Pembangunan_Masjid_Nabawi___Masjid_Nan_Kekal_Abadi_128kbps.mp3",
      "Pembangunan_rumah-rumah_Nabi__Kesederhanaan_yang_Menjadi_Keteladanan_128kbps.mp3",
      "Penyempurnaan_Shalat__Dari_Gerakan_Menuju_Kebutuhan_iman_128kbps.mp3",
      "Perang_Badr_Ula.wav",
      "Perang_Abwa__Ujian_Tanpa_Pertempuran_128kbps.mp3",
      "Perang_Badr_al-Ula__Ketika_Allah_Mengajari_Makna_Menang_dan_Menahan_Diri_128kbps.mp3",
      "Perang_Buwath_128kbps.mp3",
      "Perdagangan_Kedua_ke_Syam_Jejak_Amanah_dan_Kejujuran.mp3",
      "Perjalanan_Bersama_Abu_Thalib_Langkah_Awal_Menyusuri_Jalan_ke_Syam.mp3",
      "Pernikahan_Agung,_Pertemuan_Dua_Jiwa_yang_Dipilih_untuk_Sejarah.mp3",
      "Perpindahan_Kiblat___Ketika_Perubahan_justru_menyatukan_128kbps.mp3",
      "Pertemuan_di_Busra__Ketika_Rahib_Melihat_Apa_yang_Dunia_Belum_Pahami_128kbps.mp3",
      "Pulang_ke_Makkah,_Bersama_Angin_yang_Membawa_Rindu.mp3",
      "Pulang_ke_Makkah,_Bersama_Angin_yang_Membawa_Rindu_128kbps.mp3",
      "Renovasi_Ka'bah_Keadilan_di_Tengah_Perselisihan.mp3",
      "Syariat_Adzan_Seruan_yang_Membangkitkan_Kesadaran.mp3",
      "Syariat_Puasa_Ramadhan_128kbps.mp3",
      "Wafatnya_Ibu_Tercinta__Kehilangan_yang_Menguatkan_128kbps.mp3",
    ];

    // Specific mapping for better accuracy - Exact title matching
    const audioMapping: { [key: string]: string } = {
      // Exact title matches from timelineEvents.ts
      "Awal Cahaya dan Takdir yang Menyapa":
        "Awal_Cahaya_dan_Takdir_yang_Menyapa.mp3",
      "Kelahiran Nabi Muhammad ﷺ": "Lahirnya_Sang_Pembawa_Cahaya.mp3",
      "Ketika Gajah Tersungkur, dan Langit Menyatakan Siapa yang Dijaga":
        "Ketika_Gajah_Tersungkur_dan_Langit_Menyatakan_Siapa_yang_Dijaga.mp3",
      "Lahirnya Sang Pembawa Cahaya": "Lahirnya_Sang_Pembawa_Cahaya.mp3",
      "Kasih Halimah dan Didikan Alam Fitrah":
        "Kasih_Halimah_dan_Didikan_Alam_Fitrah.mp3",
      "Padang Bani Sa'ad, Sekolah Kesederhanaan dan Keikhlasan":
        "Padang_Bani_Sa'ad_Sekolah_Kesederhanaan_dan_Keikhlasan.mp3",
      "Pulang ke Makkah, Bersama Angin yang Membawa Rindu":
        "Pulang_ke_Makkah,_Bersama_Angin_yang_Membawa_Rindu.mp3",
      "Dada yang Terbelah, Tanda bagi Jiwa yang Akan Memikul Amanah":
        "Dada_yang_Terbelah,_Tanda_bagi_Jiwa_yang_Akan_Memikul_Amanah.mp3",
      "Wafatnya Ibu Tercinta: Kehilangan yang Menguatkan":
        "Wafatnya_Ibu_Tercinta__Kehilangan_yang_Menguatkan_128kbps.mp3",
      "Kakek yang Pergi, dan Allah yang Menjadi Penjaga Sejati":
        "Kakek_yang_Pergi_dan_Allah_yang_Menjadi_Penjaga_Sejati.mp3",
      "Perjalanan Bersama Abu Thalib, Langkah Awal Menyusuri Jalan ke Syam":
        "Perjalanan_Bersama_Abu_Thalib_Langkah_Awal_Menyusuri_Jalan_ke_Syam.mp3",
      "Pertemuan di Busra: Ketika Rahib Melihat Apa yang Dunia Belum Pahami":
        "Pertemuan_di_Busra__Ketika_Rahib_Melihat_Apa_yang_Dunia_Belum_Pahami_128kbps.mp3",
      "Perdagangan Kedua ke Syam, Jejak Amanah dan Kejujuran":
        "Perdagangan_Kedua_ke_Syam_Jejak_Amanah_dan_Kejujuran.mp3",
      "Pernikahan Agung, Pertemuan Dua Jiwa yang Dipilih untuk Sejarah":
        "Pernikahan_Agung,_Pertemuan_Dua_Jiwa_yang_Dipilih_untuk_Sejarah.mp3",
      "Renovasi Ka'bah, Keadilan di Tengah Perselisihan":
        "Renovasi_Ka'bah_Keadilan_di_Tengah_Perselisihan.mp3",
      "Penyempurnaan Shalat: Dari Gerakan Menuju Kebutuhan iman":
        "Penyempurnaan_Shalat__Dari_Gerakan_Menuju_Kebutuhan_iman_128kbps.mp3",
      "Masjid Quba: Awal Peradaban di Atas Taqwa":
        "Masjid_Quba__Awal_Peradaban_di_Atas_Taqwa_128kbps.mp3",
      "Awal Shalat Jumat: Simbol Kesatuan dan Kepemimpinan":
        "Awal_Shalat_Jumat__Simbol_Kesatuan_dan_Kepemimpinan_128kbps.mp3",
      "Pembangunan Masjid Nabawi : Masjid Nan Kekal Abadi":
        "Pembangunan_Masjid_Nabawi___Masjid_Nan_Kekal_Abadi_128kbps.mp3",
      "Pembangunan rumah-rumah Nabi: Kesederhanaan yang Menjadi Keteladanan":
        "Pembangunan_rumah-rumah_Nabi__Kesederhanaan_yang_Menjadi_Keteladanan_128kbps.mp3",
      "Kepulangan dari Habasyah: Saat Dua Hijrah Bertemu dalam Satu Misi dakwah":
        "Kepulangan_dari_Habasyah__Saat_Dua_Hijrah_Bertemu_dalam_Satu_Misi_dakwah_128kbps.mp3",
      "Syariat Adzan: Seruan yang membangkitkan kesadaran":
        "Syariat_Adzan_Seruan_yang_Membangkitkan_Kesadaran.mp3",
      "Perang Abwa: Ujian Tanpa Pertempuran":
        "Perang_Abwa__Ujian_Tanpa_Pertempuran_128kbps.mp3",
      "Perang Buwath": "Perang_Buwath_128kbps.mp3",
      "Perang Badr al-Ula: Ketika Allah Mengajari Makna Menang dan Menahan Diri":
        "Perang_Badr_al-Ula__Ketika_Allah_Mengajari_Makna_Menang_dan_Menahan_Diri_128kbps.mp3",
      "Perpindahan Kiblat : Ketika Perubahan justru menyatukan":
        "Perpindahan_Kiblat___Ketika_Perubahan_justru_menyatukan_128kbps.mp3",
      "Syariat Puasa Ramadhan": "Syariat_Puasa_Ramadhan_128kbps.mp3",
      // Additional mappings for files that have alternative versions
      "Kasih Halimah dan Didikan Alam Fitrah (128kbps)":
        "Kasih_Halimah_dan_Didikan_Alam_Fitrah_128kbps.mp3",
      "Padang Bani Sa'ad, Sekolah Kesederhanaan dan Keikhlasan (128kbps)":
        "Padang_Bani_Sa'ad_Sekolah_Kesederhanaan_dan_Keikhlasan_128kbps.mp3",
      "Pulang ke Makkah, Bersama Angin yang Membawa Rindu (128kbps)":
        "Pulang_ke_Makkah,_Bersama_Angin_yang_Membawa_Rindu_128kbps.mp3",
    };

    // Check direct mapping first
    if (audioMapping[eventTitle]) {
      return `/audio/timeline/${audioMapping[eventTitle]}`;
    }

    // Normalize the event title
    const normalizedTitle = normalizeForFilename(eventTitle);

    // Try to find exact match
    const exactMatch = availableAudioFiles.find((file) => {
      const fileNameWithoutExt = file.replace(/\.(mp3|wav)$/i, "");
      return normalizeForFilename(fileNameWithoutExt) === normalizedTitle;
    });

    if (exactMatch) {
      return `/audio/timeline/${exactMatch}`;
    }

    // Enhanced partial matching with better keyword detection
    const partialMatch = availableAudioFiles.find((file) => {
      const fileNameWithoutExt = file.replace(/\.(mp3|wav)$/i, "");
      const normalizedFileName = normalizeForFilename(fileNameWithoutExt);

      // Key terms for better matching
      const keyTerms = [
        {
          terms: ["gajah"],
          file: "Ketika_Gajah_Tersungkur_dan_Langit_Menyatakan_Siapa_yang_Dijaga.mp3",
        },
        {
          terms: ["lahir", "kelahiran"],
          file: "Lahirnya_Sang_Pembawa_Cahaya.mp3",
        },
        {
          terms: ["halimah", "penyusuan"],
          file: "Kasih_Halimah_dan_Didikan_Alam_Fitrah.mp3",
        },
        {
          terms: ["bani", "saad"],
          file: "Padang_Bani_Sa'ad_Sekolah_Kesederhanaan_dan_Keikhlasan.mp3",
        },
        {
          terms: ["dada", "pembelahan"],
          file: "Dada_yang_Terbelah,_Tanda_bagi_Jiwa_yang_Akan_Memikul_Amanah.mp3",
        },
        {
          terms: ["kakek", "wafat"],
          file: "Kakek_yang_Pergi_dan_Allah_yang_Menjadi_Penjaga_Sejati.mp3",
        },
        {
          terms: ["abu", "thalib", "perjalanan"],
          file: "Perjalanan Bersama Abu Thalib, Langkah Awal Menyusuri Jalan ke Syam.mp3",
        },
        {
          terms: ["perdagangan", "syam"],
          file: "Perdagangan_Kedua_ke_Syam_Jejak_Amanah_dan_Kejujuran.mp3",
        },
        {
          terms: ["pernikahan", "nikah"],
          file: "Pernikahan_Agung,_Pertemuan_Dua_Jiwa_yang_Dipilih_untuk_Sejarah.mp3",
        },
        {
          terms: ["pulang", "makkah"],
          file: "Pulang_ke_Makkah,_Bersama_Angin_yang_Membawa_Rindu.mp3",
        },
        {
          terms: ["renovasi", "kabah"],
          file: "Renovasi_Ka'bah_Keadilan_di_Tengah_Perselisihan.mp3",
        },
        {
          terms: ["adzan", "syariat"],
          file: "Syariat_Adzan_Seruan_yang_Membangkitkan_Kesadaran.mp3",
        },
        { terms: ["badr", "perang"], file: "Perang Badr Ula.wav" },
      ];

      // Check if any key terms match
      for (const keyTerm of keyTerms) {
        if (
          keyTerm.terms.some((term) => normalizedTitle.includes(term)) &&
          file === keyTerm.file
        ) {
          return true;
        }
      }

      // Fallback to original word matching
      const titleWords = normalizedTitle
        .split("_")
        .filter((word) => word.length > 3);
      return titleWords.some((word) => normalizedFileName.includes(word));
    });

    if (partialMatch) {
      return `/audio/timeline/${partialMatch}`;
    }

    return null; // No audio file found
  };

  // Check if audio file exists for an event
  const hasAudioFile = (eventTitle: string): boolean => {
    return getAudioFilePath(eventTitle) !== null;
  };

  // Audio playback functions
  const handleAudioToggle = async (
    event: TimelineEvent,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the audio file path for this specific event
    const audioFilePath = getAudioFilePath(event.title);

    if (!audioFilePath) {
      setAudioError("File audio tidak tersedia untuk peristiwa ini.");
      return;
    }

    // Check if this is the currently playing event
    const isCurrentlyPlaying =
      currentlyPlayingEventId === event.id && isPlaying;

    // Stop any currently playing audio first
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentlyPlayingEventId(null);
    }

    // If this was the currently playing event, just stop it
    if (isCurrentlyPlaying) {
      return;
    }

    // Create new audio instance with the specific audio file
    const audio = new Audio(audioFilePath);
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener("loadstart", () => {
      setIsLoading(true);
      setAudioError(null);
    });

    audio.addEventListener("canplay", () => {
      setIsLoading(false);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentlyPlayingEventId(null);
    });

    audio.addEventListener("error", (e) => {
      setIsLoading(false);
      setIsPlaying(false);
      setCurrentlyPlayingEventId(null);
      setAudioError("Gagal memuat audio. Silakan coba lagi.");
    });

    try {
      // Play the new audio
      setIsLoading(true);
      setAudioError(null);
      await audio.play();
      setIsPlaying(true);
      setCurrentlyPlayingEventId(event.id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsPlaying(false);
      setCurrentlyPlayingEventId(null);
      setAudioError("Gagal memutar audio. Silakan coba lagi.");
    }
  };

  // Share functionality
  const handleShare = async (
    event: TimelineEvent,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `https://kuttabkediri.online/adreess?event=${event.id}`;
    const shareData = {
      title: event.title,
      text: `Pelajari tentang "${event.title}" - Peristiwa penting dalam sejarah Islam`,
      url: shareUrl,
    };

    try {
      // Check if Web Share API is supported
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        toast({
          title: "Berhasil dibagikan!",
          description: "Konten telah berhasil dibagikan.",
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link disalin!",
          description: "Link telah disalin ke clipboard.",
        });
      }
    } catch (error) {
      // If clipboard also fails, show the URL
      toast({
        title: "Gagal membagikan",
        description: `Silakan salin link ini: ${shareUrl}`,
        variant: "destructive",
      });
    }
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setCurrentlyPlayingEventId(null);
      setIsLoading(false);
    };
  }, []);

  const getEventIcon = (iconName: string) => {
    const icons: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      Star,
      BookOpen,
      Users,
      Mountain,
      Shield,
      Sword,
      Crown,
      Building,
      Zap,
      Heart,
      Award,
      Flag,
      Home,
      Globe,
    };
    return icons[iconName] || Star;
  };

  const filteredEvents =
    yearEvents[selectedYear as keyof typeof yearEvents] || [];

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
    AOS.refresh();
  }, []);

  const scrollLocationCards = (
    direction: "left" | "right",
    withFlip: boolean = false
  ) => {
    if (locationMetrics.step === 0) return;
    if (withFlip && isLocationFlipping) return;

    const currentIndex = getLocationClampedIndex(locationScrollPosition);
    const targetIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(locationPhases.length - 1, currentIndex + 1);

    if (targetIndex === currentIndex) return;

    goToLocationIndex(targetIndex, { withFlip });
  };

  const toggleEventExpansion = (eventId: string) => {
    if (expandedEvents.has(eventId)) {
      // If the clicked event is already expanded, close it
      setExpandedEvents(new Set());
    } else {
      // If the clicked event is not expanded, close all others and expand only this one
      setExpandedEvents(new Set([eventId]));
    }
  };

  return (
    <div className="min-h-screen background-grid">
      <div className="max-w-6xl mx-auto px-4 py-6 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Filter Tabs */}
          <div
            className="mb-6"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-easing="ease-out-cubic"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm shadow-soft">
              <TabsTrigger
                value="tahun"
                className="data-[state=active]:bg-[#435e46] data-[state=active]:text-white"
              >
                Berdasarkan Tahun
              </TabsTrigger>
              <TabsTrigger
                value="lokasi"
                className="data-[state=active]:bg-[#435e46] data-[state=active]:text-white"
              >
                Berdasarkan Lokasi
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Year-based Timeline */}
          <TabsContent value="tahun" className="space-y-6">
            <section className="timeline-year-section theme-transition">
              <h2
                className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#1A1A1A] dark:text-[#ccc4b2]"
                data-aos="fade-up"
                data-aos-duration="1600"
                data-aos-easing="ease-out-cubic"
              >
                Lompat Ke Tahun Tertentu Dalam Sejarah Islam
              </h2>

              {/* Year Carousel with Pictures */}
              <div
                data-aos="fade-up"
                data-aos-duration="1600"
                data-aos-easing="ease-out-cubic"
                data-aos-delay="80"
              >
                <YearCarousel
                  hijriyahYears={hijriyahYears}
                  selectedYear={selectedYear}
                  onYearSelect={setSelectedYear}
                />
              </div>

              {/* Events List */}
              <Card
                className="timeline-year-card shadow-elegant theme-transition"
                style={{ backgroundColor: "#ccc4b2" }}
                data-aos="fade-up"
                data-aos-duration="1600"
                data-aos-easing="ease-out-cubic"
                data-aos-delay="160"
              >
                <CardContent className="timeline-year-card-content p-4 sm:p-5 md:p-6 theme-transition">
                  <h3 className="timeline-year-card-title text-lg sm:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-center theme-transition">
                    {hijriyahYears[selectedYear]?.year === 0 || selectedYear === 0 
                      ? "Peristiwa Pra Kenabian"
                      : `Peristiwa Tahun ${hijriyahYears[selectedYear]?.year || selectedYear} Hijriyah`}
                  </h3>

                  {/* Development Message for Years 3-11 H */}
                  {selectedYear >= 3 ? (
                    <div
                      className="timeline-year-development flex flex-col items-center justify-center py-8 sm:py-12 px-4 theme-transition"
                      data-aos="fade-up"
                      data-aos-duration="1600"
                      data-aos-easing="ease-out-cubic"
                      data-aos-delay="200"
                    >
                      <div className="text-center max-w-md">
                        <div className="mb-4">
                          <Building className="h-12 w-12 sm:h-16 sm:w-16 text-[#435e46] mx-auto mb-3" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                          Konten Dalam Pengembangan
                        </h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                          Konten masih dalam pengembangan team dan insyaAllah
                          akan segera tersedia
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#435e46]/10 text-[#435e46] rounded-full text-sm font-medium">
                          <Clock className="h-4 w-4" />
                          Segera Hadir
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      {filteredEvents.map((event, index) => {
                        const IconComponent = event.icon;
                        const eventId = event.id;
                        const isExpanded = expandedEvents.has(eventId);
                        const isLastEvent = index === filteredEvents.length - 1;
                        return (
                          <div
                            key={index}
                            id={`event-${event.id}`}
                            data-aos="fade-up"
                            data-aos-duration="1600"
                            data-aos-easing="ease-out-cubic"
                            data-aos-delay={220 + index * 80}
                          >
                            <div
                              className="timeline-event-panel timeline-event-panel-surface rounded-lg overflow-hidden border-3 border-white theme-transition"
                              onClick={() => toggleEventExpansion(eventId)}
                            >
                              {/* Event Header */}
                              <div className="timeline-event-header timeline-event-header-surface flex items-center gap-3 sm:gap-4 p-3 sm:p-4 theme-transition">
                                <div className="timeline-event-icon-wrapper p-1.5 sm:p-2 rounded-full bg-[#435e46] text-white theme-transition">
                                  <IconComponent className="timeline-event-icon h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <span className="timeline-event-title timeline-event-title-text flex-1 font-medium text-sm sm:text-base theme-transition">
                                  {event.title}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="timeline-event-chevron h-4 w-4 text-muted-foreground theme-transition" />
                                ) : (
                                  <ChevronDown className="timeline-event-chevron h-4 w-4 text-muted-foreground theme-transition" />
                                )}
                              </div>

                              {/* Expandable Content */}
                              {isExpanded && (
                                <div className="timeline-event-content timeline-event-body px-3 sm:px-4 pb-3 sm:pb-4 border-t border-border/30 theme-transition">
                                  <div className="pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                                    {/* Basic Info Grid */}
                                    <div className="timeline-event-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 theme-transition">
                                      <div className="timeline-event-info-row flex items-center gap-2 theme-transition">
                                        <MapPin className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                        <div>
                                          <span className="timeline-event-info-label text-xs text-muted-foreground theme-transition">
                                            Tempat
                                          </span>
                                          <p className="timeline-event-info-value text-sm font-medium theme-transition">
                                            {event.location}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="timeline-event-info-row flex items-center gap-2 theme-transition">
                                        <Calendar className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                        <div>
                                          <span className="timeline-event-info-label text-xs text-muted-foreground theme-transition">
                                            Bulan Hijriyah
                                          </span>
                                          <p className="timeline-event-info-value text-sm font-medium theme-transition">
                                            {event.month || "Tidak diketahui"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="timeline-event-info-row flex items-center gap-2 theme-transition">
                                        <Clock className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                        <div>
                                          <span className="timeline-event-info-label text-xs text-muted-foreground theme-transition">
                                            Durasi
                                          </span>
                                          <p className="timeline-event-info-value text-sm font-medium theme-transition">
                                            {event.duration ||
                                              "Tidak diketahui"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="timeline-event-info-row flex items-center gap-2 theme-transition">
                                        <Target className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                        <div>
                                          <span className="timeline-event-info-label text-xs text-muted-foreground theme-transition">
                                            Tahun Masehi
                                          </span>
                                          <p className="timeline-event-info-value text-sm font-medium theme-transition">
                                            {event.gregorianYear} M
                                          </p>
                                        </div>
                                      </div>
                                      <div className="timeline-event-info-row flex items-center gap-2 theme-transition">
                                        <PenTool className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                        <div>
                                          <span className="timeline-event-info-label text-xs text-muted-foreground theme-transition">
                                            Nama Penulis
                                          </span>
                                          <p className="timeline-event-info-value text-sm font-medium theme-transition">
                                            {event.author || "Tidak diketahui"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Pihak Terlibat */}
                                    {event.parties &&
                                      event.parties.length > 0 && (
                                        <div className="timeline-event-section mt-4 theme-transition">
                                          <div className="timeline-event-section-header flex items-center gap-2 mb-2 theme-transition">
                                            <Users className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                            <span className="timeline-event-section-title text-sm font-medium theme-transition">
                                              Pihak Terlibat
                                            </span>
                                          </div>
                                          <ul className="timeline-event-list list-disc list-inside pl-1 space-y-1 theme-transition">
                                            {event.parties.map((party, idx) => (
                                              <li key={idx} className="timeline-event-list-item text-sm theme-transition">
                                                {party}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                    {/* Lokasi di Peta */}
                                    {event.location && (
                                      <div className="timeline-event-section mt-4 theme-transition">
                                        <div className="timeline-event-section-header flex items-center gap-2 mb-3 theme-transition">
                                          <Globe className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                          <span className="timeline-event-section-title text-sm font-medium theme-transition">
                                            Lokasi di Peta
                                          </span>
                                        </div>
                                        <div className="timeline-event-map w-full rounded-lg overflow-hidden shadow-lg border-2 border-[#435e46]/30 bg-gradient-to-br from-white to-gray-50 theme-transition">
                                          <iframe
                                            src={getMapEmbedUrl(event.location)}
                                            width="100%"
                                            height="280"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-[280px] sm:h-[300px]"
                                            title={`Peta lokasi: ${event.location}`}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {/* Deskripsi Peristiwa */}
                                    {event.description && (
                                      <div className="timeline-event-section mt-4 theme-transition">
                                        <div className="timeline-event-section-header flex items-center gap-2 mb-2 theme-transition">
                                          <BookOpen className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                          <span className="timeline-event-section-title text-sm font-medium theme-transition">
                                            Deskripsi Peristiwa
                                          </span>
                                        </div>
                                        {renderParagraphs(
                                          event.description,
                                          "timeline-event-text text-sm sm:text-base text-slate-600 theme-transition"
                                        )}
                                      </div>
                                    )}

                                    {/* Fakta Menarik */}
                                    {event.facts && (
                                      <div className="timeline-event-section mt-4 theme-transition">
                                        <div className="timeline-event-section-header flex items-center gap-2 mb-2 theme-transition">
                                          <Star className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                          <span className="timeline-event-section-title text-sm font-medium theme-transition">
                                            Fakta Menarik
                                          </span>
                                        </div>
                                        <p className="timeline-event-text text-sm theme-transition">{event.facts}</p>
                                      </div>
                                    )}

                                    {/* Referensi */}
                                    {event.references &&
                                      event.references.length > 0 && (
                                        <div className="timeline-event-section mt-4 theme-transition">
                                          <div className="timeline-event-section-header flex items-center gap-2 mb-2 theme-transition">
                                            <BookOpen className="timeline-event-info-icon h-4 w-4 text-[#435e46]" />
                                            <span className="timeline-event-section-title text-sm font-medium theme-transition">
                                              Referensi
                                            </span>
                                          </div>
                                          <ul className="timeline-event-list list-disc list-inside pl-1 space-y-1 theme-transition">
                                            {event.references.map(
                                              (reference, idx) => (
                                                <li
                                                  key={idx}
                                                  className="timeline-event-list-item text-sm theme-transition"
                                                >
                                                  {reference}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                    {/* Action Buttons Container */}
                                    <div className="timeline-event-section mt-4 theme-transition">
                                      <div className="flex items-center gap-2 w-full">
                                        {/* Dengarkan Button */}
                                        <Button
                                          type="button"
                                          onClick={(e) =>
                                            handleAudioToggle(event, e)
                                          }
                                          disabled={
                                            isLoading ||
                                            !hasAudioFile(event.title)
                                          }
                                          className={`timeline-event-action-button bg-white text-sm py-2 px-2 rounded-lg border flex-1 min-w-0 max-w-[120px] transition-all duration-300 ${
                                            hasAudioFile(event.title)
                                              ? "text-[#435e46] border-[#435e46]/30 hover:text-white hover:bg-[#435e46]"
                                              : "text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                                          }`}
                                        >
                                          <div className="flex items-center justify-center gap-1 w-full overflow-hidden">
                                            {isLoading &&
                                            currentlyPlayingEventId ===
                                              event.id ? (
                                              <Loader2 className="h-3 w-3 animate-spin flex-shrink-0" />
                                            ) : isPlaying &&
                                              currentlyPlayingEventId ===
                                                event.id ? (
                                              <Square className="h-3 w-3 flex-shrink-0" />
                                            ) : (
                                              <Volume2 className="h-3 w-3 flex-shrink-0" />
                                            )}
                                            <span className="font-medium truncate text-xs leading-tight">
                                              {!hasAudioFile(event.title)
                                                ? "Audio N/A"
                                                : isLoading &&
                                                  currentlyPlayingEventId ===
                                                    event.id
                                                ? "Loading..."
                                                : isPlaying &&
                                                  currentlyPlayingEventId ===
                                                    event.id
                                                ? "Stop"
                                                : "Play"}
                                            </span>
                                          </div>
                                        </Button>

                                        {/* Share Button */}
                                        <Button
                                          type="button"
                                          onClick={(e) => handleShare(event, e)}
                                          className="timeline-event-action-button bg-white text-[#435e46] border-[#435e46]/30 text-sm py-2 px-2 rounded-lg border flex-1 min-w-0 max-w-[80px] hover:text-white hover:bg-[#435e46] transition-all duration-300"
                                        >
                                          <div className="flex items-center justify-center gap-1 w-full overflow-hidden">
                                            <Share2 className="h-3 w-3 flex-shrink-0" />
                                            <span className="font-medium text-xs leading-tight truncate">
                                              Share
                                            </span>
                                          </div>
                                        </Button>

                                        {/* Close Button */}
                                        <Button
                                          type="button"
                                          onClick={() =>
                                            setExpandedEvents(new Set())
                                          }
                                          className="bg-white text-[#435e46] border-[#435e46]/30 text-sm py-2 px-2 rounded-lg border flex-1 min-w-0 max-w-[80px] hover:text-white hover:bg-[#435e46] transition-all duration-300"
                                        >
                                          <div className="flex items-center justify-center gap-1 w-full overflow-hidden">
                                            <X className="h-3 w-3 flex-shrink-0" />
                                            <span className="font-medium text-xs leading-tight truncate">
                                              Close
                                            </span>
                                          </div>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Location-based Timeline */}
          <TabsContent value="lokasi" className="timeline-location-content space-y-6 theme-transition">
            <section className="timeline-location-section theme-transition">
              <h2
                className="timeline-location-heading text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-slate-800 theme-transition"
                data-aos="fade-up"
                data-aos-duration="1600"
                data-aos-easing="ease-out-cubic"
              >
                Jelajahi Fase Sejarah Berdasarkan Lokasi
              </h2>

              {/* Location Carousel */}
              <LocationCarousel 
                selectedLocation={selectedLocationPhase}
                onLocationSelect={setSelectedLocationPhase}
              />

              {/* Events for Selected Location */}
              {selectedLocationPhase === "expansion" ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                  <div className="text-center max-w-md">
                    <div className="mb-4">
                      <Building className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-3" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                      Konten Dalam Pengembangan
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                      Konten masih dalam pengembangan team dan insyaAllah akan
                      segera tersedia
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#435e46]/10 text-[#435e46] rounded-full text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      Segera Hadir
                    </div>
                  </div>
                </div>
              ) : (
                <div className="timeline-location-event-list space-y-6 theme-transition">
                  {getEventsByLocation(selectedLocationPhase).map(
                    (event, index) => {
                      const isLastEvent =
                        index ===
                        getEventsByLocation(selectedLocationPhase).length - 1;
                      return (
                        <div
                          key={event.id}
                          data-aos="fade-up"
                          data-aos-duration="1600"
                          data-aos-easing="ease-out-cubic"
                          data-aos-delay={210 + index * 90}
                        >
                          <Card className="timeline-location-event-card bg-[#dcd6c6] backdrop-blur-sm shadow-soft hover:shadow-elegant transition-shadow duration-300 border border-white rounded-lg theme-transition">
                            <CardContent className="timeline-location-event-content p-4 theme-transition">
                              <div className="timeline-location-event-header flex items-start gap-3 mb-3 theme-transition">
                                <event.icon className="timeline-location-event-icon h-5 w-5 text-[#435e46] mt-0.5 flex-shrink-0" />
                                <h3 className="timeline-location-event-title font-semibold text-base text-slate-800 leading-tight theme-transition">
                                  {event.title}
                                </h3>
                              </div>
                              {renderBriefDescription(
                                event.description,
                                "timeline-location-event-description text-sm text-slate-600 leading-relaxed theme-transition"
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Timeline;
