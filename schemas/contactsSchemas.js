import Joi from "joi";

export const createContactSchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': 'Name is required',
		'string.empty': 'Name cannot be empty',
	}),
	email: Joi.string().email().required().messages({
		'any.required': 'Email is required',
		'string.email': 'Email must be a valid email',
	}),
	phone: Joi.string().required().messages({
		'any.required': 'Phone is required',
		'string.empty': 'Phone cannot be empty',
	}),
})

export const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
}).min(1).messages({
	'object.min': 'Body must have at least one field',
});

export const favoriteContactSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
