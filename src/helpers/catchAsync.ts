import { Request, Response, NextFunction } from 'express';

import { RequestWithUser } from '../interfaces/http.interface';
import AppException from '../exceptions/app.exception';

/**
 * async / await 의 try catch 반복 작업을 줄여주는 헬퍼
 * 에러 발생했을 경우 에러 미들웨어로 전달
 *
 * 실행 할 함수를 fn으로 받음
 */
export default (fn: Function) => {
  return (req: Request | RequestWithUser, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: AppException) => next(err));
  };
};
