"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRegisterCustomer = exports.validationLoginCustomer = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const sharedMessages = {
    email: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'string.email': '{{#label}} must be a valid email',
        'any.required': '{{#label}} is required',
    },
    password: {
        'string.min': '{{#label}} length must be at least {#limit} characters long',
        'string.max': '{{#label}} length must be less than or equal to {#limit} characters long',
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
};
const validationLoginCustomer = (0, _1.validateData)(joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(sharedMessages.email),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required()
        .messages(sharedMessages.password),
}));
exports.validationLoginCustomer = validationLoginCustomer;
const validationRegisterCustomer = (0, _1.validateData)(joi_1.default.object({
    first_name: joi_1.default.string().required().messages(sharedMessages.firstName),
    last_name: joi_1.default.string().required().messages(sharedMessages.lastName),
    email: joi_1.default.string()
        .email({ tlds: { allow: ['net', 'com'] } })
        .min(9)
        .max(100)
        .required()
        .messages(sharedMessages.email),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required()
        .messages(sharedMessages.password),
    repeat_password: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .messages({
        'any.only': 'Repeat password must be password',
    }),
}));
exports.validationRegisterCustomer = validationRegisterCustomer;
//# sourceMappingURL=customer.validation.js.map