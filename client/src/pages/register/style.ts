import { Button } from 'antd'
import styled from 'styled-components'

export const StyledFormContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 30px 0;

  & > svg {
    width: 368px;
    height: 368px;
    position: fixed;
    bottom: 0;

    &.bg-left {
      left: 0;
    }

    &.bg-right {
      right: 0;
    }
  }
`

export const StyledForm = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0px auto 24px;
  padding: 32px 40px;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
  box-sizing: border-box;
  color: rgb(94, 108, 132);
`

export const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 24px;
  color: rgb(94, 108, 132);
  font-size: 16px;

  & span {
    display: block;
    font-weight: bold;
  }
`

export const StyledLogo = styled.div`
  padding: 30px;
  text-align: center;

  & svg {
    height: 48px;
  }
`

export const StyledOr = styled.div`
  color: rgb(151, 160, 175);
  font-size: 11px;
  line-height: 1;
  padding: 20px 0;
  text-align: center;
  text-transform: uppercase;
`

export const StyledGoogle = styled(Button)`
  &.ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0px 8px;
    font-weight: bold;
    color: rgb(66, 82, 110) !important;
    height: 40px !important;
    line-height: 40px !important;
    background: rgb(255, 255, 255) !important;
    box-shadow: rgb(0 0 0 / 20%) 1px 1px 5px 0px !important;
  }

  & > svg {
    height: 17px;
    margin-right: 5px;
  }
`

export const StyledError = styled.div`
  padding-bottom: 25px;
`

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  margin-top: 32px;
  border-top: 1px solid rgb(213, 216, 222);

  & span {
    color: rgb(107, 119, 140);
    margin: 0px 8px;
    font-weight: bold;
    padding-bottom: 8px;
  }

  a {
    color: rgb(0, 82, 204) !important;
    font-size: 14px;
    line-height: 20px;
  }
`