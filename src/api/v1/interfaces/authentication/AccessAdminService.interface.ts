import { ITokens } from '..'
import Admin from '../../models/interfaces/admin.interface'
import KeyToken from '../../models/interfaces/keytoken.interface'
import { PayloadToken } from './AccessCustomerService.interface'

interface IAccessAdminService {
    logout(keyStore: KeyToken): Promise<string>
    login(payload: LoginAdminPayload): Promise<ReturnAccessAdmin>
    create(payload: CreateAdminPayload): Promise<any>
    refreshToken(
        refreshToken: string,
        user: PayloadToken,
        keyStore: KeyToken,
    ): Promise<ReturnAccessAdmin>
}

type ReturnAccessAdmin = {
    user: Partial<Admin>
    tokens: ITokens
}
type CreateAdminPayload = Omit<Admin, 'verify_email' | 'state' | 'avatar_image'>
type LoginAdminPayload = Pick<Admin, 'email' | 'password'>

export {
    CreateAdminPayload,
    IAccessAdminService,
    LoginAdminPayload,
    ReturnAccessAdmin,
}
