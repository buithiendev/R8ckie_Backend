import { Document } from 'mongoose'

interface Address extends Document {
    customer_id: string
    address1: string
    address2?: string
    country_code?: string
    country?: string
    province_code: string
    province: string
    district_code: string
    district: string
    ward_code: string
    ward: string
    company?: string
    first_name: string
    last_name: string
    phone_number: string
    default?: boolean
}

export default Address
