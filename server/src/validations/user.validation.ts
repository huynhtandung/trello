import * as yup from 'yup'

const email = yup
  .string()
  .required('email is required!')
  .email('email is invalid!')

const password = yup
  .string()
  .required('password is required!')
  .min(6, 'password require at least 6 characters!')

  const fullName = yup
  .string()
  .required('fullName is required!')
  .min(6, 'fullName require at least 6 characters!')

export const CreateUserValidation = yup.object().shape({
  email,
  password,
  fullName
})

