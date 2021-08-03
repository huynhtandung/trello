import { Select } from 'antd'
import styled from 'styled-components'

export const StyledSelect = styled(Select)`
  &.ant-select {
    width: 100%;
    box-shadow: none !important;

    & .ant-select-selector {
      border-radius: 3px !important;
      height: 39px !important;
      display: flex;
      align-items: center;
    }
  }
`