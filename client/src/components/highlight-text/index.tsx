import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string;
  hightlightText: string;
}

const HightlightText = (props: Props) => {
  const { text, hightlightText } = props

  const handleRenderText = () => {
    const lowerCaseHightlightText = hightlightText.toLocaleLowerCase()
    const splitText = text.split(lowerCaseHightlightText)
    return splitText.map((el, idx) => (
      <span key={idx}>
        {el}
        {idx < splitText.length - 1 ? (
          <span className="highlight">{lowerCaseHightlightText}</span>
        ) : (
          ''
        )}
      </span>
    ))
  }

  return <StyledHightlightText>{handleRenderText()}</StyledHightlightText>
}

export default HightlightText

const StyledHightlightText = styled.span`
  & .highlight {
    text-decoration: underline;
  }
`
