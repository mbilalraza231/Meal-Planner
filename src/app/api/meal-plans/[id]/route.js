import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import MealPlan from '@/db/models/MealPlan';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  await dbConnect();
  const id = params.id;

  try {
    const mealPlan = await MealPlan.findById(id).populate('meals.recipes');
    if (!mealPlan) {
      return NextResponse.json({ error: "Meal plan not found" }, { status: 404 });
    }
    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    return NextResponse.json({ error: "Failed to fetch meal plan" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const id = params.id;

  try {
    const updateData = await request.json();
    const mealPlan = await MealPlan.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!mealPlan) {
      return NextResponse.json({ error: "Meal plan not found" }, { status: 404 });
    }
    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error("Error updating meal plan:", error);
    return NextResponse.json(
      { error: "Failed to update meal plan" },
      { status: error.name === "ValidationError" ? 400 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const id = params.id;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const mealPlan = await MealPlan.findByIdAndDelete(id);
    if (!mealPlan) {
      return NextResponse.json({ error: "Meal plan not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Meal plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal plan:", error.message);
    return NextResponse.json({ error: "Failed to delete meal plan" }, { status: 500 });
  }
} 