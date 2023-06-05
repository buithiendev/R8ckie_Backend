import { Document } from 'mongoose'

interface Customer extends Document {
    first_name: string
    last_name: string
    email: string
    password: string
    phone_number?: string
    address_default?: any
    addresses?: any[]
    note?: string
    order_count?: number
    tags?: string
    total_spent?: number
    birthday?: string
    gender?: 'Male' | 'Female' | 'Other'
    verify_email?: boolean
    state?: 'disabled' | 'enabled' | 'declined'
    created_at?: string
}

export default Customer
