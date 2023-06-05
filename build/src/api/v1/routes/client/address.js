"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_auth_1 = require("../../auth/customer.auth");
const address_controller_1 = __importDefault(require("../../controllers/address.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const address_validation_1 = require("../../validations/address.validation");
const router = (0, express_1.Router)();
router.use(customer_auth_1.authentication);
router.get('/', (0, asyncHandler_1.default)(address_controller_1.default.findAll));
router.get('/:id', (0, asyncHandler_1.default)(address_controller_1.default.findById));
router.post('/create', address_validation_1.validateCreateAddress, (0, asyncHandler_1.default)(address_controller_1.default.create));
router.patch('/:id', address_validation_1.validateUpdateAddress, (0, asyncHandler_1.default)(address_controller_1.default.update));
router.delete('/:id', (0, asyncHandler_1.default)(address_controller_1.default.removeById));
router.patch('/:id/default', (0, asyncHandler_1.default)(address_controller_1.default.setDefault));
exports.default = router;
//# sourceMappingURL=address.js.map