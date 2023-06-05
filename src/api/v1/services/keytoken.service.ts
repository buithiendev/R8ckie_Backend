import { Types } from 'mongoose'
import { IKeyTokenService } from '../interfaces/authentication/KeyTokenService.interface'
import KeyToken from '../models/interfaces/keytoken.interface'
import keytokenModel from '../models/keytoken.model'

class KeyTokenService implements IKeyTokenService {
    async updateRefreshToken(
        keyStore: KeyToken,
        oldRefreshToken: string,
        newRefreshToken: string,
    ): Promise<KeyToken> {
        return await keyStore.updateOne({
            $set: {
                refreshToken: newRefreshToken,
            },
            $addToSet: {
                refreshTokenUsed: oldRefreshToken,
            },
        })
    }

    async create(
        userId: string,
        publicKey: string,
        privateKey: string,
        refreshToken?: string | undefined,
    ): Promise<string | null> {
        const filter = { user: userId },
            update = {
                publicKey,
                privateKey,
                refreshToken,
            },
            options = {
                new: true,
                upsert: true,
            }

        const keyStore = await keytokenModel.findOneAndUpdate(
            filter,
            update,
            options,
        )

        return keyStore ? keyStore.publicKey : null
    }

    async removeById(id: string): Promise<number> {
        const { deletedCount } = await keytokenModel.deleteOne({ _id: id })

        return deletedCount
    }

    async findByUserId(userId: string): Promise<KeyToken | null> {
        const keyStore = await keytokenModel.findOne({
            user: new Types.ObjectId(userId),
        })

        return keyStore
    }
}

export default new KeyTokenService()
