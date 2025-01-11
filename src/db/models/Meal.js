import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  date: {
    type: Date,
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
MealSchema.index({ user: 1, date: 1 });
MealSchema.index({ mealType: 1 });

export default mongoose.models.Meal || mongoose.model('Meal', MealSchema);