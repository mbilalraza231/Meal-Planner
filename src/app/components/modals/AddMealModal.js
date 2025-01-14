import React, { useState } from 'react';
import MealForm from '../forms/MealForm';
import MealPlanForm from '../forms/MealPlanForm';

export default function AddMealModal({ show, onClose, onSubmit, onSuccess = () => {}, recipe = null }) {
  const [step, setStep] = useState(recipe ? 2 : 1);
  
  const [mealPlan, setMealPlan] = useState(recipe ? {
    recipeId: recipe._id,
    mealType: "dinner",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    details: {
      mealName: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    }
  } : {
    mealType: "dinner",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    details: {
      mealName: "",
      servings: 1,
      cookingTime: "",
      ingredients: [],
      instructions: []
    }
  });

  const [meal, setMeal] = useState({
    recipeName: "",
    servings: 1,
    ingredients: [],
    instructions: [],
    cookingTime: "",
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create meal');
      }

      const savedMeal = await response.json();
      
      // Prepare meal plan data with the correct structure
      const mealPlanData = {
        mealId: savedMeal._id, // Set the mealId from the saved meal
        mealType: mealPlan.mealType || "dinner",
        date: mealPlan.date || new Date().toISOString().split('T')[0],
        notes: mealPlan.notes || "",
        details: {
          mealName: savedMeal.mealName,
          servings: savedMeal.servings,
          cookingTime: savedMeal.cookingTime,
          ingredients: savedMeal.ingredients,
          instructions: savedMeal.instructions
        }
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
      // Prepare the data to send
      const dataToSend = {
        userId: 'temp-user-id',
        mealType: mealPlanData.mealType || 'dinner',
        date: mealPlanData.date || new Date().toISOString().split('T')[0],
        notes: mealPlanData.notes || "",
        details: mealPlanData.details,
        // Include either mealId or recipeId, but not both
        ...(mealPlanData.mealId ? { mealId: mealPlanData.mealId } : {}),
        ...(recipe ? { recipeId: recipe._id } : {})
      };

      // Ensure onSubmit is available and is a function
      if (typeof onSubmit !== 'function') {
        throw new Error('Submit handler is not properly configured');
      }

      // Call onSubmit with the data and await its response
      const savedMealPlan = await onSubmit(dataToSend);
      
      // Only close and call success if the submission was successful
      if (savedMealPlan) {
        if (typeof onSuccess === 'function') {
          onSuccess(savedMealPlan);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error creating meal plan:', error);
      alert(error.message || 'Failed to create meal plan');
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
            buttonText="Continue to Meal Plan"
          />
        ) : (
          <MealPlanForm 
            mealPlan={mealPlan}
            onMealPlanChange={setMealPlan}
            onSubmit={handleSubmit}
            buttonText="Add to Meal Plan"
          />
        )}
      </div>
    </div>
  );
}

