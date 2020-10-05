import { Request } from 'express';

import { UserModel } from '../models/auth.model';

export interface AppRequest extends Request {
  user: UserModel;
}
