"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVariantUpdationInput = exports.validateVariantCreationInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const MAX_GRAMS = 1000000; //gram
const INVENTORY_POLICIES = ['continue', 'deny'];
const validateVariantCreationInput = (0, _1.validateData)(joi_1.default.object({
    product_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    variant_image: joi_1.default.string().regex(_1.REGEX_ID),
    barcode: joi_1.default.string(),
    price: joi_1.default.number().integer().positive(),
    grams: joi_1.default.number().integer().positive().max(MAX_GRAMS),
    sku: joi_1.default.string(),
    position: joi_1.default.number(),
    inventory_management: joi_1.default.string().allow(null),
    inventory_quantity: joi_1.default.number().integer().positive(),
    inventory_policy: joi_1.default.string().valid(...INVENTORY_POLICIES),
    option1: joi_1.default.string().required(),
    option2: joi_1.default.string(),
    option3: joi_1.default.string(),
}));
exports.validateVariantCreationInput = validateVariantCreationInput;
const validateVariantUpdationInput = (0, _1.validateData)(joi_1.default.object({
    barcode: joi_1.default.string().allow(null),
    price: joi_1.default.number().min(0),
    grams: joi_1.default.number().min(0).max(MAX_GRAMS),
    sku: joi_1.default.string(),
    inventory_management: joi_1.default.string().allow(null),
    inventory_quantity: joi_1.default.number().min(0),
    inventory_policy: joi_1.default.string().valid(...INVENTORY_POLICIES),
    option1: joi_1.default.string(),
    option2: joi_1.default.string(),
    option3: joi_1.default.string(),
}));
exports.validateVariantUpdationInput = validateVariantUpdationInput;
//# sourceMappingURL=variant.validation.js.map