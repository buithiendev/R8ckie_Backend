import { Router } from 'express'
import customerRoute from './access.customer'
import addressRoute from './address'
import productRoute from './product'

const router = Router()

router.use('/api/customers', customerRoute)
router.use('/api/customers/address', addressRoute)
router.use('/api/products', productRoute)

export default router
