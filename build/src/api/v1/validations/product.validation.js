"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductUpdateInput = exports.validateProductCreationInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const INVENTORY_POLICIES = ['continue', 'deny'];
const schemaVariantOfProduct = joi_1.default.object({
    position: joi_1.default.number(),
    option1: joi_1.default.string().required(),
    option2: joi_1.default.when('product_options.length', {
        is: 2,
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string(),
    }),
    option3: joi_1.default.when('product_options.length', {
        is: 3,
        then: joi_1.default.string().required(),
        otherwise: joi_1.default.string(),
    }),
    barcode: joi_1.default.string(),
    price: joi_1.default.number(),
    grams: joi_1.default.number(),
    sku: joi_1.default.string(),
    inventory_management: joi_1.default.string().allow(null),
    inventory_quantity: joi_1.default.number(),
    inventory_policy: joi_1.default.string().valid(...INVENTORY_POLICIES),
});
const validateProductCreationInput = (0, _1.validateData)(joi_1.default.object({
    product_name: joi_1.default.string().required(),
    product_description: joi_1.default.string(),
    product_vendor: joi_1.default.string(),
    product_type: joi_1.default.string(),
    tags: joi_1.default.string(),
    product_images: joi_1.default.array().items(joi_1.default.object({
        image_url: joi_1.default.string().required(),
        image_file_name: joi_1.default.string().required(),
        position: joi_1.default.number(),
    })),
    product_options: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().required(),
        position: joi_1.default.number(),
    })),
    product_ratings_averager: joi_1.default.number().min(1).max(5),
    only_hide_from_list: joi_1.default.boolean(),
    not_allow_promotion: joi_1.default.boolean(),
    published_at: joi_1.default.string(),
    isDraft: joi_1.default.boolean(),
    isPublished: joi_1.default.boolean(),
    product_variants: joi_1.default.array().items(schemaVariantOfProduct),
}));
exports.validateProductCreationInput = validateProductCreationInput;
const validateProductUpdateInput = (0, _1.validateData)(joi_1.default.object({
    product_name: joi_1.default.string().max(140),
    product_description: joi_1.default.string(),
    product_vendor: joi_1.default.string(),
    product_type: joi_1.default.string(),
    not_allow_promotion: joi_1.default.boolean(),
    tags: joi_1.default.string(),
}));
exports.validateProductUpdateInput = validateProductUpdateInput;
//# sourceMappingURL=product.validation.js.map