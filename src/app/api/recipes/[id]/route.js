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

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const id = params.id;
    const updateData = await request.json();
    
    const recipe = await Recipe.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: error.name === "ValidationError" ? 400 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const id = params.id;
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}