import BoardIcon from '@assets/icons/board.svg'
import CreateIcon from '@assets/icons/create.svg'
import HomeIcon from '@assets/icons/home.svg'
import InfoIcon from '@assets/icons/info.svg'
import MenuIcon from '@assets/icons/menu.svg'
import NotificationIcon from '@assets/icons/notification.svg'
import SearchIcon from '@assets/icons/search.svg'
import Avatar from '@components/avatar'
import { useAppSelector } from '@stores/index'
import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  StyledHeaderCenter,
  StyledHeaderContainer,
  StyledHeaderIcon,
  StyledHeaderItem,
  StyledHeaderLeft,
  StyledHeaderLogo,
  StyledHeaderRight,
  StyledHeaderSearch,
} from './style'

const Header = () => {
  const currentUser = useAppSelector(state => state.currentUser)
  const history = useHistory()

  const handleGoHome = () => {
    history.push(`/${currentUser._id}/home`)
  }

  return (
    <StyledHeaderContainer>
      <StyledHeaderLeft>
        <StyledHeaderItem>
          <StyledHeaderIcon>
            <MenuIcon />
          </StyledHeaderIcon>
        </StyledHeaderItem>
        <StyledHeaderItem onClick={handleGoHome}>
          <StyledHeaderIcon>
            <HomeIcon />
          </StyledHeaderIcon>
        </StyledHeaderItem>
        <StyledHeaderItem>
          <StyledHeaderIcon>
            <BoardIcon />
          </StyledHeaderIcon>
          &nbsp;&nbsp;
          <span>Boards</span>
        </StyledHeaderItem>
        <StyledHeaderItem>
          <StyledHeaderSearch>
            <span>Jump to...</span>
            <StyledHeaderIcon>
              <SearchIcon />
            </StyledHeaderIcon>
          </StyledHeaderSearch>
        </StyledHeaderItem>
      </StyledHeaderLeft>
      <StyledHeaderCenter>
        <StyledHeaderLogo>
          <StyledHeaderIcon>
            <BoardIcon />
          </StyledHeaderIcon>
          &nbsp;&nbsp;
          <span>Trello</span>
        </StyledHeaderLogo>
      </StyledHeaderCenter>
      <StyledHeaderRight>
        <StyledHeaderItem>
          <StyledHeaderIcon>
            <CreateIcon />
          </StyledHeaderIcon>
        </StyledHeaderItem>
        <StyledHeaderItem>
          <StyledHeaderIcon>
            <InfoIcon />
          </StyledHeaderIcon>
        </StyledHeaderItem>
        <StyledHeaderItem>
          <StyledHeaderIcon>
            <NotificationIcon />
          </StyledHeaderIcon>
        </StyledHeaderItem>
        <Avatar src="https://trello-members.s3.amazonaws.com/60877c9179061326dd700afe/af88461ca3dbcd5bc37f49984d136503/170.png" />
      </StyledHeaderRight>
    </StyledHeaderContainer>
  )
}

export default Header
