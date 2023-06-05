"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageCreationInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const validateImageCreationInput = (0, _1.validateData)(joi_1.default.object({
    product_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    image_url: joi_1.default.string().uri().required(),
    image_file_name: joi_1.default.string().required(),
    position: joi_1.default.number(),
}));
exports.validateImageCreationInput = validateImageCreationInput;
//# sourceMappingURL=image.validation.js.map