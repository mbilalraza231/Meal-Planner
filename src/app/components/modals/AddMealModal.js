import React, { useState } from 'react';
import MealForm from '../forms/MealForm';
import MealPlanForm from '../forms/MealPlanForm';

export default function AddMealModal({ show, onClose, onSubmit, onSuccess = () => {}, recipe = null }) {
  const [step, setStep] = useState(recipe ? 2 : 1);
  
  const [mealPlan, setMealPlan] = useState(recipe ? {
    recipeId: recipe._id,
    name: recipe.title,
    mealType: "dinner",
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cookingTime: recipe.cookingTime,
    servings: recipe.servings,
    notes: "",
    date: new Date().toISOString().split('T')[0],
    isCustomMeal: false  // This is a recipe, not a custom meal
  } : null);

  const [meal, setMeal] = useState({
    recipeName: "",
    mealType: "dinner",
    servings: 1,
    details: {
      ingredients: [],
      instructions: [],
      cookingTime: "",
    },
    notes: ""
  });

  const handleMealSubmit = async (mealData) => {
    try {
      // Create meal first
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData)
      });

      if (!response.ok) {
        throw new Error('Failed to create meal');
      }

      const savedMeal = await response.json();
      
      // Prepare meal plan data with only mealId for custom meals
      const mealPlanData = {
        mealId: savedMeal._id,
        name: savedMeal.name,
        mealType: savedMeal.mealType,
        ingredients: savedMeal.ingredients,
        instructions: savedMeal.instructions,
        cookingTime: savedMeal.cookingTime,
        servings: savedMeal.servings,
        notes: savedMeal.notes,
        date: new Date().toISOString().split('T')[0],
        isCustomMeal: true  // Add this flag to indicate it's a custom meal
      };

      setMealPlan(mealPlanData);
      setStep(2);
    } catch (error) {
      console.error('Error creating meal:', error);
      alert(error.message);
    }
  };

  const handleSubmit = async (mealPlanData) => {
    try {
      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create meal plan');
      }

      const savedMealPlan = await response.json();
      if (typeof onSuccess === 'function') {
        onSuccess(savedMealPlan);
      }
      onClose();
    } catch (error) {
      console.error('Error creating meal plan:', error);
      alert(error.message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            {recipe ? 'Add Recipe to Meal Plan' : (step === 1 ? 'Create New Meal' : 'Add to Meal Plan')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {step === 1 ? (
          <MealForm 
            meal={meal}
            onMealChange={setMeal}
            onSubmit={handleMealSubmit}
          />
        ) : (
          <MealPlanForm 
            mealPlan={mealPlan}
            onMealPlanChange={setMealPlan}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

