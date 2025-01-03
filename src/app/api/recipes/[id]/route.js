import { NextResponse } from "next/server";
import Recipe from '@/db/models/Recipe';
import { dbConnect } from '@/db/connectDb';

export async function GET(request, { params }) {
  await dbConnect();
  const id = params.id;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}