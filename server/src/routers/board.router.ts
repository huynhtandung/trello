import { SOCKET_EVENT, SOCKET_INSTANCE } from '@constants'
import { authMiddleware, AuthRequest } from '@middlewares'
import {
  getBoardByName,
  createBoard,
  getBoards,
  deleteBoardById,
  getBoardById,
  getBoardByIdAndPopulate,
} from '@services'
import { handleSendSocket } from '@socket'
import { error, validateBody } from '@utils'
import { CreateBoardValidation } from '@validations'
import { Router } from 'express'

export const BoardRouter = Router()

BoardRouter.get('/', authMiddleware, async (req: AuthRequest, res) => {
  const boards = await getBoards(req.query, req.user)
  res.json(boards)
})
  .post(
    '/',
    authMiddleware,
    async (req, res, next) =>
      await validateBody(CreateBoardValidation, req.body, next),
    async (req: AuthRequest, res, next) => {
      const boardReq = req.body
      const createdBy = req.user._id
      const { name } = boardReq
      const existedBoard = await getBoardByName(name)
      if (existedBoard) {
        return next(error.Existed('Board'))
      }

      const board = await createBoard({
        ...boardReq,
        createdBy,
      })
      if(!board){
        return next(error.SystemError)
      }

      const boardSocket = await getBoardByIdAndPopulate(board._id, ['createdBy'])
      handleSendSocket(SOCKET_EVENT.CREATE_BOARD, boardSocket, req)
      res.json(true)
    }
  )
  .delete('/:id', authMiddleware, async (req: AuthRequest, res, next) => {
    const { id } = req.params
    const { user } = req
    const existedBoard = await getBoardById(id)
    if (!existedBoard) {
      return next(error.NotFound('Board'))
    }

    if(existedBoard.createdBy !== user._id){
      return next(error.NotAllow)
    }

    const boardSocket = await getBoardByIdAndPopulate(id, ['createdBy'])
    const isDeleted = await deleteBoardById(id)
    if(isDeleted){
      handleSendSocket(SOCKET_EVENT.DELETE_BOARD, boardSocket, req)
    }

    res.json(isDeleted)
  })
