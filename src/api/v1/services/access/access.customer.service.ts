import bcrypt from 'bcrypt'
import { createTokenPair } from '../../auth/authUtils'
import {
    AuthFailureError,
    BadRequestError,
    ConflictRequestError,
    ForbiddenError,
} from '../../core/error.response'
import {
    IAccessCustomerService,
    LoginCustomerPayload,
    PayloadToken,
    RegisterCustomerPayload,
    ReturnAccessCustomer,
} from '../../interfaces/authentication/AccessCustomerService.interface'
import Customer from '../../models/interfaces/customer.interface'
import KeyToken from '../../models/interfaces/keytoken.interface'
import { findByEmailAndVerify } from '../../models/repositories/customer.repo'
import { createKeys, getInfoData } from '../../utils'
import CustomerService from '../customer.service'
import KeyTokenService from '../keytoken.service'

class AccessCustomerService implements IAccessCustomerService {
    async verifyEmail(email: string): Promise<Customer> {
        const verify_email = false

        const customer = await findByEmailAndVerify(email, verify_email)
        if (!customer) throw new BadRequestError('Verifed email')

        const verify = await customer.updateOne(
            {
                verify_email: true,
            },
            { new: true },
        )

        return verify
    }

    async refreshToken(
        refreshToken: string,
        user: Omit<PayloadToken, 'roles'>,
        keyStore: KeyToken,
    ): Promise<ReturnAccessCustomer> {
        const { userId, email } = user

        if (keyStore.refreshTokenUsed.includes(refreshToken))
            throw new ForbiddenError('Something wrong happend. Please relogin')

        if (refreshToken !== keyStore.refreshToken)
            throw new ForbiddenError('Customer is not registered')

        const foundCustomer = await CustomerService.findByUserId(userId)
        if (!foundCustomer)
            throw new ForbiddenError('Customer is not registered')

        const tokens = await createTokenPair(
            { email, userId },
            keyStore.publicKey,
            keyStore.privateKey,
        )

        await KeyTokenService.updateRefreshToken(
            keyStore,
            refreshToken,
            tokens.refreshToken,
        )

        return {
            user: getInfoData({
                object: foundCustomer,
                fields: [
                    '_id',
                    'email',
                    'first_name',
                    'last_name',
                    'phone_number',
                    'gender',
                    'birthday',
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

    async login({
        email,
        password,
    }: LoginCustomerPayload): Promise<ReturnAccessCustomer> {
        const foundCustomer = await CustomerService.findByEmail(email)

        if (!foundCustomer)
            throw new BadRequestError('Customer is not registered')

        const match = bcrypt.compare(password, foundCustomer?.password)
        if (!match) throw new AuthFailureError('Authentication error')

        if (!foundCustomer.verify_email)
            throw new ForbiddenError(
                'Please verify your email in your email inbox',
            )

        const { publicKey, privateKey } = createKeys()

        const { _id: userId } = foundCustomer
        const tokens = await createTokenPair(
            { userId, email },
            publicKey,
            privateKey,
        )

        await KeyTokenService.create(
            foundCustomer._id,
            publicKey,
            privateKey,
            tokens.refreshToken,
        )

        return {
            user: getInfoData({
                object: foundCustomer,
                fields: [
                    '_id',
                    'email',
                    'first_name',
                    'last_name',
                    'phone_number',
                    'gender',
                    'birthday',
                ],
            }),
            tokens,
        }
    }

    async register({
        first_name,
        last_name,
        email,
        password,
    }: RegisterCustomerPayload): Promise<string> {
        const foundCustomer = await CustomerService.findByEmail(email)
        if (foundCustomer) throw new ConflictRequestError('Email is being used')

        const hashPassword = await bcrypt.hash(password, 10)

        const newCustomer = await CustomerService.create({
            first_name,
            last_name,
            email,
            password: hashPassword,
        })

        if (!newCustomer) {
            throw new BadRequestError('Account creation failed!!!')
        }
        return `Account successfully created. Please check your email inbox ${email} to verify your account`
    }
}

export default new AccessCustomerService()
