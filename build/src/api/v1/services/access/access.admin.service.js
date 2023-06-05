"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUtils_1 = require("../../auth/authUtils");
const error_response_1 = require("../../core/error.response");
const admin_repo_1 = require("../../models/repositories/admin.repo");
const utils_1 = require("../../utils");
const keytoken_service_1 = __importDefault(require("../keytoken.service"));
class AccessAdminService {
    async login({ email, password }) {
        const foundAdmin = await (0, admin_repo_1.findByEmail)(email);
        if (!foundAdmin)
            throw new error_response_1.BadRequestError('Admin is not registerd');
        const match = bcrypt_1.default.compare(password, foundAdmin.password);
        if (!match)
            throw new error_response_1.AuthFailureError('Incorrect account or password');
        if (!foundAdmin.verify_email)
            throw new error_response_1.ForbiddenError('The account has not yet verified the email. please verify via email inbox ');
        const { _id: userId } = foundAdmin;
        const { publicKey, privateKey } = (0, utils_1.createKeys)();
        const tokens = await (0, authUtils_1.createTokenPair)({ email, userId, roles: foundAdmin.roles }, publicKey, privateKey);
        await keytoken_service_1.default.create(userId, publicKey, privateKey, tokens?.refreshToken);
        return {
            user: (0, utils_1.getInfoData)({
                object: foundAdmin,
                fields: [
                    '_id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'roles',
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
    async create({ first_name, last_name, email, password, phone_number, roles, }) {
        const foundAdmin = await (0, admin_repo_1.findByEmail)(email);
        if (foundAdmin)
            throw new error_response_1.ConflictRequestError('Email is being used');
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newAdmin = await (0, admin_repo_1.create)(first_name, last_name, email, hashPassword, phone_number, roles);
        return newAdmin;
    }
    async refreshToken(refreshToken, user, keyStore) {
        const { userId, email } = user;
        if (keyStore.refreshTokenUsed.includes(refreshToken)) {
            throw new error_response_1.ForbiddenError('Something wrong happend. Please relogin');
        }
        if (refreshToken !== keyStore.refreshToken) {
            throw new error_response_1.ForbiddenError('Admin is not registered');
        }
        const foundAdmin = await (0, admin_repo_1.findById)(userId);
        if (!foundAdmin)
            throw new error_response_1.ForbiddenError('Admin is not registered');
        const tokens = await (0, authUtils_1.createTokenPair)({ userId, email, roles: foundAdmin.roles }, keyStore.publicKey, keyStore.privateKey);
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokenUsed: refreshToken,
            },
        });
        return {
            user: (0, utils_1.getInfoData)({
                object: foundAdmin,
                fields: [
                    '_id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'roles',
                ],
            }),
            tokens,
        };
    }
}
exports.default = new AccessAdminService();
//# sourceMappingURL=access.admin.service.js.map