import { NextFunction, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import transport from '../../../configs/transport.email'
import { BadRequestError } from '../core/error.response'
import CustomerService from '../services/customer.service'
import asyncHandler from './asyncHandler'

const sendMailVerify = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, first_name, last_name } = req.body

        const foundCustomer = await CustomerService.findByEmail(email)
        if (foundCustomer) throw new BadRequestError('Email is being used')

        try {
            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Example Email</title>
                <style>
                    .button {
                        background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 8px;
                    }

                    .link {
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <h1>R8ckie Xin Chào, ${first_name} ${last_name} </h1>
                <p>Xác minh email này là của bạn ${email}</p>
                <a class="link" href="http://localhost:4001/v1/api/customer/verify/${email}" onclick="myFunction"><button class="button">Active email</button></a>
            </body>
            </html>
        `
            const transporter = nodemailer.createTransport(transport)
            const mainOptions = {
                from: 'R8ckie Shop',
                to: email,
                subject: 'Active email',
                text: 'You recieved message from ' + req.body.email,
                html,
            }
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    next(err)
                } else {
                    next()
                }
            })
        } catch (error) {
            next(error)
        }
    },
)

export { sendMailVerify }
