"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const uuidv4_1 = require("uuidv4");
const error_response_1 = require("./api/v1/core/error.response");
const logEvents_1 = __importDefault(require("./api/v1/helpers/logEvents"));
const routes_1 = __importDefault(require("./api/v1/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// init middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// init db
require('./databases/init.mongodb');
// init routes-
app.use('/v1', routes_1.default);
app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Truy cập đường dẫn dưới đây để join vào workspace chứa thông tin về APIs',
        link: 'https://app.getpostman.com/join-team?invite_code=817d2f8cac24c37b207acb048d4f68ab&target_code=c82142bf017847545f03ba2ae8a792ec',
    });
});
// handling error
app.use((req, res, next) => {
    const error = new error_response_1.ErrorResponse('Not found', 404);
    next(error);
});
app.use((error, req, res, next) => {
    (0, logEvents_1.default)(`Id-Error:${(0, uuidv4_1.uuid)()}----[${req.method}]----${req.url}----${error.message}`);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error',
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map