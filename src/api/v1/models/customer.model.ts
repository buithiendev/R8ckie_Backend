import { Schema, Types, model } from 'mongoose'
import Customer from './interfaces/customer.interface'
const DOCUMENT_NAME = 'Customer'
const COLLECTION_NAME = 'Customers'

const customerSchema = new Schema<Customer>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true, min: 9, max: 100 },
        password: { type: String, required: true, min: 6, max: 50 },
        phone_number: { type: String, default: null },
        address_default: {
            type: Types.ObjectId,
            default: null,
            ref: 'Address',
        },
        addresses: [{ type: Types.ObjectId, ref: 'Address' }],
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)

customerSchema.index({ email: 'text', phone_number: 'text' })

export default model<Customer>(DOCUMENT_NAME, customerSchema)
