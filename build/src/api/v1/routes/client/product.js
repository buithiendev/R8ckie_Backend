"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(product_controller_1.default.findAllPublished));
router.get('/count', (0, asyncHandler_1.default)(product_controller_1.default.count));
router.get('/:id', (0, asyncHandler_1.default)(product_controller_1.default.findById));
exports.default = router;
//# sourceMappingURL=product.js.map