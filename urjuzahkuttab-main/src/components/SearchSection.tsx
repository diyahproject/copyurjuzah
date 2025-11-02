import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchSection = () => {
  return (
    <section className="py-8 px-4 background-grid">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Telusuri Peristiwa..."
            className="pl-12 pr-20 h-14 text-lg text-[#435e46] border-border/50 bg-card shadow-soft rounded-xl"
          />
          <Button 
            variant="islamic" 
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg bg-[#435e46] hover:bg-[#435e46]/90 text-white"
          >
            Cari
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;