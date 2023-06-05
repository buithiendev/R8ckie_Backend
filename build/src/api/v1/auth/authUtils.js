"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createTokenPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_response_1 = require("../core/error.response");
const EXPIRES_REFRESHTOKEN = 7 * 26 * 60 * 60 * 1000;
const EXPIRES_ACCESSTOKEN = 2 * 26 * 60 * 60 * 1000;
const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = await jsonwebtoken_1.default.sign(payload, publicKey, {
        expiresIn: '2 days',
    });
    const refreshToken = await jsonwebtoken_1.default.sign(payload, privateKey, {
        expiresIn: '7 days',
    });
    return {
        accessToken,
        refreshToken,
        expires: EXPIRES_REFRESHTOKEN,
    };
};
exports.createTokenPair = createTokenPair;
const verifyToken = async (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        throw new error_response_1.AuthFailureError('Your token has expired');
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authUtils.js.map