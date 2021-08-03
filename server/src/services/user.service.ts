import { ICreateUser, IUser, User } from '@models'
import { hashPassword } from '@utils'

export const getUserById = async (_id: string): Promise<IUser> => {
  const user = await User.findOne({
    _id
  })
  return user
}

export const getUserByEmail = async (email: string): Promise<IUser> => {
  const user = await User.findOne({
    email
  })
  return user
}

export const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

export const createUser = async (payload: ICreateUser): Promise<IUser> => {
  const { email, password, fullName } = payload
  const user = new User({
    email,
    password: await hashPassword(password),
    fullName
  })
  await user.save()
  return user
}