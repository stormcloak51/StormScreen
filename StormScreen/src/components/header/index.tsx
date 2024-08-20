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
import { searchAll } from '@/services/api'
import { Clapperboard, Film, House, Settings, Slash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import SkeletonBreadcrumb from './SkeletonBreadcrumb'

//
export default function Header() {
	// const isLoaded = useRef(false)
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

							{/* <BreadcrumbItem>
													<BreadcrumbLink className='text-2xl' href='/components'>
														Films
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbPage className='text-2xl'>Star Wars</BreadcrumbPage>
												</BreadcrumbItem> */}
						</BreadcrumbList>
					</Breadcrumb>

					<div className='profile flex ml-auto items-center justify-self-end'>
						<Avatar className='ml-auto'>
							<AvatarImage src='https://i.pinimg.com/736x/62/d8/f5/62d8f5c6c60a9869bb35660f2db1bd09.jpg' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Badge className='ml-[10px] h-[25px]'>stormcloak51</Badge>
					</div>
				</section>
			</header>
		</>
	)
}
