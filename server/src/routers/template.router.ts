import { authMiddleware } from '@middlewares'
import { getTemplates } from '@services'
import { Router } from 'express'

export const TemplateRouter = Router()

TemplateRouter.get('/', authMiddleware, async (req, res) => {
  const templales = await getTemplates(req.query)
  res.json(templales)
})