"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationLoginAdmin = exports.validationCreateAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const PERMISSION = ['Admin', 'Order', 'Product'];
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
    phoneNumber: {
        'string.min': '{{#label}} length must be at least {#limit} characters long',
        'string.max': '{{#label}} length must be less than or equal to {#limit} characters long',
        'any.required': '{{#label}} is required',
    },
};
const validationLoginAdmin = (0, _1.validateData)(joi_1.default.object({
    email: joi_1.default.string().email().required().messages(sharedMessages.email),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required()
        .messages(sharedMessages.email),
}));
exports.validationLoginAdmin = validationLoginAdmin;
const validationCreateAdmin = (0, _1.validateData)(joi_1.default.object({
    first_name: joi_1.default.string().required().messages(sharedMessages.firstName),
    last_name: joi_1.default.string().required().messages(sharedMessages.lastName),
    email: joi_1.default.string()
        .email({ tlds: { allow: ['net', 'com'] } })
        .required()
        .messages(sharedMessages.email),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required()
        .messages(sharedMessages.password),
    phone_number: joi_1.default.string()
        .min(10)
        .max(11)
        .required()
        .messages(sharedMessages.phoneNumber),
    roles: joi_1.default.array()
        .items(joi_1.default.string().valid(...PERMISSION))
        .has(joi_1.default.string().valid(...PERMISSION)),
}));
exports.validationCreateAdmin = validationCreateAdmin;
//# sourceMappingURL=admin.validation.js.map