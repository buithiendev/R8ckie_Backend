import { model, Schema } from 'mongoose'
import KeyToken from './interfaces/keytoken.interface'

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'

const keyTokenSchema = new Schema<KeyToken>(
    {
        user: [
            { type: Schema.Types.ObjectId, ref: 'Customer' },
            { type: Schema.Types.ObjectId, ref: 'Admin' },
        ],
        privateKey: { type: String, required: true },
        publicKey: { type: String, required: true },
        refreshToken: { type: String, required: true },
        refreshTokenUsed: { type: [String], default: [] },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)

export default model<KeyToken>(DOCUMENT_NAME, keyTokenSchema)
