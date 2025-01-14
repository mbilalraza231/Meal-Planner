import { NextResponse } from "next/server";
import { dbConnect } from '@/db/connectDb';
import Meal from '@/db/models/Meal';
import mealValidationSchema from '@/utils/validation/mealValidationSchema'; // Import the Joi validation schema

export async function POST(request) {
  try {
    await dbConnect(); // Ensure DB connection before performing the operation

    // Parse the incoming JSON data
    const data = await request.json();
    console.log('Received meal data:', data); // Log the incoming data for debugging

    // Validate the data using the Joi validation schema
    const { error, value } = mealValidationSchema.validate(data, { abortEarly: false });

    if (error) {
      // If validation fails, return a 400 status with the error details
      const errorMessages = error.details.map(err => err.message);
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    // If validation passes, create a new Meal instance and save it
    const meal = new Meal(value);
    const savedMeal = await meal.save();

    // Return the created meal with a 201 status
    return NextResponse.json(savedMeal, { status: 201 });

  } catch (error) {
    // Handle unexpected errors (e.g., database issues) and return a 500 status
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