import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'temp-user-id'
  },
  mealName: { 
    type: String, 
    required: true 
  },
  // Essential meal details
  ingredients: [String],
  instructions: [String],
  cookingTime: String,
  servings: Number,
  notes: String
}, { timestamps: true });

// Add indexes for better query performance
MealSchema.index({ userId: 1 });

// Delete the model if it exists to force recompilation
if (mongoose.models.Meal) {
  delete mongoose.models.Meal;
}

export default mongoose.model('Meal', MealSchema);