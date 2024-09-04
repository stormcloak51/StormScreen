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
import { setUser } from '@/store/auth/userSlice'
import { RootState } from '@/store/store'
import { Separator } from '@/components/ui/separator'
import { getAuth, onAuthStateChanged, updateProfile, User } from 'firebase/auth'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Copy, MailCheck } from 'lucide-react'

const Settings: React.FC = () => {
	const { toast } = useToast()
	const displayNameRef = useRef<HTMLInputElement>(null)
	const {isAuth} = useAuth()
	const { email, displayName } = useSelector((state: RootState) => state.user)

	console.log(!!email, isAuth, 'watchi this lineyy')

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
			// console.log(document.querySelector('#details-email')?.getAttribute('value'))
			await navigator.clipboard.writeText(
				document.querySelector('#details-email')?.getAttribute('value') as string,
			)
			toast({
				title: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<MailCheck style={{ marginRight: '8px' }} />
						<span>Success</span>
					</div> 
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
			<TabsContent value='account'>
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
							/>
						</div>
						<div className='space-y-1 w-auto ml-auto'>
							<Dialog>
								<DialogTrigger asChild>
									<Button>View Account Details</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader className='gap-2'>
										<DialogTitle>Account Details</DialogTitle>
										<Label htmlFor='details-email' className='pt-[10px] '>
											E-Mail
										</Label>
										<div className='flex justify-between relative'>
											<Input
												disabled
												id='details-email'
												className='w-full'
												defaultValue={email ? email : ''}
											/>
											<Card
												onClick={() => handleCopy()}
												className='absolute right-0 p-1 self-center mr-1 border-black transition-all rounded-lg'>
												<Copy className='stroke-black dark:stroke-white scale-95 transition-all hover:scale-105 cursor-pointer' />
											</Card>
										</div>

										<Separator className='w-full my-[7px]' />
										<Label htmlFor='details-favorites'>Total Favorites</Label>
										<Input
											disabled
											id='details-favorites'
											className='w-[200px]'
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
						<Button onClick={handleUpdate}>Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

export default Settings
