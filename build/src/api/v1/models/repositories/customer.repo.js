"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressDefaultForCustomer = exports.queryCustomer = exports.getListSearchCustomer = exports.findCustomerById = exports.findById = exports.findByEmailAndVerify = exports.findAllCustomers = exports.countCustomer = void 0;
const utils_1 = require("../../utils");
const customer_model_1 = __importDefault(require("../customer.model"));
// Query
const findByEmailAndVerify = async (email, verify_email) => {
    const customer = await customer_model_1.default.findOne({ email, verify_email });
    return customer;
};
exports.findByEmailAndVerify = findByEmailAndVerify;
const findCustomerById = async (customerId, unSelect) => {
    const customer = await customer_model_1.default
        .findOne({
        _id: customerId,
        state: 'enabled',
    })
        .populate('addresses')
        .populate('address_default')
        .select((0, utils_1.getUnSelectData)(unSelect))
        .lean()
        .exec();
    return customer;
};
exports.findCustomerById = findCustomerById;
const findById = async (customerId) => {
    const customer = await customer_model_1.default.findById(customerId, {
        state: 'enabled',
    });
    return customer;
};
exports.findById = findById;
const countCustomer = async (filter) => {
    const count = await customer_model_1.default.countDocuments(filter);
    return count;
};
exports.countCustomer = countCustomer;
const findAllCustomers = async ({ limit, sort, page, fields, filter, }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const results = await customer_model_1.default
        .find(filter)
        .sort(sortBy)
        .populate('address_default')
        .populate('addresses')
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(fields))
        .lean()
        .exec();
    return results;
};
exports.findAllCustomers = findAllCustomers;
const queryCustomer = async (limit, skip, query = {}) => {
    return await customer_model_1.default
        .find(query)
        .populate('address_default')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
};
exports.queryCustomer = queryCustomer;
const getListSearchCustomer = async (keyword, { limit, page, fields, filter }) => {
    const regexSearch = RegExp(keyword, 'i');
    const skip = (page - 1) * limit;
    const results = await customer_model_1.default
        .find({
        $or: [{ $text: { $search: regexSearch + '' } }],
        ...filter,
    }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(fields))
        .lean()
        .exec();
    return results;
};
exports.getListSearchCustomer = getListSearchCustomer;
// PUT PATCH
const updateAddressDefaultForCustomer = async (customerId, addressId) => {
    const update = await customer_model_1.default.findByIdAndUpdate(customerId, {
        address_default: addressId,
    });
    return update;
};
exports.updateAddressDefaultForCustomer = updateAddressDefaultForCustomer;
//# sourceMappingURL=customer.repo.js.map