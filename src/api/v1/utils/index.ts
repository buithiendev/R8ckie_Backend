import crypto from 'crypto'
import { Request } from 'express'
import _ from 'lodash'
import { QueryParams } from '../interfaces'

interface IObjectAny {
    [key: string]: any
}

const createKeys = () => {
    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    return {
        publicKey,
        privateKey,
    }
}

const getInfoData = ({ object, fields }: { object: {}; fields: string[] }) => {
    return _.pick(object, fields)
}

const getSelectData = (select: string[]) => {
    return Object.fromEntries(select.map((value) => [value, 1]))
}

const getUnSelectData = (unSelect: string[] | undefined) => {
    if (!unSelect) return []
    return Object.fromEntries(unSelect.map((value) => [value, 0]))
}

const getPrototypeQuery = (req: Request): Partial<QueryParams> => {
    const { limit, page, sort, fields, filter, unSelect } = req.query

    const limitNumber = limit ? Number(limit) : undefined
    const pageNumber = page ? Number(page) : undefined
    const sortString = sort ? sort + '' : undefined
    const fieldsArray = fields ? String(fields).split(',') : undefined
    const unSelectArray = unSelect ? String(unSelect).split(',') : undefined
    const filterObject = filter ? Object(filter) : undefined

    return {
        limit: limitNumber,
        page: pageNumber,
        sort: sortString,
        fields: fieldsArray,
        filter: filterObject,
        unSelect: unSelectArray,
    }
}

const removeUndefinedObject = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === null) delete obj[key]
    })
    return obj
}

const removeUndefinedArray = (array: (string | undefined)[]) => {
    const result = array.filter((value) => {
        return value !== undefined
    })
    return result
}

const joinCharacterToManyString = (
    arrayString: (string | undefined)[],
    insertCharacter = '/',
) => {
    const arrayNoUndefined = removeUndefinedArray(arrayString)
    return arrayNoUndefined.join(insertCharacter)
}

const nestedObjectParser = (object: IObjectAny) => {
    const final: IObjectAny = {}
    Object.keys(object).forEach((key) => {
        if (
            typeof object[key] === 'object' &&
            !Array.isArray(object[key]) &&
            object[key] !== null
        ) {
            const response: IObjectAny = nestedObjectParser(object[key])
            Object.keys(response).forEach((responseKey) => {
                final[`${key}.${responseKey}`] = response[responseKey]
            })
        } else {
            final[key] = object[key]
        }
    })
    return final
}

const removeSpacingString = (
    array: string[] | string | undefined,
    separatorCharacter = ',',
) => {
    if (typeof array === 'object')
        return array.map((value) => value.trim()).toString()

    return array
        ?.split(separatorCharacter)
        .map((value) => value.trim())
        .toString()
}

const integerGreaterThanZeroValidator = (value: number): boolean => {
    return Number.isInteger(value) && value > 0
}

export {
    integerGreaterThanZeroValidator,
    createKeys,
    getInfoData,
    getPrototypeQuery,
    getSelectData,
    getUnSelectData,
    joinCharacterToManyString,
    nestedObjectParser,
    removeSpacingString,
    removeUndefinedArray,
    removeUndefinedObject,
}
