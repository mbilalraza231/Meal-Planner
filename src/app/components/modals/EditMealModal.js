import React, { useEffect } from 'react';

export default function EditMealModal({ 
  showEditModal, 
  setShowEditModal, 
  editingMeal, 
  setEditingMeal, 
  handleEditSubmit 
}) {
  if (!showEditModal || !editingMeal) return null;

  useEffect(() => {
    if (editingMeal) {
      setEditingMeal((prev) => ({
        ...prev,
        date: new Date().toISOString().split('T')[0],
      }));
    }
  }, [showEditModal, editingMeal, setEditingMeal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md h-[32rem] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Meal</h2>
          <button
            onClick={() => {
              setShowEditModal(false);
              setEditingMeal(null);
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Form Content - Scrollable with custom scrollbar */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <form
            id="editMealForm"
            onSubmit={handleEditSubmit}
            className="py-4 space-y-4"
          >
            {/* Recipe Name - Always visible */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                required
                value={editingMeal.recipeName}
                onChange={(e) =>
                  setEditingMeal({
                    ...editingMeal,
                    recipeName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Date and Meal Type - Always visible */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={editingMeal.date}
                  onChange={(e) =>
                    setEditingMeal({ ...editingMeal, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meal Type
                </label>
                <select
                  value={editingMeal.mealType}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      mealType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
            </div>

            {/* Servings - Always visible */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Servings
              </label>
              <input
                type="number"
                min="1"
                value={editingMeal.details.servings}
                onChange={(e) =>
                  setEditingMeal({
                    ...editingMeal,
                    details: {
                      ...editingMeal.details,
                      servings: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Cooking Time - Always visible */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cooking Time
              </label>
              <input
                type="text"
                value={editingMeal.details.cookingTime}
                onChange={(e) =>
                  setEditingMeal({
                    ...editingMeal,
                    details: {
                      ...editingMeal.details,
                      cookingTime: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Scrollable fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ingredients
                </label>
                <textarea
                  value={editingMeal.details.ingredients.join("\n")}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      details: {
                        ...editingMeal.details,
                        ingredients: e.target.value
                          .split("\n")
                          .filter((i) => i.trim()),
                      },
                    })
                  }
                  placeholder="Enter each ingredient on a new line"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instructions
                </label>
                <textarea
                  value={editingMeal.details.instructions.join("\n")}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      details: {
                        ...editingMeal.details,
                        instructions: e.target.value
                          .split("\n")
                          .filter((i) => i.trim()),
                      },
                    })
                  }
                  placeholder="Enter each instruction on a new line"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={editingMeal.notes || ""}
                  onChange={(e) =>
                    setEditingMeal({ ...editingMeal, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            type="submit"
            form="editMealForm"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 