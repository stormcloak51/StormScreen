// shadcn

import { Input } from '@/components/ui/input'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import Filters from '../filters'
import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, setUser } from '@/store/auth/userSlice'
import { RootState } from '@/store/store'
import RenderAvatar from './RenderAvatar'

import { useMediaQuery } from 'react-responsive'
import BreadcrumbNavigator from './Breadcrumb'
import Navigation from './Navigation'
import { Search } from 'lucide-react'

export default function Header() {
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
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isLaptop: boolean = useMediaQuery({ query: '(max-width: 1069px)' })
	const isTablet: boolean = useMediaQuery({ query: '(max-width: 930px)' })
	const isPhoneTable: boolean = useMediaQuery({ query: '(max-width: 823px)' })

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
				dispatch(deleteUser())
			})
			.catch(err => {
				console.log('error when logging out', err)
			})
	}
	return (
		<>
			{!isPhoneTable && <Navigation isUserAuth={isUserAuth} logOut={() => logOut()} />}
			<header className='inline w-[90%] mr-[50px]'>
				<section className='self-start flex items-center pl-[100px] pr-[24px] justify-between w-[100%] py-[15px] dark:bg-black max-phoneTable:pl-[24px]'>
					<div className='flex justify-between gap-x-5'>
					{isPhoneTable && <Navigation isUserAuth={isUserAuth} logOut={() => logOut()} />}
					{!isTablet ? (
						<BreadcrumbNavigator />
					) : isTablet && params.id ? (
						<Button onClick={() => navigate(-1)}>Go Back</Button>
					) : (
						isTablet && <BreadcrumbNavigator />
					)}
					</div>
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
