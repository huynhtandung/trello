import styled from 'styled-components'

export const StyledHeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 40px;
  max-height: 40px;
  background-color: #026AA7;
  padding: 4px 4px;
`

export const StyledHeaderLeft = styled.div`
  display: flex;
`

export const StyledHeaderCenter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const StyledHeaderRight = styled.div`
  display: flex;
`

export const StyledHeaderItem = styled.div`
  border-radius: 3px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 0 0;
  padding: 0 6px;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const StyledHeaderSearch = styled.div`
  display: flex;
  align-items: center;

  & span {
    width: 155px;
    cursor: text;
    display: inline-block;
    font-weight: normal;
  }
`

export const StyledHeaderLogo = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  & span {
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 1px;
  }
`

export const StyledHeaderIcon = styled.div`
  display: flex;
  height: 20px;
  width: 20px;

  & svg {
    fill: #fff;
  }
`