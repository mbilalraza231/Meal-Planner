import React from 'react';

export default function MealPlanForm({ mealPlan, onMealPlanChange, onSubmit, buttonText = "Add to Meal Plan" }) {
  const handleChange = (field, value) => {
    console.log('Changing field:', field, 'to value:', value); // Debug log
    
    if (field === 'mealType' || field === 'date' || field === 'notes') {
      // These fields should be at the root level
      const updatedMealPlan = { ...mealPlan, [field]: value };
      console.log('Updated meal plan:', updatedMealPlan); // Debug log
      onMealPlanChange(updatedMealPlan);
    } else {
      // Other fields should be in the details object
      onMealPlanChange({
        ...mealPlan,
        details: {
          ...mealPlan.details,
          [field]: value
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting meal plan:', mealPlan); // Debug log
    onSubmit(mealPlan);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row for Date and Meal Type */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Date
          </label>
          <input
            type="date"
            value={mealPlan.date || new Date().toISOString().split('T')[0]} // Pre-fill with date
            onChange={(e) => onMealPlanChange({ ...mealPlan, date: e.target.value })} // Update date
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Meal Type
          </label>
          <select
            value={mealPlan.mealType || "dinner"} // Default to dinner if not set
            onChange={(e) => handleChange('mealType', e.target.value)} // Update mealType
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

      {/* Notes Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          Notes
        </label>
        <textarea
          value={mealPlan.notes || ""}
          onChange={(e) => onMealPlanChange({ ...mealPlan, notes: e.target.value })} // Update notes
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          rows="2"
        />
      </div>

      {/* Scrollable Section for Other Fields */}
      <div className="overflow-y-auto max-h-60"> {/* Adjust max height as needed */}
        {/* Meal/Recipe Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Meal/Recipe Name
          </label>
          <input
            type="text"
            value={mealPlan.details?.mealName || ""} // Ensure mealName is accessed safely
            readOnly // Make read-only
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Ingredients
          </label>
          <textarea
            value={mealPlan.details?.ingredients?.join('\n') || ""}
            readOnly // Make read-only
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            rows="3"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Instructions
          </label>
          <textarea
            value={mealPlan.details?.instructions?.join('\n') || ""}
            readOnly // Make read-only
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            rows="3"
          />
        </div>

        {/* Cooking Time and Servings */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Cooking Time
          </label>
          <input
            type="text"
            value={mealPlan.details?.cookingTime || ""}
            readOnly // Make read-only
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Servings
          </label>
          <input
            type="number"
            value={mealPlan.details?.servings || 1}
            readOnly // Make read-only
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        {buttonText}
      </button>
    </form>
  );
} 