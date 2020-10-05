import express from 'express';

import * as authController from '../controllers/auth.controller';
import { validationMiddleware } from '../middleware/validation.middleware';
import { isLoggedIn } from '../middleware/auth.middleware';
import { LoginCommand } from '../commands/LoginCommand';

const router = express.Router();

router.post('/login', validationMiddleware(LoginCommand), isLoggedIn, authController.login);

export default router;
