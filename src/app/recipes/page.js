"use client";

import { useRecipeData } from '@/hooks/useRecipes'; // Import the hook
import RecipeCard from '../components/RecipeCard'; // Adjust the path as necessary

export default function RecipesPage() {
  const { recipes, loading, error } = useRecipeData(); // Use the hook to get recipes

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
