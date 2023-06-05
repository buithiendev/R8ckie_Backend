"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../core/error.response");
const image_repo_1 = require("../models/repositories/image.repo");
const product_repo_1 = require("../models/repositories/product.repo");
const variant_repo_1 = require("../models/repositories/variant.repo");
const utils_1 = require("../utils");
const MAX_OPTION = 3;
class ProductService {
    async create({ product_name, product_type, product_vendor, product_description, tags, product_images, product_options = [{ name: 'Title', _position: 1 }], only_hide_from_list = false, not_allow_promotion = false, published_at, product_variants = [
        { variant_title: 'Default title', position: 1, option1: 'Default' },
    ], }) {
        if (product_options.length > MAX_OPTION)
            throw new error_response_1.BadRequestError('Maximum number of variant attributes is 3');
        product_options = (0, product_repo_1.refactorListOption)(product_options);
        if (!(0, product_repo_1.checkOptionAndVariantValue)(product_options, product_variants)) {
            throw new error_response_1.BadRequestError('The number of variant values must be equal to the number of variant attributes');
        }
        const [variantsResult, imagesResult] = await Promise.allSettled([
            (0, variant_repo_1.insertManyVariant)(product_variants),
            (0, image_repo_1.insertManyImage)(product_images),
        ]);
        if (variantsResult.status !== 'fulfilled' ||
            imagesResult.status !== 'fulfilled') {
            throw new error_response_1.BadRequestError('Image or variant initialization failed');
        }
        const newProduct = await (0, product_repo_1.createProduct)({
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
        });
        await Promise.all([
            (0, variant_repo_1.updateManyProductIdToVariant)(variantsResult.value.map((variant) => variant._id.toString()), newProduct._id),
            (0, image_repo_1.updateProductIdManyImage)(imagesResult.value.map((image) => image._id.toString()), newProduct._id),
        ]);
        return newProduct;
    }
    async update(id, payload) {
        const payloadUpdate = (0, utils_1.nestedObjectParser)(payload);
        return await (0, product_repo_1.updateProductById)(id, {
            ...(0, utils_1.removeUndefinedObject)(payloadUpdate),
        });
    }
    async findAll({ limit = 50, page = 1, sort = 'ctime', filter = {}, fields = [
        'product_name',
        'product_description',
        'product_images',
        'product_ratings_averager',
    ], }) {
        const results = await (0, product_repo_1.findAllProduct)(limit, page, sort, filter, fields);
        return results;
    }
    async findById(id, { filter = {}, unSelect = [] }) {
        const result = await (0, product_repo_1.findProductById)(id, filter, [
            ...unSelect,
            'createdAt',
            'updatedAt',
            '__v',
        ]);
        return result;
    }
    async count() {
        return await (0, product_repo_1.countProduct)();
    }
    async publishByAdmin(id) {
        const filter = {
            isPublished: false,
            isDraft: true,
        };
        return await (0, product_repo_1.publishProductByAdmin)(id, filter);
    }
    async unpublishByAdmin(id) {
        const filter = {
            isPublished: true,
            isDraft: false,
        };
        return await (0, product_repo_1.unPublishProductByAdmin)(id, filter);
    }
    async updateTag(id, tags) {
        return await (0, product_repo_1.updateTagsById)(id, tags);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map