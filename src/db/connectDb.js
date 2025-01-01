import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Initializing database connection...');

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  console.log('Creating new mongoose cache');
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log('🟢 Using existing database connection');
    return cached.conn;
  }

  console.log('🔄 Connecting to MongoDB...');
  
  try {
    cached.promise = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    
    cached.conn = cached.promise;
    console.log('✅ MongoDB Connected Successfully');
    return cached.conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    cached.promise = null;
    throw error;
  }
}

export async function dbDisconnect() {
  if (cached.conn) {
    try {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
      console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
      console.error('Error during disconnect:', error);
      throw error;
    }
  }
}