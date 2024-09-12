import Joi, { ObjectSchema } from "joi";

export const productCreateSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters long",
  }),

  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),

  price: Joi.number().positive().min(0.01).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "number.min": "Price must be at least 0.01",
    "any.required": "Price is required",
  }),
}) as ObjectSchema; // Explicitly cast the schema
