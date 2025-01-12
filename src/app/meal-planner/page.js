"use client";

import { useState } from 'react';
import { useMealPlan } from '@/hooks/useMealPlan';
import { format } from 'date-fns';
import MealPlannerWelcome from '../components/MealPlannerWelcome';
import AddMealModal from '../components/modals/AddMealModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';

export default function MealPlannerPage() {
  const { mealPlans, setMealPlans, loading } = useMealPlan();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    setSelectedMealPlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/meal-plans/${selectedMealPlanId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete meal plan');
      }

      setMealPlans(prevPlans => prevPlans.filter(plan => plan._id !== selectedMealPlanId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      alert(error.message);
    }
  };

  const handleMealPlanSuccess = (newMealPlan) => {
    setMealPlans(prevPlans => [...prevPlans, newMealPlan]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MealPlannerWelcome onAddNew={handleAddNew} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
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
                  <tr key={plan._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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
      )}

      {showAddModal && (
        <AddMealModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={async (mealPlanData) => {
            try {
              const response = await fetch('/api/meal-plans', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealPlanData)
              });

              if (!response.ok) {
                throw new Error('Failed to create meal plan');
              }

              const savedMealPlan = await response.json();
              handleMealPlanSuccess(savedMealPlan);
              setShowAddModal(false);
            } catch (error) {
              console.error('Error creating meal plan:', error);
              alert(error.message);
            }
          }}
          onSuccess={handleMealPlanSuccess}
        />
      )}

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
