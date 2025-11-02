import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import birthLightImage from "@/assets/birth-light.jpg";
import baniSaadImage from "@/assets/bani-saad.jpg";
import motherFarewellImage from "@/assets/mother-farewell.jpg";

const favoriteStories = [
  {
    id: 1,
    title: "Kelahiran Sang Pembawa Cahaya",
    image: birthLightImage,
    description: "Kisah kelahiran Nabi Muhammad ﷺ yang membawa cahaya bagi seluruh alam",
    readTime: "571 M / 53 SH"
  },
  {
    id: 2,
    title: "Diasuh & Dibesarkan Di Bani Sa'ad",
    image: baniSaadImage,
    description: "Masa kecil Nabi Muhammad yang dihabiskan di padang pasir bersama suku Bani Sa'ad",
    readTime: "571-575 M / 53-57 SH"
  },
  {
    id: 3,
    title: "Wafatnya Ibunda Tercinta",
    image: motherFarewellImage,
    description: "Kisah mengharukan tentang kepergian Aminah, ibunda Rasulullah ﷺ",
    readTime: "577 M / 59 SH"
  }
];

const storyToEventMapping = {
  1: 'kelahiran-nabi',
  2: 'masa-penyusuan-bani-saad',
  3: 'wafat-ibunda-aminah'
};

function FavoriteStories() {
  const navigate = useNavigate();

  const handleReadMore = React.useCallback((storyId: number) => {
    const eventId = storyToEventMapping[storyId as keyof typeof storyToEventMapping];
    if (eventId) {
      navigate(`/timeline?eventId=${eventId}`);
    }
  }, [navigate]);

  return (
    <section className="favorite-stories-section w-full py-8 md:py-12 theme-transition background-grid">
      <div className="container px-4 mx-auto max-w-[1152px]">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-[#ccc4b2] theme-transition"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-easing="ease-out-cubic"
          >
            Kisah Favorit
          </h2>
        </div>
        
        <div className="grid gap-6">
          {favoriteStories.map((story, index) => (
            <Card 
              key={story.id}
              className="favorite-story-card group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 bg-card overflow-hidden theme-transition"
              onClick={() => handleReadMore(story.id)}
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay={200 + index * 150}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-80 h-48 md:h-full md:min-h-[200px] overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                    <div className="absolute top-4 left-4 bg-primary backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {story.readTime}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <h3 className="favorite-story-title text-lg font-semibold mb-2 theme-transition">{story.title}</h3>
                    <p className="favorite-story-description text-muted-foreground mb-4 theme-transition">{story.description}</p>
                    <div className="favorite-story-readmore inline-flex items-center text-primary theme-transition">
                      <span className="text-sm font-medium">Baca Selengkapnya</span>
                      <ArrowRight className="favorite-story-readmore-icon ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FavoriteStories;
