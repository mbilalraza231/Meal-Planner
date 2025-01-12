import React, { useEffect } from 'react';
import EditMealPlanForm from '../forms/EditMealPlanForm';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Meal Plan</h2>
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

        <EditMealPlanForm
          key={editingMeal._id}
          mealPlan={editingMeal}
          onMealPlanChange={setEditingMeal}
          onSubmit={handleEditSubmit}
        />
      </div>
    </div>
  );
} 