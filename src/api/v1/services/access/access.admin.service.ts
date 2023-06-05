import bcrypt from 'bcrypt'
import { createTokenPair } from '../../auth/authUtils'
import {
    AuthFailureError,
    BadRequestError,
    ConflictRequestError,
    ForbiddenError,
} from '../../core/error.response'
import { PayloadToken } from '../../interfaces'
import {
    CreateAdminPayload,
    IAccessAdminService,
    LoginAdminPayload,
    ReturnAccessAdmin,
} from '../../interfaces/authentication/AccessAdminService.interface'
import KeyToken from '../../models/interfaces/keytoken.interface'
import {
    create,
    findByEmail,
    findById,
} from '../../models/repositories/admin.repo'
import { createKeys, getInfoData } from '../../utils'
import KeyTokenService from '../keytoken.service'
import Admin from '../../models/interfaces/admin.interface'

class AccessAdminService implements IAccessAdminService {
    async login({ email, password }: LoginAdminPayload): Promise<ReturnAccessAdmin> {
        const foundAdmin = await findByEmail(email)

        if (!foundAdmin) throw new BadRequestError('Admin is not registerd')

        const match = bcrypt.compare(password, foundAdmin.password)
        if (!match) throw new AuthFailureError('Incorrect account or password')

        if (!foundAdmin.verify_email)
            throw new ForbiddenError(
                'The account has not yet verified the email. please verify via email inbox ',
            )
        const { _id: userId } = foundAdmin
        const { publicKey, privateKey } = createKeys()

        const tokens = await createTokenPair(
            { email, userId, roles: foundAdmin.roles },
            publicKey,
            privateKey,
        )
        await KeyTokenService.create(
            userId,
            publicKey,
            privateKey,
            tokens?.refreshToken,
        )

        return {
            user: getInfoData({
                object: foundAdmin,
                fields: [
                    '_id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'roles',
                ],
            }),
            tokens,
        }
    }

    async logout(keyStore: KeyToken): Promise<string> {
        const isDelete = await KeyTokenService.removeById(keyStore._id)
        if (isDelete === 0) throw new BadRequestError('Logout failed')

        return 'Logout success'
    }

    async create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        roles,
    }: CreateAdminPayload): Promise<Admin> {
        const foundAdmin = await findByEmail(email)
        if (foundAdmin) throw new ConflictRequestError('Email is being used')

        const hashPassword = await bcrypt.hash(password, 10)

        const newAdmin = await create(
            first_name,
            last_name,
            email,
            hashPassword,
            phone_number,
            roles,
        )

        return newAdmin
    }

    async refreshToken(
        refreshToken: string,
        user: PayloadToken,
        keyStore: KeyToken,
    ): Promise<ReturnAccessAdmin> {
        const { userId, email } = user

        if (keyStore.refreshTokenUsed.includes(refreshToken)) {
            throw new ForbiddenError('Something wrong happend. Please relogin')
        }

        if (refreshToken !== keyStore.refreshToken) {
            throw new ForbiddenError('Admin is not registered')
        }

        const foundAdmin = await findById(userId)
        if (!foundAdmin) throw new ForbiddenError('Admin is not registered')

        const tokens = await createTokenPair(
            { userId, email, roles: foundAdmin.roles },
            keyStore.publicKey,
            keyStore.privateKey,
        )

        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokenUsed: refreshToken,
            },
        })

        return {
            user: getInfoData({
                object: foundAdmin,
                fields: [
                    '_id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'roles',
                ],
            }),
            tokens,
        }
    }
}

export default new AccessAdminService()
