import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const signToken = (data: any) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: 'success',
    message: 'login successfully',
  });
};
