import { serverInstance } from '@common'
import { AxiosResponse } from 'axios'
import { Template, TemplateParams } from 'src/types/template'

export const apiGetTemplates = async (params?: TemplateParams) => {
  const res: AxiosResponse<Template[]> = await serverInstance.get('/templates', { params })
  return res.data
}