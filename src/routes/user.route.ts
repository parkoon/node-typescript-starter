import express from 'express'

import * as authController from '../controllers/auth.controller'
import { LoginDto } from '../dtos/auth.dto'
import { validateBody } from '../middleware/validate.middleware'

const router = express.Router()

router.post('/login', validateBody(LoginDto), authController.login)

export default router
