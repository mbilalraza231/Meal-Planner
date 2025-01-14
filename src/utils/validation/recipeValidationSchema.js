import Joi from 'joi';

// Define the Joi validation schema for the recipe
const recipeValidationSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
  }),
  description: Joi.string().min(1).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
  }),
  image: Joi.string().uri().required().messages({
    'string.base': 'Image must be a string',
    'string.uri': 'Image must be a valid URL',
    'string.empty': 'Image is required',
  }),
  category: Joi.string().min(1).required().messages({
    'string.base': 'Category must be a string',
    'string.empty': 'Category is required',
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
  rating: Joi.number().min(0).max(5).default(0).messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be between 0 and 5',
    'number.max': 'Rating must be between 0 and 5',
  }),
  reviews: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'Reviews must be a number',
    'number.min': 'Reviews must be greater than or equal to 0',
  }),
});

export default recipeValidationSchema;

