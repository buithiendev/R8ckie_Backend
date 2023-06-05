import { Document } from 'mongoose'

interface Admin extends Document {
    first_name: string
    last_name: string
    email: string
    password: string
    phone_number: string
    avatar_image?: string
    state?: 'enabled' | 'disabled'
    verify_email?: boolean
    roles: string[]
}

export default Admin
