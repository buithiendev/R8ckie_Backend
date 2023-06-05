import Joi from 'joi'
import { validateData } from '.'

const INVENTORY_POLICIES = ['continue', 'deny']

const schemaVariantOfProduct = Joi.object({
    position: Joi.number(),
    option1: Joi.string().required(),
    option2: Joi.when('product_options.length', {
        is: 2,
        then: Joi.string().required(),
        otherwise: Joi.string(),
    }),
    option3: Joi.when('product_options.length', {
        is: 3,
        then: Joi.string().required(),
        otherwise: Joi.string(),
    }),
    barcode: Joi.string(),
    price: Joi.number(),
    grams: Joi.number(),
    sku: Joi.string(),
    inventory_management: Joi.string().allow(null),
    inventory_quantity: Joi.number(),
    inventory_policy: Joi.string().valid(...INVENTORY_POLICIES),
})

const validateProductCreationInput = validateData(
    Joi.object({
        product_name: Joi.string().required(),
        product_description: Joi.string(),
        product_vendor: Joi.string(),
        product_type: Joi.string(),
        tags: Joi.string(),
        product_images: Joi.array().items(
            Joi.object({
                image_url: Joi.string().required(),
                image_file_name: Joi.string().required(),
                position: Joi.number(),
            }),
        ),
        product_options: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                position: Joi.number(),
            }),
        ),
        product_ratings_averager: Joi.number().min(1).max(5),
        only_hide_from_list: Joi.boolean(),
        not_allow_promotion: Joi.boolean(),
        published_at: Joi.string(),
        isDraft: Joi.boolean(),
        isPublished: Joi.boolean(),
        product_variants: Joi.array().items(schemaVariantOfProduct),
    }),
)

const validateProductUpdateInput = validateData(
    Joi.object({
        product_name: Joi.string().max(140),
        product_description: Joi.string(),
        product_vendor: Joi.string(),
        product_type: Joi.string(),
        not_allow_promotion: Joi.boolean(),
        tags: Joi.string(),
    }),
)

export { validateProductCreationInput,validateProductUpdateInput }
