"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailVerify = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport_email_1 = __importDefault(require("../../../configs/transport.email"));
const error_response_1 = require("../core/error.response");
const customer_service_1 = __importDefault(require("../services/customer.service"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const sendMailVerify = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, first_name, last_name } = req.body;
    const foundCustomer = await customer_service_1.default.findByEmail(email);
    if (foundCustomer)
        throw new error_response_1.BadRequestError('Email is being used');
    try {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Example Email</title>
                <style>
                    .button {
                        background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 8px;
                    }

                    .link {
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <h1>R8ckie Xin Chào, ${first_name} ${last_name} </h1>
                <p>Xác minh email này là của bạn ${email}</p>
                <a class="link" href="http://localhost:4001/v1/api/customer/verify/${email}" onclick="myFunction"><button class="button">Active email</button></a>
            </body>
            </html>
        `;
        const transporter = nodemailer_1.default.createTransport(transport_email_1.default);
        const mainOptions = {
            from: 'R8ckie Shop',
            to: email,
            subject: 'Active email',
            text: 'You recieved message from ' + req.body.email,
            html,
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                next(err);
            }
            else {
                next();
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendMailVerify = sendMailVerify;
//# sourceMappingURL=sendMail.js.map