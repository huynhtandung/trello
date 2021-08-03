import { ButtonProps } from 'antd/lib/button/Button'
import React from 'react'
import { StyledButton } from './style'

const Button = (props: ButtonProps) => {
  return (
    <StyledButton {...props} />
  )
}

export default Button