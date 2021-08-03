import { PopoverProps } from 'antd/lib/popover'
import React from 'react'
import { StyledPopover } from './style'
import './style.css'

const Popover = (props: PopoverProps) => {
  return (
    <StyledPopover {...props} />
  )
}

export default Popover