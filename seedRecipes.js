import mongoose from 'mongoose';
import { dbConnect } from './src/db/db';
import Recipe from './src/db/models/Recipe';

const sampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish",
    category: "Italian",
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano",
      "100g Parmigiano Reggiano",
      "Black pepper"
    ],
    instructions: [
      "Cook pasta in salted water",
      "Fry pancetta until crispy",
      "Mix eggs and cheese",
      "Combine all ingredients"
    ],
    cookingTime: "30 minutes",
    servings: 4,
    image: "https://example.com/carbonara.jpg"
  }
  // Add more sample recipes as needed
];

async function seedDatabase() {
  try {
    await dbConnect();
    await Recipe.deleteMany({}); // Clear existing recipes
    await Recipe.insertMany(sampleRecipes);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 