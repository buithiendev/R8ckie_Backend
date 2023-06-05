"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTagsById = exports.updateProductById = exports.unPublishProductByAdmin = exports.removeSpacingString = exports.refactorListOption = exports.publishProductByAdmin = exports.findProductByIdNotLean = exports.findProductById = exports.findAllVariantsByProductId = exports.findAllProduct = exports.createProduct = exports.countProduct = exports.checkOptionAndVariantValue = void 0;
const mongoose_1 = require("mongoose");
const error_response_1 = require("../../core/error.response");
const utils_1 = require("../../utils");
Object.defineProperty(exports, "removeSpacingString", { enumerable: true, get: function () { return utils_1.removeSpacingString; } });
const product_model_1 = __importDefault(require("../product.model"));
const findAllProduct = async (limit, page, sort, filter, select) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const results = await product_model_1.default
        .find({ ...filter })
        .populate({
        path: 'product_images',
        options: { limit: 1 },
        select: 'image_url image_file_name',
    })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(select))
        .lean()
        .exec();
    return results;
};
exports.findAllProduct = findAllProduct;
const findAllVariantsByProductId = async (productId, limit, page, filter, select) => {
    const skip = (page - 1) * limit;
    try {
        const variants = await product_model_1.default
            .findById(productId, filter)
            .populate({
            path: 'product_variants',
            options: { limit, skip },
            select: select.join(' '),
        })
            .select((0, utils_1.getSelectData)(['_id', 'product_variants']))
            .lean()
            .exec();
        return variants?.product_variants || [];
    }
    catch (error) {
        throw new error_response_1.BadRequestError(`Can not find product ${productId}`);
    }
};
exports.findAllVariantsByProductId = findAllVariantsByProductId;
const findProductById = async (productId, filter, unSelect) => {
    const result = await product_model_1.default
        .findOne({ ...filter, _id: productId })
        .populate('product_images', 'image_url _id product_id image_file_name')
        .populate('product_variants', 'price inventory_quantity option1 option2 option3 -_id')
        .select((0, utils_1.getUnSelectData)(unSelect))
        .lean()
        .exec();
    return result;
};
exports.findProductById = findProductById;
const findProductByIdNotLean = async (productId) => {
    return product_model_1.default.findById(productId);
};
exports.findProductByIdNotLean = findProductByIdNotLean;
const countProduct = async () => {
    return await product_model_1.default.countDocuments();
};
exports.countProduct = countProduct;
const createProduct = async (payload) => {
    return await product_model_1.default.create({
        ...payload,
    });
};
exports.createProduct = createProduct;
const publishProductByAdmin = async (id, filter = { isPublished: false, isDraft: true }) => {
    const foundProduct = await product_model_1.default.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        ...filter,
    });
    if (!foundProduct) {
        throw new error_response_1.BadRequestError('This product could not be found');
    }
    const update = {
        isPublished: true,
        isDraft: false,
    };
    const { modifiedCount } = await foundProduct.updateOne(update);
    return modifiedCount;
};
exports.publishProductByAdmin = publishProductByAdmin;
const unPublishProductByAdmin = async (id, filter = { isPublished: true, isDraft: false }) => {
    const foundProduct = await product_model_1.default.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        ...filter,
    });
    if (!foundProduct) {
        throw new error_response_1.BadRequestError('This product could not be found');
    }
    const update = {
        isPublished: false,
        isDraft: true,
    };
    const { modifiedCount } = await foundProduct.updateOne(update);
    return modifiedCount;
};
exports.unPublishProductByAdmin = unPublishProductByAdmin;
const updateProductById = async (productId, payload, isNew = true) => {
    return await product_model_1.default
        .findByIdAndUpdate(productId, {
        $set: {
            ...payload,
        },
    }, {
        new: isNew,
    })
        .populate('product_variants')
        .populate('product_images')
        .lean()
        .exec();
};
exports.updateProductById = updateProductById;
const updateTagsById = async (productId, tags) => {
    const foundProduct = await product_model_1.default.findById(productId);
    if (!foundProduct)
        throw new error_response_1.BadRequestError('This product could not be found');
    const { modifiedCount } = await foundProduct.updateOne({
        $set: {
            tags: tags,
        },
    });
    return modifiedCount;
};
exports.updateTagsById = updateTagsById;
const checkOptionAndVariantValue = (options, variants) => {
    let pass = true;
    const lengthOption = options.length;
    variants.forEach((v) => {
        let optionNotNull = 0;
        Object.keys(v).forEach((key) => {
            if (key === 'option1' || key === 'option2' || key === 'option3') {
                if (v[key] !== null)
                    optionNotNull++;
            }
        });
        if (optionNotNull !== lengthOption) {
            pass = false;
            return;
        }
    });
    return pass;
};
exports.checkOptionAndVariantValue = checkOptionAndVariantValue;
const refactorListOption = (options) => {
    return options.map((option, index) => {
        return { ...option, _position: index + 1 };
    });
};
exports.refactorListOption = refactorListOption;
//# sourceMappingURL=product.repo.js.map