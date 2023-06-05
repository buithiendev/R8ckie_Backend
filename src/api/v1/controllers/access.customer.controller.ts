import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import { IMyRequest } from '../interfaces'
import AccessCustomerService from '../services/access/access.customer.service'

class AccessCustomerController {
    register = async (req: Request, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Verify your email, please',
            statusCode: 201,
            metadata: await AccessCustomerService.register({ ...req.body }),
        }).send(res)
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Login success',
            statusCode: 200,
            metadata: await AccessCustomerService.login({ ...req.body }),
        }).send(res)
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Logout success',
            statusCode: 200,
            metadata: await AccessCustomerService.logout(
                (req as IMyRequest).keyStore,
            ),
        }).send(res)
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { user, refreshToken, keyStore } = req as IMyRequest
        new SuccessResponse({
            message: 'Logout success',
            statusCode: 200,
            metadata: await AccessCustomerService.refreshToken(
                refreshToken,
                user,
                keyStore,
            ),
        }).send(res)
    }

    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        const email = req.params.email
        new SuccessResponse({
            message: 'Verify success',
            statusCode: 200,
            metadata: await AccessCustomerService.verifyEmail(email),
        }).redirect(res, 'https://www.facebook.com/')
    }
}

export default new AccessCustomerController()
