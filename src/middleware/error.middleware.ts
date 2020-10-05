// tslint:disable: no-parameter-reassignment

import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

// import AppException from '../exceptions/app.exception';

import AppException from '@Exceptions/app.exception';

const handleAppError = (error: AppException, req: Request, res: Response) => {
  console.log('## Catch App error in error middleware ', error.message);

  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.status).json({
      errors: Array.isArray(error.errors) ? error.errors : undefined,
      status: error.status,
      message: error.message,
    });
  }

  return res.status(error.status).render('error', {
    title: 'Something went wrong!',
    message: 'Please try again later',
  });
};

const handleAxiosError = (error: AxiosError, res: Response) => {
  console.log('## Catch Axios error in error middleware ', error.response && error.response.data);
  res.status(error.response ? error.response.status : 500).json({
    errors: error.response ? error.response.data : undefined,
    status: error.response ? error.response.status : 500,
    message: error.message,
  });
};

const handleJWTError = () => new AppException(401, 'Invalid Token. Please log in again!');

const handleJWTExpiredError = () => new AppException(401, 'Your token has expired! Please log in again');

function errorMiddleware(error: AppException, req: Request, res: Response, next: NextFunction) {
  if ((error as any).isAxiosError) {
    const axiosError = error as any;
    return handleAxiosError(axiosError, res);
  }

  error.status = error.status || 500;

  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  handleAppError(error, req, res);
}

export default errorMiddleware;
