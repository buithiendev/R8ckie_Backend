import { Router } from 'express'
import productController from '../../controllers/product.controller'
import asyncHandler from '../../helpers/asyncHandler'
const router = Router()

router.get('/', asyncHandler(productController.findAllPublished))
router.get('/count', asyncHandler(productController.count))
router.get('/:id', asyncHandler(productController.findById))

export default router
