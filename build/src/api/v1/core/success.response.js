"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.OK = exports.CREATED = void 0;
const reasonPhrases_1 = __importDefault(require("../utils/reasonPhrases"));
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
class SuccessResponse {
    constructor({ message, statusCode = statusCodes_1.default.OK, reasonStatusCode = reasonPhrases_1.default.OK, metadata, }) {
        this.message = message ? message : reasonStatusCode;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }
    send(res) {
        res.status(200).json(this);
    }
    redirect(res, redirect = '') {
        return res.redirect(redirect);
    }
}
exports.SuccessResponse = SuccessResponse;
class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}
exports.OK = OK;
class CREATED extends SuccessResponse {
    constructor({ message, statusCode = statusCodes_1.default.CREATED, reasonStatusCode = reasonPhrases_1.default.CREATED, metadata, }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}
exports.CREATED = CREATED;
//# sourceMappingURL=success.response.js.map