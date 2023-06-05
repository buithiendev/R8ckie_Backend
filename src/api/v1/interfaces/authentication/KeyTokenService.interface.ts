import KeyToken from '../../models/interfaces/keytoken.interface'

interface IKeyTokenService {
    updateRefreshToken(
        keyStore: KeyToken,
        oldRefreshToken: string,
        newRefreshToken: string,
    ): Promise<KeyToken>

    create(
        userId: string,
        publicKey: string,
        privateKey: string,
        refreshToken?: string,
    ): Promise<string | null>
    removeById(id: string): Promise<number>
    findByUserId(userId: string): Promise<KeyToken | null>
}

export { IKeyTokenService }
