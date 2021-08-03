import styled from 'styled-components'
import React from 'react'

interface Props {
  color?: string;
  getValue?: (value: string) => void
}

const ColorInput = (props: Props) => {
  const { color, getValue } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getValue && getValue(e.target.value)
  }
  return (
    <StyledColorInput>
      <input type="color" value={color || 'ff0000'} onChange={handleChange} />
    </StyledColorInput>
  )
}

export default ColorInput

const StyledColorInput = styled.div``
