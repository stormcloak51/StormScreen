import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from '@/components/ui/pagination'
import { useGetFilteredMoviesQuery } from '@/store/apiSlices/movies'
import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

const MovieDiscover = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const location = useLocation()
	const pathLocation = location.pathname + location.search
	const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

	useEffect(() => {
		const initPage = Number(searchParams.get('page')) || 1;
		setPage(initPage)
	}, [])

	useEffect(() => {
		setSearchParams({page: page.toString()})
	}, [page])
	// params
	const sort_by = searchParams.get('sort_by'),
		include_adult = searchParams.get('include_adult'),
		include_video = searchParams.get('include_video'),
		genre = searchParams.get('genre')

	const { data: filteredMovies, isSuccess } = useGetFilteredMoviesQuery({
		include_adult: include_adult ? true : false,
		sort_by: sort_by == null ? '' : sort_by,
		include_video: include_video ? true : false,
		with_genres: genre == null ? '' : genre,
		page: page,
	})
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<section>
				<h1 className='mt-[25px] text-5xl font-inter font-bold mb-[10px] leading-tight bg-black bg-gradient-to-r from-black via-red-600 bg-clip-text dark:from-white dark:via-red-600 dark:bg-white'>
					Filtered Results
				</h1>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 auto-rows-auto'>
					{isSuccess &&
						filteredMovies?.results.map((movie, id) => {
							if (!movie.poster_path) {
								return null
							}

							return (
								<div
									key={id}
									className='w-[200px] p-1 rounded-xl'
									>
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
							<PaginationPrevious
								to={`?searchFor=${searchParams.get('searchFor')}&page=${
									(Number(searchParams.get('page')) != 1
										? Number(searchParams.get('page')) - 1
										: Number(searchParams.get('page'))) || (page != 1 ? page - 1 : page)
								}`}
								onClick={() => {
									if (page !== 1) setPage(page - 1)
								}}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink to={`${pathLocation}`}>
								{page}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								onClick={() => setPage(page + 1)}
								to={`${pathLocation}page=${page + 1}`}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</section>
		</main>
	)
}

export default MovieDiscover
