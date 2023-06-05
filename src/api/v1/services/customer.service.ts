import {
    ICustomerService,
    QueryFindCustomer,
    QueryGetListSearch,
} from '../interfaces/customer/CustomerService.interface'
import customerModel from '../models/customer.model'
import Customer from '../models/interfaces/customer.interface'
import {
    countCustomer,
    findAllCustomers,
    findCustomerById,
    getListSearchCustomer,
} from '../models/repositories/customer.repo'

class CustomerService implements ICustomerService {
    async getListSearch(
        keyword: string,
        query: QueryGetListSearch,
    ): Promise<Customer[]> {
        return await getListSearchCustomer(keyword, query)
    }

    async count(filter: object): Promise<number> {
        return await countCustomer({ ...filter, state: 'enabled' })
    }

    async findById(id: string): Promise<Customer | null> {
        const unSelect = ['__v']
        const customer = await findCustomerById(id, unSelect)
        return customer
    }

    async findAll(query: QueryFindCustomer): Promise<Customer[]> {
        return await findAllCustomers(query)
    }

    async findByUserId(
        id: string,
        select = {
            email: 1,
            password: 1,
            first_name: 1,
            last_name: 1,
            phone_number: 1,
            state: 1,
        },
    ): Promise<Customer | null> {
        const customer = await customerModel.findById(id).select(select).lean()

        return customer
    }

    async findByEmail(
        email: string,
        select = {
            _id: 1,
            email: 1,
            password: 1,
            first_name: 1,
            last_name: 1,
            phone_number: 1,
            state: 1,
        },
    ): Promise<Customer | null> {
        const customer = await customerModel
            .findOne({ email })
            .select({ ...select, verify_email: 1 })
            .lean()

        return customer
    }

    async create(payload: Partial<Customer>): Promise<Customer> {
        const newCustomer = await customerModel.create(payload)

        return newCustomer
    }
}

export default new CustomerService()
