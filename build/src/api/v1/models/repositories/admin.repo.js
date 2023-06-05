"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.findByEmail = exports.create = void 0;
const admin_model_1 = __importDefault(require("../admin.model"));
const findById = async (id) => {
    return await admin_model_1.default.findById(id).lean().exec();
};
exports.findById = findById;
const findByEmail = async (email, select = {
    _id: 1,
    email: 1,
    password: 1,
    first_name: 1,
    last_name: 1,
    phone_number: 1,
    state: 1,
    roles: 1,
}) => {
    return await admin_model_1.default
        .findOne({ email })
        .select({ ...select, verify_email: 1 })
        .lean();
};
exports.findByEmail = findByEmail;
const create = async (first_name, last_name, email, password, phone_number, roles) => {
    return await admin_model_1.default.create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        roles,
    });
};
exports.create = create;
//# sourceMappingURL=admin.repo.js.map