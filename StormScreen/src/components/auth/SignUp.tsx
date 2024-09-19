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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
type SignUpProps = {
	form: UseFormReturn<
		{ email: string; password: string; displayName: string; username: string; photo: string },
		undefined
	>
}

const SignUp: FC<SignUpProps> = ({ form }) => {
	// const [username, setUsername] = useState('@')
	const [file, setFile] = useState<File | null | undefined>(null)

	const dispatch = useDispatch()
	const handleSignUp = async () => {
		const { displayName, email, password, username } = form.getValues()

		try {
			const arrayBuffer = await file?.arrayBuffer();
			const blob = new Blob([arrayBuffer!], { type: file?.type });
			const storageRef = ref(storage, 'accounts/' + username);
			await uploadBytes(storageRef, blob);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			console.log('watch this line', storageRef)
			getDownloadURL(storageRef)
			.then(async (url) => {
				await updateProfile(user, {photoURL: url})
				await updateProfile(user, { displayName })
				console.log(user)
			})
			dispatch(
				setUser({
					email: user.email,
					token: user.refreshToken,
					displayName: user.displayName,
					id: user.uid,
					username: user.displayName,
					photo: user.photoURL
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
									<AtSign className='h-4 w-4 absolute top-1/2 -translate-y-1/2 left-2' />
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
				<FormField
					control={form.control}
					name='photo'
					render={({ field }) => (
						<FormItem className='!mt-3'>
							<FormLabel className='dark:text-white'>Profile Icon</FormLabel>
							<FormControl>
								<Input
									type='file'
									className='dark:text-gray-50'
									placeholder='password'
									defaultValue={''}
									{...field}
									onChange={(e) => setFile(e.target.files?.[0])}
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
