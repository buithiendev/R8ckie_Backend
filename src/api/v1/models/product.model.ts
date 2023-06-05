import { Schema, Types, model } from 'mongoose'
import slugify from 'slugify'
import { OptionProduct } from '../interfaces/product/ProductService.interface'
import { Product } from './interfaces/product.interface'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema<Product>(
    {
        product_name: { type: String, required: true, maxLength: 140 },
        product_slug: String,
        product_description: { type: String, default: '' },
        product_type: { type: String, default: '' },
        product_vendor: { type: String, default: '' },
        product_images: [{ type: Types.ObjectId, ref: 'Image' }],
        product_variants: [{ type: Types.ObjectId, ref: 'Variant' }],
        product_options: {
            type: [
                new Schema<OptionProduct>({
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
            set: (val: number) => Math.round(val * 10) / 10,
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)
productSchema.index({
    product_name: 'text',
    product_description: 'text',
    tags: 'text',
    product_type: 'text',
})

productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    if (this.tags) {
        this.tags = this.tags.replace(/\s+/g, '')
    }
    next()
})

export default model<Product>(DOCUMENT_NAME, productSchema)
