import { QueryParams } from '..'
import Customer from '../../models/interfaces/customer.interface'

interface ICustomerService {
    getListSearch(
        keyword: string,
        query: QueryGetListSearch,
    ): Promise<Customer[]>
    count(query: Pick<QueryParams, 'filter'>): Promise<number>
    findById(id: string): Promise<Customer | null>
    findAll(query: QueryFindCustomer): Promise<Customer[]>
    findByUserId(id: string, select?: SelectField): Promise<Customer | null>
    findByEmail(email: string, select?: SelectField): Promise<Customer | null>
    create(payload: CreateCustomerPayload): Promise<Customer>
}

type QueryGetListSearch = Pick<
    QueryParams,
    'limit' | 'page' | 'fields' | 'filter'
>

type QueryFindCustomer = Pick<
    QueryParams,
    'limit' | 'page' | 'fields' | 'filter' | 'sort'
>

type SelectField = {
    [key: string]: any
}

type CreateCustomerPayload = Partial<Customer>
export {
    CreateCustomerPayload,
    ICustomerService,
    QueryFindCustomer,
    QueryGetListSearch,
    SelectField,
}
