// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item } from '../home/slice'
import { VideoProps } from '../movies/slice'
import * as types from './types'

const apiKey = `6bb72f3ee1890e4b000df402dbefb0e0`

export const api = createApi({
	reducerPath: 'apiMovie',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),

  tagTypes: ['Movie'],
  endpoints: (build) => ({
		getMovies: build.query<types.MoviesProps, string>({
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
		getMovieVideo: build.query<VideoProps, types.VideoArgs>({
			query: ({id}) => ({
				url: `movie/${id}/videos`,
				params: { api_key: apiKey }
			}),
			providesTags: (__, ___, id: {id: number | string}) => {
				return [{ type: 'Movie', id: id.id }]
			}
		}),
		getMovieProviders: build.query<types.MovieProviders, number>({
			query: (id) => ({
				url: `movie/${id}/watch/providers`,
				params: { api_key: apiKey }
			}),
			providesTags: (_, __, id) => {
				return [{ type: 'Movie', id }]
			}
		}),
		getNowPlaying: build.query<types.MoviesProps, void>({
			query: () => ({
				url: `movie/now_playing`,
				params: {
					api_key: apiKey,
					page: 2
				}
			}),
			providesTags: (result) => {
				return result?.results?.map((item) => ({ type: 'Movie', id: item.id })) || []
			}
		}),
		getPopular: build.query<types.MoviesProps, void>({
			query: () => ({
				url: `movie/popular`,
				params: {
					api_key: apiKey
				}
			}),
			providesTags: (result) => {
				return result?.results?.map((item) => ({ type: 'Movie', id: item.id })) || []
			}
		}),
		getTopRated: build.query<types.MoviesProps, void>({
			query: () => ({
				url: `movie/top_rated`,
				params: {
					api_key: apiKey
				}
			}),
			providesTags: (result) => {
				return result?.results?.map((item) => ({ type: 'Movie', id: item.id })) || []
			}
		}),
		getUpcoming: build.query<types.MoviesProps, void>({
			query: () => ({
				url: `movie/upcoming`,
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

export const { useGetMovieQuery, useGetMovieVideoQuery, useGetMoviesQuery, useGetNowPlayingQuery, useGetMovieProvidersQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery } = api