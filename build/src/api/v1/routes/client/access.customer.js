"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_auth_1 = require("../../auth/customer.auth");
const access_customer_controller_1 = __importDefault(require("../../controllers/access.customer.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const sendMail_1 = require("../../helpers/sendMail");
const customer_validation_1 = require("../../validations/customer.validation");
const router = (0, express_1.Router)();
router.post('/register', customer_validation_1.validationRegisterCustomer, sendMail_1.sendMailVerify, (0, asyncHandler_1.default)(access_customer_controller_1.default.register));
router.get('/verify/:email', (0, asyncHandler_1.default)(access_customer_controller_1.default.verifyEmail));
router.post('/login', customer_validation_1.validationLoginCustomer, (0, asyncHandler_1.default)(access_customer_controller_1.default.login));
router.use(customer_auth_1.authentication);
router.post('/logout', (0, asyncHandler_1.default)(access_customer_controller_1.default.logout));
router.post('/refresh', (0, asyncHandler_1.default)(access_customer_controller_1.default.refreshToken));
exports.default = router;
//# sourceMappingURL=access.customer.js.map