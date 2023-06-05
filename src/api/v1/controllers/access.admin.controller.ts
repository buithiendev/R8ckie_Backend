import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import { IMyRequest } from '../interfaces'
import AccessAdminService from '../services/access/access.admin.service'

class AccessAdminController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create new account admin success',
            statusCode: 201,
            metadata: await AccessAdminService.create({ ...req.body }),
        }).send(res)
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Login success',
            statusCode: 200,
            metadata: await AccessAdminService.login({ ...req.body }),
        }).send(res)
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        const { keyStore } = req as IMyRequest

        new SuccessResponse({
            message: 'Logout success',
            statusCode: 200,
            metadata: await AccessAdminService.logout(keyStore),
        }).send(res)
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { user, refreshToken, keyStore } = req as IMyRequest

        new SuccessResponse({
            message: 'Refresh token success',
            statusCode: 200,
            metadata: await AccessAdminService.refreshToken(
                refreshToken,
                user,
                keyStore,
            ),
        }).send(res)
    }
}

export default new AccessAdminController()
