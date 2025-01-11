// src/app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import Welcome from "./components/Welcome";
import FeaturedRecipeSlide from "./components/FeaturedRecipeSlide";
import { useRecipeData } from "@/hooks/useRecipeData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { featuredRecipes, popularRecipes, loading } = useRecipeData();

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredRecipes.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredRecipes.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToMealPlan = (recipe) => {
    try {
      localStorage.setItem("selectedRecipeForMealPlan", JSON.stringify(recipe));
      router.push("/meal-planner"); // Navigate to the meal planner page
    } catch (error) {
      console.error("Error adding to meal plan:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Welcome />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <SearchBar onSearch={() => {}} />
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          Featured Recipes
        </h2>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
            {featuredRecipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <FeaturedRecipeSlide
                  recipe={recipe}
                  onViewRecipe={() => router.push(`/recipes/${recipe._id}`)}
                  onAddToMealPlan={() => handleAddToMealPlan(recipe)}
                />
              </div>
            ))}

            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
              aria-label="Next slide"
            >
              <FaChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredRecipes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          All Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onAddToMealPlan={handleAddToMealPlan}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
