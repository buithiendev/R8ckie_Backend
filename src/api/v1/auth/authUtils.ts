import JWT from 'jsonwebtoken'
import { AuthFailureError } from '../core/error.response'
import { PayloadToken } from '../interfaces'

const EXPIRES_REFRESHTOKEN = 7 * 26 * 60 * 60 * 1000
const EXPIRES_ACCESSTOKEN = 2 * 26 * 60 * 60 * 1000

const createTokenPair = async (
    payload: PayloadToken,
    publicKey: string,
    privateKey: string,
) => {
    const accessToken = await JWT.sign(payload, publicKey, {
        expiresIn: '2 days',
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
        expiresIn: '7 days',
    })

    return {
        accessToken,
        refreshToken,
        expires: EXPIRES_REFRESHTOKEN,
    }
}

const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = JWT.verify(token, secret) as PayloadToken
        return decoded
    } catch (error) {
        throw new AuthFailureError('Your token has expired')
    }
}

export { createTokenPair, verifyToken }
