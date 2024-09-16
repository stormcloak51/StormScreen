import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Login from './Login'
import SignUp from './SignUp'

const signSchema = z.object({
	email: z.string().min(5).max(50).email(),
	displayName: z.string().min(2).max(20),
	username: z.string().min(3).max(20),
	password: z.string().min(6).max(20),
})
const loginSchema = z.object({
	email: z.string().min(5).max(50),
	password: z.string().min(6).max(20),
})


const Auth = () => {
	const signForm = useForm<z.infer<typeof signSchema>>({
		resolver: zodResolver(signSchema),
	})
	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	})

	return (
		<Tabs defaultValue='login' className='w-[400px] min-h-[100%] mx-auto mt-[120px]'>
			<TabsList>
				<TabsTrigger value='login'>Log In</TabsTrigger>
				<TabsTrigger value='signup'>Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<Login form={loginForm} />
			</TabsContent>
			<TabsContent value='signup'>
				<SignUp form={signForm} />
			</TabsContent>
		</Tabs>
	)
}

export default Auth
