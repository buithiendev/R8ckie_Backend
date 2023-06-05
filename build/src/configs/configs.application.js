"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("./database.config"));
require('dotenv').config();
const development = {
    app: {
        port: process.env.PRODUCTION_APP_PORT || 5001,
    },
    database: database_config_1.default.development,
};
const production = {
    app: {
        port: process.env.PRODUCTION_APP_PORT || 5002,
    },
    database: database_config_1.default.production,
};
const configs = { development, production };
const env = process.env.NODE_ENV || 'development';
exports.default = configs[env];
//# sourceMappingURL=configs.application.js.map