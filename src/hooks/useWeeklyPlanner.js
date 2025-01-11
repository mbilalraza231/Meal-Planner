import { useState } from 'react';

export function useWeeklyPlanner() {
  const [weeklyPlan, setWeeklyPlan] = useState({});

  const updateDayMeal = (day, meal) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: meal
    }));
  };

  const clearPlan = () => {
    setWeeklyPlan({});
  };

  const getDayMeal = (day) => {
    return weeklyPlan[day];
  };

  return {
    weeklyPlan,
    updateDayMeal,
    clearPlan,
    getDayMeal
  };
} 