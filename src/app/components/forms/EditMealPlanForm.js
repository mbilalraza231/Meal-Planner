import React from 'react';

export default function EditMealPlanForm({ mealPlan, onMealPlanChange, onSubmit }) {
  const handleChange = (field, value) => {
    if (field === 'mealName' || field === 'servings' || field === 'cookingTime' || field === 'ingredients' || field === 'instructions') {
      onMealPlanChange({
        ...mealPlan,
        details: {
          ...mealPlan.details,
          [field]: value
        }
      });
    } else if (field === 'date') {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      onMealPlanChange({ ...mealPlan, date: formattedDate });
    } else {
      onMealPlanChange({ ...mealPlan, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mealPlan);
  };

  // Format the initial date if it exists, otherwise use today's date
  const formattedDate = mealPlan?.date 
    ? new Date(mealPlan.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-[500px]">
      {/* Fixed Top Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900 mb-4">
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={formattedDate}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 text-md border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-1">
              Meal Type
            </label>
            <select
              value={mealPlan.mealType}
              onChange={(e) => handleChange('mealType', e.target.value)}
              className="w-full px-3 py-2 text-md border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-1">
            Notes
          </label>
          <textarea
            value={mealPlan.notes || ""}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-3 py-2 text-md border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
            rows="2"
          />
        </div>
      </div>

      {/* Scrollable Middle Section */}
      <div className="flex-grow overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                value={mealPlan.details?.mealName || ""}
                onChange={(e) => handleChange('mealName', e.target.value)}
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
                value={mealPlan.details?.servings || ""}
                onChange={(e) => handleChange('servings', parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Cooking Time
              </label>
              <input
                type="text"
                value={mealPlan.details?.cookingTime || ""}
                onChange={(e) => handleChange('cookingTime', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Ingredients
              </label>
              <textarea
                value={mealPlan.details?.ingredients?.join('\n') || ""}
                onChange={(e) => handleChange('ingredients', e.target.value.split('\n').filter(i => i.trim()))}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Instructions
              </label>
              <textarea
                value={mealPlan.details?.instructions?.join('\n') || ""}
                onChange={(e) => handleChange('instructions', e.target.value.split('\n').filter(i => i.trim()))}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="mt-3">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-md hover:bg-indigo-700 text-md font-medium"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
} 