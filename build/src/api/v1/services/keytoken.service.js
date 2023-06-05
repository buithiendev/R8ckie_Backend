"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const keytoken_model_1 = __importDefault(require("../models/keytoken.model"));
class KeyTokenService {
    async updateRefreshToken(keyStore, oldRefreshToken, newRefreshToken) {
        return await keyStore.updateOne({
            $set: {
                refreshToken: newRefreshToken,
            },
            $addToSet: {
                refreshTokenUsed: oldRefreshToken,
            },
        });
    }
    async create(userId, publicKey, privateKey, refreshToken) {
        const filter = { user: userId }, update = {
            publicKey,
            privateKey,
            refreshToken,
        }, options = {
            new: true,
            upsert: true,
        };
        const keyStore = await keytoken_model_1.default.findOneAndUpdate(filter, update, options);
        return keyStore ? keyStore.publicKey : null;
    }
    async removeById(id) {
        const { deletedCount } = await keytoken_model_1.default.deleteOne({ _id: id });
        return deletedCount;
    }
    async findByUserId(userId) {
        const keyStore = await keytoken_model_1.default.findOne({
            user: new mongoose_1.Types.ObjectId(userId),
        });
        return keyStore;
    }
}
exports.default = new KeyTokenService();
//# sourceMappingURL=keytoken.service.js.map