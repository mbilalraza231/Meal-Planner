"use client";

import { useState } from "react";
import DayPlannerCard from "./DayPlannerCard";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklyPlannerGrid({ availableMeals }) {
  const [weeklyPlan, setWeeklyPlan] = useState({});

  const handleMealSelect = (day, meal) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: meal,
    }));
  };

  return (
    <div className="grid gap-4">
      {DAYS_OF_WEEK.map((day) => (
        <DayPlannerCard
          key={day}
          day={day}
          selectedMeal={weeklyPlan[day]}
          availableMeals={availableMeals}
          onMealSelect={handleMealSelect}
        />
      ))}
    </div>
  );
} 