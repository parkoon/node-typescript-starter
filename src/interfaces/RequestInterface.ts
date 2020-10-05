import { Request } from 'express';

import { UserModel } from '../models/AuthModel';

export interface AppRequest extends Request {
  user: UserModel;
}
