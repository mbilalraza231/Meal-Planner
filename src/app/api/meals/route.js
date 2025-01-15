import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import Meal from '@/db/models/Meal';
import mealValidationSchema from '@/utils/validation/mealValidationSchema'; // Import the Joi validation schema

export async function POST(request) {
  try {
    await dbConnect(); 
    const data = await request.json();
    console.log('Received meal data:', data); // Log the incoming data for debugging
    const { error, value } = mealValidationSchema.validate(data, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(err => err.message);
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    const meal = new Meal(value);
    const savedMeal = await meal.save();

    return NextResponse.json(savedMeal, { status: 201 });

  } catch (error) {
    console.error('Error creating meal:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create meal' },
      { status: 500 }
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