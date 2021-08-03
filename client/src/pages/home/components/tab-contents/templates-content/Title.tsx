import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TemplateIcon from '@assets/icons/template.svg'

const TemplateTitle = () => {
  return (
    <StyledTemplateTitle>
      <TemplateIcon />
      <span>Engineering templates</span>
    </StyledTemplateTitle>
  )
}

export default TemplateTitle

const StyledTemplateTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  & svg {
    height: 48px;
    width: 48px;
    min-width: 48px;
    margin-right: 12px;
    border-radius: 3px;
    font-weight: 600;
  }

  & span {
    font-size: 20px;
    line-height: 24px;
    color: #172B4D;
    padding: 0 5px;
  }
`