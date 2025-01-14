"use client";

import { useParams } from "next/navigation";
import { useRecipeById } from '@/hooks/useRecipe';

export default function RecipeDetails() {
  const { id } = useParams();
  const { recipe, loading, error } = useRecipeById(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {error}
        </h2>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Recipe not found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            {recipe.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600 dark:text-gray-300">
              ⏱️ {recipe.cookingTime}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              👥 Serves {recipe.servings}
            </span>
            {recipe.rating && (
              <span className="text-gray-600 dark:text-gray-300">
                ⭐ {recipe.rating}
              </span>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {recipe.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Instructions
            </h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-600 dark:text-gray-300">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
