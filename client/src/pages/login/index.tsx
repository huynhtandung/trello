import { apiLogin } from '@apis'
import GoogleIcon from '@assets/icons/google.svg'
import LogoIcon from '@assets/icons/logo.svg'
import BgLeftImage from '@assets/images/register-bg-left.svg'
import BgRightImage from '@assets/images/register-bg-right.svg'
import { ERRORS, RegexEmail, setItem, withTitle } from '@common'
import Button from '@components/button'
import Input from '@components/input'
import Message from '@components/message'
import Password from '@components/password'
import Tag from '@components/tag'
import { ACCESS_TOKEN_KEY, INPUT_MIN_LENGTH } from '@constants'
import { setCurrentUser } from '@stores/current-user'
import store from '@stores/index'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  StyledError,
  StyledFooter,
  StyledForm,
  StyledFormContainer,
  StyledGoogle,
  StyledLogo,
  StyledOr,
  StyledTitle,
} from './../register/style'

interface FormState {
  email: string;
  password: string;
}

const defaultFormState = {
  email: '',
  password: '',
}

const Login = () => {
  const history = useHistory()

  const [formState, setFormState] = useState<FormState>(defaultFormState)
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value: string = e.target.value
    setFormState({
      ...formState,
      [key]: value,
    })
  }

  const handleSubmit = async () => {
    const newErrors: string[] = []
    const { email, password } = formState
    if (!email || email.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequireEmail)
    }

    if (!RegexEmail.test(email)) {
      newErrors.push(ERRORS.InvalidEmail)
    }

    if (!password || password.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequirePassword)
    }

    setErrors(newErrors)
    if (newErrors.length) {
      return
    }

    const loginResponse = await apiLogin({
      email,
      password,
    })

    if (loginResponse) {
      Message.success('Login successfully!')
      const { access_token, user } = loginResponse
      setItem(ACCESS_TOKEN_KEY, access_token)
      store.dispatch(setCurrentUser(user))
      history.push('/')
    }
  }

  return (
    <StyledFormContainer>
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      <StyledForm>
        <StyledTitle>
          Log in to continue to: <span>Trello</span>
        </StyledTitle>
        <Input
          placeholder="Enter email"
          onChange={(e) => handleChange(e, 'email')}
        />
        <Password
          placeholder="Enter password"
          onChange={(e) => handleChange(e, 'password')}
        />
        {errors.length ? (
          <StyledError>
            {errors.map((err, idx) => (
              <Tag key={idx} color="red">
                {err}
              </Tag>
            ))}
          </StyledError>
        ) : null}
        <Button onClick={handleSubmit}>Continue</Button>
        <StyledOr>or</StyledOr>
        <StyledGoogle icon={<GoogleIcon />}>
          Continue with Google
        </StyledGoogle>
        <StyledFooter>
          <div>
            <Link to="forgot-password">Can't login in?</Link>
          </div>
          <span>.</span>
          <div>
            <Link to="register">Sign up for an account</Link>
          </div>
        </StyledFooter>
      </StyledForm>
      <BgLeftImage className='bg-left' />
      <BgRightImage className='bg-right' />
    </StyledFormContainer>
  )
}

export default withTitle('Login')(Login)
