"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUtils_1 = require("../../auth/authUtils");
const error_response_1 = require("../../core/error.response");
const customer_repo_1 = require("../../models/repositories/customer.repo");
const utils_1 = require("../../utils");
const customer_service_1 = __importDefault(require("../customer.service"));
const keytoken_service_1 = __importDefault(require("../keytoken.service"));
class AccessCustomerService {
    async verifyEmail(email) {
        const verify_email = false;
        const customer = await (0, customer_repo_1.findByEmailAndVerify)(email, verify_email);
        if (!customer)
            throw new error_response_1.BadRequestError('Verifed email');
        const verify = await customer.updateOne({
            verify_email: true,
        }, { new: true });
        return verify;
    }
    async refreshToken(refreshToken, user, keyStore) {
        const { userId, email } = user;
        if (keyStore.refreshTokenUsed.includes(refreshToken))
            throw new error_response_1.ForbiddenError('Something wrong happend. Please relogin');
        if (refreshToken !== keyStore.refreshToken)
            throw new error_response_1.ForbiddenError('Customer is not registered');
        const foundCustomer = await customer_service_1.default.findByUserId(userId);
        if (!foundCustomer)
            throw new error_response_1.ForbiddenError('Customer is not registered');
        const tokens = await (0, authUtils_1.createTokenPair)({ email, userId }, keyStore.publicKey, keyStore.privateKey);
        await keytoken_service_1.default.updateRefreshToken(keyStore, refreshToken, tokens.refreshToken);
        return {
            user: (0, utils_1.getInfoData)({
                object: foundCustomer,
                fields: [
                    '_id',
                    'email',
                    'first_name',
                    'last_name',
                    'phone_number',
                    'gender',
                    'birthday',
                ],
            }),
            tokens,
        };
    }
    async logout(keyStore) {
        const isDelete = await keytoken_service_1.default.removeById(keyStore._id);
        if (isDelete === 0)
            throw new error_response_1.BadRequestError('Logout failed');
        return 'Logout success';
    }
    async login({ email, password, }) {
        const foundCustomer = await customer_service_1.default.findByEmail(email);
        if (!foundCustomer)
            throw new error_response_1.BadRequestError('Customer is not registered');
        const match = bcrypt_1.default.compare(password, foundCustomer?.password);
        if (!match)
            throw new error_response_1.AuthFailureError('Authentication error');
        if (!foundCustomer.verify_email)
            throw new error_response_1.ForbiddenError('Please verify your email in your email inbox');
        const { publicKey, privateKey } = (0, utils_1.createKeys)();
        const { _id: userId } = foundCustomer;
        const tokens = await (0, authUtils_1.createTokenPair)({ userId, email }, publicKey, privateKey);
        await keytoken_service_1.default.create(foundCustomer._id, publicKey, privateKey, tokens.refreshToken);
        return {
            user: (0, utils_1.getInfoData)({
                object: foundCustomer,
                fields: [
                    '_id',
                    'email',
                    'first_name',
                    'last_name',
                    'phone_number',
                    'gender',
                    'birthday',
                ],
            }),
            tokens,
        };
    }
    async register({ first_name, last_name, email, password, }) {
        const foundCustomer = await customer_service_1.default.findByEmail(email);
        if (foundCustomer)
            throw new error_response_1.ConflictRequestError('Email is being used');
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newCustomer = await customer_service_1.default.create({
            first_name,
            last_name,
            email,
            password: hashPassword,
        });
        if (!newCustomer) {
            throw new error_response_1.BadRequestError('Account creation failed!!!');
        }
        return `Account successfully created. Please check your email inbox ${email} to verify your account`;
    }
}
exports.default = new AccessCustomerService();
//# sourceMappingURL=access.customer.service.js.map