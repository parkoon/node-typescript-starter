import express from 'express';

import * as authController from '../controllers/auth.controller';
import { LoginDto } from '../dtos/auth.dto';
import { validationMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/login', validationMiddleware(LoginDto), authController.login);

export default router;
