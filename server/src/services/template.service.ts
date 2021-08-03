import { ICreateTemplate, ITemplate, ITemplateParams, Template } from '@models'

export const createTemplate = async (payload: ICreateTemplate) => {
  const template = new Template({
    ...payload,
  })
  await template.save()
  return template
}

export const getTemplates = async (
  params: ITemplateParams
): Promise<ITemplate[]> => {
  const { page, limit } = params
  const templates = await Template.find()
    .sort({ views: -1 })
    .limit(+limit)
    .skip((+page || 0) * +limit)
  return templates
}
