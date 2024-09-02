// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item } from '../home/slice'
import { VideoProps } from '../movies/slice'
import * as types from './types'
import { FiltersOptions } from '@/components/filters'

const apiKey = `6bb72f3ee1890e4b000df402dbefb0e0`

export const api = createApi({
	reducerPath: 'apiMovie',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${apiKey}`)
			return headers
		},
  }),

  tagTypes: ['Movie', 'List'],
	
  endpoints: (build) => ({
		getMovies: build.query<types.MoviesProps, types.SearchVideoArgs>({
			query: (queryParams) => ({
				url: `search/movie`,
				params: {
					...queryParams,
					api_key: apiKey,
				}
			}),
			providesTags: () => {
				return [{type: 'List', id: 'SEARCH_MOVIES'}]
			}
		}),
		getFilteredMovies: build.query<types.MoviesProps, FiltersOptions>({
			query: (queryParams) => ({
				url: `discover/movie`,
				params: {
					...queryParams,
					api_key: apiKey,
				}
			}),
			providesTags: (result) => {
				return [{type: 'List', id: result?.results[0].id}]
			}
		}),
    // The query accepts a number and returns a Post
    getMovie: build.query<Item, number>({
      query: (id) => ({ url: `movie/${id}`, params: { api_key: apiKey } }),
			providesTags: (__, _, id) => {
				return [{ type: 'Movie', id }] 
			}
    }),
		getRecommendations: build.query<types.MoviesProps, types.SearchVideoArgs>({
			query: (queryParams) => ({
				url: `movie/${queryParams.query}/recommendations`,
				params: {
					page: queryParams?.page,
					api_key: apiKey
				}
			}),
			providesTags: (_, __, res) => {
				return [{ type: 'List', id: `RECOMMENDATIONS_${res.query}`}]
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
		getTrending: build.query<types.MoviesProps, void>({
			query: () => ({
				url: 'trending/movie/day',
				params: {
					api_key: apiKey
				}
			})
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
				return result?.results ? result.results.map(({ id }) => ({ type: 'Movie', id })) : [];
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
		}),
		getGenres: build.query<types.IGenres, void>({
			query: () => ({
				url: 'genre/movie/list',
				params: {
					api_key: apiKey
				}
			}),
			providesTags: () => [{ type: 'List', id: 'GENRES_LIST' }]
		})
  }),
})

export const { useGetMovieQuery, useGetMovieVideoQuery, useGetMoviesQuery, useGetNowPlayingQuery, useGetMovieProvidersQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery, useGetFilteredMoviesQuery, useGetTrendingQuery, useGetGenresQuery, useGetRecommendationsQuery } = api