import { Button } from '@/components/ui/button'
import { fetchVideos, searchAll } from '@/services/api'
import { selectorMovie, selectorMovieVideo } from '@/store/movies/selectors'
import { setMovie, setMovieVideo } from '@/store/movies/slice'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from 'lucide-react'

const MoviePage = () => {
	const isOpened = useRef(false)
	const movieItem = useSelector(selectorMovie)
	const movieVideo = useSelector(selectorMovieVideo)
	console.log(movieVideo)
	const searchParams = useParams()
	const dispatch = useDispatch()
	useEffect(() => {
		if (searchParams.id) {
			fetchVideos('movie', searchParams.id).then(res => {
				dispatch(setMovieVideo(res))
			})
			searchAll('movie', searchParams.id).then(res => {
				dispatch(setMovie(res))
			})
		}
	}, [])
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px]'>
			<section className='flex w-full justify-between'>
				<div className='flex-shrink-0'>
					<img
						src={`https://image.tmdb.org/t/p/original${movieItem.poster_path}`}
						alt=''
						className='w-[300px] rounded-xl'
					/>
				</div>
				<div className='flex-grow ml-4 border-l pl-3 pr-[150px]'>
					<h1 className='text-3xl font-inter font-bold mb-[10px] leading-tight'>
						{movieItem.title}
					</h1>
					<p className='leading-7 [&:not(:first-child)]:mt-6'>{movieItem.overview}</p>
					<Dialog>
						<DialogTrigger asChild>
							<Button className=''>Watch Trailer</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-2xl px-4'>
							<DialogHeader>
								<DialogTitle>{movieItem.title} - Trailer</DialogTitle>
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
								<ReactPlayer url={`https://www.youtube.com/watch?v=${movieVideo?.results[0]?.key}`} controls={true}/>
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
					<h1>{movieItem.vote_average.toFixed(1)}</h1>
				</div>
			</section>
		</main>
	)
}

export default MoviePage
