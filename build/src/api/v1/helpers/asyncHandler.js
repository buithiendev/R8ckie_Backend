"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (callback) => {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map