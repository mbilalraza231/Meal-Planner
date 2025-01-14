import Joi from 'joi';

// Define the Joi validation schema for the meal
const mealValidationSchema = Joi.object({
    userId: Joi.string().default('temp-user-id').required(),
  mealName: Joi.string().min(1).required().messages({
    'string.base': 'Meal name must be a string',
    'string.empty': 'Meal name is required',
  }),
  ingredients: Joi.array().items(Joi.string().min(1)).min(1).required().messages({
    'array.base': 'Ingredients must be an array of strings',
    'array.min': 'At least one ingredient is required',
  }),
  instructions: Joi.array().items(Joi.string().min(1)).min(1).required().messages({
    'array.base': 'Instructions must be an array of strings',
    'array.min': 'At least one instruction is required',
  }),
  cookingTime: Joi.string().min(1).required().messages({
    'string.base': 'Cooking time must be a string',
    'string.empty': 'Cooking time is required',
  }),
  servings: Joi.number().integer().min(1).required().messages({
    'number.base': 'Servings must be a number',
    'number.min': 'Servings must be greater than or equal to 1',
  }),
  notes: Joi.string().allow('').optional().messages({
    'string.base': 'Notes must be a string',
  }),
  
}).unknown(false).strict();

export default mealValidationSchema;
