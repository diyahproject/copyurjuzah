import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Clock, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { timelineEvents } from "@/data/timelineEvents";
import YearCarousel from "@/components/YearCarousel";
import hijriyah0 from "@/assets/birth-light.jpg";
import hijriyah1 from "@/assets/hijriyah-1.jpg";
import hijriyah2 from "@/assets/hijriyah-2.jpg";
import hijriyah3 from "@/assets/hijriyah-3.jpg";
import hijriyah4 from "@/assets/hijriyah-4.jpg";
import hijriyah5 from "@/assets/hijriyah-5.jpg";
import hijriyah6 from "@/assets/hijriyah-6.jpg";
import hijriyah7 from "@/assets/hijriyah-7.jpg";
import hijriyah8 from "@/assets/hijriyah-8.jpg";
import hijriyah9 from "@/assets/islamic-expansion.jpg"; // Placeholder for year 9
import hijriyah10 from "@/assets/dome-of-rock-hero.jpg"; // Placeholder for year 10
import hijriyah11 from "@/assets/masjid-nabawi.jpg"; // Placeholder for year 11
// Generate hijriyahYears data based on actual timelineEvents
const hijriyahYears = [
  {
    year: 0,
    events: timelineEvents.filter((event) => event.hijriyahYear === 0).length,
    highlighted: false,
    image: hijriyah0,
  },
  {
    year: 1,
    events: timelineEvents.filter((event) => event.hijriyahYear === 1).length,
    highlighted: true,
    image: hijriyah1,
  },
  {
    year: 2,
    events: timelineEvents.filter((event) => event.hijriyahYear === 2).length,
    highlighted: false,
    image: hijriyah2,
  },
  {
    year: 3,
    events: timelineEvents.filter((event) => event.hijriyahYear === 3).length,
    highlighted: false,
    image: hijriyah3,
  },
  {
    year: 4,
    events: timelineEvents.filter((event) => event.hijriyahYear === 4).length,
    highlighted: false,
    image: hijriyah4,
  },
  {
    year: 5,
    events: timelineEvents.filter((event) => event.hijriyahYear === 5).length,
    highlighted: false,
    image: hijriyah5,
  },
  {
    year: 6,
    events: timelineEvents.filter((event) => event.hijriyahYear === 6).length,
    highlighted: false,
    image: hijriyah6,
  },
  {
    year: 7,
    events: timelineEvents.filter((event) => event.hijriyahYear === 7).length,
    highlighted: false,
    image: hijriyah7,
  },
  {
    year: 8,
    events: timelineEvents.filter((event) => event.hijriyahYear === 8).length,
    highlighted: false,
    image: hijriyah8,
  },
  {
    year: 9,
    events: timelineEvents.filter((event) => event.hijriyahYear === 9).length,
    highlighted: false,
    image: hijriyah9,
  },
  {
    year: 10,
    events: timelineEvents.filter((event) => event.hijriyahYear === 10).length,
    highlighted: false,
    image: hijriyah10,
  },
  {
    year: 11,
    events: timelineEvents.filter((event) => event.hijriyahYear === 11).length,
    highlighted: false,
    image: hijriyah11,
  },
];

const summarizeEvent = (description: string) => {
  if (!description) return "";
  const cleanText = description.replace(/\s+/g, " ").trim();
  if (cleanText.length <= 120) return cleanText;
  const truncated = cleanText.slice(0, 115);
  return `${truncated.replace(/\s+[^\\s]*$/, "")}â€¦`;
};
// Generate yearEvents from timelineEvents - single source of truth
const getYearEvents = (year: number) => {
  const filteredEvents = timelineEvents.filter(
    (event) => event.hijriyahYear === year
  );

  const mappedEvents = filteredEvents.map((event) => ({
    title: event.title,
    icon: event.icon,
    type: event.phase || "general",
    id: event.id,
  }));

  return mappedEvents;
};

