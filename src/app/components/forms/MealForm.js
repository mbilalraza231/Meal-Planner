import React from 'react';

export default function MealForm({ 
  meal, 
  onMealChange, 
  onSubmit,
  buttonText = "Create Meal" 
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mealData = {
        userId: 'temp-user-id',
        mealName: meal.recipeName || "Custom Meal",
        ingredients: meal.ingredients || [],
        instructions: meal.instructions || [],
        cookingTime: meal.cookingTime || "",
        servings: parseInt(meal.servings) || 1,
        notes: meal.notes || ""
      };
      
      onSubmit(mealData);
    } catch (error) {
      console.error('Error in meal form submission:', error);
      throw error;
    }
  };

  return (
    <form id="mealForm" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Meal Name
        </label>
        <input
          type="text"
          value={meal.recipeName || ""}
          onChange={(e) => onMealChange({ ...meal, recipeName: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Servings
        </label>
        <input
          type="number"
          min="1"
          value={meal.servings || 1}
          onChange={(e) => onMealChange({ ...meal, servings: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cooking Time
        </label>
        <input
          type="text"
          value={meal.cookingTime || ""}
          onChange={(e) => onMealChange({
            ...meal,
            cookingTime: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ingredients
        </label>
        <textarea
          value={meal.ingredients?.join('\n') || ''}
          onChange={(e) => onMealChange({
            ...meal,
            ingredients: e.target.value.split('\n').filter(i => i.trim())
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Instructions
        </label>
        <textarea
          value={meal.instructions?.join('\n') || ''}
          onChange={(e) => onMealChange({
            ...meal,
            instructions: e.target.value.split('\n').filter(i => i.trim())
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes (Optional)
        </label>
        <textarea
          value={meal.notes || ""}
          onChange={(e) => onMealChange({ ...meal, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        {buttonText}
      </button>
    </form>
  );
} 