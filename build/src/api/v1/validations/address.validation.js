"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateAddress = exports.validateCreateAddress = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const validateCreateAddress = (0, _1.validateData)(joi_1.default.object({
    address1: joi_1.default.string().required(),
    address2: joi_1.default.string(),
    country_code: joi_1.default.string(),
    country: joi_1.default.string(),
    province_code: joi_1.default.string().required(),
    province: joi_1.default.string().required(),
    district_code: joi_1.default.string().required(),
    district: joi_1.default.string().required(),
    ward_code: joi_1.default.string().required(),
    ward: joi_1.default.string().required(),
    company: joi_1.default.string(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone_number: joi_1.default.string().min(10).max(11).required(),
    default: joi_1.default.boolean(),
}));
exports.validateCreateAddress = validateCreateAddress;
const validateUpdateAddress = (0, _1.validateData)(joi_1.default.object({
    address1: joi_1.default.string(),
    address2: joi_1.default.string(),
    country_code: joi_1.default.string(),
    country: joi_1.default.string(),
    province_code: joi_1.default.string(),
    province: joi_1.default.string(),
    district_code: joi_1.default.string(),
    district: joi_1.default.string(),
    ward_code: joi_1.default.string(),
    ward: joi_1.default.string(),
    company: joi_1.default.string(),
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    phone_number: joi_1.default.string().min(10).max(11),
    default: joi_1.default.boolean(),
}));
exports.validateUpdateAddress = validateUpdateAddress;
//# sourceMappingURL=address.validation.js.map