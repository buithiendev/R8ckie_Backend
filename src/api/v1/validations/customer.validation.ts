import Joi from 'joi'
import { validateData } from '.'

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
}

const validationLoginCustomer = validateData(
    Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.password),
    }),
)

const validationRegisterCustomer = validateData(
    Joi.object({
        first_name: Joi.string().required().messages(sharedMessages.firstName),
        last_name: Joi.string().required().messages(sharedMessages.lastName),
        email: Joi.string()
            .email({ tlds: { allow: ['net', 'com'] } })
            .min(9)
            .max(100)
            .required()
            .messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.password),
        repeat_password: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Repeat password must be password',
            }),
    }),
)

export { validationLoginCustomer, validationRegisterCustomer }
