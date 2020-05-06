import { Request, Response, NextFunction } from 'express';

export const getHome = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('home');
};
