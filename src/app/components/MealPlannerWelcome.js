export default function MealPlannerWelcome({ onAddNew }) {
  return (
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
          onClick={onAddNew}
          className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Add New Meal
        </button>
      </div>
    </div>
  );
} 