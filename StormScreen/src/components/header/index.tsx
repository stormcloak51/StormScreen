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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { searchAll } from '@/services/api'
import { Clapperboard, DoorOpen, Film, House, Search, Settings, Slash, SunMoon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { Card } from '../ui/card'
import { useTheme } from '../theme-provider'
import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/store/auth/userSlice'
import { RootState } from '@/store/store'
import RenderAvatar from './RenderAvatar'

import { useMediaQuery } from 'react-responsive'
import BreadcrumbNavigator from './Breadcrumb'

export default function Header() {
	const { setTheme, theme } = useTheme()

	const isLoaded = useRef(false)
	const searchInput = useRef<HTMLInputElement>(null)

	const { isAuth } = useAuth()
	const isPathReady = useRef(false)
	const isAccReady = useRef(false)

	const [isUserAuth, setIsUserAuth] = useState<boolean>(
		localStorage.getItem('isAuth') == 'true' ? true : false,
	)
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	console.log(params.id, 'Watch th')
	const isLaptop: boolean = useMediaQuery({ query: '(max-width: 1069px)' })
	const isTablet: boolean = useMediaQuery({ query: '(max-width: 930px)' })

	const { email, displayName } = useSelector((state: RootState) => state.user)

	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, user => {
			if (user) {
				const email = user.email,
					displayName = user.displayName,
					// token = user.refreshToken,
					id = user.uid
				dispatch(setUser({ email, displayName, id }))
				isAccReady.current = true
				localStorage.setItem('isAuth', 'true')
				setIsUserAuth(true)
			}
		})
	}, [isAuth])

	useEffect(() => {
		if (isAccReady.current && isPathReady.current) {
			isLoaded.current = true
		}
	}, [isAccReady, isPathReady])

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'isAuth') {
				setIsUserAuth(event.newValue === 'true')
			}
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const handleSearch = () => {
		setSearchValue(searchInput.current?.value || '')
	}

	const searchMovies = () => {
		setOpen(false)
		navigate(`/movies/search/?searchFor=${searchValue}`)
	}

	const logOut = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				localStorage.setItem('isAuth', 'false')
				setIsUserAuth(false)
				console.log('success!')
			})
			.catch(err => {
				console.log('error when logging out', err)
			})
	}
	console.log(isUserAuth, 'isUserAuth')
	return (
		<>
			<nav className='flex flex-col h-[100vh] bg-white w-[60px] border-r fixed mt-0 items-center justify-between top-0 left-0 mr-[100px] dark:bg-black dark:border-slate-800'>
				<div>
					<Card className='mt-5 p-[5px] transition-all rounded-lg'>
						<Link to='/home'>
							<House className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
					<Card className='mt-3 p-[5px] transition-all rounded-lg'>
						<Link to={'/movies'}>
							<Film className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
					<Card className='mt-3 p-[5px] transition-all rounded-lg' id='clapper'>
						<Link to={'/serials'}>
							<Clapperboard className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
				</div>

				<div>
					{isUserAuth && (
						<Card
							onClick={() => {
								logOut()
							}}
							className='mb-5 p-[5px] transition-all rounded-lg'>
							<Link to={'/home'}>
								<DoorOpen className='stroke-black dark:stroke-white scale-100 hover:scale-105 cursor-pointer' />
							</Link>
						</Card>
					)}
					<Card
						className='mb-5 p-[5px] transition-all rounded-lg'
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
						<SunMoon className='stroke-black dark:stroke-white scale-100 hover:scale-105 cursor-pointer' />
					</Card>
					<Card className='mb-5 p-[5px] transition-all rounded-lg'>
						<Link to={'/settings'}>
							<Settings className='stroke-black dark:stroke-white scale-100 hover:scale-105' />
						</Link>
					</Card>
				</div>
			</nav>
			<header className='inline w-[90%] mr-[50px]'>
				<section className='self-start flex items-center pl-[100px] pr-[24px] justify-between w-[100%] py-[15px] dark:bg-black'>
					{!isTablet ? (
						<BreadcrumbNavigator />
						// <Breadcrumb className=''>
						// 	<BreadcrumbList>
						// 		{pathBreadcrumb && isLoaded ? (
						// 			pathBreadcrumb.map((item, index) => {
						// 				if (index !== pathBreadcrumb.length - 1) {
						// 					return (
						// 						<Fragment key={index}>
						// 							<BreadcrumbItem>
						// 								<BreadcrumbLink
						// 									className='text-2xl transition-all font-bold text-black dark:text-white dark:hover:text-slate-300'
						// 									href={`/${item}`}>
						// 									{item}
						// 								</BreadcrumbLink>
						// 							</BreadcrumbItem>
						// 							<BreadcrumbSeparator className='translate-y-[2px] scale-[1.5]'>
						// 								<Slash />
						// 							</BreadcrumbSeparator>
						// 						</Fragment>
						// 					)
						// 				}
						// 				return (
						// 					<Fragment key={index}>
						// 						<BreadcrumbItem>
						// 							<BreadcrumbPage className='text-2xl transition-all cursor-pointer font-bold text-black dark:text-white dark:hover:text-slate-300'>
						// 								{item}
						// 							</BreadcrumbPage>
						// 						</BreadcrumbItem>
						// 						<BreadcrumbSeparator className='translate-y-[2px] scale-[1.5]'>
						// 							<Slash />
						// 						</BreadcrumbSeparator>
						// 					</Fragment>
						// 				)
						// 			})
						// 		) : (
						// 			<SkeletonBreadcrumb />
						// 		)}
						// 	</BreadcrumbList>
						// </Breadcrumb>
					) : (
						isTablet && params.id ? (<Button onClick={() => navigate(-1)}>Go Back</Button>) : !isTablet && (
							null
						)
					)}
					<div className='profile flex ml-auto items-center justify-self-end'>
						<Filters isMobile={isLaptop} />
						{!isLaptop ? (
							<Input
								className='ml-[30px] mr-[25px]'
								placeholder='Search'
								onClick={() => setOpen(true)}
							/>
						) : (
							<Button size='sm' className='ml-5' onClick={() => setOpen(true)}>
								<Search />
							</Button>
						)}
						<RenderAvatar isAuth={isUserAuth} displayName={displayName!} email={email!} />
					</div>
					<CommandDialog open={open} onOpenChange={setOpen}>
						<CommandInput
							ref={searchInput}
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
