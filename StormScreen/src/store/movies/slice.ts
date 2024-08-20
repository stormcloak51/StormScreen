import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../home/slice'


type MovieItem = {
	item: Item
	video: VideoProps
}

export type VideoProps = {
	id: number
	results: {
		key: string
		type: string
		site: string
		size: number
	}[]
}

const initialState: MovieItem = {
  item: {
		backdrop_path: '',
		id: NaN,
		media_type: '',
		overview: '',
		poster_path: '',
		title: '',
		name: '',
		vote_average: NaN,
	},
	video: {
		id: NaN,
		results: [],
	}
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
		setMovie: (state, action: PayloadAction<Item>) => {
			state.item = action.payload
		},
		setMovieVideo: (state, action: PayloadAction<VideoProps>) => {
			state.video = action.payload
		}
  },
})

// Action creators are generated for each case reducer function
export const { setMovie, setMovieVideo } = movieSlice.actions

export default movieSlice.reducer