import { dbConnect, dbDisconnect } from '../../src/db/db.js';
import { seedRecipes } from './seed-recipes.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedAll() {
  try {
    console.log('Starting database seeding...');
    await dbConnect();
    
    await seedRecipes();
    
    console.log('All data seeded successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await dbDisconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
} 