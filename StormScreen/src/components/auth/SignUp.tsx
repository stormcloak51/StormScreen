import { FC } from 'react'
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
import { signSchema } from '.'
import { z } from 'zod'
import { createProfile } from '@/utils/createProfile'
type SignUpProps = {
	form: UseFormReturn<
		{ email: string; password: string; displayName: string; username: string; photo?: File | undefined },
		undefined
	>
}

const SignUp: FC<SignUpProps> = ({ form }) => {

	const dispatch = useDispatch()
	const handleSignUp = async (data: z.infer<typeof signSchema>) => {
		const { displayName, email, password, username, photo } = data
		try {
			const arrayBuffer = await photo?.arrayBuffer()
			const blob = new Blob([arrayBuffer!], { type: photo?.type })
			const storageRef = ref(storage, 'accounts/' + username)
			await uploadBytes(storageRef, blob)
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			getDownloadURL(storageRef).then(async url => {
				await updateProfile(user, { photoURL: url })
				await updateProfile(user, { displayName })
				dispatch(
					setUser({
						email: user.email,
						token: user.refreshToken,
						displayName: user.displayName,
						id: user.uid,
						username: username,
						photoURL: user.photoURL,
					}),
				)
				createProfile({
					username: username,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
					bio: '',
				})
			})
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
					handleSignUp(form.getValues())
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
									<AtSign className='h-4 w-4 absolute left-2 top-1/2 transform  -translate-y-1/2' />
									<Input
										type='text'
										className='pl-7 dark:text-gray-50'
										placeholder='stormyyyy'
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
					render={({ field: { onChange, value, ...rest } }) => (
						<FormItem className='!mt-3'>
							<FormLabel className='dark:text-white'>Profile Icon</FormLabel>
							<FormControl>
								<Input
									type='file'
									className='dark:text-gray-50'
									onChange={e => {
										const file = e.target.files?.[0]
										if (file) {
											onChange(file)
										}
									}}
									{...rest}
								/>
							</FormControl>
							{value && <p>Selected file: {value.name}</p>}
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
