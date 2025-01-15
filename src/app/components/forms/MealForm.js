import React from 'react';

export default function MealForm({
  meal,
  onMealChange,
  onSubmit,
  buttonText = "Continue to Meal Plan",
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
        notes: meal.notes || "",
      };

      console.log('Submitting meal data:', mealData);
      await onSubmit(mealData);

    } catch (error) {
      console.error('Error in meal form submission:', error);
    }
  };

  return (
    <div className="max-h-[500px] flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <form
        id="mealForm"
        onSubmit={handleSubmit}
        className="flex-1 px-4 overflow-y-auto max-h-[80vh]"
      >
        <div className="space-y-4 py-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meal Name
            </label>
            <input
              type="text"
              value={meal.recipeName || ""}
              onChange={(e) =>
                onMealChange({ ...meal, recipeName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
              required
              placeholder="Enter meal name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Servings
              </label>
              <input
                type="number"
                min="1"
                value={meal.servings || 1}
                onChange={(e) =>
                  onMealChange({ ...meal, servings: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cooking Time
              </label>
              <input
                type="text"
                value={meal.cookingTime || ""}
                onChange={(e) =>
                  onMealChange({
                    ...meal,
                    cookingTime: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
                placeholder="e.g., 30 mins"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ingredients
            </label>
            <textarea
              value={meal.ingredients?.join('\n') || ''}
              onChange={(e) =>
                onMealChange({
                  ...meal,
                  ingredients: e.target.value.split('\n').filter((i) => i.trim()),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
              rows="4"
              required
              placeholder="Enter ingredients (one per line)"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Instructions
            </label>
            <textarea
              value={meal.instructions?.join('\n') || ''}
              onChange={(e) =>
                onMealChange({
                  ...meal,
                  instructions: e.target.value.split('\n').filter((i) => i.trim()),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
              rows="4"
              required
              placeholder="Enter instructions (one per line)"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={meal.notes || ""}
              onChange={(e) =>
                onMealChange({ ...meal, notes: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors"
              rows="3"
              placeholder="Enter any additional notes"
            />
          </div>
        </div>
      </form>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          form="mealForm"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 