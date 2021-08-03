import { Template } from '@types'
import React from 'react'
import styled from 'styled-components'
import CopyIcon from '@assets/icons/copy.svg'
import ViewIcon from '@assets/icons/view.svg'
import Button from '@components/button'
import HightlightText from '@components/highlight-text'
import PowerIcon from '@assets/icons/power.svg'
import LimitIcon from '@assets/icons/limit.svg'

interface Props {
  selectedTemplate: Template;
}

const TemplateDetail = (props: Props) => {
  const { selectedTemplate } = props

  return (
    <StyledTemplateDetail>
      <StyledTemplateDetailHeader>
        <div className="template-detail-header-left">
          <img src={selectedTemplate.logo} />
          <div>
            <p className="template-detail-name">{selectedTemplate.name}</p>
            <p className="template-detail-author">{selectedTemplate.author}</p>
            <div className="template-detail-views">
              <CopyIcon />
              <span>{selectedTemplate.copies} Copies</span>
              <ViewIcon />
              <span>{selectedTemplate.views} Views</span>
            </div>
          </div>
        </div>
        <div>
          <Button>Use template</Button>
        </div>
      </StyledTemplateDetailHeader>
      <StyledTemplateDetailContent>
        <div>About this template</div>
        <p>{selectedTemplate.description}</p>
        <ol>
          {selectedTemplate.boards.map((el, idx) => (
            <li key={idx}>
              <StyledTemplateBoardStatus style={el.style}>
                {el.name}
              </StyledTemplateBoardStatus>
              <HightlightText text={el.description} hightlightText={el.name} />
            </li>
          ))}
        </ol>
        <StyledTemplateDetailPower>
          <div>
            <PowerIcon />
            <span>Power-Ups</span>
          </div>
          <p>
            Add features to your boards and integrate your favorite apps right
            into Trello. Here are the Power-Ups enabled on this template:
          </p>
        </StyledTemplateDetailPower>
        <StyledTemplateDetailLimit>
          <div>
            <LimitIcon />
            <span>List Limits</span>
          </div>
          <p>
            Set a limit on your lists to highlight them if the number of cards
            in it passes the limit.
          </p>
        </StyledTemplateDetailLimit>
      </StyledTemplateDetailContent>
    </StyledTemplateDetail>
  )
}

export default TemplateDetail

const StyledTemplateDetail = styled.div``

const StyledTemplateDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & .template-detail-header-left {
    display: flex;

    & img {
      height: 64px;
      width: 64px;
      margin-right: 15px;
    }

    & .template-detail-name {
      color: #172b4d;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 28px;
      margin-bottom: 4px;
    }

    & .template-detail-author {
      color: #172b4d;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      margin-bottom: 4px;
    }

    & svg {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }

    & .template-detail-views {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #5e6c84;
      font-size: 12px;

      & span:nth-child(2) {
        margin-right: 10px;
      }
    }
  }
`

const StyledTemplateDetailContent = styled.div`
  & > div {
    color: #172b4d;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.008em;
    line-height: 24px;
    margin-top: 28px;
    margin-bottom: 8px;
  }

  & p {
    margin-bottom: 8px;
  }
`
const StyledTemplateBoardStatus = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 2px 10px;
  cursor: pointer;
`

const StyledTemplateDetailPower = styled.div`
  & div {
    display: flex;
    align-items: center;

    & svg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    & span {
      color: #172b4d;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.008em;
      line-height: 24px;
    }
  }

  & p {
    padding-top: 8px;
    font-size: 16px;
    font-weight: normal;
  }
`

const StyledTemplateDetailLimit = styled.div`
  & div {
    display: flex;
    align-items: center;

    & svg {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }

    & span {
      color: #172b4d;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.008em;
      line-height: 24px;
    }
  }

  & p {
    padding-top: 8px;
    font-size: 16px;
    font-weight: normal;
    width: 200px;
    color: #5e6c84;
  }
`
