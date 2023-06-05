import adminModel from '../admin.model'
import Admin from '../interfaces/admin.interface'

const findById = async (id: string) => {
    return await adminModel.findById(id).lean().exec()
}

const findByEmail = async (
    email: string,
    select = {
        _id: 1,
        email: 1,
        password: 1,
        first_name: 1,
        last_name: 1,
        phone_number: 1,
        state: 1,
        roles: 1,
    },
): Promise<Admin | null> => {
    return await adminModel
        .findOne({ email })
        .select({ ...select, verify_email: 1 })
        .lean()
}

const create = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: string,
    roles: string[],
): Promise<Admin> => {
    return await adminModel.create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        roles,
    })
}

export { create, findByEmail, findById }
