"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const error_response_1 = require("../core/error.response");
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const keytoken_service_1 = __importDefault(require("../services/keytoken.service"));
const headers_1 = require("../utils/headers");
const authUtils_1 = require("./authUtils");
const authentication = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = req.headers[headers_1.HEADERS.CLIENT_ID]?.toString();
    if (!userId)
        throw new error_response_1.AuthFailureError('Invalid request');
    const keyStore = await keytoken_service_1.default.findByUserId(userId);
    if (!keyStore)
        throw new error_response_1.AuthFailureError('Not found key store');
    const refreshToken = req.headers[headers_1.HEADERS.REFRESHTOKEN];
    if (refreshToken) {
        try {
            const decodeUser = await (0, authUtils_1.verifyToken)(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId)
                throw new error_response_1.BadRequestError('Invalid user');
            req.user = decodeUser;
            req.keyStore = keyStore;
            req.refreshToken = refreshToken;
            return next();
        }
        catch (error) {
            next(error);
        }
    }
});
exports.authentication = authentication;
//# sourceMappingURL=customer.auth.js.map