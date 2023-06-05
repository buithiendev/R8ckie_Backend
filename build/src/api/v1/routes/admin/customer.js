"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_1 = require("../../auth/admin.auth");
const customer_controller_1 = __importDefault(require("../../controllers/customer.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const router = (0, express_1.Router)();
router.use(admin_auth_1.authentication);
router.get('/', (0, asyncHandler_1.default)(customer_controller_1.default.findAll));
router.get('/count', (0, asyncHandler_1.default)(customer_controller_1.default.count));
router.get('/:id', (0, asyncHandler_1.default)(customer_controller_1.default.findById));
router.get('/search/:keyword', (0, asyncHandler_1.default)(customer_controller_1.default.getListSearch));
exports.default = router;
//# sourceMappingURL=customer.js.map