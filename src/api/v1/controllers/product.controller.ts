import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import ProductService from '../services/product.service'
import { getPrototypeQuery } from '../utils'

class ProductController {
    findById = async (req: Request, res: Response, next: NextFunction) => {
        const query = getPrototypeQuery(req)
        const productId = req.params.id

        new SuccessResponse({
            message: 'Get all product success',
            statusCode: 200,
            metadata: await ProductService.findById(productId, {
                ...query,
                filter: { isDraft: false, isPublished: true },
            }),
        }).send(res)
    }

    findByIdForAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const query = getPrototypeQuery(req)
        const productId = req.params.id

        new SuccessResponse({
            message: 'Get all product success',
            statusCode: 200,
            metadata: await ProductService.findById(productId, query),
        }).send(res)
    }

    findAllPublished = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get all product published success',
            statusCode: 200,
            metadata: await ProductService.findAll({
                ...query,
                filter: { ...query.filter, isPublished: true, isDraft: false },
            }),
        }).send(res)
    }

    findAllDraft = async (req: Request, res: Response, next: NextFunction) => {
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get all product draft success',
            statusCode: 200,
            metadata: await ProductService.findAll({
                ...query,
                filter: { ...query.filter, isPublished: false, isDraft: true },
            }),
        }).send(res)
    }

    count = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Count product success',
            statusCode: 200,
            metadata: await ProductService.count(),
        }).send(res)
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create product success',
            statusCode: 201,
            metadata: await ProductService.create({ ...req.body }),
        }).send(res)
    }

    publishByAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const productId = req.params.id

        new SuccessResponse({
            message: 'Publicize successful products',
            statusCode: 200,
            metadata: await ProductService.publishByAdmin(productId),
        }).send(res)
    }

    unPublishByAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const productId = req.params.id

        new SuccessResponse({
            message: 'Stop publicizing successful products',
            statusCode: 200,
            metadata: await ProductService.unpublishByAdmin(productId),
        }).send(res)
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params.id

        new SuccessResponse({
            message: 'Update product success',
            statusCode: 200,
            metadata: await ProductService.update(productId, { ...req.body }),
        }).send(res)
    }

    addTags = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params.id

        new SuccessResponse({
            message: 'Update product success',
            statusCode: 200,
            metadata: await ProductService.updateTag(productId, req.body.tags),
        }).send(res)
    }

    removeTags = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params.id

        new SuccessResponse({
            message: 'Update product success',
            statusCode: 200,
            metadata: await ProductService.updateTag(productId, req.body.tags),
        }).send(res)
    }
}

export default new ProductController()
