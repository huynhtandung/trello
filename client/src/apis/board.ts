import { serverInstance } from '@common'
import { Board, BoardParams, CreateBoardRequest } from '@types'
import { AxiosResponse } from 'axios'

export const apiCreateBoard = async (body: CreateBoardRequest) => {
  const res: AxiosResponse<Board> = await serverInstance.post('/boards', body)
  return res.data
}

export const apiGetBoards = async (params?: BoardParams) => {
  const res: AxiosResponse<Board[]> = await serverInstance.get('/boards', { params })
  return res.data
}

export const apiDeleteBoard = async (id: string) => {
  const res: AxiosResponse<boolean> = await serverInstance.delete(`/boards/${id}`)
  return res.data
}