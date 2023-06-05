"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const access_customer_service_1 = __importDefault(require("../services/access/access.customer.service"));
class AccessCustomerController {
    constructor() {
        this.register = async (req, res, next) => {
            new success_response_1.CREATED({
                message: 'Verify your email, please',
                statusCode: 201,
                metadata: await access_customer_service_1.default.register({ ...req.body }),
            }).send(res);
        };
        this.login = async (req, res, next) => {
            new success_response_1.SuccessResponse({
                message: 'Login success',
                statusCode: 200,
                metadata: await access_customer_service_1.default.login({ ...req.body }),
            }).send(res);
        };
        this.logout = async (req, res, next) => {
            new success_response_1.SuccessResponse({
                message: 'Logout success',
                statusCode: 200,
                metadata: await access_customer_service_1.default.logout(req.keyStore),
            }).send(res);
        };
        this.refreshToken = async (req, res, next) => {
            const { user, refreshToken, keyStore } = req;
            new success_response_1.SuccessResponse({
                message: 'Logout success',
                statusCode: 200,
                metadata: await access_customer_service_1.default.refreshToken(refreshToken, user, keyStore),
            }).send(res);
        };
        this.verifyEmail = async (req, res, next) => {
            const email = req.params.email;
            new success_response_1.SuccessResponse({
                message: 'Verify success',
                statusCode: 200,
                metadata: await access_customer_service_1.default.verifyEmail(email),
            }).redirect(res, 'https://www.facebook.com/');
        };
    }
}
exports.default = new AccessCustomerController();
//# sourceMappingURL=access.customer.controller.js.map