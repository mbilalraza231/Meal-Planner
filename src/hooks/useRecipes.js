import { useState, useEffect } from "react";

export function useRecipeData(page = 1, limit = 10) {
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes?page=${page}&limit=${limit}`);
        const allRecipes = await response.json();

        if (!Array.isArray(allRecipes)) {
          console.error('Expected array of recipes, got:', allRecipes);
          return;
        }

        const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
        const sorted = [...allRecipes].sort((a, b) => b.rating - a.rating);

        setFeaturedRecipes(shuffled.slice(0, 3));
        setPopularRecipes(sorted);
        setRecipes(allRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page, limit]);

  return { recipes, featuredRecipes, popularRecipes, loading, error };
} 