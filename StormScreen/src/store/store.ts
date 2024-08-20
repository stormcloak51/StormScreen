import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './home/slice'
import movieSlice from './movies/slice'

export const store = configureStore({
  reducer: {
		homeSlice,
		movieSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>