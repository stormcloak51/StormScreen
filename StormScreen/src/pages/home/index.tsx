import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { fetchTrending } from '@/services/api'
import { setTrending } from '@/store/home/slice'
import { RootState } from '@/store/store'

export const Home = () => {
	// const [image, setImg] = React.useState<string>('')
	const isLoaded = React.useRef(false)

	const trendingData = useSelector((state: RootState) => state.homeSlice.trending)
	const dispatch = useDispatch()
	// const options = {
	// 	method: 'GET',
	// 	url: 'https://api.themoviedb.org/3/movie/popular',
	// 	params: {language: 'en-US', page: '1'},
	// 	headers: {
	// 		accept: 'application/json',
	// 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI3MmYzZWUxODkwZTRiMDAwZGY0MDJkYmVmYjBlMCIsIm5iZiI6MTcyMzcwMDE3Mi41MDcxOTMsInN1YiI6IjY2YmQ5MjQyYTAwNmM3ZDY0YTg5MWQzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOEMVUmfYRllIoZL6WiBFCq9XghlIZQhwNb6Q3Mo24U'
	// 	}
	// };

	// const response = axios
	// 	.request(options)
	// 	.then(function (response) {
	// 		console.log(response.data.results[0].id);
	// 	})
	// 	.catch(function (error) {
	// 		console.error(error);
	// 	});

	// console.log();
	// const options = {
	// 	method: 'GET',
	// 	url: 'https://api.themoviedb.org/3/movie/123',
	// 	params: {language: 'en-US'},
	// 	headers: {
	// 		accept: 'application/json',
	// 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI3MmYzZWUxODkwZTRiMDAwZGY0MDJkYmVmYjBlMCIsIm5iZiI6MTcyMzcwMDE3Mi41MDcxOTMsInN1YiI6IjY2YmQ5MjQyYTAwNmM3ZDY0YTg5MWQzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOEMVUmfYRllIoZL6WiBFCq9XghlIZQhwNb6Q3Mo24U'
	// 	}
	// };

	// axios
	// 	.request(options)
	// 	.then(function (response) {
	// 		console.log(response.data.poster_path);
	// 	})
	// 	.catch(function (error) {
	// 		console.error(error);
	// 	});
	// axios
	// 	.request(options)
	// 	.then(function (response) {
	// 		console.log(response.data);
	// 	})
	// 	.catch(function (error) {
	// 		console.error(error);
	// 	});

	React.useEffect(() => {
		fetchTrending().then(res => {
			dispatch(setTrending(res.results))
			console.log(1)
		})
		isLoaded.current = true
	}, [])
	console.log(isLoaded.current, trendingData)

	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<section>
				<h1 className='mt-[25px] text-5xl font-inter font-bold text-gradient mb-[10px] leading-tight'>
					Trending
				</h1>
				<Carousel>
					<CarouselContent className=''>
						{isLoaded.current && trendingData ? (
							trendingData.map(obj => {
								return (
									<CarouselItem className='relative transition-all duration-300' key={obj.id}>
										<img
											className='rounded-xl justify-center items-center mx-auto transition-all duration-300 hover:backdrop-blur-sm'
											src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`}
										/>
										<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-1 group-hover:opacity-1 transition-opacity duration-300'>
						
											<div>{obj.title}</div>
										
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
			</section>
		</main>
	)
}
