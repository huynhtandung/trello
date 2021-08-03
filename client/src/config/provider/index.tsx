import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loading from '@components/loading'
import { Provider } from 'react-redux'
import store from '@stores/index'

interface Props {
  children: JSX.Element
}

export const AppProvider = (props: Props) => {
  const { children } = props

  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Loading />
      </BrowserRouter>
    </Provider>
  )
}