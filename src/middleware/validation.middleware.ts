import { Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import AppException from '../exceptions/app.exception';
import { AppRequest } from '../interfaces/RequestInterface';

// ref. https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
export const validationMiddleware = (type: any) => async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    await validateOrReject(plainToClass(type, req.body));
    next();
  } catch (errors) {
    const message = errors.map((error: ValidationError) => Object.values(error.constraints).join(' ,'));
    next(new AppException(400, message));
  }
};
