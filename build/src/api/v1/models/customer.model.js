"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'Customer';
const COLLECTION_NAME = 'Customers';
const customerSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true, min: 9, max: 100 },
    password: { type: String, required: true, min: 6, max: 50 },
    phone_number: { type: String, default: null },
    address_default: {
        type: mongoose_1.Types.ObjectId,
        default: null,
        ref: 'Address',
    },
    addresses: [{ type: mongoose_1.Types.ObjectId, ref: 'Address' }],
    note: { type: String, default: '' },
    order_count: { type: Number, default: 0 },
    tags: { type: String, default: '' },
    total_spent: { type: Number, default: 0 },
    birthday: { type: String },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Male',
    },
    verify_email: { type: Boolean, default: false },
    state: {
        type: String,
        enum: ['disabled', 'enabled', 'declined'],
        default: 'enabled',
    },
    created_at: { type: String, default: Date.now },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
customerSchema.index({ email: 'text', phone_number: 'text' });
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, customerSchema);
//# sourceMappingURL=customer.model.js.map