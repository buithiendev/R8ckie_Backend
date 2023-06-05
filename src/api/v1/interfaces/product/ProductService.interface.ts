import { QueryParams } from '..'
import Image from '../../models/interfaces/image.interface'
import {
    OptionProduct,
    Product,
} from '../../models/interfaces/product.interface'
import Variant from '../../models/interfaces/variant.interface'

interface IProductService {
    create(payload: CreatePayload): Promise<Product>
    findAll(query: QueryParams): Promise<Product[]>
    findById(id: string, query: any): Promise<Product | null>
    count(): Promise<number>
    publishByAdmin(id: string): Promise<number>
    unpublishByAdmin(id: string): Promise<number>
    update(id: string, payload: UpdateProductPayload): Promise<Product | null>
    updateTag(id: string, tags: string): Promise<number>
}

type CreatePayload = {
    product_name: string
    product_type: string
    product_vendor: string
    product_description: string
    tags: string
    product_images: Partial<Image>[]
    product_options: OptionProduct[]
    only_hide_from_list: boolean
    not_allow_promotion: boolean
    published_at: string
    product_variants: Partial<Variant>[]
}

type UpdateProductPayload = {
    product_name: string
    product_description: string
    product_vendor: string
    product_type: string
    not_allow_promotion: boolean
    tags: string
}

export { CreatePayload, IProductService, OptionProduct, UpdateProductPayload }
