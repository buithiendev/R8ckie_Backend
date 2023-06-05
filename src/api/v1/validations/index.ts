import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { BadRequestError } from '../core/error.response'

const REGEX_ID = /^[0-9a-fA-F]{24}$/

function replaceBackslash(message: string) {
    const regex = /\\*"/g
    return message.replace(regex, '')
}

const validateData =
    (schema: Joi.ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body)
        if (error) {
            const message = replaceBackslash(error.message)
            throw new BadRequestError(message)
        }
        return next()
    }

export { validateData, REGEX_ID }
