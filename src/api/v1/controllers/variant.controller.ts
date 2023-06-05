import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import VariantService from '../services/variant.service'
import { getPrototypeQuery } from '../utils'

class VariantController {
    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get all variant with productId success',
            statusCode: 200,
            metadata: await VariantService.findAllByProductId(productId, query),
        }).send(res)
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        const { variantId } = req.params
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get variant success',
            statusCode: 200,
            metadata: await VariantService.findById(variantId, query),
        }).send(res)
    }

    count = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params.productId

        new SuccessResponse({
            message: 'Count variant by product success',
            statusCode: 200,
            metadata: await VariantService.count(productId),
        }).send(res)
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create variant success',
            statusCode: 201,
            metadata: await VariantService.create({ ...req.body }),
        }).send(res)
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { variantId } = req.params

        new SuccessResponse({
            message: 'Update variant success',
            statusCode: 200,
            metadata: await VariantService.update(variantId, {
                ...req.body,
            }),
        }).send(res)
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { variantId, productId } = req.params

        new SuccessResponse({
            message: 'Delete variant success',
            statusCode: 200,
            metadata: await VariantService.delete(productId, variantId),
        }).send(res)
    }
}

export default new VariantController()
