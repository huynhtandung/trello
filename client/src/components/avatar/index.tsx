import { AvatarProps } from 'antd/lib/avatar'
import React from 'react'
import { StyledAvatar } from './style'

const Avatar = (props: AvatarProps) => {
  return (
    <StyledAvatar {...props} />
  )
}

export default Avatar