"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEX_ID = exports.validateData = void 0;
const error_response_1 = require("../core/error.response");
const REGEX_ID = /^[0-9a-fA-F]{24}$/;
exports.REGEX_ID = REGEX_ID;
function replaceBackslash(message) {
    const regex = /\\*"/g;
    return message.replace(regex, '');
}
const validateData = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = replaceBackslash(error.message);
        throw new error_response_1.BadRequestError(message);
    }
    return next();
};
exports.validateData = validateData;
//# sourceMappingURL=index.js.map