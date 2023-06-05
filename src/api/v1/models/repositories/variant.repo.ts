import { Types } from 'mongoose'
import { UpdateVariantPayload } from '../../interfaces/product/VariantService.interface'
import { getSelectData, getUnSelectData } from '../../utils'
import Variant from '../interfaces/variant.interface'
import productModel from '../product.model'
import variantModel from '../variant.model'

const findAllByProductId = async (
    productId: string,
    limit: number,
    page: number,
    sort: string,
    filter: {},
    select: string[],
): Promise<Variant[]> => {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: any } =
        sort === 'ctime' ? { position: 1 } : { position: -1 }

    return await variantModel
        .find({
            ...filter,
            product_id: new Types.ObjectId(productId),
        })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
        .exec()
}

const findVariantById = async (
    id: string,
    unSelect?: string[],
): Promise<Variant | null> => {
    return await variantModel
        .findById(id)
        .populate('variant_image')
        .select(getUnSelectData(unSelect))
        .lean()
        .exec()
}

const countVariantByProductId = async (productId: string): Promise<number> => {
    return await variantModel.countDocuments({ product_id: productId })
}

const insertManyVariant = async (variants: Partial<Variant>[]) => {
    const results = await variantModel.insertMany(variants)
    return results
}

const updateManyProductIdToVariant = async (
    ids: string[],
    productId: string,
) => {
    const filter = {
            _id: { $in: ids },
        },
        update = {
            product_id: productId,
        },
        options = {
            new: true,
        }

    const results = await variantModel.updateMany(filter, update, options)
    return results
}

const checkExitsVariant = async (
    productId: string,
    {
        option1,
        option2,
        option3,
    }: Pick<Variant, 'option1' | 'option2' | 'option3'>,
    excludedVariantId?: string,
): Promise<boolean> => {
    const query = {
        product_id: productId,
        option1,
        option2,
        option3,
        _id: { $ne: excludedVariantId },
    }

    const check = await variantModel.findOne(query)

    return check ? true : false
}

const createVariant = async (
    productId: string,
    payload: Variant,
): Promise<Variant> => {
    return variantModel.create({ ...payload, product_id: productId })
}

const updateVariant = async (
    productId: string,
    variantId: string,
    payload: UpdateVariantPayload,
    isNew = true,
): Promise<Variant | null> => {
    const filter = {
        product_id: productId,
    }
    return variantModel.findByIdAndUpdate(variantId, filter, {
        $set: {
            ...payload,
        },
    })
}

const deleteVarantFromProduct = async (
    productId: string,
    variantId: string,
): Promise<number> => {
    const update = await productModel.findByIdAndUpdate(productId, {
        $pull: {
            product_variants: variantId,
        },
    })

    return update ? 1 : 0
}

export {
    checkExitsVariant,
    countVariantByProductId,
    createVariant,
    deleteVarantFromProduct,
    findAllByProductId,
    findVariantById,
    insertManyVariant,
    updateManyProductIdToVariant,
    updateVariant,
}
