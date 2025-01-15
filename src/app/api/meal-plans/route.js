// app/api/meal-plans/route.js

import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import MealPlan from '@/db/models/MealPlan';
import mongoose from 'mongoose';

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
  try {
    await dbConnect();
    const data = await request.json();
    console.log('Raw API received data:', data);

    if ((!data.recipeId && !data.mealId) || (data.recipeId && data.mealId)) {
      throw new Error('Either recipeId or mealId must be provided, but not both');
    }

    // Safely convert string IDs to ObjectIds
    const mealPlanData = {
      ...data,
      recipeId: data.recipeId && mongoose.isValidObjectId(data.recipeId) 
        ? new mongoose.Types.ObjectId(data.recipeId) 
        : null,
      mealId: data.mealId && mongoose.isValidObjectId(data.mealId)
        ? new mongoose.Types.ObjectId(data.mealId)
        : null
    };

    console.log('Processed meal plan data:', mealPlanData);

    const mealPlan = new MealPlan(mealPlanData);
    const savedMealPlan = await mealPlan.save();
    
    return NextResponse.json(savedMealPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add meal plan' },
      { status: 400 }
    );
  }
}

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