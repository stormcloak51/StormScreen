import { changeFilmDescription } from '@/utils/changeFilmDescription'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { setTrending } from '@/store/home/slice'
import Autoplay from 'embla-carousel-autoplay'
import { fetchTrending } from '@/services/api'
import { RootState } from '@/store/store'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function TrendingHomeAll() {
	const isLoaded = useRef(false)
	const dispatch = useDispatch()

	const { trending } = useSelector(
		(state: RootState) => state.homeSlice,
	)


	const fetchData = (type: string) => {
		fetchTrending(type)
			.then(res => {
				dispatch(setTrending(res.results))
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		if (!isLoaded.current) {
			fetchData('all')
			isLoaded.current = true
		}
	}, [])

	return (
		<>
			<h1 className='mt-[25px] text-5xl font-inter font-bold trending-gradient mb-[10px] leading-tight'>
				Trending
			</h1>

			<Carousel
				opts={{
					align: 'center',
					watchDrag: true,
				}}
				plugins={[Autoplay({ delay: 3000 })]}
				className=''>
				<CarouselContent className=''>
					{isLoaded.current && trending ? (
						trending.data.map(obj => {
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
											<Button asChild className='mt-4 w-full text-lg'><Link to={`/movies/${obj.id}`}>Watch</Link></Button>
										</div>
									</div>
								</CarouselItem>
							)
						})
					) : (
						<>
							<CarouselItem>... </CarouselItem>
							<CarouselItem>... </CarouselItem>
							<CarouselItem>... </CarouselItem>
						</>
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	)
}
