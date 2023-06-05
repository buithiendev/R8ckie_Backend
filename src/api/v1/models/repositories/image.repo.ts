import { BadRequestError } from '../../core/error.response'
import {
    CreateImagePayload,
    FindImageQuery,
} from '../../interfaces/product/ImageService.interface'
import { getSelectData, getUnSelectData } from '../../utils'
import imageModel from '../image.model'
import Image from '../interfaces/image.interface'

const createImage = async (payload: CreateImagePayload): Promise<Image> => {
    return await imageModel.create({ ...payload })
}

const insertManyImage = async (images: Partial<Image>[]): Promise<Image[]> => {
    const results = await imageModel.insertMany(images)
    return results
}

const findAllImagesByProductId = async (
    productId: string,
    { limit, page, sort, filter, fields }: FindImageQuery,
): Promise<Image[]> => {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: any } =
        sort === 'ctime' ? { position: 1 } : { position: -1 }
    const images = await imageModel
        .find({ ...filter, product_id: productId })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(fields))
        .lean()
        .exec()

    return images
}

const findImageById = async (
    id: string,
    unSelect?: string[],
): Promise<Image | null> => {
    return await imageModel
        .findById(id)
        .select(getUnSelectData(unSelect))
        .lean()
        .exec()
}

const countImagesByProductId = async (productId: string): Promise<number> => {
    return imageModel.countDocuments({ product_id: productId })
}

const updateProductIdManyImage = async (ids: string[], productId: string) => {
    const filter = {
            _id: { $in: ids },
        },
        update = {
            product_id: productId,
        },
        options = {
            new: true,
        }

    const results = await imageModel.updateMany(filter, update, options)
    return results
}

const deleteImageById = (id: string): Promise<Image> => {
    return new Promise(async (resolve, reject) => {
        const deleteImage = await imageModel.findByIdAndDelete(id)
        if (deleteImage) resolve(deleteImage)
        reject(new BadRequestError('Can not find image'))
    })
}

export {
    countImagesByProductId,
    createImage,
    deleteImageById,
    findAllImagesByProductId,
    findImageById,
    insertManyImage,
    updateProductIdManyImage,
}
