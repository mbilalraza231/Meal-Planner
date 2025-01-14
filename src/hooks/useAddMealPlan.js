import { useState } from 'react';

export const useAddMealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMealPlan = async (mealPlanData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData),
      });

      if (!response.ok) {
        throw new Error('Failed to create meal plan');
      }

      const savedMealPlan = await response.json();
      return savedMealPlan;
    } catch (err) {
      setError(err.message);
      console.error('Error creating meal plan:', err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  return { addMealPlan, loading, error };
};