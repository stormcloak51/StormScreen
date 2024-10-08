import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import useAuth from '@/hooks/use-auth'
import { changeDisplayName } from '@/utils/changeDisplayName'

interface IAvatar {
	isAuth: boolean
	email: string
	displayName: string
}

const RenderAvatar: FC<IAvatar> = ({isAuth, email, displayName }) => {
	// const [isAuth, setIsAuth] = useState<boolean>(localStorage.getItem('isAuth') == 'true' ? true : false)

	const {photoURL, username} = useAuth()

	console.log(photoURL)
	if (isAuth && email) {
		return (
			<>
				<Avatar className='ml-[30px] mr-[10px]'>
					<AvatarImage src={photoURL ? photoURL : undefined} />
					<AvatarFallback className='dark:text-white'>
						{username?.substring(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<Badge className='h-[25px] whitespace-nowrap'>{displayName != '' && displayName ? changeDisplayName(displayName) : email}</Badge>
			</>
		)
	} else if (isAuth) {
		return (
			<>
				<div className='flex items-center ml-[30px]'>
					<Skeleton className='h-10 w-10 rounded-full mr-[10px]' />
					<Skeleton className='h-6 w-[90px] rounded-xl' />
				</div>
			</>
		)
	} else if (!isAuth) {
		return (
			<Button asChild>
				<Link to={'/auth'}>Log In</Link>
			</Button>
		)
	}
}

export default RenderAvatar
