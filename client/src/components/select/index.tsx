import { InternalSelectProps, SelectProps } from 'antd/lib/select'
import React from 'react'
import { StyledSelect } from './style'

const Select = (props: SelectProps<any>) => {
  const handleFilter = (input: string, options) => {
    if (options?.label?.toLowerCase()?.includes(input?.toLowerCase())) {
      return true
    }

    return false
  }

  return <StyledSelect {...props} filterOption={handleFilter} />
}

export default Select
