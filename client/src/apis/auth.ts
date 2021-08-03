import { serverInstance } from '@common'
import { LoginRequest, LoginResponse, RegisterRequest, User } from '@types'
import { AxiosResponse } from 'axios'

export const apiRegister = async (body: RegisterRequest) => {
  const res: AxiosResponse<User> = await serverInstance.post('/users/register', body)
  return res.data
}

export const apiGetCurrentUser = async () => {
  const res: AxiosResponse<User> = await serverInstance.get('/users/me')
  return res.data
}

export const apiLogin = async (body: LoginRequest) => {
  const res: AxiosResponse<LoginResponse> = await serverInstance.post('/users/login', body)
  return res.data
}

export const apiGetUsers = async () => {
  const res: AxiosResponse<User[]> = await serverInstance.get('/users')
  return res.data
}