import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { DataStoreInToken, Token } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { RequestWithUser } from '../interfaces/http.interface';

export const signToken = (data: DataStoreInToken): Token => {
  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN, 10);
  return {
    expiresIn,
    token: jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn,
    }),
  };
};

const createAndSendToken = (user: User, status: number, res: Response) => {
  const { token, expiresIn } = signToken({ id: user.email, name: user.name });

  const cookieOptions = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; // https only

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(status).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  // 1) 쿠키 제거
  res.cookie('jwt', 'logout', {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const token = signToken({ id: 'parkoon', name: 'park jong hyeok' });

  const user: User = {
    email: 'parkoon@gmail.com',
    name: 'parkoon',
    password: '12121212',
  };
  createAndSendToken(user, 200, res);
};
