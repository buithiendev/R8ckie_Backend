import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import CustomerService from '../services/customer.service'
import { getPrototypeQuery } from '../utils'

class CustomerController {
    // Query
    getListSearch = async (req: Request, res: Response, next: NextFunction) => {
        const { keyword } = req.params
        const {
            limit = 50,
            page = 1,
            fields = ['first_name', 'last_name', 'email', 'phone_number'],
            filter = { state: 'enabled', verify_email: true },
        } = getPrototypeQuery(req)

        new SuccessResponse({
            message: `Get list with key search ${req.params.keyword} success.`,
            statusCode: 200,
            metadata: await CustomerService.getListSearch(keyword, {
                limit,
                page,
                fields,
                filter,
            }),
        }).send(res)
    }

    count = async (req: Request, res: Response, next: NextFunction) => {
        const { filter = {} } = getPrototypeQuery(req)
        new SuccessResponse({
            message: 'Count customer success',
            statusCode: 200,
            metadata: await CustomerService.count(filter),
        }).send(res)
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const {
            limit = 50,
            sort = 'ctime',
            page = 1,
            fields = ['first_name', 'last_name', 'email', 'phone_number'],
            filter = { state: 'enabled', verify_email: true },
        } = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get list customer success',
            statusCode: 200,
            metadata: await CustomerService.findAll({
                limit,
                sort,
                page,
                fields,
                filter,
            }),
        }).send(res)
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.params.id
        new SuccessResponse({
            message: 'Get success',
            statusCode: 200,
            metadata: await CustomerService.findById(customerId),
        }).send(res)
    }
}

export default new CustomerController()
