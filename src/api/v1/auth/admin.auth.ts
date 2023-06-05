import { NextFunction, Request, Response } from 'express'
import {
    AuthFailureError,
    BadRequestError,
    ForbiddenError,
} from '../core/error.response'
import asyncHandler from '../helpers/asyncHandler'
import { IMyRequest } from '../interfaces'
import KeyTokenService from '../services/keytoken.service'
import { HEADERS } from '../utils/headers'
import { verifyToken } from './authUtils'

const authentication = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers[HEADERS.CLIENT_ID] as string
        if (!userId) throw new AuthFailureError('Invalid request')

        const keyStore = await KeyTokenService.findByUserId(userId)
        if (!keyStore) throw new AuthFailureError('Not found key store')
        const refreshToken = req.headers[HEADERS.REFRESHTOKEN] as string

        if (refreshToken) {
            try {
                const decodeUser = await verifyToken(
                    refreshToken,
                    keyStore.privateKey,
                )

                if (userId !== decodeUser.userId)
                    throw new BadRequestError('Invalid admin')
                ;(req as IMyRequest).user = decodeUser
                ;(req as IMyRequest).refreshToken = refreshToken
                ;(req as IMyRequest).keyStore = keyStore

                return next()
            } catch (error) {
                next(error)
            }
        }
    },
)

const checkPermission = (role: string[]) => {
    return asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { roles } = (req as IMyRequest).user
            if (roles?.includes('Admin')) next()

            const promise = new Promise((resolve, reject) => {
                for (let i = 0; i < role.length; i++) {
                    if (roles?.includes(role[i])) {
                        return resolve(true)
                    }
                }
                reject(new ForbiddenError('Permission denied'))
            })

            promise
                .then(() => {
                    next()
                })
                .catch((error) => {
                    next(error)
                })
        },
    )
}

export { authentication, checkPermission }
