import { Outlet } from 'react-router-dom'
import Header from './components/header'
// import { Button } from './components/ui/button'
// import {
// 	useQuery,
// 	useMutation,
// 	useQueryClient,
// 	QueryClient,
// 	QueryClientProvider,
// } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'
export function App() {
	// const qClient = useQueryClient()
	// const query = useQuery({ queryKey: ['movies'], queryFn: fetchTrending })
	// if (!query.isLoading) {
	// 	console.log(query.data)
	// }
	return (
		<div id='background' className='bg-white dark:bg-black'>
			<ThemeProvider defaultTheme='light'>
				<Header />
				<div className='pl-[100px] pr-[24px] dark:bg-black min-h-[76vh] py-0 my-0 max-phoneTable:px-[24px]'>
					<Outlet />
				</div>
			</ThemeProvider>
		</div>
	)
}
