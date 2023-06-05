import Joi from 'joi'
import { validateData } from '.'

const validateCreateAddress = validateData(
    Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string(),
        country_code: Joi.string(),
        country: Joi.string(),
        province_code: Joi.string().required(),
        province: Joi.string().required(),
        district_code: Joi.string().required(),
        district: Joi.string().required(),
        ward_code: Joi.string().required(),
        ward: Joi.string().required(),
        company: Joi.string(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.string().min(10).max(11).required(),
        default: Joi.boolean(),
    }),
)

const validateUpdateAddress = validateData(
    Joi.object({
        address1: Joi.string(),
        address2: Joi.string(),
        country_code: Joi.string(),
        country: Joi.string(),
        province_code: Joi.string(),
        province: Joi.string(),
        district_code: Joi.string(),
        district: Joi.string(),
        ward_code: Joi.string(),
        ward: Joi.string(),
        company: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        phone_number: Joi.string().min(10).max(11),
        default: Joi.boolean(),
    }),
)

export { validateCreateAddress, validateUpdateAddress }
