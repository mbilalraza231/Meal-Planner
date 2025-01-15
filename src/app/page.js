// src/app/page.js
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import Welcome from "./components/Welcome";
import FeaturedRecipeSlide from "./components/FeaturedRecipeSlide";
import { useRecipeData } from "@/hooks/useRecipes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddMealModal from "./components/modals/AddMealModal";
import SearchResultCard from '@/app/components/SearchResultCard';
import { useSearch } from '@/hooks/useSearch';

const RESULTS_PER_PAGE = 5; // Number of search results to show initially

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { recipes, featuredRecipes, popularRecipes, loading, error } = useRecipeData(1, 10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const {
    searchTerm,
    displayedResults,
    isSearching,
    handleSearch,
    loadMore,
    hasMore
  } = useSearch(recipes, {
    debounceMs: 300,
    maxResults: 5
  });
  const allRecipesRef = useRef(null);

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

  const handleAddToMealPlan = async (recipe) => {
    setSelectedRecipe(recipe);
    setShowAddModal(true);
  };

  const handleScrollToAllRecipes = () => {
    const allRecipesSection = document.getElementById('all-recipes');
    if (allRecipesSection) {
      const navbarHeight = document.querySelector('nav').offsetHeight; // Get the height of the navbar
      const offset = 20; // Additional offset to ensure the heading is fully visible
      const topPosition = allRecipesSection.offsetTop - navbarHeight - offset; // Calculate the top position minus navbar height and offset
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  const handleMealPlanSubmit = async (mealPlanData) => {
    try {
      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData)
      });

      if (!response.ok) {
        throw new Error('Failed to create meal plan');
      }

      const savedMealPlan = await response.json();
      return savedMealPlan;
    } catch (error) {
      console.error('Error creating meal plan:', error);
      throw error;
    }
  };

  const handleMealPlanSuccess = (newMealPlan) => {
    alert('Recipe added to meal plan successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Welcome />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto relative">
          <SearchBar 
            onSearch={handleSearch} 
            isSearching={isSearching}
          />
          
          {searchTerm && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="max-h-[400px] overflow-y-auto">
                {isSearching ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
                  </div>
                ) : Array.isArray(displayedResults) && displayedResults.length > 0 ? (
                  <>
                    {displayedResults.map((recipe) => (
                      <SearchResultCard
                        key={recipe._id}
                        recipe={recipe}
                        searchTerm={searchTerm}
                        onAddToMealPlan={handleAddToMealPlan}
                      />
                    ))}
                    {hasMore && (
                      <button
                        onClick={loadMore}
                        className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Load more results...
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No recipes found matching "{searchTerm}"
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
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
          </div>
        </div>
      </section>

      <section id="all-recipes" ref={allRecipesRef} className="container mx-auto px-4 py-8 md:py-12 mt-0">
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

      {showAddModal && (
        <AddMealModal
          show={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedRecipe(null);
          }}
          onSubmit={handleMealPlanSubmit}
          onSuccess={handleMealPlanSuccess}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
}
