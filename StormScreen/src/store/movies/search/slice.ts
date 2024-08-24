import { MoviesProps } from '@/store/apiSlices/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: MoviesProps | undefined = {
  page: NaN,
	results: [],
	total_pages: NaN,
	total_results: NaN,
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
		setMovies(state, action: PayloadAction<MoviesProps | undefined>) {
			state = action.payload ?? state
		}
  },
})

// Action creators are generated for each case reducer function
export const { setMovies } = moviesSlice.actions

export default moviesSlice.reducer