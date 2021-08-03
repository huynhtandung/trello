import { COLOR } from '@constants'
import { ModalFuncProps } from 'antd'
import React from 'react'
import { StyledModal } from './style'

interface Props extends ModalFuncProps {
  isDisabledSubmit?: boolean
}

const Modal = (props: Props) => {
  const { isDisabledSubmit } = props

  const getCustomeButtonStyle = () => {
    return {
      minWidth: 75,
      borderRadius: 5,
    }
  }

  return (
    <StyledModal
      okButtonProps={{
        disabled: isDisabledSubmit || false,
        style: {
          ...getCustomeButtonStyle(),
          backgroundColor: isDisabledSubmit ? '#ccc' : COLOR,
        },
      }}
      cancelButtonProps={{
        style: {
          ...getCustomeButtonStyle(),
        },
      }}
      {...props}
    >
      {props.content}
    </StyledModal>
  )
}

export default Modal
