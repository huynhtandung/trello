import { TagProps } from 'antd'
import React from 'react'
import { StyledTag } from './style'

const Tag = (props: TagProps) => {
  return (
    <StyledTag {...props} />
  )
}

export default Tag