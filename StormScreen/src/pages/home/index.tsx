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
			dispatch(setTrending((res.results)));
			console.log(1)
		});
		isLoaded.current = true
	}, [])
	console.log(isLoaded.current, trendingData)


	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<section>
				<h1>Trending</h1>
				<Carousel>
					<CarouselContent>
						{
							isLoaded.current && trendingData ? (
								trendingData.map(obj => {
									return (
										<CarouselItem className='w-full relative aspect-[16/9] overflow-hidden' key={obj.id}>
											<img className='rounded w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original${obj.poster_path}`} />
										</CarouselItem>
									)
								})
							)
								: (
									<>
										<CarouselItem>... </CarouselItem>
										<CarouselItem>... </CarouselItem>
										<CarouselItem>... </CarouselItem>
									</>
									
								)
						}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>
		</main>
	)
}
