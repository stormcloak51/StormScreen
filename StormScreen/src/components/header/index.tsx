// shadcn

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Input } from '@/components/ui/input'

import { searchAll } from '@/services/api'
import { Clapperboard, Film, House, Settings, Slash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import SkeletonBreadcrumb from './SkeletonBreadcrumb'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import Filters from '../filters'

//
export default function Header() {
	// const isLoaded = useRef(false)
	const [open, setOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchValue, setSearchValue] = useState('')
	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [pathBreadcrumb, setPathBreadcrumb] = useState<string[] | null>([])
	useEffect(() => {
		setPathBreadcrumb(null)
		const path = location.pathname.split('/').filter((item: string) => item !== '')
		if (params && params.id) {
			path.pop()
			searchAll('movie', params.id)
				.then(res => {
					const name = res.title
					path.push(name)
					setPathBreadcrumb(path)
					// isLoaded.current = true
				})
				.catch(err => {
					console.log(err)
					if (window.confirm('Movie not found')) {
						navigate('/home')
					}
				})
		} else {
			setPathBreadcrumb(path)
		}
	}, [location.pathname])

	const handleSearch = () => {
		setSearchValue(inputRef.current?.value || '')
	}

	const searchMovies = () => {
		setOpen(false)
		navigate(`/movies/search/?searchFor=${searchValue}`)
	}


	return (
		<>
			<nav className='flex flex-col h-[100vh] bg-white w-[4vw] border-r fixed mt-0 items-center justify-between top-0 left-0 mr-[100px]'>
				<div>
					<div className='mt-5 p-[5px] border-[2px] transition-all rounded-lg'>
						<Link to='/home'>
							<House color='#000000' className='transition-all scale-100 hover:scale-105' />
						</Link>
					</div>
					<div className='mt-3 p-[5px] border-[2px] rounded-lg'>
						<Link to={'/movies'}>
							<Film color='#000000' className='transition-all scale-100 hover:scale-105' />
						</Link>
					</div>
					<div className='mt-3 p-[5px] border-[2px] rounded-lg' id='clapper'>
						<Link to={'/serials'}>
							<Clapperboard color='#000000' className='transition-all scale-100 hover:scale-105' />
						</Link>
					</div>
				</div>

				<div>
					<div className='mb-5 p-[5px] border-[2px] rounded-lg'>
						<Settings color='#000000' />
					</div>
				</div>
			</nav>
			<header className='inline w-[97vw] mr-[50px]'>
				<section className='self-start flex items-center pl-[100px] pr-[24px] justify-between w-[100%] py-[15px]'>
					<Breadcrumb className=''>
						<BreadcrumbList>
							{pathBreadcrumb ? (
								pathBreadcrumb.map((item, index) => {
									if (index !== pathBreadcrumb.length - 1) {
										return (
											<Fragment key={index}>
												<BreadcrumbItem>
													<BreadcrumbLink
														className='text-2xl font-bold text-black'
														href={`/${item}`}>
														{item}
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator className='translate-y-[2px] scale-[1.5]'>
													<Slash />
												</BreadcrumbSeparator>
											</Fragment>
										)
									}
									return (
										<Fragment key={index}>
											<BreadcrumbItem>
												<BreadcrumbPage className='text-2xl font-bold text-black'>
													{item}
												</BreadcrumbPage>
											</BreadcrumbItem>
											<BreadcrumbSeparator className='translate-y-[2px] scale-[1.5]'>
												<Slash />
											</BreadcrumbSeparator>
										</Fragment>
									)
								})
							) : (
								<SkeletonBreadcrumb />
							)}
						</BreadcrumbList>
					</Breadcrumb>

					<div className='profile flex ml-auto items-center justify-self-end'>
						<Filters />
						<Input className='ml-[30px]' placeholder='Search' onClick={() => setOpen(true)} />
						<Avatar className='ml-[30px] mr-[10px]'>
							<AvatarImage src='https://i.pinimg.com/564x/b4/22/22/b42222172d89ea80e21cae84094e4382.jpg' />
							<AvatarFallback>G</AvatarFallback>
						</Avatar>
						<Badge className='h-[25px]'>stormcloak51</Badge>
					</div>
					<CommandDialog open={open} onOpenChange={setOpen}>
						<CommandInput
							ref={inputRef}
							placeholder='Type a command or search...'
							onValueChange={handleSearch}
							value={searchValue}
						/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading='Suggestions'>
								<CommandItem onSelect={searchMovies}>
									Search for {searchValue} in movies
								</CommandItem>
								<CommandItem onClick={() => {}}>Search for {searchValue} in serials</CommandItem>
								<CommandItem onClick={() => {}}>Search for {searchValue}</CommandItem>
							</CommandGroup>
						</CommandList>
					</CommandDialog>
				</section>
			</header>
		</>
	)
}
