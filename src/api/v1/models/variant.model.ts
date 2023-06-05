import { Schema, Types, model } from 'mongoose'
import slugify from 'slugify'
import {
    integerGreaterThanZeroValidator,
    joinCharacterToManyString,
} from '../utils'
import Variant from './interfaces/variant.interface'

const DOCUMENT_NAME = 'Variant'
const COLLECTION_NAME = 'Variants'

const variantSchema = new Schema<Variant>(
    {
        variant_title: String,
        product_id: { type: String, required: true },
        variant_image: { type: Types.ObjectId, ref: 'Image' },
        barcode: { type: String, default: null, maxLength: 50 },
        price: {
            type: Number,
            default: 0.0,
            validate: {
                validator: integerGreaterThanZeroValidator,
                message: (props) =>
                    `${props.value} must be an integer and greater than 0!`,
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
                validator: integerGreaterThanZeroValidator,
                message: (props) =>
                    `${props.value} must be an integer and greater than 0!`,
            },
        },
        inventory_management: { type: String, default: null },
        inventory_quantity: {
            type: Number,
            default: 0.0,
            validate: {
                validator: integerGreaterThanZeroValidator,
                message: (props) =>
                    `${props.value} must be an integer and greater than 0!`,
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)

variantSchema.pre('save', function (next) {
    this.variant_title = slugify(
        joinCharacterToManyString(
            [this.option1, this.option2, this.option3],
            '/',
        ),
        { lower: true },
    )
    next()
})

export default model<Variant>(DOCUMENT_NAME, variantSchema)
