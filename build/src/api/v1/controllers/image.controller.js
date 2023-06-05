"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const image_service_1 = __importDefault(require("../services/image.service"));
const utils_1 = require("../utils");
class ImageController {
    constructor() {
        this.create = async (req, res, next) => {
            new success_response_1.SuccessResponse({
                message: 'Add new image success',
                statusCode: 201,
                metadata: await image_service_1.default.create({ ...req.body }),
            }).send(res);
        };
        this.count = async (req, res, next) => {
            const { productId } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Count image success',
                statusCode: 200,
                metadata: await image_service_1.default.count(productId),
            }).send(res);
        };
        this.findAll = async (req, res, next) => {
            const { productId } = req.params;
            const { limit = 10, page = 1, sort = 'ctime', filter = {}, fields = ['image_url', 'image_file_name', 'product_id'], } = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get all list image of product success',
                statusCode: 200,
                metadata: await image_service_1.default.findAllByProductId(productId, {
                    limit,
                    page,
                    sort,
                    filter,
                    fields,
                }),
            }).send(res);
        };
        this.findById = async (req, res, next) => {
            const { imageId } = req.params;
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get image success',
                statusCode: 200,
                metadata: await image_service_1.default.findById(imageId, query),
            }).send(res);
        };
        this.delete = async (req, res, next) => {
            const { imageId } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Delete image success',
                statusCode: 200,
                metadata: await image_service_1.default.delete(imageId),
            }).send(res);
        };
    }
}
exports.default = new ImageController();
//# sourceMappingURL=image.controller.js.map