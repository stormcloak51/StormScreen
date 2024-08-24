import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Item = {
	backdrop_path: string,
	id: number,
	popularity: number,
	media_type: string,
	overview: string,
	poster_path: string,
	title: string,
	name: string,
	vote_average: number
}

export interface Trending {
  trending: {
		page: number,
		data: Item[],
	}
	trendingMovies: {
		page: number,
		data: Item[],
	}
	trendingTv: {
		page: number,
		data: Item[],
	}
}

const initialState: Trending = {
  trending: {
		page: 1,
		data: [],
	},
	trendingMovies: {
		page: 2,
		data: [],
	},
	trendingTv: {
		page: 2,
		data: [],
	},
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
		setTrending: (state, action: PayloadAction<Item[]>) => {
			state.trending.data = action.payload
		},
		setTrendingMovies: (state, action: PayloadAction<Item[]>) => {
			state.trendingMovies.data = action.payload
		},
		setTrendingTv: (state, action: PayloadAction<Item[]>) => {
			state.trendingTv.data = action.payload
		}
  },
})

// Action creators are generated for each case reducer function
export const { setTrending, setTrendingMovies, setTrendingTv } = homeSlice.actions

export default homeSlice.reducer