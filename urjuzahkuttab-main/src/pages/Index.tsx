import { useEffect } from "react";
import AOS from "aos";
import HeroSection from "@/components/HeroSection";
import HijriyahSection from "@/components/HijriyahSection";
import HistoricalPhases from "@/components/HistoricalPhases";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import FavoriteStories from "@/components/FavoriteStories";
import BottomNavigation from "@/components/BottomNavigation";
import WelcomePopup from "@/components/WelcomePopup";
import { useWelcomePopup } from "@/hooks/useWelcomePopup";

const Index = () => {
  const { isOpen, closePopup, resetPopup } = useWelcomePopup();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Development Test Button - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetPopup}
          className="fixed top-4 right-4 z-50 px-3 py-1 bg-red-500 text-white text-xs rounded"
        >
          Test Popup
        </button>
      )}
      
      {/* Welcome Popup */}
      <WelcomePopup isOpen={isOpen} onClose={closePopup} />
      
      {/* Main Content */}
      <main className="flex flex-col">
        <div
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <HeroSection />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <HijriyahSection />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <HistoricalPhases />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="450"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <InteractiveQuiz />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <FavoriteStories />
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Bottom Padding for Fixed Navigation */}
      <div className="h-20" />
    </div>
  );
};

export default Index;
