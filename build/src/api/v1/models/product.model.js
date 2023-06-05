"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';
const productSchema = new mongoose_1.Schema({
    product_name: { type: String, required: true, maxLength: 140 },
    product_slug: String,
    product_description: { type: String, default: '' },
    product_type: { type: String, default: '' },
    product_vendor: { type: String, default: '' },
    product_images: [{ type: mongoose_1.Types.ObjectId, ref: 'Image' }],
    product_variants: [{ type: mongoose_1.Types.ObjectId, ref: 'Variant' }],
    product_options: {
        type: [
            new mongoose_1.Schema({
                name: { type: String, required: true },
                _position: { type: Number, required: true },
            }),
        ],
        default: [],
    },
    product_ratings_averager: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be above 5.0'],
        set: (val) => Math.round(val * 10) / 10,
    },
    tags: { type: String, default: null },
    isDraft: { type: Boolean, default: false, select: false, index: true },
    isPublished: {
        type: Boolean,
        default: true,
        select: false,
        index: true,
    },
    only_hide_from_list: { type: Boolean, default: false },
    not_allow_promotion: { type: Boolean, default: false },
    published_at: { type: String, default: Date.now },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
productSchema.index({
    product_name: 'text',
    product_description: 'text',
    tags: 'text',
    product_type: 'text',
});
productSchema.pre('save', function (next) {
    this.product_slug = (0, slugify_1.default)(this.product_name, { lower: true });
    if (this.tags) {
        this.tags = this.tags.replace(/\s+/g, '');
    }
    next();
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, productSchema);
//# sourceMappingURL=product.model.js.map