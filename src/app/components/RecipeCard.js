"use client";

import { useRouter } from "next/navigation";
import { FaClock, FaUtensils, FaStar, FaRegBookmark } from "react-icons/fa";

export default function RecipeCard({ recipe, onAddToMealPlan }) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={recipe.image || "/R.jpeg"}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {recipe.category && (
          <div className="absolute top-4 right-4">
            <span className="bg-indigo-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {recipe.category}
            </span>
          </div>
        )}
        <button className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all">
          <FaRegBookmark className="text-white w-4 h-4" />
        </button>
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white line-clamp-2 hover:text-indigo-400 cursor-pointer">
          {recipe.title}
        </h3>
        <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          {/* Left side - Rating */}
          <div className="flex items-center gap-1.5">
            <FaStar className="text-yellow-400 w-4 h-4" />
            <span>{recipe.rating}</span>
            <span className="text-gray-500">({recipe.reviews})</span>
          </div>

          {/* Right side - Time and Servings */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <FaUtensils className="text-indigo-400 w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaClock className="text-indigo-400 w-4 h-4" />
              <span>{recipe.cookingTime}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/recipes/${recipe._id}`)}
            className="flex-1 bg-white text-indigo-600 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors active:scale-95 transform"
          >
            View Recipe
          </button>
          <button
            onClick={() => onAddToMealPlan(recipe)}
            className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors active:scale-95 transform"
          >
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}
