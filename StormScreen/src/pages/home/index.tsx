import { BookmarkIcon, DownloadIcon, FilmIcon, PopcornIcon, TvIcon, UserIcon } from 'lucide-react'

const Home = () => {
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow'>
			<h1 className='mt-[50px] text-center text-5xl font-inter font-bold text-gradient'>
				StormScreen - the best Film Library
			</h1>
			<section className='mt-[150px] grid grid-cols-3 grid-rows-2 mx-10 gap-y-8 gap-x-8'>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<FilmIcon className='w-8 h-8 text-primary' color='red' />
					<h3 className='text-xl font-bold'>Vast Library</h3>
					<p className='text-muted-foreground'>
						Explore our extensive collection of films and TV series, spanning a wide range of genres
						and eras.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<TvIcon className='w-8 h-8 text-primary' color='red'/>
					<h3 className='text-xl font-bold'>Curated Recommendations</h3>
					<p className='text-muted-foreground'>
						Our team of experts curates personalized recommendations based on your viewing history
						and preferences.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<PopcornIcon className='w-8 h-8 text-primary' color='red'/>
					<h3 className='text-xl font-bold'>Seamless Streaming</h3>
					<p className='text-muted-foreground'>
						Enjoy a seamless streaming experience with high-quality video and audio, optimized for
						any device.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<BookmarkIcon className='w-8 h-8 text-primary' color='red'/>
					<h3 className='text-xl font-bold'>Personalized Watchlist</h3>
					<p className='text-muted-foreground'>
						Create your own personalized watchlist to keep track of the shows and movies you want to
						watch.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<DownloadIcon className='w-8 h-8 text-primary' color='red'/>
					<h3 className='text-xl font-bold'>Offline Viewing</h3>
					<p className='text-muted-foreground'>
						Download your favorite content to watch offline, perfect for on-the-go or areas with
						limited internet access.
					</p>
				</div>
				<div className='flex flex-col items-start gap-4 p-6 rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
					<UserIcon className='w-8 h-8 text-primary' color='red'/>
					<h3 className='text-xl font-bold'>Personalized Profiles</h3>
					<p className='text-muted-foreground'>
						Create individual profiles for each family member, allowing personalized recommendations
						and watchlists.
					</p>
				</div>
			</section>
		</main>
	)
}
export default Home
