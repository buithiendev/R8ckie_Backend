"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'Admin';
const COLLECTION_NAME = 'Admins';
const adminSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true, min: 9, max: 100 },
    password: { type: String, required: true, min: 6, max: 50 },
    phone_number: { type: String, default: null },
    avatar_image: { type: String },
    state: {
        type: String,
        enum: ['disabled', 'enabled'],
        default: 'enabled',
    },
    verify_email: { type: Boolean, default: false },
    roles: { type: [String], default: [], enum: ['Admin', 'Order', 'Product'] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, adminSchema);
//# sourceMappingURL=admin.model.js.map