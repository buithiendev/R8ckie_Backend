import { Router } from 'express'
import { authentication } from '../../auth/customer.auth'
import addressController from '../../controllers/address.controller'
import asyncHandler from '../../helpers/asyncHandler'
import {
    validateCreateAddress,
    validateUpdateAddress,
} from '../../validations/address.validation'
const router = Router()

router.use(authentication)

router.get('/', asyncHandler(addressController.findAll))
router.get('/:id', asyncHandler(addressController.findById))
router.post(
    '/create',
    validateCreateAddress,
    asyncHandler(addressController.create),
)
router.patch(
    '/:id',
    validateUpdateAddress,
    asyncHandler(addressController.update),
)
router.delete('/:id', asyncHandler(addressController.removeById))
router.patch('/:id/default', asyncHandler(addressController.setDefault))

export default router
