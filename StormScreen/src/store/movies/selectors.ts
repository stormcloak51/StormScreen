import { RootState } from '../store'

export const selectorMovie = (state: RootState) => state.movieSlice.item
export const selectorMovieVideo = (state: RootState) => state.movieSlice.video