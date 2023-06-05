import { NextFunction, Request, Response } from 'express'
import { AuthFailureError, BadRequestError } from '../core/error.response'
import asyncHandler from '../helpers/asyncHandler'
import { IMyRequest } from '../interfaces'
import KeyTokenService from '../services/keytoken.service'
import { HEADERS } from '../utils/headers'
import { verifyToken } from './authUtils'

const authentication = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers[HEADERS.CLIENT_ID]?.toString()
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
                    throw new BadRequestError('Invalid user')
                ;(req as IMyRequest).user = decodeUser
                ;(req as IMyRequest).keyStore = keyStore
                ;(req as IMyRequest).refreshToken = refreshToken

                return next()
            } catch (error) {
                next(error)
            }
        }
    },
)

export { authentication }
