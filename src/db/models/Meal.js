
import mongoose from 'mongoose';
const MealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isCustomMeal: {
    type: Boolean,
    default: false
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: function() { return !this.isCustomMeal; }
  },
  customMealDetails: {
    name: String,
    ingredients: [String],
    instructions: [String],
    cookingTime: String,
    servings: Number
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  notes: String
}, { timestamps: true });