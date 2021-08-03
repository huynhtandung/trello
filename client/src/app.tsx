import { AppProvider, AppRouter } from '@config'
import React from 'react'
import './app.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
