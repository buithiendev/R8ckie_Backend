import { Schema, model } from 'mongoose'
import Address from './interfaces/address.interface'

const DOCUMENT_NAME = 'Address'
const COLLECTION_NAME = 'Addresses'

const addressSchema = new Schema<Address>(
    {
        customer_id: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        country_code: { type: String, default: 'VN', max: 10 },
        country: { type: String, default: 'VietNam', max: 50 },
        province_code: { type: String, required: true, max: 10 },
        province: { type: String, required: true, max: 50 },
        district_code: { type: String, required: true, max: 10 },
        district: { type: String, required: true, max: 50 },
        ward_code: { type: String, required: true, max: 10 },
        ward: { type: String, required: true, max: 50 },
        company: { type: String, max: 100 },
        first_name: { type: String, required: true, max: 40 },
        last_name: { type: String, required: true, max: 40 },
        phone_number: { type: String, required: true, max: 20 },
        default: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)

export default model<Address>(DOCUMENT_NAME, addressSchema)
