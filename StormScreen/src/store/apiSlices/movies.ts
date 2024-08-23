// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item } from '../home/slice'
import { VideoProps } from '../movies/slice'
import { MoviesProps, VideoArgs } from './types'

const apiKey = `6bb72f3ee1890e4b000df402dbefb0e0`

export const api = createApi({
	reducerPath: 'apiMovie',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
		
  }),

  tagTypes: ['Movie'],
  endpoints: (build) => ({
		getMovies: build.query<MoviesProps, string>({
			query: (value) => ({
				url: `search/movie`,
				params: {
					query: value,
					api_key: apiKey
				}
			}),
			providesTags: (result) => {
				return result?.results?.map((item) => ({ type: 'Movie', id: item.id })) || []
			}
		}),
    // The query accepts a number and returns a Post
    getMovie: build.query<Item, number>({
      query: (id) => ({ url: `movie/${id}`, params: { api_key: apiKey } }),
			providesTags: (__, _, id) => {
				return [{ type: 'Movie', id }] 
			}
    }),
		getMovieVideo: build.query<VideoProps, VideoArgs>({
			query: ({id}) => ({
				url: `movie/${id}/videos`,
				params: { api_key: apiKey }
			}),
			providesTags: (__, ___, id: {id: number | string}) => {
				return [{ type: 'Movie', id: id.id }]
			}
		}),
		getNowPlaying: build.query<MoviesProps, void>({
			query: () => ({
				url: `movie/now_playing`,
				params: {
					api_key: apiKey
				}
			}),
			providesTags: (result) => {
				return result?.results?.map((item) => ({ type: 'Movie', id: item.id })) || []
			}
		})
  }),
})

export const { useGetMovieQuery, useGetMovieVideoQuery, useGetMoviesQuery, useGetNowPlayingQuery } = api