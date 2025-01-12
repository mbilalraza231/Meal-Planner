import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import Meal from '@/db/models/Meal';

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const meal = new Meal(data);
    const savedMeal = await meal.save();
    
    return NextResponse.json(savedMeal, { status: 201 });
  } catch (error) {
    console.error('Error creating meal:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create meal' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const meals = await Meal.find();
    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch meals' },
      { status: 500 }
    );
  }
} 