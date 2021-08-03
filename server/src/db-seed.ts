import { ITemplate, ITemplateBoard, Template } from '@models'
import { createTemplate } from '@services'
import templates from './../src/data/templates.json'

const importTemplates = async (templates) => {
  const existedTemplate = await Template.findOne()
  if (existedTemplate) {
    console.log('- Already import templates')
    return
  }

  console.log('- Import templates starting...')
  const calls: Promise<ITemplate>[] = []
  templates.forEach((item) => {
    const promise = new Promise<ITemplate>(async (resolve) => {
      const template = await createTemplate({
        logo: item.logo,
        image: item.image,
        name: item.name,
        author: item.author,
        description: item.description,
        boards: item.boards as unknown as ITemplateBoard[],
      })
      resolve(template)
    })
    calls.push(promise)
  })
  await Promise.all(calls)
  console.log('- Import templates successfully')
}

export default () => {
  importTemplates(templates.data)
}
