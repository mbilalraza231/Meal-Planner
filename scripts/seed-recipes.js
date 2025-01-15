import { dbConnect, dbDisconnect } from '../src/db/connectDb.js';
import Recipe from '../src/db/models/Recipe.js';
import { recipes } from '../src/db/seeders/data/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedRecipes() {
  try {
    console.log('\n📝 Seeding recipes...');
    await Recipe.deleteMany({});

        // Validate each recipe before inserting
    for (const recipe of recipes) {
      if (!recipe.title || typeof recipe.title !== 'string') {
        throw new Error(`Invalid recipe title: ${recipe.title}`);
      }
      if (!recipe.servings || typeof recipe.servings !== 'number') {
        throw new Error(`Invalid servings for recipe: ${recipe.title}`);
      }
      // more validation checks
    }

    await Recipe.insertMany(recipes);
    console.log('✅ Successfully inserted', recipes.length, 'recipes\n');
    return recipes;
  } catch (error) {
    console.error('\n❌ Error seeding recipes:', error);
    throw error;
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  console.log('\n🚀 Starting recipe seeding...');
  dbConnect()
    .then(seedRecipes)
    .then(async () => {
      await dbDisconnect();
      console.log('✨ Recipe seeding complete!\n');
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('❌ Seeding failed:', error);
      await dbDisconnect();
      process.exit(1);
    });
}

export { seedRecipes };