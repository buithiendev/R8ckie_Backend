import Joi from 'joi'
import { validateData } from '.'

const PERMISSION = ['Admin', 'Order', 'Product']

const sharedMessages = {
    email: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'string.email': '{{#label}} must be a valid email',
        'any.required': '{{#label}} is required',
    },
    password: {
        'string.min':
            '{{#label}} length must be at least {#limit} characters long',
        'string.max':
            '{{#label}} length must be less than or equal to {#limit} characters long',
        'any.required': '{{#label}} is required',
    },
    firstName: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'any.required': '{{#label}} is required',
    },
    lastName: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'any.required': '{{#label}} is required',
    },
    phoneNumber: {
        'string.min':
            '{{#label}} length must be at least {#limit} characters long',
        'string.max':
            '{{#label}} length must be less than or equal to {#limit} characters long',
        'any.required': '{{#label}} is required',
    },
}

const validationLoginAdmin = validateData(
    Joi.object({
        email: Joi.string().email().required().messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.email),
    }),
)

const validationCreateAdmin = validateData(
    Joi.object({
        first_name: Joi.string().required().messages(sharedMessages.firstName),
        last_name: Joi.string().required().messages(sharedMessages.lastName),
        email: Joi.string()
            .email({ tlds: { allow: ['net', 'com'] } })
            .required()
            .messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.password),
        phone_number: Joi.string()
            .min(10)
            .max(11)
            .required()
            .messages(sharedMessages.phoneNumber),
        roles: Joi.array()
            .items(Joi.string().valid(...PERMISSION))
            .has(Joi.string().valid(...PERMISSION)),
    }),
)

export { validationCreateAdmin, validationLoginAdmin }
