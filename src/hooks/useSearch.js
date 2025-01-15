import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

export function useSearch(recipes = [], options = { debounceMs: 300, maxResults: 5 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Calculate relevance score for sorting
  const getRelevanceScore = (recipe, term) => {
    if (!recipe || !recipe.title) return 0;

    const searchTerm = term.toLowerCase();
    const title = recipe.title.toLowerCase();

    // Only return a score if the title contains the search term
    if (!title.includes(searchTerm)) return 0;

    // Highest priority: exact match in title
    if (title === searchTerm) return 100;

    // High priority: title starts with search term
    if (title.startsWith(searchTerm)) return 80;

    // Medium priority: search term appears in title
    return 60; // If it contains the term but doesn't start with it
  };

  const searchRecipes = useCallback((term) => {
    if (!term.trim()) return []; // Return empty if no term

    if (!Array.isArray(recipes)) {
      console.error('Expected recipes to be an array, got:', typeof recipes);
      return [];
    }

    console.log(`Searching ${recipes.length} recipes for term: "${term}"`);

    // Filter and sort results
    const results = recipes
      .map(recipe => ({
        ...recipe,
        relevance: getRelevanceScore(recipe, term)
      }))
      .filter(recipe => recipe.relevance > 0) // Only keep relevant results
      .sort((a, b) => b.relevance - a.relevance); // Sort by relevance score

    console.log(`Found ${results.length} matching recipes`);
    return results;
  }, [recipes]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setIsSearching(true);
      const results = searchRecipes(term);
      setFilteredRecipes(results);
      setDisplayedResults(results.slice(0, options.maxResults));
      setPage(1);
      setIsSearching(false);
    }, options.debounceMs),
    [searchRecipes]
  );

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredRecipes([]);
      setDisplayedResults([]);
      return;
    }
    debouncedSearch(term);
  }, [debouncedSearch]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const nextResults = filteredRecipes.slice(0, nextPage * options.maxResults);
    setDisplayedResults(nextResults);
    setPage(nextPage);
  }, [filteredRecipes, page, options.maxResults]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    searchTerm,
    filteredRecipes,
    displayedResults,
    isSearching,
    handleSearch,
    loadMore,
    hasMore: displayedResults.length < filteredRecipes.length
  };
} 