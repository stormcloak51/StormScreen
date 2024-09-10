import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth/userSlice'

type SignUpProps = {
	form: UseFormReturn<{ email: string; password: string, displayName?: string | undefined }, undefined>
}

const SignUp: FC<SignUpProps> = ({ form }) => {
	const dispatch = useDispatch()
	const handleSignUp = async () => {
		const { displayName, email, password } = form.getValues()
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			await updateProfile(user, { displayName })
			dispatch(setUser({
				email: user.email,
				token: user.refreshToken,
				displayName: user.displayName,
				id: user.uid
			}))
		} catch (error: unknown) {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorCode, errorMessage)
		}
	}
	return (
		<FormProvider {...form}>
			<form
				onSubmit={e => {
					e.preventDefault()
					handleSignUp()
				}}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='displayName'
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel className='dark:text-white'>Display Name</FormLabel>
							<FormControl>
								<Input type='text' placeholder='Brad Pitt' {...field} />
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
								<Input type='email' placeholder='stormcloak@stormscreen.com' {...field} />
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
								<Input type='password' placeholder='password' {...field} />
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
