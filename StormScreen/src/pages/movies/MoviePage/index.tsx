import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGetMovieQuery, useGetMovieVideoQuery } from '@/store/apiSlices/movies'

const MoviePage = () => {

	const searchParams = useParams()

	const { data: movieData, isSuccess } = useGetMovieQuery(+(searchParams.id ?? NaN))
	const { data: videoData, isSuccess: isSuccessVideo } = useGetMovieVideoQuery({type: 'movie', id: +(searchParams.id ?? NaN)})

	if (isSuccess) console.log('faradance', videoData)

	// const dispatch = useDispatch()
	useEffect(() => {
		if (searchParams.id && isSuccess) {

			// fetchVideos('movie', searchParams.id).then(res => {
			// 	dispatch(setMovieVideo(res))
			// })

			// dispatch(setMovie(data))
			
		}
	}, [])
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px]'>
			<section className='flex w-full justify-between'>
				<div className='flex-shrink-0'>
					<img
						src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
						alt=''
						className='w-[300px] rounded-xl'
					/>
				</div>
				<div className='flex-grow ml-4 border-l pl-3 pr-[150px]'>
					<h1 className='text-3xl font-inter font-bold mb-[10px] leading-tight'>
						{movieData?.title}
					</h1>
					<p className='leading-7 [&:not(:first-child)]:mt-6'>{movieData?.overview}</p>
					<Dialog>
						<DialogTrigger asChild>
							<Button className=''>Watch Trailer</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-2xl px-4'>
							<DialogHeader>
								<DialogTitle>{movieData?.title} - Trailer</DialogTitle>
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
								{!isSuccessVideo ? <p>Loading...</p> : <ReactPlayer url={`https://www.youtube.com/watch?v=${videoData?.results[0]?.key}`} playing/>}
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
				<div className='flex-shrink-0'>
					<h1>{movieData?.vote_average.toFixed(1)}</h1>
				</div>
			</section>
		</main>
	)
}

export default MoviePage
