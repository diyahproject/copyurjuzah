import React, { useState, useEffect } from "react";
import { X, Building2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Anda akan menelusuri kisah manusia terbaik sepanjang masa";

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Stagger the content animation
      setTimeout(() => setShowContent(true), 200);
    } else {
      setShowContent(false);
      setTypedText("");
    }
  }, [isOpen]);

  // Typing animation effect
  useEffect(() => {
    if (showContent) {
      setTypedText("");
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust speed here (lower = faster)

      return () => clearInterval(typingInterval);
    }
  }, [showContent, fullText]);

  const handleClose = () => {
    setShowContent(false);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 400); // Wait for animation to complete
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`welcome-popup-container fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-[95%] max-w-[340px] xs:max-w-[380px] sm:max-w-lg mx-auto bg-gradient-to-br from-card via-card to-card/95 rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-500 ease-out transform ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0 rotate-0"
            : "scale-90 opacity-0 translate-y-8 rotate-1"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          border: "1px solid rgba(67, 94, 70, 0.3)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(67, 94, 70, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Animated Background Gradient */}
        <div
          className="absolute inset-0 rounded-3xl animate-pulse"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(67, 94, 70, 0.05), transparent, rgba(67, 94, 70, 0.05))",
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"
            style={{
              animation: "shimmer 3s ease-in-out infinite",
              transform: "translateX(-100%)",
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-all duration-300 group z-10 ${
            showContent ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: "600ms" }}
          aria-label="Tutup popup"
        >
          <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors group-hover:rotate-90" />
        </button>

        {/* Content */}
        <div className="relative p-4 sm:p-6 text-center">
          {/* Islamic Icon with Bounce Animation */}
          <div
            className={`flex justify-center mb-4 transition-all duration-700 ease-out ${
              showContent
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Welcome Text with Slide Animation */}
          <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            <h2
              className={`text-xl sm:text-2xl font-bold text-primary leading-tight transition-all duration-700 ease-out ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Assalamualaikum
            </h2>

            {/* Typing Effect for Main Text */}
            <div
              className={`text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <p className="text-center px-2 sm:px-4 leading-relaxed min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                <span className="inline-block">
                  {typedText}
                  {typedText.length < fullText.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Bismillah Button with Pulse and Glow */}
          <div
            className={`transition-all duration-700 ease-out ${
              showContent
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-4"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <Button
              onClick={handleClose}
              className="relative w-full py-3 sm:py-4 px-3 sm:px-6 font-bold text-white border-0 rounded-2xl shadow-lg transition-colors duration-200 min-h-[50px] sm:min-h-[60px]"
              style={{
                fontFamily: "serif",
                direction: "rtl",
                background:
                  "linear-gradient(to right, #435e46, #435e46, #435e46)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, rgba(67, 94, 70, 0.9), rgba(67, 94, 70, 0.9), rgba(67, 94, 70, 0.9))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #435e46, #435e46, #435e46)";
              }}
            >
              {/* Arabic Text - Optimized for Mobile */}
              <span
                className="block text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose tracking-wide text-center px-1 sm:px-2 break-words hyphens-auto"
                style={{
                  lineHeight: "1.4",
                  wordSpacing: "0.1em",
                  letterSpacing: "0.02em",
                }}
              >
                اَللَّهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى آلِ
                سَيِّدِنَا مُحَمَّدٍ
              </span>
            </Button>
          </div>
        </div>

        {/* Decorative Border with Glow */}
        <div
          className="absolute inset-0 rounded-3xl border-2 pointer-events-none animate-border-glow"
          style={{
            borderImage:
              "linear-gradient(to right, rgba(67, 94, 70, 0.3), rgba(67, 94, 70, 0.3), rgba(67, 94, 70, 0.3)) 1",
          }}
        />
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Force light mode for popup */
        .welcome-popup-container {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --card: 0 0% 100%;
          --card-foreground: 222.2 84% 4.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 222.2 84% 4.9%;
          --primary: 222.2 47.4% 11.2%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96%;
          --secondary-foreground: 222.2 84% 4.9%;
          --muted: 210 40% 96%;
          --muted-foreground: 215.4 16.3% 46.9%;
          --accent: 210 40% 96%;
          --accent-foreground: 222.2 84% 4.9%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 210 40% 98%;
          --border: 214.3 31.8% 91.4%;
          --input: 214.3 31.8% 91.4%;
          --ring: 222.2 84% 4.9%;
          --islamic-teal: 67 94 70;
          --islamic-emerald: 67 94 70;
          --islamic-gold: 45 93% 47%;
          --islamic-cream: 48 100% 96%;
        }

        /* Extra small breakpoint for very small devices */
        @media (min-width: 475px) {
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:max-w-\\[380px\\] { max-width: 380px; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(67, 94, 70, 0.3); }
          50% { box-shadow: 0 0 30px rgba(67, 94, 70, 0.5); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-shimmer-fast {
          animation: shimmer-fast 1s ease-in-out;
        }
        
        .animate-typing {
          animation: typing 3s steps(40, end) 1s both;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
