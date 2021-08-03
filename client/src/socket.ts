import { SOCKET_EVENT } from '@constants'
import { SOCKET_API } from '@environments'
import { Board } from '@types'
import { io as socket } from 'socket.io-client'

export const io = {
  socket: socket(SOCKET_API),
  joinBoard(userId: string) {
    this.socket.emit(SOCKET_EVENT.JOIN_BOARD, { userId })
  },
  onCreateBoard(callback: (board: Board) => void) {
    this.socket.on(SOCKET_EVENT.CREATE_BOARD, function (data: Board) {
      callback(data)
    })
  },
  offCreateBoard() {
    this.socket.off(SOCKET_EVENT.CREATE_BOARD)
  },
  onDeleteBoard(callback: (boardId: string) => void) {
    this.socket.on(SOCKET_EVENT.DELETE_BOARD, function (data: string) {
      callback(data)
    })
  },
  offDeleteBoard() {
    this.socket.off(SOCKET_EVENT.DELETE_BOARD)
  },
}
