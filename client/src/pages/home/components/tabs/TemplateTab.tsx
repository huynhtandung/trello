import styled from 'styled-components'
import BoardIcon from '@assets/icons/board.svg'
import React from 'react'

const TemplateTab = () => {
  return (
    <StyledTemplateTab>
      <div>
       <BoardIcon />
      </div>
      <span>Templates</span>
    </StyledTemplateTab>
  )
}

export default TemplateTab

export const StyledTemplateTab = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  & div {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`
