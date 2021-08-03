import { IUser } from '@models'
import { sign, verify } from 'jsonwebtoken'
import { getUserById } from '@services'
import { JWT_SECRET } from '@constants'
import { error } from '@utils'

export const generateToken = (user: IUser): string => {
  const token = sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )

  return token
}

export const verifyToken = async (token: string): Promise<IUser | null> => {
  let currentUser: IUser = null

  await verify(token, JWT_SECRET, async (err, data: {userId: string}) => {
    if (err) {
      throw new Error(error.Unauthorized)
    }

    currentUser = await getUserById(data.userId)
    if (!currentUser) {
      throw new Error(error.Unauthorized)
    }
  })

  return currentUser
}
