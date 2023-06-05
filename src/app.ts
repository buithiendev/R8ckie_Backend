import compression from 'compression'
import dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { uuid } from 'uuidv4'
import { ErrorResponse } from './api/v1/core/error.response'
import logEvents from './api/v1/helpers/logEvents'
import routerV1 from './api/v1/routes'

dotenv.config()
const app: Application = express()

// init middlewares

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())

// init db
require('./databases/init.mongodb')

// init routes-

app.use('/v1', routerV1)
app.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message:
            'Truy cập đường dẫn dưới đây để join vào workspace chứa thông tin về APIs',
        link: 'https://app.getpostman.com/join-team?invite_code=817d2f8cac24c37b207acb048d4f68ab&target_code=c82142bf017847545f03ba2ae8a792ec',
    })
})

// handling error
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('Not found', 404)
    next(error)
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logEvents(
        `Id-Error:${uuid()}----[${req.method}]----${req.url}----${
            error.message
        }`,
    )
    const statusCode: number = error.status || 500

    return res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error',
    })
})

export default app
