import { apiGetTemplates } from '@apis'
import { TEMPLATE_QUERY_LIMIT } from '@constants'
import { Template, TemplateParams } from '@types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TemplateHeader from './Header'
import TemplateDetail from './TemplateDetail'
import TemplateItem from './TemplateItem'
import TemplateTitle from './Title'

const TemplateContent = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const [query, setQuery] = useState<TemplateParams>({
    page: 0,
    limit: TEMPLATE_QUERY_LIMIT,
  })
  const [showViewMore, setShowViewMore] = useState<boolean>(true)

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await apiGetTemplates(query)
      setTemplates(templates)
    }
    getTemplates()
  }, [])

  const handleViewMore = async () => {
    const newQuery: TemplateParams = {
      ...query,
      page: query.page + 1,
    }
    setQuery(newQuery)
    const newTemplates = await apiGetTemplates(newQuery)
    if (!newTemplates.length) {
      setShowViewMore(false)
      return
    }

    setTemplates([...templates, ...newTemplates])
  }

  return (
    <StyledTemplateContent>
      <TemplateHeader
        templateName={selectedTemplate?.name}
        setSelectedTemplate={setSelectedTemplate}
      />
      {selectedTemplate ? (
        <TemplateDetail selectedTemplate={selectedTemplate} />
      ) : (
        <>
          <TemplateTitle />
          <div className="template-content">
            {templates.map((el) => (
              <TemplateItem
                key={el._id}
                template={el}
                setSelectedTemplate={setSelectedTemplate}
              />
            ))}
          </div>
          {showViewMore ? (
            <div className="template-view-more" onClick={handleViewMore}>
              View more
            </div>
          ) : null}
        </>
      )}
    </StyledTemplateContent>
  )
}

export default TemplateContent

const StyledTemplateContent = styled.div`
  & .template-content {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  & .template-view-more {
    margin: 0 auto;
    text-decoration: underline;
    cursor: pointer;
    color: #026aa7;
    width: fit-content;
  }
`
