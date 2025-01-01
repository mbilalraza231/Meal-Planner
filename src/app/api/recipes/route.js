// app/api/recipes/route.js
import { NextResponse } from "next/server";
import Recipe from '@/db/models/Recipe';
import { dbConnect } from '@/db/connectDb';

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
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}



