import { Response, NextFunction } from 'express';
import AppException from '../exceptions/app.exception';
import { AppRequest } from '../interfaces/req.interface';

const errorResponseDev = (err: AppException, req: AppRequest, res: Response) => {
  // Handling error about API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.status).json({
      err: err,
      stack: err.stack,
      status: err.status,
      message: err.message,
    });
  }

  // Handling error about RENDERING
  return res.status(err.status).render('error', {
    title: 'Something went wrong!',
    message: err.message,
  });
};
const errorResponseProd = (err: AppException, req: AppRequest, res: Response) => {
  // Handling error about API
  if (req.originalUrl.startsWith('/api')) {
    // Operation 에러 일 경우
    if (err.isOperational) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming 에러 일 경우
    // 1) 로깅
    console.error('ERROR !!', err);

    // 2) 에러 메세지 전송
    return res.status(500).json({
      status: 'error',
      message: 'Someting went very wrong!',
    });
  }
  // Handling error about RENDERING
  // Operation 에러 일 경우
  if (err.isOperational) {
    return res.status(err.status).render('error', {
      title: 'Something went wrong!',
      message: err.message,
    });
  }
  // Programming 에러 일 경우
  // 1) 로깅
  console.error('ERROR !!', err);

  // RENDERED WEBSITE
  return res.status(err.status).render('error', {
    title: 'Something went wrong!',
    message: 'Please try again later',
  });
};

function errorMiddleware(err: AppException, req: AppRequest, res: Response, next: NextFunction) {
  // try catch 문으로 넘어 온 경우 status 코드가 없고 프로그래밍 오류로 간주
  // 없을 경우 500 에러로 처리
  err.status = err.status || 500;

  // PRODUCTION 과 DEVELOPMENT 에러응답 구분
  process.env.NODE_ENV === 'development' ? errorResponseDev(err, req, res) : errorResponseProd(err, req, res);
}

export default errorMiddleware;
