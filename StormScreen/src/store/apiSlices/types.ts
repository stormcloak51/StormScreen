import { Item } from '../home/slice'

export type VideoArgs = {
	type: string,
	id: number,
}

export type SearchVideoArgs = {
	query: string
	page: number
}

export interface MoviesProps {
	page: number,
	results: Item[],
	total_pages: number,
	total_results: number
}

export type MovieProviders = {
	results: {
		US: {
			rent: {
				logo_path: string,
				provider_name: string,
			}[],
		}
	}
}

export type IGenres = {
	genres: {
		id: number,
		name: string
	}[]
}