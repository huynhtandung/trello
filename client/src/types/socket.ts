import { SOCKET_EVENT } from '@constants'

export interface QueueBoardSocket {
  data: any
  type: SOCKET_EVENT
  key: string
}