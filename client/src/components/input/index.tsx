import { InputProps } from 'antd/lib/input/Input'
import React from 'react'
import { StyledInput } from './style'

const Input = (props: InputProps) => {
  return (
    <StyledInput {...props} />
  )
}

export default Input