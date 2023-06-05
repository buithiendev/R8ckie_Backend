import { Document } from 'mongoose'
import Customer from './customer.interface'

interface KeyToken extends Document {
    user: Customer
    privateKey: string
    publicKey: string
    refreshToken: string
    refreshTokenUsed: String[]
}

export default KeyToken
