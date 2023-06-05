import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import ImageService from '../services/image.service'
import { getPrototypeQuery } from '../utils'

class ImageController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Add new image success',
            statusCode: 201,
            metadata: await ImageService.create({ ...req.body }),
        }).send(res)
    }

    count = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params

        new SuccessResponse({
            message: 'Count image success',
            statusCode: 200,
            metadata: await ImageService.count(productId),
        }).send(res)
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params
        const {
            limit = 10,
            page = 1,
            sort = 'ctime',
            filter = {},
            fields = ['image_url', 'image_file_name', 'product_id'],
        } = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get all list image of product success',
            statusCode: 200,
            metadata: await ImageService.findAllByProductId(productId, {
                limit,
                page,
                sort,
                filter,
                fields,
            }),
        }).send(res)
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        const { imageId } = req.params
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get image success',
            statusCode: 200,
            metadata: await ImageService.findById(imageId, query),
        }).send(res)
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { imageId } = req.params

        new SuccessResponse({
            message: 'Delete image success',
            statusCode: 200,
            metadata: await ImageService.delete(imageId),
        }).send(res)
    }
}

export default new ImageController()
