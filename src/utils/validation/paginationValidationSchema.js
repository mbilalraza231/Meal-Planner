import Joi from 'joi';

// Define the Joi validation schema for pagination in the GET request
const paginationValidationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.min': 'Page must be greater than or equal to 1',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.min': 'Limit must be greater than or equal to 1',
    'number.max': 'Limit must be less than or equal to 100',
  }),
  search: Joi.string().allow('').optional().messages({
    'string.base': 'Search term must be a string',
  }),
}).unknown(false).strict();

export default paginationValidationSchema;
