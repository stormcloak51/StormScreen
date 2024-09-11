import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import useAuth from '@/hooks/use-auth'

import { RootState } from '@/store/store'
import { Separator } from '@/components/ui/separator'
import { getAuth, updateProfile,  } from 'firebase/auth'
import { ReactElement, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Copy, MailCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Settings: React.FC = () => {
	const navigate = useNavigate()
	const { toast } = useToast()
	const displayNameRef = useRef<HTMLInputElement>(null)
	const { isAuth } = useAuth()
	const { email, displayName } = useSelector((state: RootState) => state.user)

	const handleUpdate = async () => {
		const auth = getAuth()
		const user = auth.currentUser
		if (displayNameRef.current?.value) {
			await updateProfile(user!, {
				displayName: displayNameRef.current.value,
			})
			toast({
				title: 'Success',
				description: 'Your display name has been updated.',
			})
		}
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(
				document.querySelector('#details-email')?.getAttribute('value') as string,
			)

			toast({
				title: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<MailCheck style={{ marginRight: '8px' }} />
						<span>Success</span>
					</div> as ReactElement & string
				),
				description: 'Email copied to clipboard.',
			})
		} catch (err) {
			toast({
				title: 'Error',
				description: 'Failed to copy email to clipboard.',
			})
			console.log(err)
		}
	}

	return (
		<Tabs defaultValue='account'>
			<TabsList className='grid w-[400px] grid-cols-1'>
				<TabsTrigger value='account'>Account</TabsTrigger>
			</TabsList>
			{!isAuth && (
				<TabsContent
					value='account'
					className='w-full flex justify-center items-center absolute z-10'>
					<div className='mt-[50px] flex flex-col justify-center items-center pr-[150px]'>
						<h1 className='text-3xl font-bold !blur-0 z-1 dark:text-slate-200'>You haven't logged in 🧐</h1>
						<div className='flex gap-5'>
							<Button className='mt-4' onClick={() => navigate(-1)}>
								Go Back
							</Button>
							<Button className='mt-4' asChild>
								<Link to='/auth'>Login</Link>
							</Button>
						</div>
					</div>
				</TabsContent>
			)}
			<TabsContent value='account' className={isAuth ? '' : 'blur'}>
				<Card>
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when you're done.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2 w-full grid grid-cols-2 grid-rows-2'>
						<div className='space-y-1 w-auto'>
							<Label htmlFor='name'>Change Display Name</Label>
							<Input
								ref={displayNameRef}
								id='name'
								className='w-[200px]'
								defaultValue={displayName ? displayName : ''}
								disabled={isAuth ? false : true}
							/>
						</div>
						<div className='space-y-1 w-auto ml-auto'>
							<Dialog>
								<DialogTrigger asChild disabled={isAuth ? false : true}>
									<Button>View Account Details</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader className='gap-2'>
										
										<DialogTitle className='dark:text-slate-50'>Account Details</DialogTitle>
										<Label htmlFor='details-email' className='pt-[10px] dark:text-slate-50'>
											E-Mail
										</Label>
										<div className='flex justify-between relative'>
											<Input
												disabled
												id='details-email'
												className='w-full dark:text-slate-50'
												defaultValue={email ? email : ''}
											/>
											<Card
												onClick={() => handleCopy()}
												className='absolute right-0 p-1 self-center mr-1 border-black transition-all rounded-lg'>
												<Copy className='stroke-black dark:stroke-white scale-95 transition-all hover:scale-105 cursor-pointer' />
											</Card>
										</div>

										<Separator className='w-full my-[7px]' />
										<Label className='dark:text-slate-50' htmlFor='details-favorites'>
											Total Favorites
										</Label>
										<Input
											disabled
											id='details-favorites'
											className='w-[200px] dark:text-slate-50'
											defaultValue={15}
										/>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</div>
						<div className='space-y-1 w-auto'>
							<Label htmlFor='rank'>Rank</Label>
							<Input disabled id='rank' className='w-[200px]' defaultValue='@user' />
						</div>
					</CardContent>
					<CardFooter>
						<Button disabled={isAuth ? false : true} onClick={handleUpdate}>
							Save changes
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

export default Settings
