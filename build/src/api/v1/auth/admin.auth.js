"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = exports.authentication = void 0;
const error_response_1 = require("../core/error.response");
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const keytoken_service_1 = __importDefault(require("../services/keytoken.service"));
const headers_1 = require("../utils/headers");
const authUtils_1 = require("./authUtils");
const authentication = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = req.headers[headers_1.HEADERS.CLIENT_ID];
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
                throw new error_response_1.BadRequestError('Invalid admin');
            req.user = decodeUser;
            req.refreshToken = refreshToken;
            req.keyStore = keyStore;
            return next();
        }
        catch (error) {
            next(error);
        }
    }
});
exports.authentication = authentication;
const checkPermission = (role) => {
    return (0, asyncHandler_1.default)(async (req, res, next) => {
        const { roles } = req.user;
        if (roles?.includes('Admin'))
            next();
        const promise = new Promise((resolve, reject) => {
            for (let i = 0; i < role.length; i++) {
                if (roles?.includes(role[i])) {
                    return resolve(true);
                }
            }
            reject(new error_response_1.ForbiddenError('Permission denied'));
        });
        promise
            .then(() => {
            next();
        })
            .catch((error) => {
            next(error);
        });
    });
};
exports.checkPermission = checkPermission;
//# sourceMappingURL=admin.auth.js.map