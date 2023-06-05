import { Document } from 'mongoose'
import Image from './image.interface'
import { Product } from './product.interface'

interface Variant extends Document {
    variant_title?: string
    product_id: string
    variant_image?: Image
    barcode?: string
    price?: number
    grams?: number
    sku?: string
    position: number
    inventory_management?: string
    inventory_quantity?: number
    inventory_policy?: string
    option1: string
    option2?: string
    option3?: string
}

export default Variant
