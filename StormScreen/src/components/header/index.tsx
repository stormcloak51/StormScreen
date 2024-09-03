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
import {
	getAuth,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth'
import { searchAll } from '@/services/api'
import { Clapperboard, DoorOpen, Film, House, Settings, Slash, SunMoon } from 'lucide-react'
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
import { Card } from '../ui/card'
import { useTheme } from '../theme-provider'
import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/store/auth/userSlice'
import { RootState } from '@/store/store'

//
export default function Header() {
	const { setTheme, theme } = useTheme()

	const isLoaded = useRef(false)
	const searchInput = useRef<HTMLInputElement>(null)

	const { isAuth } = useAuth()
	const isPathReady = useRef(false)
	const isAccReady = useRef(false)
	const [userInfo, setUserInfo] = useState({ email: '', displayName: '' })
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [pathBreadcrumb, setPathBreadcrumb] = useState<string[] | null>([])

	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {email, displayName} = useSelector((state: RootState) => state.user)

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
					isPathReady.current = true
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

	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, user => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const email = user.email,
					displayName = user.displayName,
					// token = user.refreshToken,
					id = user.uid
				dispatch(setUser({ email, displayName, id }))
				console.log(email)
				setUserInfo({ displayName: displayName ? displayName : '', email: email as string })
				isAccReady.current = true
				const uid = user.uid
				// ...
			} else {
				// User is signed out
				// ...
			}
		})
	}, [pathBreadcrumb])
	console.log(isAccReady)
	useEffect(() => {
		if (isAccReady.current && isPathReady.current) {
			isLoaded.current = true
		}
	}, [isAccReady, isPathReady])

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
				console.log('success!')
			})
			.catch(err => {
				console.log('error when logging out', err)
			})
	}
	console.log(email)
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
					{isAuth && (
						<Card className='mb-5 p-[5px] transition-all rounded-lg'>
							<DoorOpen
								onClick={() => logOut()}
								className='stroke-black dark:stroke-white scale-100 hover:scale-105 cursor-pointer'
							/>
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
					<Breadcrumb className=''>
						<BreadcrumbList>
							{pathBreadcrumb && isLoaded ? (
								pathBreadcrumb.map((item, index) => {
									if (index !== pathBreadcrumb.length - 1) {
										return (
											<Fragment key={index}>
												<BreadcrumbItem>
													<BreadcrumbLink
														className='text-2xl transition-all font-bold text-black dark:text-white dark:hover:text-slate-300'
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
												<BreadcrumbPage className='text-2xl transition-all cursor-pointer font-bold text-black dark:text-white dark:hover:text-slate-300'>
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
						<Input
							className='ml-[30px] mr-[25px]'
							placeholder='Search'
							onClick={() => setOpen(true)}
						/>
						{email! && (
							<>
								<Avatar className='ml-[30px] mr-[10px]'>
									<AvatarImage src='https://i.pinimg.com/564x/b4/22/22/b42222172d89ea80e21cae84094e4382.jpg' />
									<AvatarFallback>{displayName != '' && displayName ? displayName[0] : email?.[0]}</AvatarFallback>
								</Avatar>
								<Badge className='h-[25px]'>{displayName != '' && displayName ? displayName : email}</Badge>
							</>
						)
						// ) : !isAccReady.current ? (
						// 	<>
						// 		<div className='flex items-center ml-[30px]'>
						// 			<Skeleton className='h-10 w-10 rounded-full mr-[10px]' />
						// 			<Skeleton className='h-6 w-[90px] rounded-xl' />
						// 		</div>
						// 	</>
						// ) : !isAuth && !isAccReady.current ? null : !isAuth && (
						// 	<Button asChild>
						// 		<Link to={'/auth'}>Log In</Link>
						// 	</Button>
						// )}
					}
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
