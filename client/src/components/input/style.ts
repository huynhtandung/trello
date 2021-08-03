import { Input } from 'antd'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  &.ant-input {
    height: 39px;
    font-size: 14px;
    border: 2px solid rgb(223, 225, 230);
    background-color: rgb(250, 251, 252);
    box-shadow: none !important;
    border-radius: 3px;
    color: rgb(9, 30, 66);
    padding: 6px 10px;
    margin-bottom: 25px;
  }
`