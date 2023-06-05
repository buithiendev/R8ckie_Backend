"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const customer_service_1 = __importDefault(require("../services/customer.service"));
const utils_1 = require("../utils");
class CustomerController {
    constructor() {
        // Query
        this.getListSearch = async (req, res, next) => {
            const { keyword } = req.params;
            const { limit = 50, page = 1, fields = ['first_name', 'last_name', 'email', 'phone_number'], filter = { state: 'enabled', verify_email: true }, } = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: `Get list with key search ${req.params.keyword} success.`,
                statusCode: 200,
                metadata: await customer_service_1.default.getListSearch(keyword, {
                    limit,
                    page,
                    fields,
                    filter,
                }),
            }).send(res);
        };
        this.count = async (req, res, next) => {
            const { filter = {} } = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Count customer success',
                statusCode: 200,
                metadata: await customer_service_1.default.count(filter),
            }).send(res);
        };
        this.findAll = async (req, res, next) => {
            const { limit = 50, sort = 'ctime', page = 1, fields = ['first_name', 'last_name', 'email', 'phone_number'], filter = { state: 'enabled', verify_email: true }, } = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get list customer success',
                statusCode: 200,
                metadata: await customer_service_1.default.findAll({
                    limit,
                    sort,
                    page,
                    fields,
                    filter,
                }),
            }).send(res);
        };
        this.findById = async (req, res, next) => {
            const customerId = req.params.id;
            new success_response_1.SuccessResponse({
                message: 'Get success',
                statusCode: 200,
                metadata: await customer_service_1.default.findById(customerId),
            }).send(res);
        };
    }
}
exports.default = new CustomerController();
//# sourceMappingURL=customer.controller.js.map