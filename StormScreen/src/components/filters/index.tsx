import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet'
import {
	Card,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { FC, useEffect, useState } from 'react'
// import { useGetFilteredMoviesQuery } from '@/store/apiSlices/movies'
import { useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { useGetGenresQuery } from '@/store/apiSlices/movies'
import { Separator } from '../ui/separator'

export interface FiltersOptions {
	sort_by: string
	include_adult: boolean
	include_video: boolean
	year: number
	with_genres: string
}

const Filters: FC = () => {
	const navigate = useNavigate()
	const [openSheet, setOpenSheet] = useState(false)
	const [genre, setGenre] = useState('')

	const [filterValue, setFilterValue] = useState<FiltersOptions>({
		sort_by: 'popularity.desc',
		include_adult: false,
		include_video: false,
		year: NaN,
		with_genres: '',
	})

	const {data: genresData, isSuccess} = useGetGenresQuery()

	// const {data: applyFilters} = useGetFilteredMoviesQuery(filterValue)

	const handleChangeSort = (value: string) => {
		setFilterValue({ ...filterValue, sort_by: value })
	}

	const handleChangeGenre = (value: string) => {
		setGenre(value)
		setFilterValue({ ...filterValue, with_genres: value })
	}

	useEffect(() => {
		if (openSheet) {
			document.addEventListener('click', (e: MouseEvent) => {
				if (e.target && (e.target as HTMLElement).getAttribute('data-aria-hidden')) {
					setOpenSheet(false)
				}
			})
		}
	})

	return (
		<Sheet open={openSheet}>
			<SheetTrigger asChild>
				<Button onClick={() => setOpenSheet(true)}>Filter Options</Button>
			</SheetTrigger>
			<SheetContent className='w-[400px] sm:w-[540px]'>
				<SheetHeader className='border-b'>
					<SheetTitle className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
						Filter Options
					</SheetTitle>
					<SheetDescription className='text-muted-foreground pb-[10px]'>
						Filters will help you find the right content. Here is no combination of search and
						filter options (API)
					</SheetDescription>
				</SheetHeader>
				<SheetFooter className='block mt-[10px]'>
					<SheetTitle className='text-left mb-1 text-xl'>Sort by</SheetTitle>
					<Select value={filterValue.sort_by} onValueChange={handleChangeSort}>
						<SelectTrigger className='w-full !ml-0 text-lg font-medium'>
							<SelectValue placeholder='Select an option' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup >
								<SelectLabel>Sort Values</SelectLabel>
								<SelectItem value='popularity.desc'>Popularity (DESC)</SelectItem>
								<SelectItem value='popularity.asc'>Popularity (ASC)</SelectItem>
								<SelectItem value='title.desc'>Title (DESC)</SelectItem>
								<SelectItem value='title.asc'>Title (ASC)</SelectItem>
								<SelectItem value='vote_avarage.desc'>Vote Average (DESC)</SelectItem>
								<SelectItem value='vote_avarage.asc'>Vote Average (ASC)</SelectItem>
								<SelectItem value='vote_count.desc'>Vote Count (DESC)</SelectItem>
								<SelectItem value='vote_count.asc'>Vote Count (ASC)</SelectItem>
								<SelectItem value='primary_release_date.desc'>Release Date (DESC)</SelectItem>
								<SelectItem value='primary_release_date.asc'>Release Date (DESC)</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Separator className='!ml-0 mt-[20px]' />
					<SheetTitle className='text-left mb-1 text-xl mt-[10px]'>Another filters</SheetTitle>
					<Select value={genre} onValueChange={handleChangeGenre}>
						<SelectTrigger className='mt-[20px] w-full !ml-0 text-lg font-medium'>
							<SelectValue placeholder='Select a genre' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup >
								<SelectLabel>Genres</SelectLabel>
								{isSuccess && genresData?.genres.map((item) => (
									<SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Card className='!ml-0 mt-[20px] p-4'>
						<div className='flex items-center justify-between'>
							<Label htmlFor='include-adult' className='text-lg'>
								Include Adult
							</Label>
							<Switch id='include-adult' onCheckedChange={e => setFilterValue({ ...filterValue, include_adult: e })}/>
						</div>
					</Card>
					<Card className='!ml-0 mt-[20px] p-4'>
						<div className='flex items-center justify-between'>
							<Label htmlFor='include-video' className='text-lg'>
								Include Video
							</Label>
							<Switch id='include-video' onCheckedChange={e => setFilterValue({ ...filterValue, include_video: e })}/>
						</div>
					</Card>
					<Button
						onClick={() => {
							setOpenSheet(false)
							navigate(
								`/movies/discover?${filterValue.sort_by && `sort_by=${filterValue.sort_by}&`}${filterValue.with_genres != '' ? `genre=${filterValue.with_genres}&` : ''}${
									filterValue.include_adult ? 'include_adult=true&' : ''
								}${filterValue.include_video ? 'include_video=true&' : ''}`,
							)
						}}
						className='w-full mt-[50px] !ml-0'>
						Apply Filters
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default Filters
