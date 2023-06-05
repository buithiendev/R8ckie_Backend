"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const address_service_1 = __importDefault(require("../services/address.service"));
const utils_1 = require("../utils");
class AddressController {
    constructor() {
        this.create = async (req, res, next) => {
            const { user } = req;
            new success_response_1.CREATED({
                message: 'Create address success',
                statusCode: 201,
                metadata: await address_service_1.default.create(user.userId, { ...req.body }),
            }).send(res);
        };
        this.findAll = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Get list address success',
                statusCode: 200,
                metadata: await address_service_1.default.findAll(user.userId, query),
            }).send(res);
        };
        this.findById = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            const { user } = req;
            const addressId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Get address success',
                statusCode: 200,
                metadata: await address_service_1.default.findById(addressId, user.userId, query),
            }).send(res);
        };
        this.removeById = async (req, res, next) => {
            const addressId = req.params.id;
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Delete success',
                statusCode: 200,
                metadata: await address_service_1.default.delete(user.userId, addressId),
            }).send(res);
        };
        this.setDefault = async (req, res, next) => {
            const addressId = req.params.id;
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Set default success',
                statusCode: 200,
                metadata: await address_service_1.default.setDefault(user.userId, addressId),
            }).send(res);
        };
        this.update = async (req, res, next) => {
            const addressId = req.params.id;
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Update this address success',
                statusCode: 200,
                metadata: await address_service_1.default.update(user.userId, addressId, {
                    ...req.body,
                }),
            }).send(res);
        };
    }
}
exports.default = new AddressController();
//# sourceMappingURL=address.controller.js.map