"use client";

import { useRouter } from "next/navigation";

export default function RecipeCard({ recipe }) {
  const router = useRouter();

  const handleAddToMealPlan = () => {
    try {
      localStorage.setItem("selectedRecipeForMealPlan", JSON.stringify(recipe));
      router.push("/meal-planner");
    } catch (error) {
      console.error("Error adding to meal plan:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {recipe.category && (
          <div className="absolute top-4 right-4">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
              {recipe.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <span>⏱️ {recipe.cookingTime}</span>
          <span>⭐ {recipe.rating}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/recipes/${recipe.id}`)}
            className="flex-1 bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors"
          >
            View Recipe
          </button>
          <button
            onClick={handleAddToMealPlan}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-indigo-700 transition-colors"
          >
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}
