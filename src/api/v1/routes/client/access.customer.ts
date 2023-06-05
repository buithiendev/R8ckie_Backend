import { Router } from 'express'
import { authentication } from '../../auth/customer.auth'
import accessCustomerController from '../../controllers/access.customer.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { sendMailVerify } from '../../helpers/sendMail'
import {
    validationLoginCustomer,
    validationRegisterCustomer,
} from '../../validations/customer.validation'

const router = Router()

router.post(
    '/register',
    validationRegisterCustomer,
    sendMailVerify,
    asyncHandler(accessCustomerController.register),
)
router.get('/verify/:email', asyncHandler(accessCustomerController.verifyEmail))
router.post(
    '/login',
    validationLoginCustomer,
    asyncHandler(accessCustomerController.login),
)

router.use(authentication)

router.post('/logout', asyncHandler(accessCustomerController.logout))
router.post('/refresh', asyncHandler(accessCustomerController.refreshToken))

export default router
