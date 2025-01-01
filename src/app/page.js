// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
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

        // Get 3 random recipes for featured section (carousel)
        const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
        setFeaturedRecipes(shuffled.slice(0, 3)); // Keep 3 for the carousel

        // Get all recipes sorted by rating for popular section
        const sorted = [...allRecipes].sort((a, b) => b.rating - a.rating);
        setPopularRecipes(sorted); // Show all recipes, sorted by rating

        setRecipes(allRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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
      router.push("/meal-planner");
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
      {/* Welcome Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                Meal Planning
              </span>
              Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Discover delicious recipes, plan your meals effortlessly, and make
              cooking an enjoyable experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-6 md:px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-base md:text-lg font-semibold">
                Get Started
              </button>
              <button className="bg-indigo-600 text-white px-6 md:px-8 py-3 rounded-full hover:bg-indigo-700 transition-all text-base md:text-lg font-semibold">
                Browse Recipes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <SearchBar onSearch={() => {}} />
      </section>

      {/* Featured Recipes Slider */}
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
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <img
                  src={recipe.image || "/R.jpeg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                  <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm mb-4">
                    {recipe.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">
                    {recipe.title}
                  </h3>
                  <p className="text-base md:text-lg mb-6 max-w-2xl">
                    {recipe.description}
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex gap-4">
                      <button
                        onClick={() => router.push(`/recipes/${recipe._id}`)}
                        className="bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-all text-sm md:text-base font-semibold"
                      >
                        View Recipe
                      </button>
                      <button
                        onClick={() => handleAddToMealPlan(recipe)}
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
            ))}

            {/* Slider Navigation */}
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

            {/* Dot Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredRecipes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes */}
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
