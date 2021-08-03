import React, { useEffect } from 'react'

export const withTitle = (title: string) => (Component: Function) => (props: any) => {
  useEffect(() => {
    document.title = title
  }, [])

  return <Component {...props} />
}