import { CLIENT_URL } from '@environments'
import { Request, Response, NextFunction } from 'express'

export const corsMiddleware = (
  req: Request,
  res,
  next: NextFunction
) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL)
  res.header('Access-Control-Allow-Methods', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, access_token'
  )
  next()
}
