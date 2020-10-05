import { Request } from 'express';

import { UserModel } from '@Models/auth.model';

export interface AppRequest extends Request {
    user: UserModel;
}
