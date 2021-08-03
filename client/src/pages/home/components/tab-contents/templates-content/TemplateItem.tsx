import CopyIcon from '@assets/icons/copy.svg'
import ViewIcon from '@assets/icons/view.svg'
import { Template } from '@types'
import React from 'react'
import styled from 'styled-components'

interface Props {
  template: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>
}

const TemplateItem = (props: Props) => {
  const { template, setSelectedTemplate } = props
  const { logo, image, name, author, description, copies, views } = template

  const handleSelectedTemplate = () => {
    setSelectedTemplate(template)
  }

  return (
    <StyledTemplateItem onClick={handleSelectedTemplate}>
      <StyledTemplateImage
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div>
          <img src={logo} />
        </div>
      </StyledTemplateImage>
      <StyledTemplateContent>
        <div className="tempalte-name">{name}</div>
        <div className="tempalte-author">{author}</div>
        <div className="tempalte-description">{description}</div>
        <StyledTemplateIcon>
          <div>
            <CopyIcon />
            <span>{copies}</span>
          </div>
          <div>
            <ViewIcon />
            <span>{views}</span>
          </div>
        </StyledTemplateIcon>
      </StyledTemplateContent>
    </StyledTemplateItem>
  )
}

export default TemplateItem

const StyledTemplateItem = styled.div`
  min-width: 265px;
  max-width: 265px;
  cursor: pointer;
`

const StyledTemplateContent = styled.div`
  padding: 0 10px;
  min-height: 150px;
  max-height: 150px;

  & .tempalte-name {
    margin-top: 12px;
    font-size: 14px;
    line-height: 20px;
    color: #172b4d;
    font-weight: bold;
  }

  & .tempalte-author {
    font-size: 12px;
    line-height: 20px;
    color: #6b778c;
  }

  & .tempalte-description {
    font-size: 12px;
    line-height: 20px;
    color: #172b4d;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`

const StyledTemplateImage = styled.div`
  position: relative;
  height: 132px;
  margin-bottom: 25px;
  border-radius: 3px;

  & div {
    width: 52px;
    height: 52px;
    position: absolute;
    bottom: -12px;
    left: 8px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 1px rgb(9 45 66 / 25%);

    & img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
`

const StyledTemplateIcon = styled.div`
  display: flex;
  color: #5e6c84;
  margin-top: 10px;

  & div {
    display: flex;
    align-items: center;
    marign-left: 3px;
    margin-right: 15px;

    & span {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  & svg {
    width: 18px;
    height: 18px;
    fill: rgb(107, 119, 140);
  }
`
