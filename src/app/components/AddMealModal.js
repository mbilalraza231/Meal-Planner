import React from 'react';

const AddMealModal = ({ showAddModal, setShowAddModal, newMeal, setNewMeal, handleAddMeal }) => {
    return (
        <>
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
        </>
    );
};

export default AddMealModal; 