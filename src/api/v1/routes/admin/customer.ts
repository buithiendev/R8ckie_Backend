import { Router } from 'express'
import { authentication } from '../../auth/admin.auth'
import customerController from '../../controllers/customer.controller'
import asyncHandler from '../../helpers/asyncHandler'
const router = Router()

router.use(authentication)

router.get('/', asyncHandler(customerController.findAll))
router.get('/count', asyncHandler(customerController.count))
router.get('/:id', asyncHandler(customerController.findById))
router.get('/search/:keyword', asyncHandler(customerController.getListSearch))

export default router
