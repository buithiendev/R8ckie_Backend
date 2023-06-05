import { ITokens, PayloadToken } from '..'
import Customer from '../../models/interfaces/customer.interface'
import KeyToken from '../../models/interfaces/keytoken.interface'

interface IAccessCustomerService {
    verifyEmail(email: string): Promise<Customer>
    refreshToken(
        refreshToken: string,
        user: Omit<PayloadToken, 'roles'>,
        keyStore: KeyToken,
    ): Promise<ReturnAccessCustomer>
    logout(keyStore: KeyToken): Promise<string>
    login(payload: LoginCustomerPayload): Promise<ReturnAccessCustomer>
    register(
        payload: RegisterCustomerPayload,
    ): Promise<string>
}

type ReturnAccessCustomer = {
    user: Partial<Customer>
    tokens: ITokens
}
type LoginCustomerPayload = Pick<Customer, 'email' | 'password'>
type RegisterCustomerPayload = Pick<
    Customer,
    'first_name' | 'last_name' | 'email' | 'password'
>

export {
    IAccessCustomerService,
    LoginCustomerPayload,
    PayloadToken,
    RegisterCustomerPayload,
    ReturnAccessCustomer,
}
