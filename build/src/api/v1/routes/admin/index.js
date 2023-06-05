"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("./admin"));
const customer_1 = __importDefault(require("./customer"));
const product_1 = __importDefault(require("./product"));
const router = (0, express_1.Router)();
router.use('/api/customers', customer_1.default);
router.use('/api/admin', admin_1.default);
router.use('/api/products', product_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map