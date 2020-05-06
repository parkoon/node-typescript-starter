import { Response, Request, NextFunction } from 'express'
import { LoginDto } from '../dtos/auth.dto'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  // url
  // {state}api/v1/users/login

  res.status(200).send({
    status: 'success',
    message: 'login successfully',
  })
}
