"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDefault = exports.updateById = exports.setDefaultById = exports.findAll = exports.findAddressById = exports.deleteAddressById = exports.create = void 0;
const error_response_1 = require("../../core/error.response");
const utils_1 = require("../../utils");
const address_model_1 = __importDefault(require("../address.model"));
const create = async (userId, payload) => {
    return await address_model_1.default.create({
        ...payload,
        customer_id: userId,
    });
};
exports.create = create;
const updateById = async (addressId, customerId, payload) => {
    const filter = {
        _id: addressId,
        customer_id: customerId,
    }, update = {
        ...payload,
    }, options = {
        new: true,
    };
    try {
        const updateAddress = await address_model_1.default
            .findOneAndUpdate(filter, update, options)
            .lean()
            .exec();
        return updateAddress;
    }
    catch (error) {
        throw new error_response_1.BadRequestError(`Failed to update address with id ${addressId}: ${error}`);
    }
};
exports.updateById = updateById;
const updateDefault = async (customerId, exclude_id) => {
    const filter = {
        customer_id: customerId,
        default: true,
        _id: {
            $ne: exclude_id,
        },
    }, update = {
        default: false,
    }, options = {
        new: true,
    };
    const addressUpdate = await address_model_1.default.updateMany(filter, update, options);
    return addressUpdate;
};
exports.updateDefault = updateDefault;
const setDefaultById = async (addressId, customerId) => {
    const filter = {
        customer_id: customerId,
        default: false,
        _id: addressId,
    }, update = {
        default: true,
    }, options = {
        new: true,
    };
    const addressUpdate = await address_model_1.default
        .findOneAndUpdate(filter, update, options)
        .lean()
        .exec();
    return addressUpdate;
};
exports.setDefaultById = setDefaultById;
const deleteAddressById = async (id, customerId) => {
    const filter = {
        _id: id,
        customer_id: customerId,
    };
    const isDelete = await address_model_1.default.deleteOne(filter);
    return isDelete.deletedCount;
};
exports.deleteAddressById = deleteAddressById;
const findAll = async (userId, limit, page, sort, fields) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const results = await address_model_1.default
        .find({
        customer_id: userId,
    })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(fields))
        .lean()
        .exec();
    return results;
};
exports.findAll = findAll;
const findAddressById = async (id, fields) => {
    const address = await address_model_1.default
        .findById(id)
        .select((0, utils_1.getSelectData)(fields))
        .lean()
        .exec();
    return address;
};
exports.findAddressById = findAddressById;
//# sourceMappingURL=address.repo.js.map