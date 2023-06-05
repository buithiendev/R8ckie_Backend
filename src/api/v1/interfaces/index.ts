import { Request } from 'express'
import KeyToken from '../models/interfaces/keytoken.interface'
export * from './response.interface'

type PayloadToken = {
    userId: string
    email: string
    roles?: string[]
}

type QueryParams = {
    limit: number
    page: number
    sort: string
    fields: string[]
    filter: {}
    unSelect: string[]
}

type ITokens = {
    refreshToken: string,
    accessToken: string,
    expires: number
}


interface IMyRequest extends Request {
    user: PayloadToken
    refreshToken: string
    keyStore: KeyToken
}

export { IMyRequest, PayloadToken, QueryParams, ITokens }
