import { Schema, model } from 'mongoose'
import Image from './interfaces/image.interface'

const DOCUMENT_NAME = 'Image'
const COLLECTION_NAME = 'Images'

const imageSchema = new Schema<Image>(
    {
        product_id: { type: String },
        image_url: { type: String, required: true },
        image_file_name: { type: String, required: true },
        position: { type: Number },
        variants_id: { type: [String], default: [] },
    },
    { timestamps: true, collection: COLLECTION_NAME },
)

export default model<Image>(DOCUMENT_NAME, imageSchema)
