"use client";

import { useState } from 'react';
import { useMealPlans } from '@/hooks/useMealPlans';
import { useAddMealPlan } from '@/hooks/useAddMealPlan';
import { useDeleteMealPlan } from '@/hooks/useDeleteMealPlan';
import { format, parseISO } from 'date-fns';
import MealPlannerWelcome from '../components/MealPlannerWelcome';
import AddMealModal from '../components/modals/AddMealModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import ViewDetailsModal from '../components/modals/ViewDetailsModal';
import EditMealPlanForm from '../components/forms/EditMealPlanForm';
import Modal from '../components/modals/Modal';

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
  const { mealPlans, setMealPlans, loading } = useMealPlans();
  const { addMealPlan } = useAddMealPlan();
  const { deleteMealPlan } = useDeleteMealPlan();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddNew = async (mealPlanData) => {
    try {
      const newMealPlan = await addMealPlan(mealPlanData);
      if (newMealPlan) {
        // Update the state with the new meal plan
        setMealPlans(prevMealPlans => {
          const updatedPlans = [...prevMealPlans, newMealPlan];
          console.log('Updated meal plans:', updatedPlans); // Debug log
          return updatedPlans;
        });
        setShowAddModal(false);
        return newMealPlan; // Return the new meal plan to indicate success
      }
    } catch (error) {
      console.error('Error adding meal plan:', error);
      throw error; // Propagate the error to be handled by the modal
    }
  };


  const handleDelete = (id) => {
    setSelectedMealPlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMealPlan(selectedMealPlanId);
      setMealPlans(prevPlans => prevPlans.filter(plan => plan._id !== selectedMealPlanId));
      setShowDeleteModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleViewDetails = (plan) => {
    console.log('View Details clicked for plan:', plan);
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const handleEdit = (plan) => {
    setSelectedPlan({
      ...plan,
      date: plan.date || new Date().toISOString().split('T')[0],
      details: {
        mealName: plan.details?.mealName || '',
        ingredients: plan.details?.ingredients || [],
        instructions: plan.details?.instructions || [],
        cookingTime: plan.details?.cookingTime || '',
        servings: plan.details?.servings || 1
      }
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedPlan(null);
  };

  const handleEditSubmit = async (updatedMealPlan) => {
    try {
      // Optimistically update UI
      setMealPlans(prevPlans => 
        prevPlans.map(plan => 
          plan._id === selectedPlan._id ? { ...plan, ...updatedMealPlan } : plan
        )
      );

      const response = await fetch(`/api/meal-plans/${selectedPlan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMealPlan),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update meal plan');
      }

      // Close modal on success
      closeEditModal();
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating meal plan:', error);
      alert(error.message);
      
      // Revert optimistic update on error
      const response = await fetch(`/api/meal-plans/${selectedPlan._id}`);
      const currentPlan = await response.json();
      setMealPlans(prevPlans => 
        prevPlans.map(plan => 
          plan._id === selectedPlan._id ? currentPlan : plan
        )
      );
    }
  };


  

  return (
    <div className="container mx-auto px-4 py-8">
      <MealPlannerWelcome onAddNew={() => setShowAddModal(true)} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
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
                    <tr key={plan._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {plan.details.mealName} 
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {format(new Date(plan.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            plan?.mealType === "breakfast"
                              ? "bg-yellow-100 text-yellow-800"
                              : plan?.mealType === "lunch"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {(plan?.mealType || "dinner").charAt(0).toUpperCase() + (plan?.mealType || "dinner").slice(1)}
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
      )}

      {showAddModal && (
        <AddMealModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddNew}
        />
      )}

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <ViewDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} mealPlan={selectedPlan} />

      <Modal show={showEditModal} onClose={closeEditModal}>
        <EditMealPlanForm 
          mealPlan={selectedPlan}
          onMealPlanChange={setSelectedPlan} 
          onSubmit={handleEditSubmit} 
        />
      </Modal>
    </div>
  );
}
