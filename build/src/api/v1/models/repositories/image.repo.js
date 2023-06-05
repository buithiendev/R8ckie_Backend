"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductIdManyImage = exports.insertManyImage = exports.findImageById = exports.findAllImagesByProductId = exports.deleteImageById = exports.createImage = exports.countImagesByProductId = void 0;
const error_response_1 = require("../../core/error.response");
const utils_1 = require("../../utils");
const image_model_1 = __importDefault(require("../image.model"));
const createImage = async (payload) => {
    return await image_model_1.default.create({ ...payload });
};
exports.createImage = createImage;
const insertManyImage = async (images) => {
    const results = await image_model_1.default.insertMany(images);
    return results;
};
exports.insertManyImage = insertManyImage;
const findAllImagesByProductId = async (productId, { limit, page, sort, filter, fields }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { position: 1 } : { position: -1 };
    const images = await image_model_1.default
        .find({ ...filter, product_id: productId })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(fields))
        .lean()
        .exec();
    return images;
};
exports.findAllImagesByProductId = findAllImagesByProductId;
const findImageById = async (id, unSelect) => {
    return await image_model_1.default
        .findById(id)
        .select((0, utils_1.getUnSelectData)(unSelect))
        .lean()
        .exec();
};
exports.findImageById = findImageById;
const countImagesByProductId = async (productId) => {
    return image_model_1.default.countDocuments({ product_id: productId });
};
exports.countImagesByProductId = countImagesByProductId;
const updateProductIdManyImage = async (ids, productId) => {
    const filter = {
        _id: { $in: ids },
    }, update = {
        product_id: productId,
    }, options = {
        new: true,
    };
    const results = await image_model_1.default.updateMany(filter, update, options);
    return results;
};
exports.updateProductIdManyImage = updateProductIdManyImage;
const deleteImageById = (id) => {
    return new Promise(async (resolve, reject) => {
        const deleteImage = await image_model_1.default.findByIdAndDelete(id);
        if (deleteImage)
            resolve(deleteImage);
        reject(new error_response_1.BadRequestError('Can not find image'));
    });
};
exports.deleteImageById = deleteImageById;
//# sourceMappingURL=image.repo.js.map