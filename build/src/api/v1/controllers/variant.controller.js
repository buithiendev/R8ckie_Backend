"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const variant_service_1 = __importDefault(require("../services/variant.service"));
const utils_1 = require("../utils");
class VariantController {
    constructor() {
        this.findAll = async (req, res, next) => {
            const { productId } = req.params;
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get all variant with productId success',
                statusCode: 200,
                metadata: await variant_service_1.default.findAllByProductId(productId, query),
            }).send(res);
        };
        this.findById = async (req, res, next) => {
            const { variantId } = req.params;
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get variant success',
                statusCode: 200,
                metadata: await variant_service_1.default.findById(variantId, query),
            }).send(res);
        };
        this.count = async (req, res, next) => {
            const productId = req.params.productId;
            new success_response_1.SuccessResponse({
                message: 'Count variant by product success',
                statusCode: 200,
                metadata: await variant_service_1.default.count(productId),
            }).send(res);
        };
        this.create = async (req, res, next) => {
            new success_response_1.CREATED({
                message: 'Create variant success',
                statusCode: 201,
                metadata: await variant_service_1.default.create({ ...req.body }),
            }).send(res);
        };
        this.update = async (req, res, next) => {
            const { variantId } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Update variant success',
                statusCode: 200,
                metadata: await variant_service_1.default.update(variantId, {
                    ...req.body,
                }),
            }).send(res);
        };
        this.delete = async (req, res, next) => {
            const { variantId, productId } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Delete variant success',
                statusCode: 200,
                metadata: await variant_service_1.default.delete(productId, variantId),
            }).send(res);
        };
    }
}
exports.default = new VariantController();
//# sourceMappingURL=variant.controller.js.map