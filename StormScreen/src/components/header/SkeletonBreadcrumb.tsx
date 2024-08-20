import { Skeleton } from '../ui/skeleton'

const SkeletonBreadcrumb = () => {
	return (
		<>
				<Skeleton className='h-6 w-20' />
				<Skeleton className='h-6 w-24' />
				<Skeleton className='h-6 w-32' />
		</>
	)
}

export default SkeletonBreadcrumb
