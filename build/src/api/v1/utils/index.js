"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedObject = exports.removeUndefinedArray = exports.removeSpacingString = exports.nestedObjectParser = exports.joinCharacterToManyString = exports.getUnSelectData = exports.getSelectData = exports.getPrototypeQuery = exports.getInfoData = exports.createKeys = exports.integerGreaterThanZeroValidator = void 0;
const crypto_1 = __importDefault(require("crypto"));
const lodash_1 = __importDefault(require("lodash"));
const createKeys = () => {
    const publicKey = crypto_1.default.randomBytes(64).toString('hex');
    const privateKey = crypto_1.default.randomBytes(64).toString('hex');
    return {
        publicKey,
        privateKey,
    };
};
exports.createKeys = createKeys;
const getInfoData = ({ object, fields }) => {
    return lodash_1.default.pick(object, fields);
};
exports.getInfoData = getInfoData;
const getSelectData = (select) => {
    return Object.fromEntries(select.map((value) => [value, 1]));
};
exports.getSelectData = getSelectData;
const getUnSelectData = (unSelect) => {
    if (!unSelect)
        return [];
    return Object.fromEntries(unSelect.map((value) => [value, 0]));
};
exports.getUnSelectData = getUnSelectData;
const getPrototypeQuery = (req) => {
    const { limit, page, sort, fields, filter, unSelect } = req.query;
    const limitNumber = limit ? Number(limit) : undefined;
    const pageNumber = page ? Number(page) : undefined;
    const sortString = sort ? sort + '' : undefined;
    const fieldsArray = fields ? String(fields).split(',') : undefined;
    const unSelectArray = unSelect ? String(unSelect).split(',') : undefined;
    const filterObject = filter ? Object(filter) : undefined;
    return {
        limit: limitNumber,
        page: pageNumber,
        sort: sortString,
        fields: fieldsArray,
        filter: filterObject,
        unSelect: unSelectArray,
    };
};
exports.getPrototypeQuery = getPrototypeQuery;
const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === null)
            delete obj[key];
    });
    return obj;
};
exports.removeUndefinedObject = removeUndefinedObject;
const removeUndefinedArray = (array) => {
    const result = array.filter((value) => {
        return value !== undefined;
    });
    return result;
};
exports.removeUndefinedArray = removeUndefinedArray;
const joinCharacterToManyString = (arrayString, insertCharacter = '/') => {
    const arrayNoUndefined = removeUndefinedArray(arrayString);
    return arrayNoUndefined.join(insertCharacter);
};
exports.joinCharacterToManyString = joinCharacterToManyString;
const nestedObjectParser = (object) => {
    const final = {};
    Object.keys(object).forEach((key) => {
        if (typeof object[key] === 'object' &&
            !Array.isArray(object[key]) &&
            object[key] !== null) {
            const response = nestedObjectParser(object[key]);
            Object.keys(response).forEach((responseKey) => {
                final[`${key}.${responseKey}`] = response[responseKey];
            });
        }
        else {
            final[key] = object[key];
        }
    });
    return final;
};
exports.nestedObjectParser = nestedObjectParser;
const removeSpacingString = (array, separatorCharacter = ',') => {
    if (typeof array === 'object')
        return array.map((value) => value.trim()).toString();
    return array
        ?.split(separatorCharacter)
        .map((value) => value.trim())
        .toString();
};
exports.removeSpacingString = removeSpacingString;
const integerGreaterThanZeroValidator = (value) => {
    return Number.isInteger(value) && value > 0;
};
exports.integerGreaterThanZeroValidator = integerGreaterThanZeroValidator;
//# sourceMappingURL=index.js.map