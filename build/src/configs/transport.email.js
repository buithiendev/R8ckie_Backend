"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const transport = {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ACCOUNT_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
    tls: {
        rejectUnauthorized: false,
    },
};
exports.default = transport;
//# sourceMappingURL=transport.email.js.map