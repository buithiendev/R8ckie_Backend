"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVariant = exports.updateManyProductIdToVariant = exports.insertManyVariant = exports.findVariantById = exports.findAllByProductId = exports.deleteVarantFromProduct = exports.createVariant = exports.countVariantByProductId = exports.checkExitsVariant = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
const product_model_1 = __importDefault(require("../product.model"));
const variant_model_1 = __importDefault(require("../variant.model"));
const findAllByProductId = async (productId, limit, page, sort, filter, select) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { position: 1 } : { position: -1 };
    return await variant_model_1.default
        .find({
        ...filter,
        product_id: new mongoose_1.Types.ObjectId(productId),
    })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(select))
        .lean()
        .exec();
};
exports.findAllByProductId = findAllByProductId;
const findVariantById = async (id, unSelect) => {
    return await variant_model_1.default
        .findById(id)
        .populate('variant_image')
        .select((0, utils_1.getUnSelectData)(unSelect))
        .lean()
        .exec();
};
exports.findVariantById = findVariantById;
const countVariantByProductId = async (productId) => {
    return await variant_model_1.default.countDocuments({ product_id: productId });
};
exports.countVariantByProductId = countVariantByProductId;
const insertManyVariant = async (variants) => {
    const results = await variant_model_1.default.insertMany(variants);
    return results;
};
exports.insertManyVariant = insertManyVariant;
const updateManyProductIdToVariant = async (ids, productId) => {
    const filter = {
        _id: { $in: ids },
    }, update = {
        product_id: productId,
    }, options = {
        new: true,
    };
    const results = await variant_model_1.default.updateMany(filter, update, options);
    return results;
};
exports.updateManyProductIdToVariant = updateManyProductIdToVariant;
const checkExitsVariant = async (productId, { option1, option2, option3, }, excludedVariantId) => {
    const query = {
        product_id: productId,
        option1,
        option2,
        option3,
        _id: { $ne: excludedVariantId },
    };
    const check = await variant_model_1.default.findOne(query);
    return check ? true : false;
};
exports.checkExitsVariant = checkExitsVariant;
const createVariant = async (productId, payload) => {
    return variant_model_1.default.create({ ...payload, product_id: productId });
};
exports.createVariant = createVariant;
const updateVariant = async (productId, variantId, payload, isNew = true) => {
    const filter = {
        product_id: productId,
    };
    return variant_model_1.default.findByIdAndUpdate(variantId, filter, {
        $set: {
            ...payload,
        },
    });
};
exports.updateVariant = updateVariant;
const deleteVarantFromProduct = async (productId, variantId) => {
    const update = await product_model_1.default.findByIdAndUpdate(productId, {
        $pull: {
            product_variants: variantId,
        },
    });
    return update ? 1 : 0;
};
exports.deleteVarantFromProduct = deleteVarantFromProduct;
//# sourceMappingURL=variant.repo.js.map