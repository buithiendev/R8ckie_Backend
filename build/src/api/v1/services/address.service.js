"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const error_response_1 = require("../core/error.response");
const address_repo_1 = require("../models/repositories/address.repo");
const customer_repo_1 = require("../models/repositories/customer.repo");
class AddressService {
    async create(userId, payload) {
        const customer = await (0, customer_repo_1.findById)(userId);
        if (!customer)
            throw new error_response_1.AuthFailureError('Customer is not registered');
        const address = await (0, address_repo_1.create)(userId, payload);
        if (address) {
            let updateObj = {
                $addToSet: {
                    addresses: new mongoose_1.Types.ObjectId(address._id),
                },
            };
            if (address.default) {
                updateObj.$set = {
                    address_default: new mongoose_1.Types.ObjectId(address._id),
                };
                await (0, address_repo_1.updateDefault)(customer._id, address._id);
            }
            await customer.updateOne(updateObj);
        }
        return address;
    }
    async findAll(userId, { limit = 50, page = 1, sort = 'ctime', fields = [
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
    ], }) {
        return await (0, address_repo_1.findAll)(userId, limit, page, sort, fields);
    }
    async findById(userId, id, { fields = [
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
    ], }) {
        const address = await (0, address_repo_1.findAddressById)(id, fields);
        return address;
    }
    async delete(userId, id) {
        const isDelete = await (0, address_repo_1.deleteAddressById)(id, userId);
        return isDelete;
    }
    async setDefault(userId, id) {
        const addressDefault = await (0, address_repo_1.setDefaultById)(id, userId);
        if (addressDefault) {
            await (0, address_repo_1.updateDefault)(userId, addressDefault._id);
            await (0, customer_repo_1.updateAddressDefaultForCustomer)(userId, addressDefault._id);
            return addressDefault;
        }
        return null;
    }
    async update(userId, id, payload) {
        const updateAddress = await (0, address_repo_1.updateById)(id, userId, payload);
        if (updateAddress?.default) {
            await (0, customer_repo_1.updateAddressDefaultForCustomer)(userId, updateAddress._id);
            await (0, address_repo_1.updateDefault)(userId, updateAddress._id);
        }
        return updateAddress;
    }
}
exports.default = new AddressService();
//# sourceMappingURL=address.service.js.map