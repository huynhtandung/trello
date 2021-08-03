import { NextFunction } from 'express'
import { ObjectSchema } from 'yup'

export const validateBody = async (callback: ObjectSchema<any>, body: any, next: NextFunction) => {
  try {
    await callback.validate(body, { abortEarly: false })
    next()
  } catch (e) {
    next(e.errors)
  }
}