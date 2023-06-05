import Joi from 'joi'
import { REGEX_ID, validateData } from '.'

const MAX_GRAMS = 1000000 //gram
const INVENTORY_POLICIES = ['continue', 'deny']

const validateVariantCreationInput = validateData(
    Joi.object({
        product_id: Joi.string().regex(REGEX_ID).required(),
        variant_image: Joi.string().regex(REGEX_ID),
        barcode: Joi.string(),
        price: Joi.number().integer().positive(),
        grams: Joi.number().integer().positive().max(MAX_GRAMS),
        sku: Joi.string(),
        position: Joi.number(),
        inventory_management: Joi.string().allow(null),
        inventory_quantity: Joi.number().integer().positive(),
        inventory_policy: Joi.string().valid(...INVENTORY_POLICIES),
        option1: Joi.string().required(),
        option2: Joi.string(),
        option3: Joi.string(),
    }),
)

const validateVariantUpdationInput = validateData(
    Joi.object({
        barcode: Joi.string().allow(null),
        price: Joi.number().min(0),
        grams: Joi.number().min(0).max(MAX_GRAMS),
        sku: Joi.string(),
        inventory_management: Joi.string().allow(null),
        inventory_quantity: Joi.number().min(0),
        inventory_policy: Joi.string().valid(...INVENTORY_POLICIES),
        option1: Joi.string(),
        option2: Joi.string(),
        option3: Joi.string(),
    }),
)

export { validateVariantCreationInput, validateVariantUpdationInput }
