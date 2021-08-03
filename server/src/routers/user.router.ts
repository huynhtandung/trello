import { AuthRequest, authMiddleware } from '@middlewares'
import { createUser, getUserByEmail, getUserById, getUsers } from '@services'
import { comparePassword, error, generateToken, validateBody } from '@utils'
import { CreateUserValidation } from '@validations'
import { Router } from 'express'

export const UserRouter = Router()

UserRouter.get('/', authMiddleware, async (req, res) => {
  const users = await getUsers()
  res.json(users)
})

  .get('/me', authMiddleware, async (req: AuthRequest, res) => {
    const user = req.user
    res.json(user)
  })

  .get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const user = await getUserById(id)
    res.json(user)
  })

  .post(
    '/',
    authMiddleware,
    async (req, res, next) =>
      await validateBody(CreateUserValidation, req.body, next),
    async (req, res, next) => {
      const userReq = req.body
      const { email } = userReq
      const existedUser = await getUserByEmail(email)
      if (existedUser) {
        return next(error.Existed('Email'))
      }

      const user = await createUser(userReq)
      if(!user) {
        return next(error.SystemError)
      }

      res.json(user)
    }
  )

  .post('/login', async (req, res, next) => {
    const userReq = req.body
    const user = await getUserByEmail(userReq.email)
    if (!user) {
      return next(error.NotFound('User'))
    }

    const isValidPass = await comparePassword(userReq.password, user.password)
    if (!isValidPass) {
      return next(error.Incorrect('Password'))
    }

    const access_token = generateToken(user)
    res.json({
      access_token,
      user,
    })
  })

  .post(
    '/register',
    async (req, res, next) =>
      await validateBody(CreateUserValidation, req.body, next),
    async (req, res, next) => {
      const userReq = req.body
      const { email } = userReq
      const existedUser = await getUserByEmail(email)
      if (existedUser) {
        return next(error.Existed('Email'))
      }
      
      const user = await createUser(userReq)
      if(!user){
        return next(error.SystemError)
      }
      res.json(user)
    }
  )
