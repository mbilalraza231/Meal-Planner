// app/api/recipes/route.js
import { NextResponse } from "next/server";
import Recipe from '@/db/models/Recipe';  // Mongoose model for Recipe
import { dbConnect } from '@/db/connectDb'; // DB connection utility
import recipeSchema from '@/utils/validation/recipeValidationSchema'; // Joi validation schema

export async function GET(request) {
  await dbConnect();

  try {
    const recipes = await Recipe.find();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const recipeData = await request.json();

    // Validate incoming data using Joi schema
    const { error } = recipeSchema.validate(recipeData, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(err => err.message);  // Collect all validation error messages
      return NextResponse.json({ error: errorMessages }, { status: 400 });  // Return 400 status if validation fails
    }

    // If validation passes, create a new Recipe in the database
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    
    return NextResponse.json(newRecipe, { status: 201 }); // Return the created recipe with 201 status
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });  // Handle unexpected errors with 500
  }
}
