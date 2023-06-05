import { Response } from 'express'
import IResponse from '../interfaces/response.interface'
import reasonPhrases from '../utils/reasonPhrases'
import statusCodes from '../utils/statusCodes'

class SuccessResponse implements IResponse {
    message: string
    statusCode: number
    metadata: any

    constructor({
        message,
        statusCode = statusCodes.OK,
        reasonStatusCode = reasonPhrases.OK,
        metadata,
    }: IResponse) {
        this.message = message ? message : reasonStatusCode
        this.statusCode = statusCode
        this.metadata = metadata
    }

    send(res: Response) {
        res.status(200).json(this)
    }

    redirect(res: Response, redirect = '') {
        return res.redirect(redirect)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }: IResponse) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = statusCodes.CREATED,
        reasonStatusCode = reasonPhrases.CREATED,
        metadata,
    }: IResponse) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

export { CREATED, OK, SuccessResponse }
