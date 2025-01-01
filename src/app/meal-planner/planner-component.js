"use client";

import { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PlannerComponent = ({ availableMeals }) => {
  const [mealPlan, setMealPlan] = useState({});

  const handleMealSelect = (day, meal) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: meal,
    }));
  };

  return (
    <div className="grid gap-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2">{day}</h3>
          <select
            value={mealPlan[day]?.title || ""}
            onChange={(e) => {
              const selectedMeal = availableMeals.find(
                (m) => m.title === e.target.value
              );
              handleMealSelect(day, selectedMeal);
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a meal</option>
            {availableMeals.map((meal) => (
              <option key={meal.id} value={meal.title}>
                {meal.title}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default PlannerComponent;
