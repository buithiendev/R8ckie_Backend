"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_firebase_1 = __importDefault(require("../../../databases/init.firebase"));
const error_response_1 = require("../core/error.response");
const image_repo_1 = require("../models/repositories/image.repo");
const product_repo_1 = require("../models/repositories/product.repo");
const utils_1 = require("../utils");
class ImageService {
    async create(payload) {
        const { product_id } = payload;
        const foundProduct = await (0, product_repo_1.findProductByIdNotLean)(product_id);
        if (!foundProduct)
            throw new error_response_1.BadRequestError('Can not find product');
        const newImage = await (0, image_repo_1.createImage)(payload);
        if (newImage) {
            await foundProduct.updateOne({
                $addToSet: {
                    product_images: newImage._id,
                },
            });
        }
        return (0, utils_1.getInfoData)({
            object: newImage,
            fields: ['product_id', 'image_url', 'image_file_name', '_id'],
        });
    }
    async findAllByProductId(productId, query) {
        return await (0, image_repo_1.findAllImagesByProductId)(productId, query);
    }
    async findById(id, { unSelect = ['__v', 'createdAt', 'updatedAt', 'variants_id'] }) {
        return await (0, image_repo_1.findImageById)(id, unSelect);
    }
    async count(productId) {
        return await (0, image_repo_1.countImagesByProductId)(productId);
    }
    async delete(id) {
        const imageDelete = await (0, image_repo_1.deleteImageById)(id);
        await init_firebase_1.default.deleteImage('product_images', imageDelete.image_file_name)
            .then(() => {
            return 1;
        })
            .catch(() => {
            throw new error_response_1.BadRequestError('Delete image error...');
        });
    }
}
exports.default = new ImageService();
//# sourceMappingURL=image.service.js.map