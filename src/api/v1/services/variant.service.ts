import { BadRequestError } from '../core/error.response'
import { QueryParams } from '../interfaces'
import {
    CreateVariantPayload,
    IVariantService,
    UpdateVariantPayload,
} from '../interfaces/product/VariantService.interface'
import Variant from '../models/interfaces/variant.interface'
import {
    findAllVariantsByProductId,
    findProductByIdNotLean,
} from '../models/repositories/product.repo'
import {
    checkExitsVariant,
    countVariantByProductId,
    createVariant,
    deleteVarantFromProduct,
    findVariantById,
    updateVariant,
} from '../models/repositories/variant.repo'
import { nestedObjectParser, removeUndefinedObject } from '../utils'

class VariantService implements IVariantService {
    async create(payload: CreateVariantPayload): Promise<Variant> {
        const { option1, option2, option3, product_id } = payload
        const [foundProduct, variantExits] = await Promise.all([
            findProductByIdNotLean(product_id),
            checkExitsVariant(product_id, { option1, option2, option3 }),
        ])
        if (!foundProduct) {
            throw new BadRequestError('This product could not be found.')
        }
        if (variantExits) {
            throw new BadRequestError(
                'This product already exists in this variant.',
            )
        }

        const newVariant = await createVariant(product_id, payload)
        if (!newVariant)
            throw new BadRequestError(
                'Variant creation failed. Please try again',
            )

        await foundProduct.updateOne({
            $addToSet: {
                product_variants: newVariant._id,
            },
        })

        return newVariant
    }

    async findAllByProductId(
        productId: string,
        {
            limit = 50,
            page = 1,
            filter = {},
            fields = [
                '_id',
                'sku',
                'price',
                'position',
                'option1',
                'option2',
                'option3',
            ],
        }: Partial<QueryParams>,
    ): Promise<Variant[]> {
        const results = await findAllVariantsByProductId(
            productId,
            limit,
            page,
            filter,
            fields,
        )
        return results
    }

    async findById(
        id: string,
        { unSelect = ['__v', 'createdAt', 'updatedAt'] }: Partial<QueryParams>,
    ): Promise<Variant | null> {
        return await findVariantById(id, unSelect)
    }

    async count(productId: string): Promise<number> {
        return await countVariantByProductId(productId)
    }

    async update(
        id: string,
        payload: UpdateVariantPayload,
    ): Promise<Variant | null> {
        const oldVariant = await findVariantById(id)

        if (!oldVariant) throw new BadRequestError('Variant can not found')

        const payloadUpdate = nestedObjectParser(payload)
        const variantExist = await checkExitsVariant(
            oldVariant.product_id,
            {
                ...oldVariant,
                ...payload,
            },
            id,
        )
        if (variantExist) {
            throw new BadRequestError(
                'This product already exists in this variant.',
            )
        }

        return await updateVariant(
            oldVariant.product_id,
            id,
            { ...removeUndefinedObject(payloadUpdate) },
            true,
        )
    }

    async delete(productId: string, id: string): Promise<number> {
        return await deleteVarantFromProduct(productId, id)
    }
}

export default new VariantService()
