import { QueryParams } from '..'
import Address from '../../models/interfaces/address.interface'

interface IAddressService {
    create(userId: string, payload: Address): Promise<Address>
    findAll(userId: string, query: QueryParams): Promise<Address[]>
    findById(
        userId: string,
        id: string,
        query: Partial<QueryParams>,
    ): Promise<Address | null>
    delete(userId: string, id: string): Promise<number>
    update(
        userId: string,
        id: string,
        payload: UpdateAddressPayload,
    ): Promise<Address | null>
    setDefault(userId: string, id: string): Promise<Address | null>
}

type UpdateAddressPayload = Partial<Address>

export { IAddressService, UpdateAddressPayload }
