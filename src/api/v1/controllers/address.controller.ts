import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import { IMyRequest } from '../interfaces'
import AddressService from '../services/address.service'
import { getPrototypeQuery } from '../utils'

class AddressController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        const { user } = req as IMyRequest
        new CREATED({
            message: 'Create address success',
            statusCode: 201,
            metadata: await AddressService.create(user.userId, { ...req.body }),
        }).send(res)
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const query = getPrototypeQuery(req)
        const { user } = req as IMyRequest

        new SuccessResponse({
            message: 'Get list address success',
            statusCode: 200,
            metadata: await AddressService.findAll(user.userId, query),
        }).send(res)
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        const query = getPrototypeQuery(req)
        const { user } = req as IMyRequest
        const addressId = req.params.id

        new SuccessResponse({
            message: 'Get address success',
            statusCode: 200,
            metadata: await AddressService.findById(
                addressId,
                user.userId,
                query,
            ),
        }).send(res)
    }

    removeById = async (req: Request, res: Response, next: NextFunction) => {
        const addressId = req.params.id
        const { user } = req as IMyRequest

        new SuccessResponse({
            message: 'Delete success',
            statusCode: 200,
            metadata: await AddressService.delete(user.userId, addressId),
        }).send(res)
    }

    setDefault = async (req: Request, res: Response, next: NextFunction) => {
        const addressId = req.params.id
        const { user } = req as IMyRequest

        new SuccessResponse({
            message: 'Set default success',
            statusCode: 200,
            metadata: await AddressService.setDefault(user.userId, addressId),
        }).send(res)
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const addressId = req.params.id
        const { user } = req as IMyRequest

        new SuccessResponse({
            message: 'Update this address success',
            statusCode: 200,
            metadata: await AddressService.update(user.userId, addressId, {
                ...req.body,
            }),
        }).send(res)
    }
}

export default new AddressController()
