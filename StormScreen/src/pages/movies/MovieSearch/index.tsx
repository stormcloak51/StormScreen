import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

import { useGetMoviesQuery } from '@/store/apiSlices/movies'
import { Item } from '@/store/home/slice'
import { FC, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import sortBy from 'lodash/sortBy'

const MovieSearch: FC = () => {
	const [urlParams] = useSearchParams()
	const searchValue = urlParams.get('searchFor')
	// console.log(qUrl)

	const [page, setPage] = useState(1)

	console.log(urlParams.get('searchFor'))

	console.log(page)

	const { data: searchData } = useGetMoviesQuery({query: searchValue ? searchValue : '', page: page})

	const copiedResults = sortBy(searchData?.results, ['popularity']).reverse()

	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<section>
				<h1 className='mt-[25px] text-5xl font-inter font-bold trending-gradient mb-[10px] leading-tight'>
					Search Results
				</h1>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 auto-rows-auto'>
					{searchData &&
						copiedResults?.map((movie: Item) => {
							if (!movie.poster_path) {
								return null
							}

							return (
								<div
									key={movie.id}
									className='w-[200px] p-1 rounded-xl'
									onClick={() => console.log(movie.popularity)}>
									<Card className='rounded-xl'>
										<CardContent className='p-0 flex flex-col items-center justify-center group relative'>
											<img
												className='object-cover transition-all duration-300 group-hover:blur-sm rounded-xl h-[278px]'
												src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
												alt={`${movie.title} poster`}
												loading='eager'
											/>
											<div className='rounded-xl absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
												<h1 className='text-lg text-center font-extrabold text-white tracking-tight lg:text-xl px-4'>
													{movie.title}
												</h1>
												<p className='scroll-m-20 text-red-500 font-extrabold tracking-tight lg:text-xl'>
													{movie.vote_average.toFixed(1)}
												</p>
												<Button className='mt-6 w-[50%]' variant='secondary' asChild>
													<Link to={`/movies/${movie.id}`}>Watch</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							)
						})}
				</div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious to={`?searchFor=${urlParams.get('searchFor')}&page=${page != 1 ? page - 1 : page}`} onClick={() => {
								if (page !== 1) setPage(page - 1)
							}}/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink to={`?searchFor=${urlParams.get('searchFor')}&page=${page}`}>{page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext onClick={() => setPage(page + 1)}  to={`?searchFor=${urlParams.get('searchFor')}&page=${page + 1}`} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</section>
		</main>
	)
}

export default MovieSearch
