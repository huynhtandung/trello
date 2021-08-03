import * as yup from 'yup'

const name = yup.string().required('name is required!')

const image = yup.string()

const status = yup.array().of(
  yup.object().shape({
    index: yup.number(),
    name: yup.string().required('status name is required!'),
    backgroundColor: yup.string(),
  })
)

const members = yup.array().of(yup.string())

export const CreateBoardValidation = yup.object().shape({
  name,
  image,
  status,
  members,
})
