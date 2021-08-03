import { Modal } from 'antd'
import styled from 'styled-components'

export const StyledModal = styled(Modal)`
  & .ant-modal-header, & .ant-modal-content {
    border-radius: 5px;
  }

  & .ant-modal-title {
    color: #026AA7;
  }
`