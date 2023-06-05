"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.ErrorResponse = exports.ConflictRequestError = exports.BadRequestError = exports.AuthFailureError = void 0;
const reasonPhrases_1 = __importDefault(require("../utils/reasonPhrases"));
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
class ConflictRequestError extends ErrorResponse {
    constructor(message = reasonPhrases_1.default.CONFLICT, statusCode = statusCodes_1.default.CONFLICT) {
        super(message, statusCode);
    }
}
exports.ConflictRequestError = ConflictRequestError;
class AuthFailureError extends ErrorResponse {
    constructor(message = reasonPhrases_1.default.UNAUTHORIZED, statusCode = statusCodes_1.default.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthFailureError = AuthFailureError;
class NotFoundError extends ErrorResponse {
    constructor(message = reasonPhrases_1.default.NOT_FOUND, statusCode = statusCodes_1.default.NOT_FOUND) {
        super(message, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends ErrorResponse {
    constructor(message = reasonPhrases_1.default.FORBIDDEN, statusCode = statusCodes_1.default.FORBIDDEN) {
        super(message, statusCode);
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends ErrorResponse {
    constructor(message = reasonPhrases_1.default.BAD_REQUEST, statusCode = statusCodes_1.default.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=error.response.js.map