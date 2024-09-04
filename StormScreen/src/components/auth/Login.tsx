import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { Button } from '../ui/button'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth/userSlice'

interface LoginProps {
  form: UseFormReturn<{ email: string; password: string; displayName?: string | undefined; }, any, undefined>;
  onSubmit: (values: { email: string; password: string; displayName?: string | undefined; }) => void;
}

const Login: FC<LoginProps> = ({ form, onSubmit }) => {
	const dispatch = useDispatch()
	const handleLogin = () => {
		const auth = getAuth()
		const { email, password } = form.getValues()
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user
				// ...
				dispatch(setUser({
					email: user.email,
					token: user.refreshToken,
					id: user.uid
				}))
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
			})
	}
	return (
		<FormProvider {...form}>
			<form onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit(onSubmit)
				handleLogin()
				}} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
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
						<FormItem>
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

export default Login
