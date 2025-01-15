import { useEffect } from 'react';

export default function FeaturedRecipeSlide({ recipe, onViewRecipe, onAddToMealPlan, isActive, onSlideChange }) {
  // Set up auto-sliding effect
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onSlideChange();
      }, 5000); // Change slide every 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isActive, onSlideChange]);

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <img
          src={recipe.image || "/R.jpeg"}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm mb-4">
            {recipe.category}
          </span>
          <h3 className="text-2xl md:text-4xl font-bold mb-4">{recipe.title}</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">{recipe.description}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-4">
              <button
                onClick={onViewRecipe}
                className="bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-all text-sm md:text-base font-semibold"
              >
                View Recipe
              </button>
              <button
                onClick={onAddToMealPlan}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all text-sm md:text-base font-semibold"
              >
                Add to Plan
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>⏱️ {recipe.cookingTime}</span>
              <span>⭐ {recipe.rating}</span>
              <span>({recipe.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 