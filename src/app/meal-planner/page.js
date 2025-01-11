"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useMealPlan } from "@/hooks/useMealPlan";
import MealPlannerWelcome from "@/app/components/MealPlannerWelcome";
import AddMealModal from "@/app/components/modals/AddMealModal";
import DeleteConfirmModal from "@/app/components/modals/DeleteConfirmModal";
import EditMealModal from "@/app/components/modals/EditMealModal";
import ViewDetailsModal from "@/app/components/modals/ViewDetailsModal";
import RecipeCard from "@/app/components/RecipeCard";

export default function MealPlannerPage() {
  const {
    mealPlans,
    newMeal,
    setNewMeal,
    addMealPlan,
    deleteMealPlan,
    updateMealPlan,
    resetNewMeal,
  } = useMealPlan();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    const checkForSelectedRecipe = () => {
      try {
        const savedRecipeString = localStorage.getItem("selectedRecipeForMealPlan");
        if (savedRecipeString) {
          const savedRecipe = JSON.parse(savedRecipeString);
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

  const handleAddMeal = async (mealData) => {
    try {
      await addMealPlan(mealData);
      setShowAddModal(false);
      resetNewMeal();
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Failed to add meal plan: ' + error.message);
    }
  };

  const handleViewDetails = (plan) => {
    setSelectedRecipe(plan);
    setShowModal(true);
  };

  const handleEdit = (meal) => {
    setEditingMeal(meal);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMealPlans(mealPlans.map((m) => (m.id === editingMeal.id ? editingMeal : m)));
    setShowEditModal(false);
    setEditingMeal(null);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  console.log('setShowAddModal:', setShowAddModal);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <MealPlannerWelcome onAddNew={() => setShowAddModal(true)} />
      
      {/* Modals */}
      <AddMealModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        meal={newMeal}
        onMealChange={setNewMeal}
        onSubmit={handleAddMeal}
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteMealPlan(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
      />
      {showEditModal && (
        <EditMealModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editingMeal={editingMeal}
          setEditingMeal={setEditingMeal}
          handleEditSubmit={handleEditSubmit}
        />
      )}
      <ViewDetailsModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRecipe(null);
        }}
        recipe={selectedRecipe}
      />

      {/* Meal Plan Table */}
      <div className="container mx-auto px-4 mt-8">
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
                    key={plan._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {plan.details.name} 
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
                          onClick={() => handleDelete(plan._id)}
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
    </div>
  );
}
