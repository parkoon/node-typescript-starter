import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { DataStoreInToken } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { RequestWithUser } from '../interfaces/http.interface';

import AppException from '../exceptions/app.exception';

/**
 * API 접근을 막는 미들웨어
 */
export const protect = (req: RequestWithUser, res: Response, next: NextFunction) => {
  // 1) header 또는 cookie에 있는 토큰 가져오기
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    return next(new AppException(401, 'You are not logged in! please log in to get access'));
  }

  // 2) 토큰이 유효한지 확인
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as DataStoreInToken;

  const { id, name } = decoded;

  // 3) ID를 가지고 유효한 사용자인지 확인
  // const currentUser = await User.findById(decoded.id);
  // if (!currentUser) {
  //   return next(new AppException(401, `The user belonging to this token does no longer exist`));
  // }

  // 4) 토큰이 발급된 후에 패스워드를 변경했는지 확인
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppException(401, 'User recently changed password! Please login again'));
  // }

  const currentUser: User = {
    name: 'parkoon',
    email: 'parkoon@mgmail.com',
    password: '1231@123123.com'
  };

  req.user = currentUser;
  res.locals.user = currentUser;

  next();
};

/**
 * 로그인 되어 있는 사용자 인지 체크
 * 해당 미들웨어가 적용되어 있어도, 페이지 접근은 가능
 * protect 미들웨어와 구분하여 사용
 */
export const isLoggedIn = (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log('is logged in middleware');
  console.log(req.cookies);
  const token = req.cookies.jwt;
  if (token) {
    // 1) 토큰이 유효한지 확인
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DataStoreInToken;

    const { id, name } = decoded;

    // 2) ID를 가지고 유효한 사용자인지 확인
    // const currentUser = await User.findById(decoded.id);
    // if (!currentUser) {
    //   return next();
    // }

    // 3) 토큰이 발급된 후에 패스워드를 변경했는지 확인
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next();
    // }

    // VIEW에서 사용할 수 있도록 사용자 정보 저장
    const currentUser: User = {
      name: 'parkoon',
      email: 'parkoon@mgmail.com',
      password: '1231@123123.com'
    };

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
  }
  next();
};
