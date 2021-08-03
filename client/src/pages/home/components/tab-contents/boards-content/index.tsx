import { apiGetBoards } from '@apis'
import { removeQueueSocket } from '@common'
import { BOARD_QUERY_LIMIT, SOCKET_EVENT } from '@constants'
import { io } from '@socket'
import { useAppSelector } from '@stores/index'
import { Board, BoardParams, QueueBoardSocket } from '@types'
import { cloneDeep, uniqBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BoardItem from './BoardItem'

const BoardContent = () => {
  const currentUser = useAppSelector((state) => state.currentUser)

  const [boards, setBoards] = useState<Board[]>([])
  const [query, setQuery] = useState<BoardParams>({
    page: 0,
    limit: BOARD_QUERY_LIMIT,
  })
  const [showViewMore, setShowViewMore] = useState<boolean>(true)
  const [queueSocket, setQueueSocket] = useState<QueueBoardSocket[]>([])
  const [isProcessingSocket, setIsProcessingSocket] = useState<boolean>(false)

  useEffect(() => {
    io.joinBoard(currentUser._id)
  }, [])

  useEffect(() => {
    io.onCreateBoard(onCreateBoard)
    io.onDeleteBoard(onDeleteBoard)

    return () => {
      io.offCreateBoard()
      io.offDeleteBoard()
    }
  }, [])

  useEffect(() => {
    const getBoards = async () => {
      const boards = await apiGetBoards(query)
      setBoards(boards)
    }
    getBoards()
  }, [])

  useEffect(() => {
    if (!queueSocket.length || isProcessingSocket) {
      return
    }

    const job = queueSocket.pop()
    execQueue(job)
  }, [queueSocket, isProcessingSocket])

  const onCreateBoard = (board: Board) => {
    const key: string = (+new Date()).toString()
    setQueueSocket((queueSocket) => {
      return [
        {
          data: board,
          type: SOCKET_EVENT.CREATE_BOARD,
          key,
        },
        ...queueSocket,
      ]
    })
  }

  const onDeleteBoard = (boardId: string) => {
    const key: string = (+new Date()).toString()
    setQueueSocket((queueSocket) => {
      return [
        {
          data: boardId,
          type: SOCKET_EVENT.DELETE_BOARD,
          key,
        },
        ...queueSocket,
      ]
    })
  }

  const execQueue = (job: QueueBoardSocket) => {
    const { type, data, key } = job
    setIsProcessingSocket(true)
    switch (type) {
      case SOCKET_EVENT.CREATE_BOARD: {
        const board = data as Board
        setBoards([data, ...boards])
        break
      }
      case SOCKET_EVENT.DELETE_BOARD: {
        const boardId = data as string
        const newBoards = cloneDeep(boards).filter((el) => el._id !== boardId)
        setBoards(newBoards)
        break
      }
      default: {
      }
    }
    removeQueueSocket(queueSocket, key)
    setIsProcessingSocket(false)
  }

  const handleViewMore = async () => {
    const newQuery: BoardParams = {
      ...query,
      page: Math.floor(boards.length / query.limit),
    }
    setQuery(newQuery)
    const newBoards = await apiGetBoards(newQuery)
    if (newBoards.length < query.limit) {
      setShowViewMore(false)
    }

    const uniqBoards = uniqBy([...boards, ...newBoards], '_id')
    setBoards(uniqBoards)
  }

  return (
    <StyledBoardContent>
      <div className="title">your workspaces</div>
      <div className="board-content">
        {boards.map((el, idx) => (
          <BoardItem key={el._id} board={el} />
        ))}
      </div>
      {showViewMore ? (
        <div className="board-view-more" onClick={handleViewMore}>
          View more
        </div>
      ) : null}
    </StyledBoardContent>
  )
}

export default BoardContent

const StyledBoardContent = styled.div`
  & .title {
    color: #5e6c84;
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  & .board-content {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  & .board-view-more {
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    color: #026aa7;
  }
`
