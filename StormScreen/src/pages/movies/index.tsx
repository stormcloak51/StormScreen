import MovieList from '@/components/MovieList'

import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from '@/components/ui/carousel'

import {
	useGetNowPlayingQuery,
	useGetPopularQuery,
	useGetTopRatedQuery,
	useGetTrendingQuery,
	useGetUpcomingQuery,
} from '@/store/apiSlices/movies'
import { changeFilmDescription } from '@/utils/changeFilmDescription'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Movies = () => {
	const isSuccessMovies = useRef(false)

	const { data: trendingMovies, isSuccess: isSuccessTrending } = useGetTrendingQuery()
	const { data: nowPlayingMovies, isSuccess: isSuccessNowPlaying } = useGetNowPlayingQuery()
	const { data: popularMovies, isSuccess: isSuccessPopular } = useGetPopularQuery()
	const { data: topRatedMovies, isSuccess: isSuccessTopRated } = useGetTopRatedQuery()
	const { data: upcomingMovies, isSuccess: isSuccessUpcoming } = useGetUpcomingQuery()

	useEffect(() => {
		if (
			isSuccessNowPlaying &&
			isSuccessPopular &&
			isSuccessTopRated &&
			isSuccessUpcoming &&
			isSuccessTrending
		) {
			isSuccessMovies.current = true
		}
	}, [
		isSuccessNowPlaying,
		isSuccessPopular,
		isSuccessTopRated,
		isSuccessUpcoming,
		isSuccessTrending,
	])

	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<section>
				{isSuccessMovies && (
					<>
						<h1 className='mt-[25px] text-5xl font-inter font-bold trending-gradient mb-[10px] leading-tight'>
							Trending Movies
						</h1>
						<Carousel
							opts={{
								align: 'center',
								watchDrag: true,
							}}
							plugins={[Autoplay({ delay: 3000 })]}
							className=''>
							<CarouselContent className=''>
								{trendingMovies?.results.map(obj => {
									return (
										<CarouselItem
											className='relative transition-all duration-300 basis-1/2'
											key={obj.id}>
											<div className='bg-background border rounded-xl bg-background shadow-lg mb-[50px]  mx-auto'>
												<img
													className='rounded-xl justify-center items-center mx-auto transition-all duration-300 hover:backdrop-blur-sm w-full'
													src={`https://image.tmdb.org/t/p/w1280${obj.backdrop_path}`}
												/>
												<div className='px-[25px] pb-[25px]'>
													<div className='flex justify-between border-b py-[8px]'>
														<div className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl'>
															{obj.title || obj.name}
														</div>
														<div className='scroll-m-20 text-3xl text-red-600 font-extrabold tracking-tight lg:text-3xl'>
															Rating: {obj.vote_average.toFixed(1)}
														</div>
													</div>
													<p className='leading-7 [&:not(:first-child)]:mt-3'>
														{changeFilmDescription(obj.overview)}
													</p>
													<Button asChild className='mt-4 w-full text-lg'>
														<Link to={`/movies/${obj.id}`}>Watch</Link>
													</Button>
												</div>
											</div>
										</CarouselItem>
									)
								})}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
						<MovieList data={nowPlayingMovies} title='Now Playing' />
						<MovieList data={popularMovies} title='Popular' />
						<MovieList data={topRatedMovies} title='Top Rated' />
						<MovieList data={upcomingMovies} title='Upcoming' />
					</>
				)}
			</section>
		</main>
	)
}
