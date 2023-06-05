"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../core/error.response");
const product_repo_1 = require("../models/repositories/product.repo");
const variant_repo_1 = require("../models/repositories/variant.repo");
const utils_1 = require("../utils");
class VariantService {
    async create(payload) {
        const { option1, option2, option3, product_id } = payload;
        const [foundProduct, variantExits] = await Promise.all([
            (0, product_repo_1.findProductByIdNotLean)(product_id),
            (0, variant_repo_1.checkExitsVariant)(product_id, { option1, option2, option3 }),
        ]);
        if (!foundProduct) {
            throw new error_response_1.BadRequestError('This product could not be found.');
        }
        if (variantExits) {
            throw new error_response_1.BadRequestError('This product already exists in this variant.');
        }
        const newVariant = await (0, variant_repo_1.createVariant)(product_id, payload);
        if (!newVariant)
            throw new error_response_1.BadRequestError('Variant creation failed. Please try again');
        await foundProduct.updateOne({
            $addToSet: {
                product_variants: newVariant._id,
            },
        });
        return newVariant;
    }
    async findAllByProductId(productId, { limit = 50, page = 1, filter = {}, fields = [
        '_id',
        'sku',
        'price',
        'position',
        'option1',
        'option2',
        'option3',
    ], }) {
        const results = await (0, product_repo_1.findAllVariantsByProductId)(productId, limit, page, filter, fields);
        return results;
    }
    async findById(id, { unSelect = ['__v', 'createdAt', 'updatedAt'] }) {
        return await (0, variant_repo_1.findVariantById)(id, unSelect);
    }
    async count(productId) {
        return await (0, variant_repo_1.countVariantByProductId)(productId);
    }
    async update(id, payload) {
        const oldVariant = await (0, variant_repo_1.findVariantById)(id);
        if (!oldVariant)
            throw new error_response_1.BadRequestError('Variant can not found');
        const payloadUpdate = (0, utils_1.nestedObjectParser)(payload);
        const variantExist = await (0, variant_repo_1.checkExitsVariant)(oldVariant.product_id, {
            ...oldVariant,
            ...payload,
        }, id);
        if (variantExist) {
            throw new error_response_1.BadRequestError('This product already exists in this variant.');
        }
        return await (0, variant_repo_1.updateVariant)(oldVariant.product_id, id, { ...(0, utils_1.removeUndefinedObject)(payloadUpdate) }, true);
    }
    async delete(productId, id) {
        return await (0, variant_repo_1.deleteVarantFromProduct)(productId, id);
    }
}
exports.default = new VariantService();
//# sourceMappingURL=variant.service.js.map