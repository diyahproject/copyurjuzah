import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/dome-of-rock-hero.jpg";
import SearchDropdown from "@/components/SearchDropdown";
import { useSmartSearch } from "@/hooks/useSmartSearch";
import './golden-particles.css';

const HeroSection = () => {
  const {
    query,
    results,
    isLoading,
    isOpen,
    selectedIndex,
    handleInputChange,
    handleKeyDown,
    handleResultSelect,
    clearSearch,
    setActiveIndex
  } = useSmartSearch();

  // Generate 7 optimized golden particles with varied sizes
  const goldenParticles = Array.from({ length: 7 }).map((_, i) => {
    // Predefined size variations for better visual balance
    const sizeVariations = [3, 5, 4, 6, 3.5, 4.5, 5.5];
    const delayVariations = [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2];
    const durationVariations = [8, 9, 7, 10, 8.5, 9.5, 7.5];
    
    return {
      id: i,
      left: `${15 + Math.random() * 70}%`, // More centered distribution
      top: `${20 + Math.random() * 60}%`, // Avoid edges
      animationDelay: `${delayVariations[i]}s`,
      animationDuration: `${durationVariations[i]}s`,
      size: sizeVariations[i], // Varied sizes: 3-6px
      opacity: 0.7 + Math.random() * 0.3, // 0.7-1.0 for better visibility
    };
  });

  return <section className="relative h-[70vh] flex flex-col justify-end bg-background">
      {/* Hero Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#435e46]/20 via-transparent to-[#435e46]/40" />
        
        {/* Golden Particles Animation */}
        <div className="golden-particles-container">
          {goldenParticles.map(particle => (
            <div
              key={`particle-${particle.id}`}
              className="golden-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
              }}
            />
          ))}
          
          {/* Premium Golden Orbs */}
          <div className="golden-orb orb-1"></div>
          <div className="golden-orb orb-2"></div>
          <div className="golden-orb orb-3"></div>
          
          {/* Floating Golden Dust */}
          <div className="golden-dust-layer"></div>
        </div>
      </div>
      

      
      {/* Hero Content */}
      <div
        className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="1600"
        data-aos-easing="ease-out-cubic"
      >

        
        {/* Search Bar - Positioned at bottom of hero section */}
        <div className="search-bar-container w-full max-w-[1000px] mx-auto mb-8">
          {/* Search Container with enhanced backdrop */}
          <div className="search-bar-shell relative group p-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full backdrop-blur-sm hover:from-white/25 hover:via-white/15 hover:to-white/25 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 theme-transition">
            <div className="search-bar-inner relative bg-gradient-to-r from-white/5 to-white/10 rounded-full p-0.5 group-hover:from-white/10 group-hover:to-white/15 transition-all duration-500 theme-transition">
            {/* Search Icon with enhanced styling */}
            <Search className="search-bar-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-primary/70 h-6 w-6 z-10 transition-colors duration-300 group-focus-within:text-primary" />
            
            {/* Enhanced Input with premium styling */}
            <Input
              type="text"
              placeholder="Telusuri Peristiwa Sejarah Islam..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls="smart-search-dropdown"
              role="combobox"
              className="search-bar-input pl-14 pr-20 h-[50px] text-lg font-medium text-[#435e46] bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-lg border-2 border-white/30 rounded-full shadow-2xl hover:shadow-primary/50 focus:ring-4 focus:ring-primary/30 focus:border-primary/50 focus:bg-white focus:scale-[1.01] transition-all duration-500 ease-out placeholder:text-muted-foreground/70 placeholder:font-normal hover:border-primary/40 hover:bg-gradient-to-r hover:from-white/98 hover:via-white hover:to-white/98 theme-transition"
            />
            
            {/* Enhanced Button with gradient and animations */}
            <Button 
              onClick={() => query && results.length > 0 && handleResultSelect(results[0])}
              disabled={!query || results.length === 0}
              className="search-bar-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-[#2c3d2e] hover:from-[#2c3d2e] hover:to-primary text-white font-semibold px-6 py-2.5 rounded-full shadow-xl hover:shadow-primary/40 transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-50 disabled:bg-muted border-2 border-white/10 theme-transition"
            >
              Cari
            </Button>
            
            {/* Search Dropdown */}
            <div className="relative">
              <SearchDropdown
                isOpen={isOpen}
                results={results}
                isLoading={isLoading}
                selectedIndex={selectedIndex}
                onSelectResult={handleResultSelect}
                onMouseEnter={(index) => setActiveIndex(index)}
                query={query}
                id="smart-search-dropdown"
                direction="up"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Islamic Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/95 to-transparent" />
    </section>;
};
export default HeroSection;
