import { Request, Response, NextFunction } from 'express'
import { error, verifyToken } from '@utils'
import { IUser } from '@models'

export interface AuthRequest extends Request {
  user: IUser;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.headers
  if (!access_token) {
    return next(error.Unauthorized)
  }

  try {
    const user = await verifyToken(access_token.toString())
    req.user = user
  } catch (err) {
    return next(err.message)
  }

  next()
}
