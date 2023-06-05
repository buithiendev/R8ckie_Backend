"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const access_customer_1 = __importDefault(require("./access.customer"));
const address_1 = __importDefault(require("./address"));
const product_1 = __importDefault(require("./product"));
const router = (0, express_1.Router)();
router.use('/api/customers', access_customer_1.default);
router.use('/api/customers/address', address_1.default);
router.use('/api/products', product_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map