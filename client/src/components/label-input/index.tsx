import Input from '@components/input'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  value?: string;
  isEdit?: boolean;
  style?: React.CSSProperties;
  getValue?: (value: string) => void;
}

const LabelInput = (props: Props) => {
  const { style, getValue } = props
  const [value, setValue] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  useEffect(() => {
    setIsEdit(props.isEdit || false)
  }, [props.isEdit])

  const handleOpenEdit = () => {
    setIsEdit(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    setIsEdit(false)
    getValue && getValue(value)
  }

  return (
    <StyledLabelInput>
      {isEdit ? (
        <Input value={value} onChange={handleChange} onBlur={handleBlur} />
      ) : (
        <div style={style} onClick={handleOpenEdit}>
          {value}
        </div>
      )}
    </StyledLabelInput>
  )
}

export default LabelInput

const StyledLabelInput = styled.div`
  width: 390px;

  & .ant-input {
    height: 30px;
    margin-bottom: 0px;
  }

  & div {
    padding: 5px 10px;
    border-radius: 3px;
  }
`
