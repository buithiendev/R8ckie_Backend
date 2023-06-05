import {
    QueryFindCustomer,
    QueryGetListSearch,
} from '../../interfaces/customer/CustomerService.interface'
import { getSelectData, getUnSelectData } from '../../utils'
import customerModel from '../customer.model'
import Customer from '../interfaces/customer.interface'

interface ISortBy {
    [key: string]: any
}

// Query
const findByEmailAndVerify = async (email: string, verify_email: boolean) => {
    const customer = await customerModel.findOne({ email, verify_email })
    return customer
}

const findCustomerById = async (
    customerId: string,
    unSelect: string[],
): Promise<Customer | null> => {
    const customer = await customerModel
        .findOne({
            _id: customerId,
            state: 'enabled',
        })
        .populate('addresses')
        .populate('address_default')
        .select(getUnSelectData(unSelect))
        .lean()
        .exec()

    return customer
}

const findById = async (customerId: string): Promise<Customer | null> => {
    const customer = await customerModel.findById(customerId, {
        state: 'enabled',
    })

    return customer
}

const countCustomer = async (filter: object): Promise<number> => {
    const count = await customerModel.countDocuments(filter)
    return count
}

const findAllCustomers = async ({
    limit,
    sort,
    page,
    fields,
    filter,
}: QueryFindCustomer): Promise<Customer[]> => {
    const skip = (page - 1) * limit
    const sortBy: ISortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const results = await customerModel
        .find(filter)
        .sort(sortBy)
        .populate('address_default')
        .populate('addresses')
        .skip(skip)
        .limit(limit)
        .select(getSelectData(fields))
        .lean()
        .exec()

    return results
}

const queryCustomer = async (
    limit: number,
    skip: number,
    query = {},
): Promise<Customer[]> => {
    return await customerModel
        .find(query)
        .populate('address_default')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getListSearchCustomer = async (
    keyword: string,
    { limit, page, fields, filter }: QueryGetListSearch,
): Promise<Customer[]> => {
    const regexSearch = RegExp(keyword, 'i')
    const skip = (page - 1) * limit

    const results = await customerModel
        .find(
            {
                $or: [{ $text: { $search: regexSearch + '' } }],
                ...filter,
            },
            { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .select(getSelectData(fields))
        .lean()
        .exec()

    return results
}

// PUT PATCH

const updateAddressDefaultForCustomer = async (
    customerId: string,
    addressId: string,
): Promise<Customer | null> => {
    const update = await customerModel.findByIdAndUpdate(customerId, {
        address_default: addressId,
    })

    return update
}

export {
    countCustomer,
    findAllCustomers,
    findByEmailAndVerify,
    findById,
    findCustomerById,
    getListSearchCustomer,
    queryCustomer,
    updateAddressDefaultForCustomer,
}
