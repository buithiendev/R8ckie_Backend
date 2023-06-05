import { QueryParams } from '..'
import Image from '../../models/interfaces/image.interface'

interface IImageService {
    create(payload: CreateImagePayload): Promise<Partial<Image>>
    findAllByProductId(
        productId: string,
        query: FindImageQuery,
    ): Promise<Image[]>
    findById(id: string, query: QueryParams): Promise<Image | null>
    count(productId: string): Promise<number>
    delete(id: string): any
}

type FindImageQuery = Omit<QueryParams, 'unSelect'>
type CreateImagePayload = Omit<Image, 'variant_id'>

export { CreateImagePayload, FindImageQuery, IImageService }
