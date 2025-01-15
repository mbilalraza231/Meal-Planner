// app/api/recipes/route.js
import { NextResponse } from "next/server";
import Recipe from '@/db/models/Recipe';  // Mongoose model for Recipe
import { dbConnect } from '@/db/connectDb'; // DB connection utility
import recipeSchema from '@/utils/validation/recipeValidationSchema'; // Joi validation schema

import paginationValidationSchema from '@/utils/validation/paginationValidationSchema'; // Import the schema

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';

  // Validate the query parameters with Joi
  const { error, value } = paginationValidationSchema.validate({ page, limit, search });

  // If validation fails, return an error response
  if (error) {
    return NextResponse.json({ error: error.details[0].message }, { status: 400 });
  }

  const { page: validatedPage, limit: validatedLimit, search: validatedSearch } = value;

  try {
    // Query with pagination and optional search
    const recipesQuery = Recipe.find()
      .skip((validatedPage - 1) * validatedLimit)
      .limit(validatedLimit);

    if (validatedSearch) {
      recipesQuery.where('title').regex(new RegExp(validatedSearch, 'i')); // Case-insensitive search
    }

    const recipes = await recipesQuery;

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
   //manually validate the data
  //  if (!recipeData.title || typeof recipeData.title !== 'string') {
  //   return NextResponse.json({ error: 'Title is required and must be a string' }, { status: 400 });
  // }

    console.log('Received recipe data:', recipeData); // Log the incoming data
    const { error, value } = recipeSchema.validate(recipeData, { abortEarly: false });
    console.log('Validation result:', { error, value });  // Log any validation errors

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
