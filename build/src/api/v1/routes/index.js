"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("./admin"));
const client_1 = __importDefault(require("./client"));
const router = (0, express_1.Router)();
router.use('/', client_1.default);
router.use('/dashboard', admin_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map