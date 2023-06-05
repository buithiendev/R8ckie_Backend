"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = __importDefault(require("../models/customer.model"));
const customer_repo_1 = require("../models/repositories/customer.repo");
class CustomerService {
    async getListSearch(keyword, query) {
        return await (0, customer_repo_1.getListSearchCustomer)(keyword, query);
    }
    async count(filter) {
        return await (0, customer_repo_1.countCustomer)({ ...filter, state: 'enabled' });
    }
    async findById(id) {
        const unSelect = ['__v'];
        const customer = await (0, customer_repo_1.findCustomerById)(id, unSelect);
        return customer;
    }
    async findAll(query) {
        return await (0, customer_repo_1.findAllCustomers)(query);
    }
    async findByUserId(id, select = {
        email: 1,
        password: 1,
        first_name: 1,
        last_name: 1,
        phone_number: 1,
        state: 1,
    }) {
        const customer = await customer_model_1.default.findById(id).select(select).lean();
        return customer;
    }
    async findByEmail(email, select = {
        _id: 1,
        email: 1,
        password: 1,
        first_name: 1,
        last_name: 1,
        phone_number: 1,
        state: 1,
    }) {
        const customer = await customer_model_1.default
            .findOne({ email })
            .select({ ...select, verify_email: 1 })
            .lean();
        return customer;
    }
    async create(payload) {
        const newCustomer = await customer_model_1.default.create(payload);
        return newCustomer;
    }
}
exports.default = new CustomerService();
//# sourceMappingURL=customer.service.js.map