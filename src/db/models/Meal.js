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
  ingredients: [{ type: String, required: true }  ],
  instructions: [{ type: String, required: true }],
  cookingTime: { type: String, required: true },
  servings: { type: Number, required: true, default: 1},
  notes: { type: String, default: ""}
}, { timestamps: true });

// Add indexes for better query performance
MealSchema.index({ userId: 1 });

// Delete the model if it exists to force recompilation
if (mongoose.models.Meal) {
  delete mongoose.models.Meal;
}

export default mongoose.model('Meal', MealSchema);