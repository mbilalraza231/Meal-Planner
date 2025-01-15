import { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

export function useSearch(options = { debounceMs: 500, limit: 10, minChars: 2 }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [displayedResults, setDisplayedResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const abortControllerRef = useRef(null);
    const lastSearchTermRef = useRef('');
    const activeRequestRef = useRef(false);

    const fetchSearchResults = useCallback(async (term, pageNum = 1) => {
        // Don't search if term is too short
        if (!term || term.trim().length < options.minChars) {
            setFilteredRecipes([]);
            setDisplayedResults([]);
            setHasMore(false);
            setTotalResults(0);
            return;
        }

        // Set searching state immediately
        setIsSearching(true);
        setError(null);

        // Abort previous request if exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            activeRequestRef.current = false;
        }

        // Create new AbortController
        abortControllerRef.current = new AbortController();
        activeRequestRef.current = true;

        try {
            const response = await fetch(
                `/api/recipes?search=${encodeURIComponent(term)}&page=${pageNum}&limit=${options.limit}`,
                { signal: abortControllerRef.current.signal }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }

            const data = await response.json();
            
            // Only update state if this is still the active request
            if (!activeRequestRef.current) return;

            // Ensure data is an array
            const results = Array.isArray(data) ? data : (data.results || []);
            const total = Array.isArray(data) ? results.length : (data.total || results.length);
            
            if (pageNum === 1) {
                setFilteredRecipes(results);
                setDisplayedResults(results);
            } else {
                setDisplayedResults(prev => [...prev, ...results]);
            }
            
            setTotalResults(total);
            setHasMore(results.length === options.limit);
            setError(null);
            lastSearchTermRef.current = term;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error('Error fetching search results:', error);
                setError(error.message);
                setDisplayedResults([]);
                setFilteredRecipes([]);
                setHasMore(false);
                setTotalResults(0);
            }
        } finally {
            if (activeRequestRef.current) {
                setIsSearching(false);
                activeRequestRef.current = false;
            }
        }
    }, [options.limit, options.minChars]);

    const debouncedFetch = useCallback(
        debounce((term) => {
            if (term.trim().length >= options.minChars) {
                fetchSearchResults(term, 1);
            }
        }, options.debounceMs, { leading: false, trailing: true }),
        [fetchSearchResults, options.minChars, options.debounceMs]
    );

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        
        // Clear results immediately if term is too short
        if (!term || term.trim().length < options.minChars) {
            setFilteredRecipes([]);
            setDisplayedResults([]);
            setHasMore(false);
            setTotalResults(0);
            setIsSearching(false);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                activeRequestRef.current = false;
            }
            debouncedFetch.cancel();
        } else {
            debouncedFetch(term);
        }
    }, [debouncedFetch, options.minChars]);

    // Handle load more
    const loadMore = useCallback(() => {
        if (!isSearching && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchSearchResults(searchTerm, nextPage);
        }
    }, [isSearching, hasMore, page, searchTerm, fetchSearchResults]);

    // Reset search
    const resetSearch = useCallback(() => {
        setSearchTerm('');
        setFilteredRecipes([]);
        setDisplayedResults([]);
        setHasMore(false);
        setTotalResults(0);
        setPage(1);
        setError(null);
        setIsSearching(false);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            activeRequestRef.current = false;
        }
        debouncedFetch.cancel();
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedFetch.cancel();
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                activeRequestRef.current = false;
            }
        };
    }, [debouncedFetch]);

    return {
        searchTerm,
        filteredRecipes,
        displayedResults,
        isSearching,
        error,
        handleSearch,
        hasMore,
        loadMore,
        resetSearch,
        totalResults,
    };
}
