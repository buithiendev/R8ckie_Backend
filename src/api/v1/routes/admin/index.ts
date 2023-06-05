import { Router } from 'express'
import adminRoute from './admin'
import customerRoute from './customer'
import productRoute from './product'

const router = Router()

router.use('/api/customers', customerRoute)
router.use('/api/admin', adminRoute)
router.use('/api/products', productRoute)

export default router
