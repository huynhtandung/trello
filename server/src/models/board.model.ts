import { IUser } from '@models'
import { generateUUID } from '@utils'
import { model, Schema } from 'mongoose'

const BoardSchema = new Schema({
  _id: {
    type: String,
    require: true,
    default: () => generateUUID(),
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  status: {
    type: [
      {
        _id: {
          type: String,
          require: true,
          default: () => generateUUID(),
        },
        index: {
          type: Number
        },
        name: {
          type: String
        },
        backgroundColor: {
          type: String
        },
      }
    ]
  },
  members:{
    type: [String]
  },
  createdBy: {
    type: String,
    ref: 'users'
  },
  createdAt: {
    type: Number,
    default: () => +new Date()
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
})

export const Board = model<IBoard>('boards', BoardSchema)

export interface IBoard {
  _id: string
  name: String
  image: String
  status: IBoardStatus[]
  members: string[]
  createdBy: string
  createdAt: number
  isDeleted: boolean
}

export interface IBoardStatus {
  _id: String
  index: number
  name: string
  backgroundColor: string
}

export interface ICreateBoardStatus {
  index?: number
  name: string
  backgroundColor?: string
}

export interface ICreateBoard {
  name: string;
  image?: string;
  status?: ICreateBoardStatus[]
  members?: string[]
  createdBy: string
}

export interface IBoardParams {
  page?: number;
  limit?: number;
}

export interface IBoardPopulate {
  _id: string
  name: String
  image: String
  status: IBoardStatus[]
  members: string[]
  createdBy: IUser
  createdAt: number
  isDeleted: boolean
}