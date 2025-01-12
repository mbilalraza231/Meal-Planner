import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'temp-user-id'
  },
  mealId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meal', 
    default: null 
  },
  recipeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe', 
    default: null 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true,
    default: 'dinner'
  },
  details: {
    name: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    cookingTime: { type: String, default: "" },
    servings: { type: Number, default: 1 }
  },
  notes: { type: String, default: "" }
}, { 
  timestamps: true,
  strict: true
});

// Custom validation to ensure at least one of mealId or recipeId is provided
mealPlanSchema.pre('validate', function(next) {
  if (!this.mealId && !this.recipeId) {
    next(new Error('Either mealId or recipeId must be provided.'));
  } else if (this.mealId && this.recipeId) {
    next(new Error('Cannot provide both mealId and recipeId.'));
  } else {
    next();
  }
});

// Add pre-save middleware for logging
mealPlanSchema.pre('save', function(next) {
  console.log('Pre-save middleware:', this);
  next();
});

// Indexes for performance
mealPlanSchema.index({ userId: 1, date: 1 });

// Helper method to cache recipe details
mealPlanSchema.methods.cacheRecipeDetails = async function(recipeId) {
  const recipe = await mongoose.model('Recipe').findById(recipeId);
  if (recipe) {
    return {
      name: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings
    };
  }
  return null;
};

export default mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema);
