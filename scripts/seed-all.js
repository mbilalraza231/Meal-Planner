import { dbConnect, dbDisconnect } from '../src/db/connectDb.js';
import { seedRecipes } from './seed-recipes.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

async function seedAll() {
  try {
    console.log('\n🚀 Starting database seeding...');
    console.log('Attempting database connection...');
    
    await dbConnect();
    
    console.log('\n🌱 Running all seeders...');
    await seedRecipes();
    console.log('\n✨ All data seeded successfully!');
    
    await dbDisconnect();
    console.log('👋 Database seeding complete!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    await dbDisconnect().catch(console.error);
    process.exit(1);
  }
}

// Self-executing async function
(async () => {
  console.log('Starting seeding process...');
  await seedAll().catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
})();

export { seedAll };