"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = require("../utils");
const DOCUMENT_NAME = 'Variant';
const COLLECTION_NAME = 'Variants';
const variantSchema = new mongoose_1.Schema({
    variant_title: String,
    product_id: { type: String, required: true },
    variant_image: { type: mongoose_1.Types.ObjectId, ref: 'Image' },
    barcode: { type: String, default: null, maxLength: 50 },
    price: {
        type: Number,
        default: 0.0,
        validate: {
            validator: utils_1.integerGreaterThanZeroValidator,
            message: (props) => `${props.value} must be an integer and greater than 0!`,
        },
    },
    grams: {
        type: Number,
        default: 0.0,
        min: [0, 'Grams must be above 0.0'],
    },
    sku: { type: String, default: null },
    position: {
        type: Number,
        required: true,
        validate: {
            validator: utils_1.integerGreaterThanZeroValidator,
            message: (props) => `${props.value} must be an integer and greater than 0!`,
        },
    },
    inventory_management: { type: String, default: null },
    inventory_quantity: {
        type: Number,
        default: 0.0,
        validate: {
            validator: utils_1.integerGreaterThanZeroValidator,
            message: (props) => `${props.value} must be an integer and greater than 0!`,
        },
    },
    inventory_policy: {
        type: String,
        enum: ['deny', 'continue'],
        default: 'continue',
    },
    option1: { type: String, required: true, default: 'Default Title' },
    option2: { type: String, default: null },
    option3: { type: String, default: null },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
variantSchema.pre('save', function (next) {
    this.variant_title = (0, slugify_1.default)((0, utils_1.joinCharacterToManyString)([this.option1, this.option2, this.option3], '/'), { lower: true });
    next();
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, variantSchema);
//# sourceMappingURL=variant.model.js.map