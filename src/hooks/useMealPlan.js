import { useState, useEffect } from "react";
import { format } from "date-fns";

const initialMealState = {
  recipeName: "",
  date: format(new Date(), "yyyy-MM-dd"),
  mealType: "breakfast",
  servings: 1,
  notes: "",
  details: {
    ingredients: [],
    instructions: [],
    cookingTime: "",
    servings: 1,
  },
};

export function useMealPlan() {
  const [mealPlans, setMealPlans] = useState([]);
  const [newMeal, setNewMeal] = useState(initialMealState);
  const [loading, setLoading] = useState(true);

  // Fetch meal plans when component mounts
  const fetchMealPlans = async () => {
    try {
      const response = await fetch('/api/meal-plans');
      const data = await response.json();
      setMealPlans(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlans(); // Call fetchMealPlans when the component mounts
  }, []);

  const addMealPlan = async (mealData) => {
    try {
      console.log('Adding meal plan:', mealData);

      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add meal plan');
      }

      const newMealPlan = await response.json();
      setMealPlans(prev => [...prev, newMealPlan]);
      return newMealPlan;
    } catch (error) {
      console.error('Error in addMealPlan:', error);
      throw error;
    }
  };

  const addToMealPlanHandler = (recipe) => {
    console.log("Adding to meal plan:", recipe);
    onAddToMealPlan(recipe);
    setShowAddModal(true);
    console.log("Show Add Modal:", showAddModal);
  };

  const deleteMealPlan = async (id) => {
    console.log("Attempting to delete meal plan with ID:", id); // Log the ID
    try {
      const response = await fetch(`/api/meal-plans/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete meal plan: ${errorMessage}`);
      }

      setMealPlans(prev => prev.filter(plan => plan._id !== id));
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      throw error;
    }
  };

  const updateMealPlan = async (updatedMeal) => {
    try {
      const response = await fetch(`/api/meal-plans/${updatedMeal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMeal),
      });

      if (!response.ok) {
        throw new Error('Failed to update meal plan');
      }

      const updated = await response.json();
      setMealPlans(prev => 
        prev.map(meal => meal._id === updated._id ? updated : meal)
      );
    } catch (error) {
      console.error('Error updating meal plan:', error);
      throw error;
    }
  };

  return {
    mealPlans,
    newMeal,
    setNewMeal,
    addMealPlan,
    deleteMealPlan,
    updateMealPlan,
    resetNewMeal: () => setNewMeal(initialMealState),
    fetchMealPlans,
    loading,
    addToMealPlanHandler
  };
}