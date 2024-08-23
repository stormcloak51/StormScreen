import { Button } from '@/components/ui/button'
import { fetchVideos, searchAll } from '@/services/api'
import { selectorMovie, selectorMovieVideo } from '@/store/movies/selectors'
import { setMovie, setMovieVideo } from '@/store/movies/slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useToast } from '@/components/ui/use-toast'
import { Star } from 'lucide-react'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Copy } from 'lucide-react'

const MoviePage = () => {
	const { toast } = useToast()
	const movieItem = useSelector(selectorMovie)
	const movieVideo = useSelector(selectorMovieVideo)
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
					{movieVideo?.results[0] ? (
						<Dialog>
							<DialogTrigger asChild>
								<Button className='mt-[30px]'>Watch Trailer</Button>
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
									<ReactPlayer
										url={`https://www.youtube.com/watch?v=${movieVideo?.results[0]?.key}`}
										controls={true}
									/>
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
					) : (
						<Button
							className='mt-[30px]'
							onClick={() => {
								toast({
									title: 'Trailer Not Available',
									description:
										'It seems, there are no available data about the trailer for this movie',
								})
							}}>
							No Trailer Available
						</Button>
					)}
				</div>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button
							variant='link'
							className='flex items-center justify-center p-10 text-sm font-medium'>
							<Star width='25' height='25' className='flex-shrink-0' stroke='black' />
							<h1 className='ml-2 text-3xl font-inter font-bold text-black'>
								Rating: {movieItem.vote_average.toFixed(1)}
							</h1>
						</Button>
					</HoverCardTrigger>
					<HoverCardContent>
						<div className='flex justify-between space-x-4 max-w-[500px]'>
							<Avatar>
								<AvatarImage src='https://i.pinimg.com/564x/b1/0e/a3/b10ea3464a45138ffbd8077069846044.jpg' />
								<AvatarFallback>IMDb</AvatarFallback>
							</Avatar>
							<div className='space-y-1'>
								<h4 className='text-sm font-semibold'>Rating (IMDb)</h4>
								<p className='text-sm'>IMDb collects ratings data from its vast user base.</p>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</section>
		</main>
	)
}

export default MoviePage
