"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const product_service_1 = __importDefault(require("../services/product.service"));
const utils_1 = require("../utils");
class ProductController {
    constructor() {
        this.findById = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Get all product success',
                statusCode: 200,
                metadata: await product_service_1.default.findById(productId, {
                    ...query,
                    filter: { isDraft: false, isPublished: true },
                }),
            }).send(res);
        };
        this.findByIdForAdmin = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Get all product success',
                statusCode: 200,
                metadata: await product_service_1.default.findById(productId, query),
            }).send(res);
        };
        this.findAllPublished = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get all product published success',
                statusCode: 200,
                metadata: await product_service_1.default.findAll({
                    ...query,
                    filter: { ...query.filter, isPublished: true, isDraft: false },
                }),
            }).send(res);
        };
        this.findAllDraft = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get all product draft success',
                statusCode: 200,
                metadata: await product_service_1.default.findAll({
                    ...query,
                    filter: { ...query.filter, isPublished: false, isDraft: true },
                }),
            }).send(res);
        };
        this.count = async (req, res, next) => {
            new success_response_1.SuccessResponse({
                message: 'Count product success',
                statusCode: 200,
                metadata: await product_service_1.default.count(),
            }).send(res);
        };
        this.create = async (req, res, next) => {
            new success_response_1.CREATED({
                message: 'Create product success',
                statusCode: 201,
                metadata: await product_service_1.default.create({ ...req.body }),
            }).send(res);
        };
        this.publishByAdmin = async (req, res, next) => {
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Publicize successful products',
                statusCode: 200,
                metadata: await product_service_1.default.publishByAdmin(productId),
            }).send(res);
        };
        this.unPublishByAdmin = async (req, res, next) => {
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Stop publicizing successful products',
                statusCode: 200,
                metadata: await product_service_1.default.unpublishByAdmin(productId),
            }).send(res);
        };
        this.update = async (req, res, next) => {
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Update product success',
                statusCode: 200,
                metadata: await product_service_1.default.update(productId, { ...req.body }),
            }).send(res);
        };
        this.addTags = async (req, res, next) => {
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Update product success',
                statusCode: 200,
                metadata: await product_service_1.default.updateTag(productId, req.body.tags),
            }).send(res);
        };
        this.removeTags = async (req, res, next) => {
            const productId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Update product success',
                statusCode: 200,
                metadata: await product_service_1.default.updateTag(productId, req.body.tags),
            }).send(res);
        };
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map