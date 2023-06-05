import { Document } from 'mongoose'
import Image from './image.interface'
import Variant from './variant.interface'

interface Product extends Document {
    product_name: string
    product_description?: string
    product_slug?: string
    product_type?: string
    product_vendor?: string
    product_images?: Image[]
    product_variants?: Variant[]
    product_options?: OptionProduct[]
    product_ratings_averager?: number
    tags?: string
    isDraft?: boolean
    isPublished?: boolean
    only_hide_from_list?: boolean
    not_allow_promotion?: boolean
    published_at?: string
}

type OptionProduct = {
    name: string
    _position: number
}

export { OptionProduct, Product }
