import { Request, Response, NextFunction } from 'express'

export const errorsMiddleware = (
  errors: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ errors })
}
