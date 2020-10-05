import express from 'express';

import * as authController from '@Controllers/auth.controller';
import { LoginCommand } from '@Commands/login.command';
import { validationMiddleware } from '@Middleware/validation.middleware';
import { isLoggedIn } from '@Middleware/auth.middleware';

const router = express.Router();

router.post('/login', validationMiddleware(LoginCommand), isLoggedIn, authController.login);

export default router;
