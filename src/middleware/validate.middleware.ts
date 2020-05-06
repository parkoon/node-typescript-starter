import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

export const validateBody = (type: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validateOrReject(plainToClass(type, req.body))
    next()
  } catch (err) {
    console.log('dudududu2!!111dddd', err)
    next(new Error('hello!!'))
  }
}
