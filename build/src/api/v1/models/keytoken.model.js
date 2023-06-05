"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';
const keyTokenSchema = new mongoose_1.Schema({
    user: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'Admin' },
    ],
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenUsed: { type: [String], default: [] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, keyTokenSchema);
//# sourceMappingURL=keytoken.model.js.map