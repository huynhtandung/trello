import SearchIcon from '@assets/icons/search.svg'
import Input from '@components/input'
import { Template } from '@types'
import { Breadcrumb } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface Props {
  templateName: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
}

const TemplateHeader = (props: Props) => {
  const { templateName, setSelectedTemplate } = props

  const handleSelectedTemplate = () => {
    setSelectedTemplate(null)
  }

  return (
    <StyledTemplateHeader>
      <Breadcrumb>
        <Breadcrumb.Item>Template gallery</Breadcrumb.Item>
        <Breadcrumb.Item
          className="template-category"
          onClick={handleSelectedTemplate}
        >
          Engineering
        </Breadcrumb.Item>
        {templateName && <Breadcrumb.Item>{templateName}</Breadcrumb.Item>}
      </Breadcrumb>
      <Input placeholder="Find template" suffix={<SearchIcon />} />
    </StyledTemplateHeader>
  )
}

export default TemplateHeader

const StyledTemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;

  & .ant-input-affix-wrapper {
    width: 240px;
    border: 1px solid #dfe1e6;
    border-radius: 3px;
    height: 38px;

    & .ant-input-suffix {
      width: 20px;

      & svg {
        fill: rgb(66, 82, 110);
      }
    }
  }

  & .template-category {
    cursor: pointer;
  }
`
