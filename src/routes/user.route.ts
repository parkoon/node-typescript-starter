import express from 'express';

import * as authController from '../controllers/auth.controller';
import { LoginDto } from '../dtos/auth.dto';
import { validationMiddleware } from '../middleware/validation.middleware';
import { isLoggedIn } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', validationMiddleware(LoginDto), isLoggedIn, authController.login);

export default router;
