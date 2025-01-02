// app/api/meal-plans/route.js

import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import MealPlan from '@/db/models/MealPlan';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" }, 
        { status: 400 }
      );
    }

    const userMealPlans = await MealPlan.find({ userId })
      .sort({ weekStart: -1 })
      .populate('meals.recipes');

    return NextResponse.json({ mealPlans: userMealPlans });
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch meal plans" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const mealPlan = await request.json();

    // Validate required fields
    if (!mealPlan.userId || !mealPlan.weekStart || !mealPlan.meals) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          details: "userId, weekStart, and meals are required"
        },
        { status: 400 }
      );
    }

    // Validate meals array structure
    if (!Array.isArray(mealPlan.meals) || mealPlan.meals.length === 0) {
      return NextResponse.json(
        { error: "Meals must be a non-empty array" },
        { status: 400 }
      );
    }

    // Create new meal plan with additional metadata
    const newMealPlan = new MealPlan({
      ...mealPlan,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active', // You might want to add a status field
    });

    // Save to database
    await newMealPlan.save();

    // Return the saved meal plan with populated meals if needed
    const savedMealPlan = await MealPlan.findById(newMealPlan._id)
      .populate('meals'); // If you have meal references

    return NextResponse.json(savedMealPlan, { status: 201 });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    
    // Handle different types of errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: "Validation error",
          details: error.message 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create meal plan" },
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