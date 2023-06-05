import { Types } from 'mongoose'
import { AuthFailureError } from '../core/error.response'
import { IAddressService } from '../interfaces/customer/AddressService.interface'
import Address from '../models/interfaces/address.interface'
import {
    create,
    deleteAddressById,
    findAddressById,
    findAll,
    setDefaultById,
    updateById,
    updateDefault,
} from '../models/repositories/address.repo'
import {
    findById,
    updateAddressDefaultForCustomer,
} from '../models/repositories/customer.repo'

class AddressService implements IAddressService {
    async create(userId: string, payload: Address): Promise<Address> {
        const customer = await findById(userId)
        if (!customer) throw new AuthFailureError('Customer is not registered')

        const address = await create(userId, payload)
        if (address) {
            let updateObj: any = {
                $addToSet: {
                    addresses: new Types.ObjectId(address._id),
                },
            }
            if (address.default) {
                updateObj.$set = {
                    address_default: new Types.ObjectId(address._id),
                }

                await updateDefault(customer._id, address._id)
            }
            await customer.updateOne(updateObj)
        }

        return address
    }

    async findAll(
        userId: string,
        {
            limit = 50,
            page = 1,
            sort = 'ctime',
            fields = [
                'address1',
                'country_code',
                'country',
                'province_code',
                'province',
                'district_code',
                'district',
                'ward_code',
                'ward',
                'company',
                'first_name',
                'last_name',
                'phone_number',
                'default',
            ],
        },
    ): Promise<Address[]> {
        return await findAll(userId, limit, page, sort, fields)
    }

    async findById(
        userId: string,
        id: string,
        {
            fields = [
                'address1',
                'country_code',
                'country',
                'province_code',
                'province',
                'district_code',
                'district',
                'ward_code',
                'ward',
                'company',
                'first_name',
                'last_name',
                'phone_number',
                'default',
            ],
        },
    ): Promise<Address | null> {
        const address = await findAddressById(id, fields)
        return address
    }

    async delete(userId: string, id: string): Promise<number> {
        const isDelete = await deleteAddressById(id, userId)

        return isDelete
    }

    async setDefault(userId: string, id: string): Promise<Address | null> {
        const addressDefault = await setDefaultById(id, userId)

        if (addressDefault) {
            await updateDefault(userId, addressDefault._id)
            await updateAddressDefaultForCustomer(userId, addressDefault._id)
            return addressDefault
        }
        return null
    }

    async update(
        userId: string,
        id: string,
        payload: Partial<Address>,
    ): Promise<Address | null> {
        const updateAddress = await updateById(id, userId, payload)

        if (updateAddress?.default) {
            await updateAddressDefaultForCustomer(userId, updateAddress._id)
            await updateDefault(userId, updateAddress._id)
        }
        return updateAddress
    }
}

export default new AddressService()
