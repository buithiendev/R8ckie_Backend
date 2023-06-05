"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const access_admin_service_1 = __importDefault(require("../services/access/access.admin.service"));
class AccessAdminController {
    constructor() {
        this.create = async (req, res, next) => {
            new success_response_1.CREATED({
                message: 'Create new account admin success',
                statusCode: 201,
                metadata: await access_admin_service_1.default.create({ ...req.body }),
            }).send(res);
        };
        this.login = async (req, res, next) => {
            new success_response_1.SuccessResponse({
                message: 'Login success',
                statusCode: 200,
                metadata: await access_admin_service_1.default.login({ ...req.body }),
            }).send(res);
        };
        this.logout = async (req, res, next) => {
            const { keyStore } = req;
            new success_response_1.SuccessResponse({
                message: 'Logout success',
                statusCode: 200,
                metadata: await access_admin_service_1.default.logout(keyStore),
            }).send(res);
        };
        this.refreshToken = async (req, res, next) => {
            const { user, refreshToken, keyStore } = req;
            new success_response_1.SuccessResponse({
                message: 'Refresh token success',
                statusCode: 200,
                metadata: await access_admin_service_1.default.refreshToken(refreshToken, user, keyStore),
            }).send(res);
        };
    }
}
exports.default = new AccessAdminController();
//# sourceMappingURL=access.admin.controller.js.map