import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@types'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      return action.payload
    }
  },
})

export const { setCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer