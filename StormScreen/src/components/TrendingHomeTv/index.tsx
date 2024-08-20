import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { RootState } from '@/store/store'
import { useEffect, useRef } from 'react'
import { fetchTrending } from '@/services/api'
import { setTrendingTv } from '@/store/home/slice'
import { Link } from 'react-router-dom'

const TrendingHomeTv = () => {
	const { trendingTv } = useSelector(
		(state: RootState) => state.homeSlice,
	)

	const isLoaded = useRef(false)

	const dispatch = useDispatch()

	const fetchData = (type: string) => {
		fetchTrending(type)
			.then(res => {
				dispatch(setTrendingTv(res.results))
	})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		if (!isLoaded.current) {
			fetchData('tv')
			isLoaded.current = true
		}
	}, [])


	return (
		<>
			<h1 className='mt-[25px] text-5xl font-inter font-bold trending-gradient mb-[10px] leading-tight'>
				TV Serials
			</h1>
			<Carousel
				opts={{
					startIndex: 0,
					align: 'start',
					slidesToScroll: 6,
					dragFree: true,
				}}
				className='w-full max-w-full'>
				<CarouselContent className='mb-[50px]'>
					{trendingTv.data.map(obj => {
						return (
						<CarouselItem key={obj.id} className='basis-1/8 w-[200px]'>
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
												{obj.name}
											</h1>
											<p className='scroll-m-20 text-red-500 font-extrabold tracking-tight lg:text-xl'>
												{obj.vote_average.toFixed(1)}
											</p>
											<Button className='mt-6 w-[50%]' variant='secondary' asChild>
												<Link to={`/serials/${obj.id}`}>Watch</Link>
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					)})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	)
}

export default TrendingHomeTv
