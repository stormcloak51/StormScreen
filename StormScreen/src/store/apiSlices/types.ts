import { Item } from '../home/slice'

export type VideoArgs = {
	type: string,
	id: number,
}

export interface MoviesProps {
	page: number,
	results: Item[],
	total_pages: number,
	total_results: number
}