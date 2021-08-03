import styled from 'styled-components'
import CreateIcon from '@assets/icons/create.svg'
import React from 'react'

interface Props {
  setIsOpenModalCreateBoard: React.Dispatch<React.SetStateAction<boolean>>
}

const WorkSpaceTab = (props: Props) => {
  const { setIsOpenModalCreateBoard } = props

  const handleOpenModalCreateBoard = () => {
    setIsOpenModalCreateBoard(true)
  }
  
  return (
    <StyledWorkspaceTab>
      <span>workspace</span>
      <div onClick={handleOpenModalCreateBoard}>
        <CreateIcon />
      </div>
    </StyledWorkspaceTab>
  )
}

export default WorkSpaceTab

export const StyledWorkspaceTab = styled.div`
  display: flex;
  justify-content: space-between;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin-top: 16px;
  text-transform: uppercase;
  margin: 0;
  padding: 15px 0;

  & div {
    width: 20px;
    height: 20px;
    cursor: pointer;

    & svg {
      fill: #5e6c84;
    }
  }
`
