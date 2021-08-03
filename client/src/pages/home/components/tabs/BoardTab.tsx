import styled from 'styled-components'
import BoardIcon from '@assets/icons/board.svg'
import React from 'react'

const BoardTab = () => {
  return (
    <StyledBoardTab>
      <div>
       <BoardIcon />
      </div>
      <span>Boards</span>
    </StyledBoardTab>
  )
}

export default BoardTab

export const StyledBoardTab = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  & div {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`
