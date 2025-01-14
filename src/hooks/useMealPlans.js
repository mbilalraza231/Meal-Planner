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

export const useMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
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

    fetchMealPlans();
  }, []);

  return { mealPlans, setMealPlans, loading, error };
};