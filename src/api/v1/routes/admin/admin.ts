import { Router } from 'express'
import { authentication } from '../../auth/admin.auth'
import accessAdminController from '../../controllers/access.admin.controller'
import asyncHandler from '../../helpers/asyncHandler'
import {
    validationCreateAdmin,
    validationLoginAdmin,
} from '../../validations/admin.validation'

const router = Router()

router.post(
    '/create',
    validationCreateAdmin,
    asyncHandler(accessAdminController.create),
)
router.post(
    '/login',
    validationLoginAdmin,
    asyncHandler(accessAdminController.login),
)

router.use(authentication)

router.post('/refresh', asyncHandler(accessAdminController.refreshToken))
router.post('/logout', asyncHandler(accessAdminController.logout))

export default router
