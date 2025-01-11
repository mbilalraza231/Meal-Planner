import React from 'react';

export default function AddMealModal({ 
  show, 
  onClose, 
  meal, 
  onMealChange, 
  onSubmit 
}) {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    try {
      const mealPlanData = {
        date: new Date(meal.date).toISOString(),
        mealType: meal.mealType,
        details: {
          name: meal.recipeName,
          ingredients: Array.isArray(meal.details.ingredients) 
            ? meal.details.ingredients 
            : [],
          instructions: Array.isArray(meal.details.instructions) 
            ? meal.details.instructions 
            : [],
          cookingTime: meal.details.cookingTime || "",
          servings: parseInt(meal.servings) || 1
        },
        notes: meal.notes || ""
      };

      console.log('Form data structured:', mealPlanData);
      onSubmit(mealPlanData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">
                Add New Meal
              </h2>
              {meal.recipeName && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Recipe "{meal.recipeName}" selected
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-96 overflow-y-auto mb-4">
            <form onSubmit={handleSubmit} id="addMealForm" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Recipe Name
                </label>
                <input
                  type="text"
                  required
                  value={meal.recipeName}
                  onChange={(e) => onMealChange({ ...meal, recipeName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={meal.date}
                  onChange={(e) => onMealChange({ ...meal, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meal Type
                </label>
                <select
                  value={meal.mealType}
                  onChange={(e) => onMealChange({ ...meal, mealType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Servings
                </label>
                <input
                  type="number"
                  min="1"
                  value={meal.servings}
                  onChange={(e) => onMealChange({ ...meal, servings: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cooking Time
                </label>
                <input
                  type="text"
                  value={meal.details.cookingTime}
                  onChange={(e) => onMealChange({
                    ...meal,
                    details: {
                      ...meal.details,
                      cookingTime: e.target.value
                    }
                  })}
                  placeholder="Enter cooking time"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ingredients
                </label>
                <textarea
                  value={Array.isArray(meal.details.ingredients) ? meal.details.ingredients.join("\n") : ""}
                  onChange={(e) => onMealChange({
                    ...meal,
                    details: {
                      ...meal.details,
                      ingredients: e.target.value.split("\n").filter(i => i.trim())
                    }
                  })}
                  placeholder="Enter each ingredient on a new line"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instructions
                </label>
                <textarea
                  value={Array.isArray(meal.details.instructions) ? meal.details.instructions.join("\n") : ""}
                  onChange={(e) => onMealChange({
                    ...meal,
                    details: {
                      ...meal.details,
                      instructions: e.target.value.split("\n").filter(i => i.trim())
                    }
                  })}
                  placeholder="Enter each instruction on a new line"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={meal.notes}
                  onChange={(e) => onMealChange({ ...meal, notes: e.target.value })}
                  placeholder="Enter any additional notes"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows="3"
                />
              </div>
            </form>
          </div>

          {/* Always visible Add Meal button */}
          <button
            type="submit"
            form="addMealForm"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add to Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
}

