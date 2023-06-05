import { Document } from 'mongoose'

interface Image extends Document {
    product_id: string
    image_url: string
    image_file_name: string
    position: number
    variants_id: string[]
}

export default Image
