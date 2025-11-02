import React, { useEffect, useRef, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchResult } from '@/utils/searchUtils';
import { Clock, MapPin, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchDropdownProps {
  results: SearchResult[];
  isLoading: boolean;
  isOpen: boolean;
  selectedIndex: number;
  onSelectResult: (result: SearchResult) => void;
  onMouseEnter: (index: number) => void;
  query: string;
  direction?: 'up' | 'down';
  id?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = memo(({
  results,
  isLoading,
  isOpen,
  selectedIndex,
  onSelectResult,
  onMouseEnter,
  query,
  direction = 'down',
  id
}) => {
  if (!isOpen) return null;

  // Selalu mengarah ke bawah
  const positionClass = 'top-full mt-3';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ position: 'relative', zIndex: 9999 }}
      >
        <Card
          id={id}
          className={`absolute left-0 right-0 ${positionClass} z-[9999] shadow-2xl border-2 border-white/20 bg-gradient-to-b from-white/98 via-white/95 to-white/92 backdrop-blur-xl rounded-2xl overflow-hidden w-full`}
          role="listbox"
          aria-label="Saran Pencarian"
        >
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-3" />
                <span className="text-sm text-muted-foreground">Mencari...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="flex items-center justify-center p-6">
                <AlertCircle className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">
                  Tidak ada hasil untuk "{query}"
                </span>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <div
                    key={`${result.event.id}-${index}`}
                    className={cn(
                      "px-4 py-3 cursor-pointer transition-all duration-200 border-b border-gray-100/50 last:border-b-0",
                      selectedIndex === index
                        ? "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-l-4 border-l-primary"
                        : "hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-gray-50/40"
                    )}
                    onClick={() => onSelectResult(result)}
                    onMouseEnter={() => onMouseEnter(index)}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div 
                          className="text-sm font-medium text-gray-900 mb-1 leading-tight"
                          dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                        />
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{result.event.hijriyahYear} H / {result.event.gregorianYear} M</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{result.event.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {result.matchedFields.slice(0, 3).map((field, fieldIndex) => (
                            <Badge 
                              key={fieldIndex} 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20"
                            >
                              {field === 'title' ? 'Judul' :
                               field === 'location' ? 'Lokasi' :
                               field === 'description' ? 'Deskripsi' :
                               field === 'hijriyah-year' ? 'Tahun H' :
                               field === 'gregorian-year' ? 'Tahun M' :
                               field === 'phase' ? 'Fase' :
                               field === 'spelling-suggestion' ? 'Saran' :
                               field}
                            </Badge>
                          ))}
                          {result.isSpellingSuggestion && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 border-amber-200">
                              Saran ejaan
                            </Badge>
                          )}
                        </div>
                        {result.event.description && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                            {result.event.description.slice(0, 120)}
                            {result.event.description.length > 120 && '...'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;