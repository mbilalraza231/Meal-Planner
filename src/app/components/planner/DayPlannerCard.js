export default function DayPlannerCard({ 
  day, 
  selectedMeal, 
  availableMeals, 
  onMealSelect 
}) {
  return (
    <div className="border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{day}</h3>
      <select
        value={selectedMeal?.title || ""}
        onChange={(e) => {
          const selectedMeal = availableMeals.find(
            (meal) => meal.title === e.target.value
          );
          onMealSelect(day, selectedMeal);
        }}
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a meal</option>
        {availableMeals.map((meal) => (
          <option key={meal.id} value={meal.title}>
            {meal.title}
          </option>
        ))}
      </select>
    </div>
  );
} 