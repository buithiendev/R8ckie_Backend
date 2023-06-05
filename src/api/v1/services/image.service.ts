import Firebase from '../../../databases/init.firebase'
import { BadRequestError } from '../core/error.response'
import {
    CreateImagePayload,
    FindImageQuery,
    IImageService,
} from '../interfaces/product/ImageService.interface'
import Image from '../models/interfaces/image.interface'
import {
    countImagesByProductId,
    createImage,
    deleteImageById,
    findAllImagesByProductId,
    findImageById,
} from '../models/repositories/image.repo'
import { findProductByIdNotLean } from '../models/repositories/product.repo'
import { getInfoData } from '../utils'

class ImageService implements IImageService {
    async create(payload: CreateImagePayload): Promise<Partial<Image>> {
        const { product_id } = payload
        const foundProduct = await findProductByIdNotLean(product_id)
        if (!foundProduct) throw new BadRequestError('Can not find product')

        const newImage = await createImage(payload)
        if (newImage) {
            await foundProduct.updateOne({
                $addToSet: {
                    product_images: newImage._id,
                },
            })
        }
        return getInfoData({
            object: newImage,
            fields: ['product_id', 'image_url', 'image_file_name', '_id'],
        })
    }

    async findAllByProductId(
        productId: string,
        query: FindImageQuery,
    ): Promise<Image[]> {
        return await findAllImagesByProductId(productId, query)
    }

    async findById(
        id: string,
        { unSelect = ['__v', 'createdAt', 'updatedAt', 'variants_id'] },
    ): Promise<Image | null> {
        return await findImageById(id, unSelect)
    }

    async count(productId: string): Promise<number> {
        return await countImagesByProductId(productId)
    }

    async delete(id: string): Promise<any> {
        const imageDelete = await deleteImageById(id)

        await Firebase.deleteImage(
            'product_images',
            imageDelete.image_file_name,
        )
            .then(() => {
                return 1
            })
            .catch(() => {
                throw new BadRequestError('Delete image error...')
            })
    }
}

export default new ImageService()
