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
import { FC, useEffect, useState } from 'react'
// import { useGetFilteredMoviesQuery } from '@/store/apiSlices/movies'
import { useNavigate } from 'react-router-dom'

export interface FiltersOptions {
	sort_by: string
	include_adult: boolean
	include_video: boolean
	year: number
	with_genres: string
}

type FiltersProps = {
	setOpen: (value: boolean) => void
	open: boolean
}

const Filters: FC = () => {
	const navigate = useNavigate()
	const [openSheet, setOpenSheet] = useState(false)

	const [filterValue, setFilterValue] = useState<FiltersOptions>({
		sort_by: 'popularity.desc',
		include_adult: false,
		include_video: false,
		year: NaN,
		with_genres: '',
	})

	// const {data: applyFilters} = useGetFilteredMoviesQuery(filterValue)

	const handleChange = (value: string) => {
		setFilterValue({ ...filterValue, sort_by: value })
	}

	useEffect(() => {
		if (openSheet) {
			document.addEventListener('click', (e) => {
				if (e.target?.getAttribute('data-aria-hidden')) {
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
					<SheetDescription className='text-muted-foreground mb-[10px]'>
						Filters will help you find the right content. Here is no combination of search and
						filter options (API)
					</SheetDescription>
				</SheetHeader>
				<SheetFooter className='block'>
					<SheetTitle className='text-left mb-1'>Sort by</SheetTitle>
					<Select value={filterValue.sort_by} onValueChange={handleChange}>
						<SelectTrigger className='w-[180px] !ml-0'>
							<SelectValue placeholder='Select an option' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
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
					<Button
						onClick={() => {
							setOpenSheet(false)
							navigate(
								`/movies/discover?${filterValue.sort_by && `sort_by=${filterValue.sort_by}&`}${
									filterValue.include_adult ? 'include_adult=true' : ''
								}`,
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
