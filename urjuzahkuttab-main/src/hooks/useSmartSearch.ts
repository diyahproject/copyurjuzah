import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce, smartSearch, SearchableEvent, SearchResult, getSearchSuggestions } from '@/utils/searchUtils';

export interface UseSmartSearchReturn {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  isOpen: boolean;
  selectedIndex: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleResultSelect: (result: SearchResult) => void;
  clearSearch: () => void;
  // New: allow external components to set the active (highlighted) index
  setActiveIndex: (index: number) => void;
}

export function useSmartSearch({
  debounceMs = 300,
  maxResults = 8
}: {
  debounceMs?: number;
  maxResults?: number;
} = {}): UseSmartSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  // Get events from search utils
  const events = useMemo(() => getSearchSuggestions(), []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((searchQuery: string) => {
      setIsLoading(true);
      
      if (searchQuery.trim()) {
        const searchResults = smartSearch(events, searchQuery, maxResults);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } else {
        setResults([]);
        setIsOpen(false);
      }
      
      setIsLoading(false);
      setSelectedIndex(-1);
    }, debounceMs),
    [events, maxResults, debounceMs]
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Handle input change with useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  // Handle result selection with useCallback
  const handleResultSelect = useCallback((result: SearchResult) => {
    const event = result.event;
    
    // Navigate to Timeline with parameters
    const params = new URLSearchParams({
      tab: 'year',
      year: event.hijriyahYear.toString(),
      eventId: event.id,
      title: event.title
    });
    
    navigate(`/timeline?${params.toString()}`);
    
    // Close dropdown and clear selection
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery('');
  }, [navigate]);

  // Handle keyboard navigation with useCallback
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      // Support Tab-to-autocomplete even when dropdown is closed but results exist
      if (e.key === 'Tab' && results.length > 0) {
        e.preventDefault();
        const indexToUse = selectedIndex >= 0 ? selectedIndex : 0;
        const title = results[indexToUse].event.title;
        setQuery(title);
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        e.preventDefault();
        // Autocomplete with the selected result's title
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const title = results[selectedIndex].event.title;
          setQuery(title);
        }
        break;
    }
  }, [isOpen, results, selectedIndex, handleResultSelect]);

  // Clear search with useCallback
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  // Set active index with useCallback
  const setActiveIndex = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return {
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
  };
}