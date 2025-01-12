import { useState, useEffect } from "react";
import { format } from "date-fns";

const initialMealState = {
  recipeName: "",
  date: format(new Date(), "yyyy-MM-dd"),
  mealType: "dinner",
  servings: 1,
  notes: "",
  details: {
    name: "",
    ingredients: [],
    instructions: [],
    cookingTime: "",
    servings: 1,
  },
  mealId: null,
  recipeId: null,
  isCustomMeal: true
};

export function useMealPlan() {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meal-plans');
      if (!response.ok) throw new Error('Failed to fetch meal plans');
      const data = await response.json();
      setMealPlans(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching meal plans:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    mealPlans,
    setMealPlans,
    loading,
    error,
    fetchMealPlans,
  };
}