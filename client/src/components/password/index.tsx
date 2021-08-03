import { PasswordProps } from 'antd/lib/input'
import React from 'react'
import { StyledPassword } from './style'

const Password = (props: PasswordProps) => {
  return (
    <StyledPassword {...props} />
  )
}

export default Password