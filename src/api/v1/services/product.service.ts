import { BadRequestError } from '../core/error.response'
import { QueryParams } from '../interfaces'
import {
    CreatePayload,
    IProductService,
    UpdateProductPayload,
} from '../interfaces/product/ProductService.interface'
import { Product } from '../models/interfaces/product.interface'
import {
    insertManyImage,
    updateProductIdManyImage,
} from '../models/repositories/image.repo'
import {
    checkOptionAndVariantValue,
    countProduct,
    createProduct,
    findAllProduct,
    findProductById,
    publishProductByAdmin,
    refactorListOption,
    unPublishProductByAdmin,
    updateProductById,
    updateTagsById,
} from '../models/repositories/product.repo'
import {
    insertManyVariant,
    updateManyProductIdToVariant,
} from '../models/repositories/variant.repo'
import { nestedObjectParser, removeUndefinedObject } from '../utils'

const MAX_OPTION = 3
class ProductService implements IProductService {
    async create({
        product_name,
        product_type,
        product_vendor,
        product_description,
        tags,
        product_images,
        product_options = [{ name: 'Title', _position: 1 }],
        only_hide_from_list = false,
        not_allow_promotion = false,
        published_at,
        product_variants = [
            { variant_title: 'Default title', position: 1, option1: 'Default' },
        ],
    }: CreatePayload): Promise<Product> {
        if (product_options.length > MAX_OPTION)
            throw new BadRequestError(
                'Maximum number of variant attributes is 3',
            )
        product_options = refactorListOption(product_options)
        if (!checkOptionAndVariantValue(product_options, product_variants)) {
            throw new BadRequestError(
                'The number of variant values must be equal to the number of variant attributes',
            )
        }

        const [variantsResult, imagesResult] = await Promise.allSettled([
            insertManyVariant(product_variants),
            insertManyImage(product_images),
        ])
        if (
            variantsResult.status !== 'fulfilled' ||
            imagesResult.status !== 'fulfilled'
        ) {
            throw new BadRequestError('Image or variant initialization failed')
        }

        const newProduct = await createProduct({
            product_name,
            product_description,
            product_type,
            product_vendor,
            tags,
            product_options,
            only_hide_from_list,
            not_allow_promotion,
            published_at,
            product_variants: variantsResult.value,
            product_images: imagesResult.value,
        })

        await Promise.all([
            updateManyProductIdToVariant(
                variantsResult.value.map((variant) => variant._id.toString()),
                newProduct._id,
            ),
            updateProductIdManyImage(
                imagesResult.value.map((image) => image._id.toString()),
                newProduct._id,
            ),
        ])
        return newProduct
    }

    async update(
        id: string,
        payload: UpdateProductPayload,
    ): Promise<Product | null> {
        const payloadUpdate = nestedObjectParser(payload)

        return await updateProductById(id, {
            ...removeUndefinedObject(payloadUpdate),
        })
    }

    async findAll({
        limit = 50,
        page = 1,
        sort = 'ctime',
        filter = {},
        fields = [
            'product_name',
            'product_description',
            'product_images',
            'product_ratings_averager',
        ],
    }: Partial<QueryParams>): Promise<Product[]> {
        const results = await findAllProduct(limit, page, sort, filter, fields)
        return results
    }

    async findById(
        id: string,
        { filter = {}, unSelect = [] }: Partial<QueryParams>,
    ): Promise<Product | null> {
        const result = await findProductById(id, filter, [
            ...unSelect,
            'createdAt',
            'updatedAt',
            '__v',
        ])

        return result
    }

    async count(): Promise<number> {
        return await countProduct()
    }

    async publishByAdmin(id: string): Promise<number> {
        const filter = {
            isPublished: false,
            isDraft: true,
        }
        return await publishProductByAdmin(id, filter)
    }

    async unpublishByAdmin(id: string): Promise<number> {
        const filter = {
            isPublished: true,
            isDraft: false,
        }
        return await unPublishProductByAdmin(id, filter)
    }

    async updateTag(id: string, tags: string): Promise<number> {
        return await updateTagsById(id, tags)
    }
}

export default new ProductService()
