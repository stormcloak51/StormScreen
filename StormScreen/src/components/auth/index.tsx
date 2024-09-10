import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Login from './Login'
import SignUp from './SignUp'

const formSchema = z.object({
	email: z.string().min(2).max(50),
	displayName: z.string().min(2).max(50).optional(),
	password: z.string().min(2).max(50),
})

const Auth = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	return (
		<Tabs defaultValue='login' className='w-[400px] min-h-[100%] mx-auto mt-[120px]'>
			<TabsList>
				<TabsTrigger value='login'>Log In</TabsTrigger>
				<TabsTrigger value='signup'>Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<Login form={form} />
			</TabsContent>
			<TabsContent value='signup'>
				<SignUp form={form} />
			</TabsContent>
		</Tabs>
	)
}

export default Auth
