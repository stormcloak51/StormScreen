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
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import useAuth from '@/hooks/use-auth'
import { setUser } from '@/store/auth/userSlice'
import { RootState } from '@/store/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useSelector } from 'react-redux'

const Settings: React.FC = () => {
	const { email, displayName } = useSelector(
		(state: RootState) => state.user,
	)
	
	return (
		<Tabs defaultValue='account'>
			<TabsList className='grid w-[400px] grid-cols-2'>
				<TabsTrigger value='account'>Account</TabsTrigger>
				<TabsTrigger value='password'>Password</TabsTrigger>
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
							<Input id='name' className='w-[200px]' defaultValue={displayName ? displayName : ''} />
						</div>
						<div className='space-y-1 w-auto ml-auto'>
							<Dialog>
								<DialogTrigger asChild>
									<Button>View Account Details</Button></DialogTrigger>
								<DialogContent>
									<DialogHeader className='gap-2'>
										<DialogTitle>Account Details</DialogTitle>
										<Label htmlFor='details-email' className='pt-[30px] !text-[#999]'>E-Mail</Label>
										<Input disabled id='details-email' className='w-[200px]' defaultValue={email ? email : ''} />
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
						<Button>Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value='password'>
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='current'>Current password</Label>
							<Input id='current' type='password' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='new'>New password</Label>
							<Input id='new' type='password' />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

export default Settings
