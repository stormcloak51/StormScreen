import { FC, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth/userSlice'
import { toast } from '../ui/use-toast'
import { AtSign } from 'lucide-react'
import {ref} from "firebase/storage"
import {storage} from "../../firebase"
type SignUpProps = {
	form: UseFormReturn<
		{ email: string; password: string; displayName: string; username: string },
		undefined
	>
}

const SignUp: FC<SignUpProps> = ({ form }) => {
	// const [username, setUsername] = useState('@')
	const imagesRef = ref(storage, 'accounts')
	console.log(imagesRef, 'WHA')
	const dispatch = useDispatch()
	const handleSignUp = async () => {
		const { displayName, email, password } = form.getValues()

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			await updateProfile(user, { displayName })
			dispatch(
				setUser({
					email: user.email,
					token: user.refreshToken,
					displayName: user.displayName,
					id: user.uid,
					username: user.displayName
				}),
			)
		} catch (error) {
			toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
			console.log(error)
		}
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={e => {
					e.preventDefault()
					handleSignUp()
				}}
				className='space-y-6'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='dark:text-white'>Username</FormLabel>
							<FormControl>
								<div className='relative'>
									<AtSign className='h-4 w-4 absolute top-1/2 -translate-y-1/2 left-2'/>
									<Input
										type='text'
										className='pl-6 dark:text-gray-50'
										placeholder='stormscreen'
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='displayName'
					render={({ field }) => (
						<FormItem className='!mt-3'>
							<FormLabel className='dark:text-white'>Display Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='dark:text-gray-50'
									placeholder='Brad Pitt'
									defaultValue={''}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='!mt-3'>
							<FormLabel className='dark:text-white'>E-Mail</FormLabel>
							<FormControl>
								<Input
									type='email'
									className='dark:text-gray-50'
									placeholder='stormcloak@stormscreen.com'
									defaultValue={''}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='!mt-3'>
							<FormLabel className='dark:text-white'>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									className='dark:text-gray-50'
									placeholder='password'
									defaultValue={''}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</FormProvider>
	)
}

export default SignUp
