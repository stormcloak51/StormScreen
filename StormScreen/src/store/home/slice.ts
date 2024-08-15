import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type TrendingItem = {
	backdrop_path: string,
	id: number,
	media_type: string,
	poster_path: string,
	title: string,
	vote_average: number
}

export interface Trending {
  trending: TrendingItem[]
}

const initialState: Trending = {
  trending: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
		setTrending: (state, action: PayloadAction<TrendingItem[]>) => {
			state.trending = action.payload
		}
  },
})

// Action creators are generated for each case reducer function
export const { setTrending } = homeSlice.actions

export const homeStateTrending = (state: Trending) => state.trending

export default homeSlice.reducer