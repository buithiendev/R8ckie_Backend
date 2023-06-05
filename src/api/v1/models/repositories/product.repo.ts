import { Types } from 'mongoose'
import { BadRequestError } from '../../core/error.response'
import {
    OptionProduct,
    UpdateProductPayload,
} from '../../interfaces/product/ProductService.interface'
import {
    getSelectData,
    getUnSelectData,
    removeSpacingString,
} from '../../utils'
import { Product } from '../interfaces/product.interface'
import Variant from '../interfaces/variant.interface'
import productModel from '../product.model'

const findAllProduct = async (
    limit: number,
    page: number,
    sort: string,
    filter: {},
    select: string[],
): Promise<Product[]> => {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: any } =
        sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const results = await productModel
        .find({ ...filter })
        .populate({
            path: 'product_images',
            options: { limit: 1 },
            select: 'image_url image_file_name',
        })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
        .exec()

    return results
}

const findAllVariantsByProductId = async (
    productId: string,
    limit: number,
    page: number,
    filter: {},
    select: string[],
): Promise<Variant[]> => {
    const skip = (page - 1) * limit

    try {
        const variants = await productModel
            .findById(productId, filter)
            .populate({
                path: 'product_variants',
                options: { limit, skip },
                select: select.join(' '),
            })
            .select(getSelectData(['_id', 'product_variants']))
            .lean()
            .exec()

        return variants?.product_variants || []
    } catch (error) {
        throw new BadRequestError(`Can not find product ${productId}`)
    }
}

const findProductById = async (
    productId: string,
    filter: {},
    unSelect?: string[],
): Promise<Product | null> => {
    const result = await productModel
        .findOne({ ...filter, _id: productId })
        .populate('product_images', 'image_url _id product_id image_file_name')
        .populate(
            'product_variants',
            'price inventory_quantity option1 option2 option3 -_id',
        )
        .select(getUnSelectData(unSelect))
        .lean()
        .exec()

    return result
}

const findProductByIdNotLean = async (
    productId: string,
): Promise<Product | null> => {
    return productModel.findById(productId)
}

const countProduct = async (): Promise<number> => {
    return await productModel.countDocuments()
}

const createProduct = async (payload: Partial<Product>): Promise<Product> => {
    return await productModel.create({
        ...payload,
    })
}

const publishProductByAdmin = async (
    id: string,
    filter = { isPublished: false, isDraft: true },
): Promise<number> => {
    const foundProduct = await productModel.findOne({
        _id: new Types.ObjectId(id),
        ...filter,
    })
    if (!foundProduct) {
        throw new BadRequestError('This product could not be found')
    }

    const update = {
        isPublished: true,
        isDraft: false,
    }

    const { modifiedCount } = await foundProduct.updateOne(update)
    return modifiedCount
}

const unPublishProductByAdmin = async (
    id: string,
    filter = { isPublished: true, isDraft: false },
): Promise<number> => {
    const foundProduct = await productModel.findOne({
        _id: new Types.ObjectId(id),
        ...filter,
    })
    if (!foundProduct) {
        throw new BadRequestError('This product could not be found')
    }

    const update = {
        isPublished: false,
        isDraft: true,
    }

    const { modifiedCount } = await foundProduct.updateOne(update)
    return modifiedCount
}

const updateProductById = async (
    productId: string,
    payload: UpdateProductPayload,
    isNew = true,
): Promise<Product | null> => {
    return await productModel
        .findByIdAndUpdate(
            productId,
            {
                $set: {
                    ...payload,
                },
            },
            {
                new: isNew,
            },
        )
        .populate('product_variants')
        .populate('product_images')
        .lean()
        .exec()
}

const updateTagsById = async (
    productId: string,
    tags: string,
): Promise<number> => {
    const foundProduct = await productModel.findById(productId)

    if (!foundProduct)
        throw new BadRequestError('This product could not be found')

    const { modifiedCount } = await foundProduct.updateOne({
        $set: {
            tags: tags,
        },
    })

    return modifiedCount
}

const checkOptionAndVariantValue = (
    options: OptionProduct[],
    variants: Partial<Variant>[],
): Boolean => {
    let pass = true
    const lengthOption = options.length
    variants.forEach((v) => {
        let optionNotNull = 0
        Object.keys(v).forEach((key) => {
            if (key === 'option1' || key === 'option2' || key === 'option3') {
                if (v[key] !== null) optionNotNull++
            }
        })
        if (optionNotNull !== lengthOption) {
            pass = false
            return
        }
    })
    return pass
}

const refactorListOption = (options: OptionProduct[]): OptionProduct[] => {
    return options.map((option, index) => {
        return { ...option, _position: index + 1 }
    })
}

export {
    checkOptionAndVariantValue,
    countProduct,
    createProduct,
    findAllProduct,
    findAllVariantsByProductId,
    findProductById,
    findProductByIdNotLean,
    publishProductByAdmin,
    refactorListOption,
    removeSpacingString,
    unPublishProductByAdmin,
    updateProductById,
    updateTagsById,
}
