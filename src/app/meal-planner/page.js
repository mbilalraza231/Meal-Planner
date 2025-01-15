"use client";

import { useState } from 'react';
import { useMealPlans } from '@/hooks/useMealPlans';
import { useAddMealPlan } from '@/hooks/useAddMealPlan';
import { useDeleteMealPlan } from '@/hooks/useDeleteMealPlan';
import { format } from 'date-fns';
import MealPlannerWelcome from '../components/MealPlannerWelcome';
import AddMealModal from '../components/modals/AddMealModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import ViewDetailsModal from '../components/modals/ViewDetailsModal';
import MealPlanForm from '../components/forms/MealPlanForm';

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
  const [mealPlan, setMealPlan] = useState({});

  const handleAddNew = async (mealPlanData) => {
    try {
      const newMealPlan = await addMealPlan(mealPlanData);
      if (newMealPlan) {
        setMealPlans(prevMealPlans => [...prevMealPlans, newMealPlan]);
        setShowAddModal(false);
        return newMealPlan;
      }
    } catch (error) {
      console.error('Error adding meal plan:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MealPlannerWelcome onAddNew={() => setShowAddModal(true)} />

      <MealPlanForm 
        mealPlan={mealPlan} 
        onMealPlanChange={setMealPlan} 
        onSubmit={handleAddNew} 
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
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
                        <span className={`px-3 py-1 rounded-full text-sm ${plan?.mealType === "breakfast" ? "bg-yellow-100 text-yellow-800" : plan?.mealType === "lunch" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                          {(plan?.mealType || "dinner").charAt(0).toUpperCase() + (plan?.mealType || "dinner").slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleViewDetails(plan)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 underline">
                          View Details
                        </button> 
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(plan)} className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(plan._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
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
    </div>
  );
}
