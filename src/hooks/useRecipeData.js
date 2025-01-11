import { useState, useEffect } from "react";

export function useRecipeData() {
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
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
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, featuredRecipes, popularRecipes, loading };
} 