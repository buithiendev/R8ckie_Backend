import Joi from 'joi'
import { REGEX_ID, validateData } from '.'

const validateImageCreationInput = validateData(
    Joi.object({
        product_id: Joi.string().regex(REGEX_ID).required(),
        image_url: Joi.string().uri().required(),
        image_file_name: Joi.string().required(),
        position: Joi.number(),
    }),
)

export { validateImageCreationInput }
