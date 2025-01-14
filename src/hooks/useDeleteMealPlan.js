import { useState } from 'react';

export const useDeleteMealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMealPlan = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/meal-plans/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete meal plan');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error deleting meal plan:', err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  return { deleteMealPlan, loading, error };
}; 