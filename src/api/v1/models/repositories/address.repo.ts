import { BadRequestError } from '../../core/error.response'
import { UpdateAddressPayload } from '../../interfaces/customer/AddressService.interface'
import { getSelectData } from '../../utils'
import addressModel from '../address.model'
import Address from '../interfaces/address.interface'

const create = async (
    userId: string,
    payload: Address,
): Promise<Address> => {
    return await addressModel.create({
        ...payload,
        customer_id: userId,
    })
}

const updateById = async (
    addressId: string,
    customerId: string,
    payload: UpdateAddressPayload,
): Promise<Address | null> => {
    const filter = {
            _id: addressId,
            customer_id: customerId,
        },
        update = {
            ...payload,
        },
        options = {
            new: true,
        }
    try {
        const updateAddress = await addressModel
            .findOneAndUpdate(filter, update, options)
            .lean()
            .exec()

        return updateAddress
    } catch (error) {
        throw new BadRequestError(
            `Failed to update address with id ${addressId}: ${error}`,
        )
    }
}

const updateDefault = async (customerId: string, exclude_id: string) => {
    const filter = {
            customer_id: customerId,
            default: true,
            _id: {
                $ne: exclude_id,
            },
        },
        update = {
            default: false,
        },
        options = {
            new: true,
        }

    const addressUpdate = await addressModel.updateMany(filter, update, options)
    return addressUpdate
}

const setDefaultById = async (
    addressId: string,
    customerId: string,
): Promise<Address | null> => {
    const filter = {
            customer_id: customerId,
            default: false,
            _id: addressId,
        },
        update = {
            default: true,
        },
        options = {
            new: true,
        }

    const addressUpdate = await addressModel
        .findOneAndUpdate(filter, update, options)
        .lean()
        .exec()

    return addressUpdate
}

const deleteAddressById = async (
    id: string,
    customerId: string,
): Promise<number> => {
    const filter = {
        _id: id,
        customer_id: customerId,
    }

    const isDelete = await addressModel.deleteOne(filter)

    return isDelete.deletedCount
}

const findAll = async (
    userId: string,
    limit: number,
    page: number,
    sort: string,
    fields: string[],
): Promise<Address[]> => {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: any } =
        sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const results = await addressModel
        .find({
            customer_id: userId,
        })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(fields))
        .lean()
        .exec()

    return results
}

const findAddressById = async (
    id: string,
    fields: string[],
): Promise<Address | null> => {
    const address = await addressModel
        .findById(id)
        .select(getSelectData(fields))
        .lean()
        .exec()

    return address
}

export {
    create,
    deleteAddressById,
    findAddressById,
    findAll,
    setDefaultById,
    updateById,
    updateDefault,
}
