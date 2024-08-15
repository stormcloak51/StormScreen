import {
	BookmarkIcon,
	DownloadIcon,
	FilmIcon,
	Play,
	PopcornIcon,
	TvIcon,
	UserIcon,
} from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Welcome = () => {
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px]'>
			<h1 className='mt-[50px] text-center text-5xl font-inter font-bold text-gradient mb-[150px] leading-tight'>
				StormScreen - the best Film Library
			</h1>
			<section className='grid grid-cols-3 grid-rows-2 gap-y-8 gap-x-8'>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<FilmIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Vast Library</h3>
					<p className='text-muted-foreground'>
						Explore our extensive collection of films and TV series, spanning a wide range of genres
						and eras.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<TvIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Curated Recommendations</h3>
					<p className='text-muted-foreground'>
						Our team of experts curates personalized recommendations based on your viewing history
						and preferences.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<PopcornIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Seamless Streaming</h3>
					<p className='text-muted-foreground'>
						Enjoy a seamless streaming experience with high-quality video and audio, optimized for
						any device.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<BookmarkIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Personalized Watchlist</h3>
					<p className='text-muted-foreground'>
						Create your own personalized watchlist to keep track of the shows and movies you want to
						watch.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<DownloadIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Offline Viewing</h3>
					<p className='text-muted-foreground'>
						Download your favorite content to watch offline, perfect for on-the-go or areas with
						limited internet access.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<UserIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Personalized Profiles</h3>
					<p className='text-muted-foreground'>
						Create individual profiles for each family member, allowing personalized recommendations
						and watchlists.
					</p>
				</div>
			</section>
			<article>
				<h1 className='mt-[100px] text-2xl font-inter font-bold mb-[40px] leading-tight'>
					Frequently Asked Questions
				</h1>
				<Accordion className='mx-auto py-[5px] mb-[100px] text-[20px]' type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>How to start watching films?</AccordionTrigger>
						<AccordionContent className='text-[20px]'>
							Start by searching for your favorite movies.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>How do I register on your website?</AccordionTrigger>
						<AccordionContent className='text-[20px]'>
							To register on our website, go to the registration page and fill out all the required
							fields.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-3'>
						<AccordionTrigger>What devices are compatible with your service?</AccordionTrigger>
						<AccordionContent className='text-[20px]'>
							Our service is compatible with a wide range of devices, including smartphones,
							tablets, smart TVs, and computers.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</article>
			<footer className='flex justify-center items-center mb-[50px]'>
				<Button asChild className='text-xl text-white bg-black hover:bg-[#2f2f31]'>
					<Link to='/home'>
						<Play className='mr-2 h-5 w-5' />
						Start watching!
					</Link>
				</Button>
			</footer>
		</main>
	)
}
export default Welcome
