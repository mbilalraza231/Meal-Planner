// src/app/meal-planner/page.js
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function MealPlannerPage() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [newMeal, setNewMeal] = useState({
    recipeName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    mealType: "breakfast",
    servings: 1,
    notes: "",
    details: {
      ingredients: [],
      instructions: [],
      cookingTime: "",
      servings: 1,
    },
  });

  const [mealPlans, setMealPlans] = useState([
    {
      Id: 1,
      recipeName: "Oatmeal with Berries",
      date: "2024-03-20",
      mealType: "breakfast",
      details: {
        ingredients: ["Oats", "Mixed berries", "Honey", "Almonds"],
        instructions: ["Cook oats", "Add toppings", "Serve hot"],
        cookingTime: "15 minutes",
        servings: 1,
        notes: "Contains nuts",
      },
    },
    {
      id: 2,
      recipeName: "Chicken Stir Fry",
      date: "2024-03-20",
      mealType: "dinner",
      details: {
        ingredients: ["Chicken breast", "Mixed vegetables", "Soy sauce"],
        instructions: [
          "Cut chicken",
          "Stir fry vegetables",
          "Combine and cook",
        ],
        cookingTime: "20 minutes",
        servings: 3,
      },
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    const checkForSelectedRecipe = () => {
      try {
        const savedRecipeString = localStorage.getItem(
          "selectedRecipeForMealPlan"
        );
        console.log("Saved recipe string:", savedRecipeString);

        if (savedRecipeString) {
          const savedRecipe = JSON.parse(savedRecipeString);
          console.log("Parsed recipe:", savedRecipe);

          setNewMeal({
            recipeName: savedRecipe.title,
            date: format(new Date(), "yyyy-MM-dd"),
            mealType: "dinner",
            servings: savedRecipe.servings || 1,
            notes: savedRecipe.description || "",
            details: {
              ingredients: savedRecipe.ingredients || [],
              instructions: savedRecipe.instructions || [],
              cookingTime: savedRecipe.cookingTime || "",
              servings: savedRecipe.servings || 1,
            },
          });

          setShowAddModal(true);

          localStorage.removeItem("selectedRecipeForMealPlan");
        }
      } catch (error) {
        console.error("Error processing saved recipe:", error);
      }
    };

    checkForSelectedRecipe();
  }, []);

  useEffect(() => {
    console.log("Current newMeal state:", newMeal);
  }, [newMeal]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setMealPlans(mealPlans.filter((plan) => plan.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleAddMeal = (e) => {
    e.preventDefault();

    const newMealPlan = {
      id: Date.now(),
      ...newMeal,
      details: {
        ingredients: [],
        instructions: [],
        cookingTime: "Not specified",
        servings: newMeal.servings,
      },
    };

    setMealPlans([...mealPlans, newMealPlan]);

    setShowAddModal(false);
    setNewMeal({
      recipeName: "",
      date: format(new Date(), "yyyy-MM-dd"),
      mealType: "breakfast",
      servings: 1,
      notes: "",
      details: {
        ingredients: [],
        instructions: [],
        cookingTime: "",
        servings: 1,
      },
    });
  };

  const handleEdit = (meal) => {
    setEditingMeal({
      ...meal,
      date: format(new Date(meal.date), "yyyy-MM-dd"),
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMealPlans(
      mealPlans.map((meal) => (meal.id === editingMeal.id ? editingMeal : meal))
    );
    setShowEditModal(false);
    setEditingMeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Welcome Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Your Meal Planner
          </h1>
          <p className="text-lg opacity-90">
            Organize your weekly meals and keep track of your cooking schedule
          </p>
           <h1 className="text-xl font-bold mb-0 p-0">Add Your Own Meal Plan</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Add New Meal
          </button>
        </div>
      </div>

      {/* Meal Plan Table */}
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Recipe Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Meal Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {mealPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {plan.recipeName}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {format(new Date(plan.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          plan.mealType === "breakfast"
                            ? "bg-yellow-100 text-yellow-800"
                            : plan.mealType === "lunch"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {plan.mealType.charAt(0).toUpperCase() +
                          plan.mealType.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(plan)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    Add New Meal
                  </h2>
                  {newMeal.recipeName && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Recipe "{newMeal.recipeName}" selected
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="max-h-96 overflow-y-auto mb-4">
                <form onSubmit={handleAddMeal} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Recipe Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newMeal.recipeName}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, recipeName: e.target.value })
                      }
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
                      value={newMeal.date}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meal Type
                    </label>
                    <select
                      value={newMeal.mealType}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, mealType: e.target.value })
                      }
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
                      value={newMeal.servings}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, servings: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cooking Time
                    </label>
                    <input
                      type="text"
                      value={newMeal.cookingTime}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, cookingTime: e.target.value })
                      }
                      placeholder="Enter cooking time"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ingredients
                    </label>
                    <textarea
                      value={newMeal.details.ingredients.join("\n")}
                      onChange={(e) =>
                        setNewMeal({
                          ...newMeal,
                          details: {
                            ...newMeal.details,
                            ingredients: e.target.value
                              .split("\n")
                              .filter((i) => i.trim()),
                          },
                        })
                      }
                      placeholder="Enter each ingredient on a new line"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows="4"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Instructions
                    </label>
                    <textarea
                      value={newMeal.details.instructions.join("\n")}
                      onChange={(e) =>
                        setNewMeal({
                          ...newMeal,
                          details: {
                            ...newMeal.details,
                            instructions: e.target.value
                              .split("\n")
                              .filter((i) => i.trim()),
                          },
                        })
                      }
                      placeholder="Enter each instruction on a new line"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows="4"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={newMeal.notes}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, notes: e.target.value })
                      }
                      placeholder="Enter any additional notes"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Always visible Add Meal button */}
              <button
                type="submit"
                onClick={handleAddMeal}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add to Meal Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Confirm Delete
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this meal plan? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Details Modal */}
      {showModal && selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold dark:text-white">
                  {selectedRecipe.recipeName}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">
                    Ingredients:
                  </h3>
                  <ul className="list-disc pl-5 dark:text-gray-300">
                    {selectedRecipe.details.ingredients.map(
                      (ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">
                    Instructions:
                  </h3>
                  <ol className="list-decimal pl-5 dark:text-gray-300">
                    {selectedRecipe.details.instructions.map(
                      (instruction, index) => (
                        <li key={index}>{instruction}</li>
                      )
                    )}
                  </ol>
                </div>

                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>🕒 {selectedRecipe.details.cookingTime}</span>
                  <span>👥 Serves {selectedRecipe.details.servings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Meal Modal */}
      {showEditModal && editingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Header - Sticky */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold dark:text-white">Edit Meal</h2>
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

            {/* Form Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              <form
                id="editMealForm"
                onSubmit={handleEditSubmit}
                className="space-y-6"
              >
                <div>
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

                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                </div>

                <div>
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

                <div>
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
              </form>
            </div>

            {/* Footer - Sticky */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMeal(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="editMealForm"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
