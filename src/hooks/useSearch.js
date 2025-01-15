import { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

export function useSearch(options = { debounceMs: 300 }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [displayedResults, setDisplayedResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const abortControllerRef = useRef(null);
    
    // Fetch function
    const fetchSearchResults = async (term) => {
        if (!term.trim()) {
            setFilteredRecipes([]);
            setDisplayedResults([]);
            return;
        }

        setIsSearching(true);

        // Abort previous request
        if (abortControllerRef.current) {
            console.log('Aborting previous request');
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        try {
            const response = await fetch(`/api/recipes?search=${encodeURIComponent(term)}`, { signal });
            const results = await response.json();
            setFilteredRecipes(results);
            setDisplayedResults(results);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Error fetching search results:', error);
            }
        } finally {
            setIsSearching(false);
        }
    };

    // Debounced function
    const debouncedFetch = useRef(
        debounce((term) => {
            console.log('Debounced search executing for:', term);
            fetchSearchResults(term);
        }, options.debounceMs)
    ).current;

    // Handle search updates
    const handleSearch = useCallback((term) => {
        console.log('Search term received:', term);
        setSearchTerm(term);
        debouncedFetch(term);
    }, [debouncedFetch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedFetch.cancel();
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [debouncedFetch]);

    return {
        searchTerm,
        filteredRecipes,
        displayedResults,
        isSearching,
        handleSearch,
    };
}