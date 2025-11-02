// Search utility functions for smart search and autocomplete

import React from 'react';
import { timelineEvents } from '@/data/timelineEvents';

export interface SearchableEvent {
  id: string;
  title: string;
  hijriyahYear: number;
  gregorianYear: number;
  month?: string;
  location: string;
  parties: string[];
  description: string;
  facts?: string;
  phase: 'makkah' | 'madinah' | 'expansion';
}

export interface SearchResult {
  event: SearchableEvent;
  score: number;
  matchedFields: string[];
  highlightedTitle: string;
  isSpellingSuggestion?: boolean;
  originalQuery?: string;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  const len1 = str1.length;
  const len2 = str2.length;

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[len2][len1];
}

// Calculate similarity score (0-1, where 1 is perfect match)
function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  return (maxLength - distance) / maxLength;
}

// Check if text contains query (case insensitive)
function containsQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

// Highlight matching text in a string
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-[#435e46] text-white px-1 rounded">$1</mark>');
}

// Find potential spelling corrections
function findSpellingSuggestions(events: SearchableEvent[], query: string): string[] {
  if (query.length < 3) return [];
  
  const suggestions: {word: string, similarity: number}[] = [];
  const allWords = new Set<string>();
  
  // Extract all words from event titles
  events.forEach(event => {
    const words = event.title.split(/\s+/);
    words.forEach(word => {
      if (word.length >= 3) {
        allWords.add(word.toLowerCase());
      }
    });
  });
  
  // Find similar words
  allWords.forEach(word => {
    const similarity = calculateSimilarity(word, query.toLowerCase());
    if (similarity > 0.7 && similarity < 1) {
      suggestions.push({ word, similarity });
    }
  });
  
  // Sort by similarity and return top suggestions
  return suggestions
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .map(s => s.word);
}

// Smart search function
export function smartSearch(
  events: SearchableEvent[],
  query: string,
  maxResults: number = 8
): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase().trim();
  
  // Add spelling suggestions if no exact matches
  const spellingSuggestions = findSpellingSuggestions(events, queryLower);
  
  // Process all events for regular search results
  events.forEach(event => {
    let score = 0;
    const matchedFields: string[] = [];

    // Exact title match (highest priority)
    if (event.title.toLowerCase() === queryLower) {
      score += 100;
      matchedFields.push('title-exact');
    }
    // Title contains query
    else if (containsQuery(event.title, query)) {
      score += 80;
      matchedFields.push('title');
    }
    // Fuzzy title match
    else {
      const titleSimilarity = calculateSimilarity(event.title, query);
      if (titleSimilarity > 0.6) {
        score += titleSimilarity * 60;
        matchedFields.push('title-fuzzy');
      }
    }

    // Location match
    if (containsQuery(event.location, query)) {
      score += 40;
      matchedFields.push('location');
    }

    // Description match
    if (containsQuery(event.description, query)) {
      score += 30;
      matchedFields.push('description');
    }

    // Facts match
    if (event.facts && containsQuery(event.facts, query)) {
      score += 25;
      matchedFields.push('facts');
    }

    // Parties match
    const partiesText = event.parties.join(' ');
    if (containsQuery(partiesText, query)) {
      score += 20;
      matchedFields.push('parties');
    }

    // Year match (both Hijriyah and Gregorian)
    const yearQuery = parseInt(query);
    if (!isNaN(yearQuery)) {
      if (event.hijriyahYear === yearQuery) {
        score += 50;
        matchedFields.push('hijriyah-year');
      }
      if (event.gregorianYear === yearQuery) {
        score += 45;
        matchedFields.push('gregorian-year');
      }
    }

    // Month match
    if (event.month && containsQuery(event.month, query)) {
      score += 35;
      matchedFields.push('month');
    }

    // Phase match
    if (containsQuery(event.phase, query)) {
      score += 15;
      matchedFields.push('phase');
    }

    // Only include results with meaningful matches
    if (score > 10 && matchedFields.length > 0) {
      results.push({
        event,
        score,
        matchedFields,
        highlightedTitle: highlightText(event.title, query)
      });
    }
  });

  // Sort by score (descending) and return top results
  results.sort((a, b) => b.score - a.score);
  
  // If we have few or no results, add spelling suggestions
  if (results.length < 3 && spellingSuggestions.length > 0) {
    // Find events that match our spelling suggestions
    for (const suggestion of spellingSuggestions) {
      // Skip if we already have this suggestion
      if (results.some(r => r.event.title.toLowerCase().includes(suggestion))) {
        continue;
      }
      
      // Find an event that matches this suggestion
      const matchingEvent = events.find(event => 
        event.title.toLowerCase().includes(suggestion)
      );
      
      if (matchingEvent) {
        results.push({
          event: matchingEvent,
          score: 50, // Lower score than exact matches but still relevant
          matchedFields: ['spelling-suggestion'],
          highlightedTitle: highlightText(matchingEvent.title, suggestion),
          isSpellingSuggestion: true,
          originalQuery: query
        });
      }
    }
    
    // Re-sort with our new suggestions
    results.sort((a, b) => b.score - a.score);
  }
  
  return results.slice(0, maxResults);
}

// Convert timeline events to searchable format
function convertToSearchableEvents(): SearchableEvent[] {
  return timelineEvents.map(event => ({
    id: event.id,
    title: event.title,
    hijriyahYear: event.hijriyahYear,
    gregorianYear: event.gregorianYear,
    location: event.location,
    parties: event.parties,
    description: event.description,
    facts: event.facts,
    phase: (event.phase === 'makkah' || event.phase === 'madinah' || event.phase === 'expansion') 
      ? event.phase 
      : 'makkah', // Default fallback for other phases like 'pra-kenabian'
    month: event.month,
    icon: event.icon || (() => null)
  }));
}

// Get searchable events
export function getSearchSuggestions(): SearchableEvent[] {
  return convertToSearchableEvents();
}

// Get search suggestions based on common terms
export function getSearchTerms(events: SearchableEvent[]): string[] {
  const suggestions = new Set<string>();
  
  events.forEach(event => {
    // Add event titles
    suggestions.add(event.title);
    
    // Add locations
    suggestions.add(event.location);
    
    // Add years
    suggestions.add(event.hijriyahYear.toString());
    suggestions.add(event.gregorianYear.toString());
    
    // Add months
    if (event.month) {
      suggestions.add(event.month);
    }
    
    // Add phases
    suggestions.add(event.phase);
    
    // Add key words from descriptions
    const words = event.description.split(' ')
      .filter(word => word.length > 3)
      .slice(0, 3); // Limit to first 3 meaningful words
    words.forEach(word => suggestions.add(word));
  });
  
  return Array.from(suggestions).sort();
}