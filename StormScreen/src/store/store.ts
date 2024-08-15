import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './home/slice'

export const store = configureStore({
  reducer: {
		homeSlice,

	},
})

export type RootState = ReturnType<typeof store.getState>