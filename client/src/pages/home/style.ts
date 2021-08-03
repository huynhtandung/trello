import styled from 'styled-components'

export const StyledBoardContainer = styled.main`
  width: 75%;
  margin: 0 auto;
  padding: 50px 0;

  & .ant-tabs-nav {
    width: 230px;
  }

  & .ant-tabs-ink-bar {
    display: none;
  }

  & .ant-tabs-content-holder {
    border: none !important;
    padding-left: 30px;
  }

  & .ant-tabs-tab {
    padding: 6px 8px 6px 6px !important;
    margin: 2px 0 !important;
  }

  & .ant-tabs-tab-active {
    background-color: #E4F0F6;
    border-radius: 4px;

    & svg {
      fill: #0079BF;
    }
  }

  & .ant-tabs-tab-btn {
    width: 100%;
  }
`