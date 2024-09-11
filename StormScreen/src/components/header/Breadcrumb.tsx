import { Slash } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb'
import SkeletonBreadcrumb from './SkeletonBreadcrumb'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const BreadcrumbNavigator = () => {

	const [pathBreadcrumb, setPathBreadcrumb] = useState<string[] | null>([])
	const isPathReady = useRef(false)

	const params = useParams()
	const location = useLocation()

	const title = useSelector((state: RootState) => state.movieSlice.item.title)

	useEffect(() => {
		isPathReady.current = false
		setPathBreadcrumb(null)
		const path = location.pathname.split('/').filter((item: string) => item !== '')
		if (params && params.id && title != '') {
			path.pop()
			try {
				
				path.push(title)
				setPathBreadcrumb(path)
				isPathReady.current = true
			} catch (error) {
				console.log(error)
			}
		} else {
			if (params.id) {
				path.pop()
				isPathReady.current = false
			} else {
				isPathReady.current = true
			}
			setPathBreadcrumb(path)
		}
	}, [location.pathname, title])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [params.id])
	
	return (
		<Breadcrumb className=''>
		<BreadcrumbList>
			{pathBreadcrumb && isPathReady.current ? (
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
	)
}

export default BreadcrumbNavigator