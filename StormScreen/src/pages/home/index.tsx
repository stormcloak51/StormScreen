
import TrendingHomeAll from '@/components/TrendingHomeAll'
import TrendingHomeMovies from '@/components/TrendingHomeMovies'
import TrendingHomeTv from '@/components/TrendingHomeTv'

export const Home = () => {
	
	return (
		<main className='rounded-xl border bg-card text-card-foreground shadow px-[30px] dark:border-slate-700'>
			<section>
				<TrendingHomeAll />
				<TrendingHomeMovies />
				<TrendingHomeTv />
				
			</section>
		</main>
	)
}