const getYearTitle = (year: number) => {
  if (year === 0) return "Pra Kenabian";
  if (year === 1) return "Hijrah dan Pembentukan Negara Islam";
  if (year === 2) return "Konsolidasi Madinah";
  if (year >= 3 && year <= 11) return `Tahun ${year} Hijriyah`;
  if (year === 12) return "Haji Wada dan Wafat Rasulullah";
  if (year >= 13 && year <= 20) return `Masa Khulafaur Rasyidin - Tahun ${year}`;
  return `Tahun ${year} Hijriyah`;
};
const HijriyahSection = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(0);
  const { scheme } = useTheme();

  const handleEventClick = (
    event: { title: string; id: string },
    year: number
  ) => {
    // Navigate using eventId for better matching with Timeline.tsx
    navigate(
      `/timeline?tab=year&year=${year}&eventId=${
        event.id
      }&title=${encodeURIComponent(event.title)}`
    );
  };

  const handleNavigateToTimeline = (eventTitle?: string) => {
    if (eventTitle) {
      navigate(
        `/timeline?event=${encodeURIComponent(eventTitle)}&year=${selectedYear}`
      );
    } else {
      navigate("/timeline");
    }
  };

  const currentEvents = getYearEvents(selectedYear);
  return (
    <section className="hijriyah-section py-12 px-4 theme-transition">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className="hijriyah-heading text-3xl font-bold text-center mb-8 text-[#1A1A1A] dark:text-[#ccc4b2]"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-easing="ease-out-cubic"
          >
            Lompat Ke Tahun Tertentu Dalam Sejarah Islam
          </h2>
        </div>

        {/* Hijriyah Years Carousel */}
        <div
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="150"
        >
          <YearCarousel
            hijriyahYears={hijriyahYears}
            selectedYear={selectedYear}
            onYearSelect={setSelectedYear}
          />
        </div>

        {/* Events List */}
        <Card
          className="hijriyah-card shadow-elegant theme-transition p-6 transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: scheme === "light" ? "#435e46" : "#000000",
            borderColor: scheme === "light" ? "#435e46" : "#333333",
          }}
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="300"
        >
          <CardContent className="hijriyah-card-content p-4 sm:p-5 md:p-6 theme-transition">
            <h3
              className="hijriyah-card-title text-lg sm:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-center theme-transition"
              style={{
                color: scheme === "light" ? "#ffffff" : "#ffffff",
              }}
            >
              {getYearTitle(selectedYear)}
            </h3>

            {/* Show development message for years 3-11 (years without events) */}
            {selectedYear >= 3 && selectedYear <= 11 ? (
              <div className="hijriyah-empty-state flex flex-col items-center justify-center py-8 sm:py-12 px-4 theme-transition">
                <div className="text-center max-w-md">
                  <div className="mb-4">
                    <Building
                      className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3"
                      style={{
                        color: scheme === "light" ? "#ffffff" : "#cccccc",
                      }}
                    />
                  </div>
                  <h4
                    className="hijriyah-empty-title text-lg sm:text-xl font-semibold mb-3 theme-transition"
                    style={{
                      color: scheme === "light" ? "#ffffff" : "#ffffff",
                    }}
                  >
                    Konten Dalam Pengembangan
                  </h4>
                  <p
                    className="hijriyah-empty-text text-sm sm:text-base leading-relaxed mb-4 theme-transition"
                    style={{
                      color: scheme === "light" ? "#e5e5e5" : "#cccccc",
                    }}
                  >
                    Konten masih dalam pengembangan team dan insyaAllah akan
                    segera tersedia
                  </p>
                  <div
                    className="hijriyah-empty-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium theme-transition"
                    style={{
                      backgroundColor:
                        scheme === "light"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.1)",
                      color: scheme === "light" ? "#ffffff" : "#ffffff",
                      border: `1px solid ${
                        scheme === "light"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.2)"
                      }`,
                    }}
                  >
                    <Clock className="h-4 w-4" />
                    Segera Hadir
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="hijriyah-events-list space-y-3 sm:space-y-4 md:space-y-5 p-[10px] rounded-[15px]">
                  {currentEvents.slice(0, 3).map((event, index) => {
                    const IconComponent = event.icon;
                    const displayIndex = `${index + 1}`.padStart(2, "0");
                    const summary = summarizeEvent(event.description);

                    return (
                      <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-duration="1600"
                        data-aos-easing="ease-out-cubic"
                        data-aos-delay={400 + index * 120}
                      >
                        <button
                          onClick={() => handleEventClick(event, selectedYear)}
                          className="hijriyah-event-card group w-full text-left transition-all duration-200 hover:bg-opacity-80 active:bg-opacity-70"
                          style={{
                            backgroundColor:
                              scheme === "light"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            padding: "4px 12px", // Reduced padding for smaller button height
                            border: `1px solid ${
                              scheme === "light"
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(255, 255, 255, 0.1)"
                            }`,
                          }}
                        >
                          <div className="hijriyah-event-card-inner">
                            <div className="hijriyah-event-icon-holder">
                              <IconComponent
                                className="hijriyah-event-icon"
                                style={{
                                  color:
                                    scheme === "light" ? "#ffffff" : "#cccccc",
                                }}
                              />
                            </div>
                            <div className="hijriyah-event-textual flex-1">
                              <h4
                                className="hijriyah-event-title"
                                style={{
                                  color:
                                    scheme === "light" ? "#ffffff" : "#ffffff",
                                }}
                              >
                                {event.title}
                              </h4>
                              {summary && (
                                <p
                                  className="hijriyah-event-summary"
                                  style={{
                                    color:
                                      scheme === "light"
                                        ? "#e5e5e5"
                                        : "#cccccc",
                                  }}
                                >
                                  {summary}
                                </p>
                              )}
                            </div>
                            <div
                              className="hijriyah-event-nav"
                              aria-hidden="true"
                            >
                              <ChevronRight
                                className="h-4 w-4"
                                style={{
                                  color:
                                    scheme === "light" ? "#ffffff" : "#cccccc",
                                }}
                              />
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}

                  {currentEvents.length > 3}
                </div>

                <div className="mt-6 sm:mt-7 md:mt-8 text-center">
                  <Button
                    onClick={(e) => handleNavigateToTimeline()}
                    variant="outline"
                    className="timeline-see-more-button hijriyah-see-more gap-2 theme-transition transition-all duration-200 hover:bg-opacity-80"
                    style={{
                      backgroundColor:
                        scheme === "light"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.1)",
                      border: "none",
                      color: scheme === "light" ? "#ffffff" : "#ffffff",
                      padding: "4px 12px",
                    }}
                    data-aos="fade-up"
                    data-aos-duration="1600"
                    data-aos-easing="ease-out-cubic"
                    data-aos-delay="520"
                  >
                    Lihat Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default HijriyahSection;
