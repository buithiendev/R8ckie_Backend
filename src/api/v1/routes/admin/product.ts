import { Router } from 'express'
import { authentication } from '../../auth/admin.auth'
import imageController from '../../controllers/image.controller'
import productController from '../../controllers/product.controller'
import variantController from '../../controllers/variant.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { validateImageCreationInput } from '../../validations/image.validation'
import {
    validateProductCreationInput,
    validateProductUpdateInput,
} from '../../validations/product.validation'
import {
    validateVariantCreationInput,
    validateVariantUpdationInput,
} from '../../validations/variant.validation'
const router = Router()

router.use(authentication)

/** Product route */
router.get('/drafts/all', asyncHandler(productController.findAllDraft))
router.get('/published/all', asyncHandler(productController.findAllPublished))
router.post(
    '/create',
    validateProductCreationInput,
    asyncHandler(productController.create),
)
router.patch(
    '/:id',
    validateProductUpdateInput,
    asyncHandler(productController.update),
)
router.post('/:id/publish', asyncHandler(productController.publishByAdmin))
router.post('/:id/unpublish', asyncHandler(productController.unPublishByAdmin))
router.post('/:id/tags', asyncHandler(productController.addTags))
router.delete('/:id/tags', asyncHandler(productController.removeTags))
router.get('/:id', asyncHandler(productController.findByIdForAdmin))

/** Variant route */
router.get('/:productId/variants', asyncHandler(variantController.findAll))
router.get('/:productId/variants/count', asyncHandler(variantController.count))
router.post(
    '/variants/create',
    validateVariantCreationInput,
    asyncHandler(variantController.create),
)
router.get(
    '/variants/:variantId',
    asyncHandler(variantController.findById),
)
router.patch(
    '/variants/:variantId',
    validateVariantUpdationInput,
    asyncHandler(variantController.update),
)
router.delete(
    '/:productId/variants/:variantId',
    asyncHandler(variantController.delete),
)

/** Image route */

router.post(
    '/images',
    validateImageCreationInput,
    asyncHandler(imageController.create),
)
router.get('/:productId/images', asyncHandler(imageController.findAll))
router.get('/:productId/images/count', asyncHandler(imageController.count))
router.get(
    '/:productId/images/:imageId',
    asyncHandler(imageController.findById),
)
router.delete(
    '/:productId/images/:imageId',
    asyncHandler(imageController.delete),
)

export default router
