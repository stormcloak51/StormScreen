import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './home/slice'
import movieSlice from './movies/slice'
import { api } from './apiSlices/movies'
import movies from './movies/search/slice'
import user from './auth/userSlice'

export const store = configureStore({
  reducer: {
		user,
		homeSlice,
		movieSlice,
		movies,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>