import { VideoProps } from '@/store/movies/slice'
import axios from 'axios'

const baseUrl = `https://api.themoviedb.org/3/`
const apiKey = `6bb72f3ee1890e4b000df402dbefb0e0`

export type DataProps = {
	title: string,
	name: string,
	backdrop_path: string,
	id: number,
	popularity: number,
	media_type: string,
	poster_path: string,
	vote_average: number,
	overview: string,
}

export interface TrendingProps {
	results: DataProps[]
	page: number
}

// trending all

export const fetchTrending = async (type: string) => {
	const response = await axios.get(`${baseUrl}trending/${type}/day?api_key=${apiKey}&language=en-US&page=2&limit=50`)
	const data: TrendingProps = response.data
	return data
} 

// search

export const searchAll = async (type: string, id: string) => {
	const response = await axios.get(`${baseUrl}${type}/${id}?api_key=${apiKey}&language=en-US`)
	const data: DataProps = response.data
	return data
}

// fetch popular

export const fetchPopular = async (type: string) => {
	const response = await axios.get(`${baseUrl}${type}/popular?api_key=${apiKey}&language=en-US&page=1`)
	const data: TrendingProps = response.data
	return data
}

// search videos

export const fetchVideos = async (type: string, id: string) => {
	const {data}: {data: VideoProps} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`)
	return data
}