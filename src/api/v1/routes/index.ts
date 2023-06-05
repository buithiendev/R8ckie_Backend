import { Router } from 'express'
import adminRoute from './admin'
import clientRoute from './client'

const router = Router()

router.use('/', clientRoute)
router.use('/dashboard', adminRoute)
export default router
