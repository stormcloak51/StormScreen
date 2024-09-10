import { FC, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

interface IAvatar {
	isAuth: boolean
	email: string
	displayName: string
}

const RenderAvatar: FC<IAvatar> = ({isAuth, email, displayName }) => {
	// const [isAuth, setIsAuth] = useState<boolean>(localStorage.getItem('isAuth') == 'true' ? true : false)

	if (isAuth && email) {
		return (
			<>
				<Avatar className='ml-[30px] mr-[10px]'>
					<AvatarImage src='https://i.pinimeg.com/564x/b4/22/22/b42222172d89ea80e21cae84094e4382.jpg' />
					<AvatarFallback className='dark:text-white'>
						{displayName != '' && displayName ? displayName[0] : email?.[0]}
					</AvatarFallback>
				</Avatar>
				<Badge className='h-[25px]'>{displayName != '' && displayName ? displayName : email}</Badge>
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
