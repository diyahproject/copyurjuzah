import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import kaabaImage from "@/assets/kaaba-mecca.jpg";
import masjidNabawiImage from "@/assets/masjid-nabawi.jpg";
import islamicExpansionImage from "@/assets/islamic-expansion.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const phases = [
  {
    id: 1,
    year: "570 M",
    title: "Fase Mekkah",
    subtitle: "Kelahiran dan Dakwah Awal",
    image: kaabaImage,
    description: "Perjalanan dakwah dimulai dari Mekkah",
  },
  {
    id: 2,
    year: "622 M",
    title: "Fase Madinah",
    subtitle: "Hijrah dan Pembentukan Negara",
    image: masjidNabawiImage,
    description: "Pembangunan masyarakat Islam di Madinah",
  },
  {
    id: 3,
    year: "632 M",
    title: "Fase Lainnya",
    subtitle: "Peristiwa di Luar Makkah & Madinah",
    image: islamicExpansionImage,
    description: "Semua peristiwa yang terjadi di luar Makkah dan Madinah",
  },
];

type ArrowProps = {
  className?: string;
  onClick?: () => void;
};

const PrevArrow = ({ className, onClick }: ArrowProps) => (
  <button
    type="button"
    aria-label="Sebelumnya"
    onClick={onClick}
    className={`${className ?? ""} slick-arrow absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center hover:bg-white focus:outline-none`}
  >
    <ChevronLeft className="h-5 w-5" />
  </button>
);

const NextArrow = ({ className, onClick }: ArrowProps) => (
  <button
    type="button"
    aria-label="Berikutnya"
    onClick={onClick}
    className={`${className ?? ""} slick-arrow absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center hover:bg-white focus:outline-none`}
  >
    <ChevronRight className="h-5 w-5" />
  </button>
);

const HistoricalPhases = () => {
  const navigate = useNavigate();

  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "15px",
          infinite: true,
        },
      },
    ],
  };

  return (
    <section className="historical-phases-section py-8 sm:py-12 px-2 sm:px-4 background-grid theme-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-[#ccc4b2] mb-4">
            Jelajahi Sejarah Berdasarkan Fase Penting Perjalanan Dakwah
          </h2>
        </div>

        <div className="relative overflow-hidden historical-phases-carousel">
          <Slider {...sliderSettings}>
            {phases.map((phase) => (
              <div key={phase.id} className="px-1 sm:px-2">
                <Card className="bg-card w-full mx-auto max-w-sm sm:max-w-none">
                  <CardContent className="p-0">
                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                      <img
                        src={phase.image}
                        alt={phase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#1F2E24] dark:text-[#e9e2d0]">
                          {phase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {phase.description}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full text-sm sm:text-base"
                        onClick={() => {
                          const phaseMap = {
                            1: "makkah",
                            2: "madinah",
                            3: "expansion",
                          };
                          const selectedPhase =
                            phaseMap[phase.id as keyof typeof phaseMap];
                          navigate(
                            `/timeline?tab=lokasi&phase=${selectedPhase}`
                          );
                        }}
                      >
                        Telusuri Fase
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HistoricalPhases;
