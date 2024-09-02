import { Button } from '@/components/ui/button'
// import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	useGetMovieProvidersQuery,
	useGetMovieQuery,
	useGetMovieVideoQuery,
	useGetRecommendationsQuery,
} from '@/store/apiSlices/movies'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Item } from '@/store/home/slice'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const MoviePage = () => {
	const searchParams = useParams()

	const [page, setPage] = useState(1)

	const { data: movieData } = useGetMovieQuery(+(searchParams.id ?? NaN))
	const { data: videoData, isSuccess: isSuccessVideo } = useGetMovieVideoQuery({
		type: 'movie',
		id: +(searchParams.id ?? NaN),
	})

	const { data: providersData } = useGetMovieProvidersQuery(+(searchParams.id ?? NaN))

	const {data: recommendationsMovies, isSuccess: isSuccessRecommendations} = useGetRecommendationsQuery({query: searchParams.id ?? '', page})

	return (
		<>
			<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px] dark:border-slate-600'>
				<section className='flex w-full justify-between'>
					<div className='flex-shrink-0'>
						<img
							src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
							alt=''
							className='w-[300px] rounded-xl'
						/>
					</div>
					<div className='flex-grow ml-4 border-x px-3 dark:border-slate-600'>
						<h1 className='text-3xl font-inter font-bold mb-[10px] leading-tight border-b dark:border-slate-600 dark:text-white'>
							{movieData?.title}
						</h1>
						<p className='leading-7 [&:not(:first-child)]:mt-6 dark:text-white'>
							{movieData?.overview}
						</p>
						<Dialog>
							<DialogTrigger asChild>
								<Button className='mt-[30px]'>Watch Trailer</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-2xl px-4'>
								<DialogHeader>
									<DialogTitle className='dark:text-white'>
										{movieData?.title} - Trailer
									</DialogTitle>
									{/* <DialogDescription>
									.
								</DialogDescription> */}
								</DialogHeader>
								<div className='flex items-center space-x-2'>
									{/* <div className='grid flex-1 gap-2'>
									<Label htmlFor='link' className='sr-only'>
										Link
									</Label>
									<Input
										id='link'
										defaultValue='https://ui.shadcn.com/docs/installation'
										readOnly
									/>
								</div>
								<Button type='submit' size='sm' className='px-3'>
									<span className='sr-only'>Copy</span>
									<Copy className='h-4 w-4' />
								</Button> */}
									{!isSuccessVideo ? (
										<p>Loading...</p>
									) : (
										<ReactPlayer
											url={`https://www.youtube.com/watch?v=${videoData?.results[0]?.key}`}
											playing
										/>
									)}
								</div>
								<DialogFooter className='sm:justify-start'>
									<DialogClose asChild>
										<Button type='button' variant='secondary'>
											Close
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<div className='flex-shrink-0 flex flex-col justify-between ml-[20px]'>
						<HoverCard>
							<HoverCardTrigger asChild>
								<Button variant='link'>
									<h1 className='text-3xl font-inter font-bold mb-[10px] leading-tight'>
										Rating: {movieData?.vote_average.toFixed(1)}
									</h1>
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className='w-[300px] '>
								<div className='flex justify-between space-x-4'>
									<Avatar>
										<AvatarImage
											className='rounded-full'
											width={120}
											height={120}
											src='https://i.pinimg.com/564x/62/1c/41/621c4151647e1ace00b0c6853a0e321b.jpg'
										/>
										<AvatarFallback>IMDb</AvatarFallback>
									</Avatar>
									<div className='space-y-1'>
										<h4 className='text-sm font-semibold'>Rating (IMDb)</h4>
										<p className='text-sm'>
											We are collecting rating data from IMDb. IMDb provides a rating based on the
											number of reviews.
										</p>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>

						<Card className='w-full max-w-md mx-auto'>
							<CardHeader>
								<CardTitle className='text-2xl font-bold text-center'>Available on</CardTitle>
							</CardHeader>
							<CardContent>
								{providersData?.results?.US?.rent && providersData.results.US.rent.length > 0 ? (
									<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4'>
										{providersData.results.US.rent.map((item, index) => (
											<div key={index} className='flex items-center justify-center bg-slate-600'>
												<img
													className='w-10 h-10 object-contain rounded-full'
													src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
													alt={`${item.provider_name} logo`}
												/>
											</div>
										))}
									</div>
								) : (
									<p className='text-center text-muted-foreground'>No providers available</p>
								)}
							</CardContent>
						</Card>
					</div>
				</section>
			</main>
			<main className='mt-[50px] rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px] dark:border-slate-600'>
				<section className='flex w-full justify-between'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 auto-rows-auto'>
					{recommendationsMovies &&
						recommendationsMovies.results?.map((movie: Item) => {
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
				{/* <Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious to={'s'} onClick={() => {
								if (page !== 1) setPage(page - 1)
							}}/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink to={`?searchFor=${urlParams.get('searchFor')}&page=${urlParams.get('page') || page}`}>{urlParams.get('page') || page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext onClick={() => setPage(page + 1)}  to={`?searchFor=${urlParams.get('searchFor')}&page=${page + 1}`} />
						</PaginationItem>
					</PaginationContent>
				</Pagination> */}
				</section>
			</main>
		</>
	)
}

export default MoviePage
