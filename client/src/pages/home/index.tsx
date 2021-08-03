import { useAppSelector } from '@stores/index'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ModalCreateBoard from './components/modals/CreateBoard'
import BoardContent from './components/tab-contents/boards-content'
import TemplateContent from './components/tab-contents/templates-content'
import BoardTab from './components/tabs/BoardTab'
import TemplateTab from './components/tabs/TemplateTab'
import WorkSpaceTab from './components/tabs/Workspace'
import { StyledBoardContainer } from './style'

const { TabPane } = Tabs

const Boards = () => {
  const currentUser = useAppSelector((state) => state.currentUser)
  const history = useHistory()

  const [openModalCreateBoard, setIsOpenModalCreateBoard] =
    useState<boolean>(false)

  useEffect(() => {
    if (currentUser) {
      history.push(`/${currentUser._id}/home`)
    }
  }, [currentUser])

  const handleCloseModalCreateBoard = () => {
    setIsOpenModalCreateBoard(false)
  }

  return (
    <StyledBoardContainer>
      <Tabs tabPosition="left">
        <TabPane tab={<BoardTab />} key="1">
          <BoardContent />
        </TabPane>
        <TabPane tab={<TemplateTab />} key="2">
          <TemplateContent />
        </TabPane>
        <TabPane
          tab={
            <WorkSpaceTab
              setIsOpenModalCreateBoard={setIsOpenModalCreateBoard}
            />
          }
          key="3"
          disabled
        >
          Workspace
        </TabPane>
      </Tabs>
      <ModalCreateBoard
        openModalCreateBoard={openModalCreateBoard}
        handleCloseModalCreateBoard={handleCloseModalCreateBoard}
      />
    </StyledBoardContainer>
  )
}

export default Boards
