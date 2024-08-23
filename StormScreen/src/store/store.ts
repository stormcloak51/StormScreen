import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './home/slice'
import movieSlice from './movies/slice'
import { api } from './apiSlices/movies'

export const store = configureStore({
  reducer: {
		homeSlice,
		movieSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>