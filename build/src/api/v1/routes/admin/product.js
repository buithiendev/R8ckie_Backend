"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_1 = require("../../auth/admin.auth");
const image_controller_1 = __importDefault(require("../../controllers/image.controller"));
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const variant_controller_1 = __importDefault(require("../../controllers/variant.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const image_validation_1 = require("../../validations/image.validation");
const product_validation_1 = require("../../validations/product.validation");
const variant_validation_1 = require("../../validations/variant.validation");
const router = (0, express_1.Router)();
router.use(admin_auth_1.authentication);
/** Product route */
router.get('/drafts/all', (0, asyncHandler_1.default)(product_controller_1.default.findAllDraft));
router.get('/published/all', (0, asyncHandler_1.default)(product_controller_1.default.findAllPublished));
router.post('/create', product_validation_1.validateProductCreationInput, (0, asyncHandler_1.default)(product_controller_1.default.create));
router.patch('/:id', product_validation_1.validateProductUpdateInput, (0, asyncHandler_1.default)(product_controller_1.default.update));
router.post('/:id/publish', (0, asyncHandler_1.default)(product_controller_1.default.publishByAdmin));
router.post('/:id/unpublish', (0, asyncHandler_1.default)(product_controller_1.default.unPublishByAdmin));
router.post('/:id/tags', (0, asyncHandler_1.default)(product_controller_1.default.addTags));
router.delete('/:id/tags', (0, asyncHandler_1.default)(product_controller_1.default.removeTags));
router.get('/:id', (0, asyncHandler_1.default)(product_controller_1.default.findByIdForAdmin));
/** Variant route */
router.get('/:productId/variants', (0, asyncHandler_1.default)(variant_controller_1.default.findAll));
router.get('/:productId/variants/count', (0, asyncHandler_1.default)(variant_controller_1.default.count));
router.post('/variants/create', variant_validation_1.validateVariantCreationInput, (0, asyncHandler_1.default)(variant_controller_1.default.create));
router.get('/variants/:variantId', (0, asyncHandler_1.default)(variant_controller_1.default.findById));
router.patch('/variants/:variantId', variant_validation_1.validateVariantUpdationInput, (0, asyncHandler_1.default)(variant_controller_1.default.update));
router.delete('/:productId/variants/:variantId', (0, asyncHandler_1.default)(variant_controller_1.default.delete));
/** Image route */
router.post('/images', image_validation_1.validateImageCreationInput, (0, asyncHandler_1.default)(image_controller_1.default.create));
router.get('/:productId/images', (0, asyncHandler_1.default)(image_controller_1.default.findAll));
router.get('/:productId/images/count', (0, asyncHandler_1.default)(image_controller_1.default.count));
router.get('/:productId/images/:imageId', (0, asyncHandler_1.default)(image_controller_1.default.findById));
router.delete('/:productId/images/:imageId', (0, asyncHandler_1.default)(image_controller_1.default.delete));
exports.default = router;
//# sourceMappingURL=product.js.map