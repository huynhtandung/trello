import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    loading: (state) => {
      return !state
    }
  },
})

export const { loading } = loadingSlice.actions

export default loadingSlice.reducer