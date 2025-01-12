"use client";

import { useState } from 'react';
import { useMealPlan } from '@/hooks/useMealPlan';
import { format, parseISO } from 'date-fns';
import MealPlannerWelcome from '../components/MealPlannerWelcome';
import AddMealModal from '../components/modals/AddMealModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import ViewDetailsModal from '../components/modals/ViewDetailsModal';

const DetailsModal = ({ mealPlan, onClose }) => {
  if (!mealPlan) return null;

  // Format the date
  const formattedDate = format(parseISO(mealPlan.date), 'EEEE, MMMM dd, yyyy');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">{mealPlan.details.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">Date: {formattedDate}</p>
        <p className="text-gray-600 dark:text-gray-300">Cooking Time: {mealPlan.details.cookingTime}</p>
        <p className="text-gray-600 dark:text-gray-300">Servings: {mealPlan.details.servings}</p>
        <p className="text-gray-600 dark:text-gray-300">Meal Type: {mealPlan.mealType}</p>

        <div className="mt-4">
          <h3 className="font-semibold dark:text-white">Ingredients:</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            {mealPlan.details.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold dark:text-white">Instructions:</h3>
          <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300">
            {mealPlan.details.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {mealPlan.notes && (
          <div className="mt-4">
            <h3 className="font-semibold dark:text-white">Notes:</h3>
            <p className="text-gray-600 dark:text-gray-300">{mealPlan.notes}</p>
          </div>
        )}

        <button onClick={onClose} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default function MealPlannerPage() {
  const { mealPlans, setMealPlans, loading } = useMealPlan();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const handleViewDetails = (plan) => {
    console.log('View Details clicked for plan:', plan);
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPlan(null);
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

      <ViewDetailsModal show={showDetailsModal} onClose={closeDetailsModal} mealPlan={selectedPlan} />
    </div>
  );
}
