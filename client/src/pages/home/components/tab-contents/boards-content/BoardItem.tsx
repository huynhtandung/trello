import { Board } from '@types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TrashIcon from '@assets/icons/trash.svg'
import SubModal from '@components/sub-modal'
import { apiDeleteBoard } from '@apis'
import Message from '@components/message'
import { useHistory } from 'react-router-dom'

interface Props {
  board: Board;
}

const BoardItem = (props: Props) => {
  const { board } = props
  const history = useHistory()

  const handleDeleteBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    SubModal.warning({
      title: `Are you sure want to delete this board? ${board.name}`,
      onOk: async () => {
        const response = await apiDeleteBoard(board._id)
        if (response) {
          Message.success('Delete board successfully!')
        }

        return response
      },
    })
  }

  const handleGoBoardDetail = () => {
    history.push(`/board/${board._id}`)
  }

  return (
    <StyledBoardItem
      onClick={handleGoBoardDetail}
    >
      <div
        className="image"
        style={{
          backgroundImage: `url(${board.image})`,
        }}
      />
      <div className="name">{board.name}</div>
      <div className="author">{board.createdBy.fullName}</div>
      <div className="delete" onClick={handleDeleteBoard}>
        <TrashIcon />
      </div>
      <div className="overlay" />
    </StyledBoardItem>
  )
}

export default BoardItem

const StyledBoardItem = styled.div`
  position: relative;
  min-width: 265px;
  max-width: 265px;
  cursor: pointer;

  &:hover {
    // & .author {
    //   transform: none;
    // }

    & .delete {
      & svg {
        transform: none;
      }
    }

    .overlay {
      opacity: 0.5;
    }
  }

  & .image {
    position: relative;
    height: 132px;
    margin-bottom: 25px;
    background-size: cover;
    background-position: center center;
    background-color: rgba(2, 106, 167, 0.75);
    border-radius: 3px;
  }

  & .name {
    color: #fff;
    line-height: 20px;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    position: absolute;
    left: 20px;
    top: 15px;
  }

  & .author {
    position: absolute;
    left: 15px;
    top: 100px;
    color: #fff;
    line-height: 20px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-align: right;
    right: 20px;
    font-style: italic;
    // transform: translateX(100%);
    // transition: transform 0.5s;
  }

  & .delete {
    & svg {
      width: 15px;
      height: 15px;
      fill: #fff;
      cursor: pointer;
      z-index: 1;
      position: absolute;
      left: 20px;
      top: 100px;
      transform: translateX(calc(-100% - 20px));
      transition: transform 0.5s;
    }
  }

  & .overlay {
    position: absolute;
    width: 100%;
    height: calc(100% - 25px);
    top: 0;
    left: 0;
    background-color: #5e6c84;
    opacity: 0;
    transition: opacity 0.2s;
  }
`
