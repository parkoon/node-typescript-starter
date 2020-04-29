import express from 'express'
import * as viewController from '../controllers/view.controller'

const router = express.Router()

router.get('/', viewController.getHome)

export default router
