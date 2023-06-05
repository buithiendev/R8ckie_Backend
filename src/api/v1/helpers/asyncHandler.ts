import { NextFunction, Request, Response } from 'express'

const asyncHandler = (
    callback: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        callback(req, res, next).catch(next)
    }
}

export default asyncHandler
