import { apiGetCurrentUser } from '@apis'
import { getItem, setItem } from '@common'
import Header from '@components/header'
import { ACCESS_TOKEN_KEY } from '@constants'
import { setCurrentUser } from '@stores/current-user'
import store, { useAppSelector } from '@stores/index'
import React, { ReactNode, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { ROUTERS } from './routers'
import { AppContainer } from './style'

const Components = {}
ROUTERS.forEach((route) => {
  Components[route.component] = React.lazy(
    () => import(/* webpackPrefetch: true */ `@pages/${route.component}`)
  )
})

const renderComponent = (Component: ReactNode, isAuth: boolean) => {
  const accessToken = getItem(ACCESS_TOKEN_KEY)
  if (!isAuth) {
    if (!accessToken) {
      return Component
    }

    return <Redirect to="/" />
  }

  if (!accessToken) {
    return <Redirect to="/login" />
  }

  return Component
}

export const AppRouter = () => {
  const currentUser = useAppSelector(state => state.currentUser)

  useEffect(() => {
    const getCurrentUser = async () => {
      if (getItem(ACCESS_TOKEN_KEY)) {
        const currentUser = await apiGetCurrentUser()
        if (currentUser) {
          store.dispatch(setCurrentUser(currentUser))
        }
      }
    }
    getCurrentUser()
  }, [])

  return (
    <AppContainer>
      {currentUser && <Header />}
      <Switch>
        {ROUTERS.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path}
            render={() => {
              const Component = Components[route.component]
              return (
                <React.Suspense fallback={null}>
                  {renderComponent(<Component />, route.isAuth)}
                </React.Suspense>
              )
            }}
          />
        ))}
        <Route
          path="/"
          exact={true}
          render={() => <Redirect to="user/home" />}
        />
        <Route render={() => <>404</>} />
      </Switch>
    </AppContainer>
  )
}
