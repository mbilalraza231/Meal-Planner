// app/api/meal-plans/route.js

import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import MealPlan from '@/db/models/MealPlan';
import Recipe from '@/db/models/Recipe';

export async function GET() {
  await dbConnect();
  try {
    const mealPlans = await MealPlan.find().sort({ date: 1 });
    return NextResponse.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    return NextResponse.json({ error: 'Failed to fetch meal plans' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const mealData = await request.json();
    console.log('API received data:', mealData);

    const newMealPlan = new MealPlan({
      userId: mealData.userId,
      date: new Date(mealData.date),
      mealType: mealData.mealType,
      details: {
        name: mealData.details.name,
        ingredients: mealData.details.ingredients || [],
        instructions: mealData.details.instructions || [],
        cookingTime: mealData.details.cookingTime || "",
        servings: mealData.details.servings || 1
      },
      notes: mealData.notes || "",
      recipeId: mealData.recipeId,
      mealId: mealData.mealId
    });

    console.log('Attempting to save meal plan:', JSON.stringify(newMealPlan, null, 2));
    const savedMealPlan = await newMealPlan.save();
    console.log('Meal plan saved successfully:', savedMealPlan._id);

    return NextResponse.json(savedMealPlan, { status: 201 });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message || 'Failed to create meal plan' },
      { status: 500 }
    );
  }
}

// Optional: Add PUT and DELETE methods if needed
export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Meal plan ID is required" },
        { status: 400 }
      );
    }

    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('meals');

    if (!updatedMealPlan) {
      return NextResponse.json(
        { error: "Meal plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMealPlan);
  } catch (error) {
    console.error("Error updating meal plan:", error);
    return NextResponse.json(
      { error: "Failed to update meal plan" },
      { status: 500 }
    );
  }
}