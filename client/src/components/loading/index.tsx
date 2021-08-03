import { useAppSelector } from '@stores/index'
import React from 'react'
import { StyledLoading } from './style'

const Loading = () => {
  const loading = useAppSelector(state => state.loading)

  return loading ? <StyledLoading size="large" /> : null
}

export default Loading
