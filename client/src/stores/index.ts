import { configureStore } from '@reduxjs/toolkit'
import { StoreState } from '@types'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import loading from './loading'
import currentUser from './current-user'

export default configureStore({
  reducer: {
    loading,
    currentUser
  },
})

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector