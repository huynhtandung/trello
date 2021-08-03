import { User } from '@types'

export interface BoardStatusRequest {
  index?: number
  name: string
  backgroundColor?: string
}

export interface CreateBoardRequest {
  name: string;
  image?: string;
  status?: BoardStatusRequest[]
  members?: string[]
}

export interface BoardStatus {
  _id: string;
  index: number;
  name: string;
  backgroundColor: string;
}

export interface Board {
  _id: string
  name: string
  image: string
  status: BoardStatus[]
  members: string[]
  createdBy: User
  createdAt: number
}

export interface BoardParams {
  page?: number;
  limit?: number
}