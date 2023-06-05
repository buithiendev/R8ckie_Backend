import { QueryParams } from '..'
import Variant from '../../models/interfaces/variant.interface'

interface IVariantService {
    create(payload: CreateVariantPayload): Promise<Variant>
    findAllByProductId(
        productId: string,
        query: QueryParams,
    ): Promise<Variant[]>
    findById(id: string, query: QueryParams): Promise<Variant | null>
    count(productId: string): Promise<number>
    update(id: string, payload: UpdateVariantPayload): Promise<Variant | null>
    delete(productId: string, id: string): Promise<number>
}

type UpdateVariantPayload = Omit<Variant, '_id' | 'position'>
type CreateVariantPayload = Omit<Variant, 'variant_title'>

export { CreateVariantPayload, IVariantService, UpdateVariantPayload }
