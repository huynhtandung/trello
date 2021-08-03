import { apiRegister } from '@apis'
import GoogleIcon from '@assets/icons/google.svg'
import LogoIcon from '@assets/icons/logo.svg'
import BgLeftImage from '@assets/images/register-bg-left.svg'
import BgRightImage from '@assets/images/register-bg-right.svg'
import { ERRORS, RegexEmail, withTitle } from '@common'
import Button from '@components/button'
import Input from '@components/input'
import Message from '@components/message'
import Password from '@components/password'
import Tag from '@components/tag'
import { INPUT_MIN_LENGTH } from '@constants'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  StyledError,
  StyledFooter,
  StyledGoogle,
  StyledLogo,
  StyledOr,
  StyledForm,
  StyledFormContainer,
  StyledTitle,
} from './style'

interface FormState {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const defaultFormState = {
  email: '',
  fullName: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
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
    const { email, fullName, password, confirmPassword } = formState
    if (!email || email.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequireEmail)
    }

    if (!RegexEmail.test(email)) {
      newErrors.push(ERRORS.InvalidEmail)
    }

    if (!fullName || fullName.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequireFullName)
    }

    if (!password || password.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequirePassword)
    }

    if (!confirmPassword || confirmPassword.length < INPUT_MIN_LENGTH) {
      newErrors.push(ERRORS.RequireCofirmPassword)
    }

    if (password !== confirmPassword) {
      newErrors.push(ERRORS.ComparePassword)
    }

    setErrors(newErrors)
    if (newErrors.length) {
      return
    }

    const registerResponse = await apiRegister({
      email,
      password,
      fullName
    })

    if(registerResponse){
      Message.success('Register successfully!')
      history.push('/login')
    }
  }

  return (
    <StyledFormContainer>
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      <StyledForm>
        <StyledTitle>
          Register in to continue to: <span>Trello</span>
        </StyledTitle>
        <Input
          placeholder="Enter email"
          onChange={(e) => handleChange(e, 'email')}
        />
        <Input
          placeholder="Enter fullname"
          onChange={(e) => handleChange(e, 'fullName')}
        />
        <Password
          placeholder="Enter password"
          onChange={(e) => handleChange(e, 'password')}
        />
        <Password
          placeholder="Enter confirm password"
          onChange={(e) => handleChange(e, 'confirmPassword')}
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
        <Button onClick={() => handleSubmit()}>Continue</Button>
        <StyledOr>or</StyledOr>
        <StyledGoogle icon={<GoogleIcon />}>
          Continue with Google
        </StyledGoogle>
        <StyledFooter>
          <div>
            <Link to="login">Already have an account? Log in</Link>
          </div>
        </StyledFooter>
      </StyledForm>
      <BgLeftImage className='bg-left' />
      <BgRightImage className='bg-right' />
    </StyledFormContainer>
  )
}

export default withTitle('Register')(Register)