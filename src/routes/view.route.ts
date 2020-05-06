import express from 'express';
import * as viewController from '../controllers/view.controller';

const router = express.Router();

router.get('/', viewController.getHome);
router.get('/login', viewController.getLogin);

export default router;
