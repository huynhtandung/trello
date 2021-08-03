import { SOCKET_EVENT, SOCKET_INSTANCE } from '@constants'
import { IBoard, IBoardPopulate } from '@models'
import { Request } from 'express'
import { Server, Socket } from 'socket.io'

export const handleListenSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on(SOCKET_EVENT.JOIN_BOARD, (data: any) => {
      socket.join(data.userId)
    })
  })
}

export const handleSendSocket = (event: SOCKET_EVENT, data: any, req: Request) => {
  const io: Server = req.app.get(SOCKET_INSTANCE)
  if(!io){
    return
  }

  switch (event){
    case SOCKET_EVENT.CREATE_BOARD: {
      const board: IBoardPopulate = data
      io.to(board.createdBy._id).emit(SOCKET_EVENT.CREATE_BOARD, board)
      board.members.forEach(el => {
        io.to(el).emit(SOCKET_EVENT.CREATE_BOARD, board)
      })
      break
    }
    case SOCKET_EVENT.DELETE_BOARD: {
      const board: IBoardPopulate = data
      io.to(board.createdBy._id).emit(SOCKET_EVENT.DELETE_BOARD, board._id)
      board.members.forEach(el => {
        io.to(el).emit(SOCKET_EVENT.DELETE_BOARD, board._id)
      })
      break
    }
    default: {}
  }
}