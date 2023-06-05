"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_1 = require("../../auth/admin.auth");
const access_admin_controller_1 = __importDefault(require("../../controllers/access.admin.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const admin_validation_1 = require("../../validations/admin.validation");
const router = (0, express_1.Router)();
router.post('/create', admin_validation_1.validationCreateAdmin, (0, asyncHandler_1.default)(access_admin_controller_1.default.create));
router.post('/login', admin_validation_1.validationLoginAdmin, (0, asyncHandler_1.default)(access_admin_controller_1.default.login));
router.use(admin_auth_1.authentication);
router.post('/refresh', (0, asyncHandler_1.default)(access_admin_controller_1.default.refreshToken));
router.post('/logout', (0, asyncHandler_1.default)(access_admin_controller_1.default.logout));
exports.default = router;
//# sourceMappingURL=admin.js.map