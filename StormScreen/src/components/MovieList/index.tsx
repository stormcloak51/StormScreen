import { MoviesProps } from '@/store/apiSlices/types'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { FC } from 'react'

type MovieListType = {
	data: MoviesProps | undefined
	title: string | undefined
}

const MovieList: FC<MovieListType> = ({ data, title }) => {
	return (
		<>
			<h1 className='mt-[25px] text-5xl font-inter font-bold trending-gradient mb-[10px] leading-tight'>
				{title}
			</h1>
			
			
			<Carousel
				opts={{
					startIndex: 0,
					align: 'start',
					slidesToScroll: 6,
					dragFree: true,
					skipSnaps: true,
				}}
				className='w-full max-w-full'>
				<CarouselContent className='mb-[50px]'>
					{data?.results.map(obj => {
						return (
							<CarouselItem key={obj.id} className='basis-1/8 w-[200px] md:basis-1/8 2xl:basis-1/8'>
								<div className='p-1'>
									<Card className='rounded-xl'>
										<CardContent className='p-0 flex flex-col items-center justify-center rounded-xl group relative'>
											<img
												className='w-full h-[278px] rounded-xl object-cover transition-all duration-300 group-hover:blur-sm'
												src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
												alt=''
												loading='eager'
											/>
											<div className='rounded-xl absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
												<h1 className='text-lg text-center font-extrabold text-white tracking-tight lg:text-xl px-4'>
													{obj.title}
												</h1>
												<p className='scroll-m-20 text-red-500 font-extrabold tracking-tight lg:text-xl'>
													{obj.vote_average.toFixed(1)}
												</p>
												<Button className='mt-6 w-[50%]' variant='secondary' asChild>
													<Link to={`/movies/${obj.id}`}>Watch</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						)
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	)
}

export default MovieList