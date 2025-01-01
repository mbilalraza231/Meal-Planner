import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  meals: [{
    date: { type: Date, required: true },
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }]
  }],
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema);
