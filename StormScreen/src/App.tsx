


import { Outlet } from 'react-router-dom'
import Header from './components/header'
// import { Button } from './components/ui/button'


export function App() {
	return (
		<>
			<Header/>
			<div className='pl-[100px] pr-[24px]'>
				<Outlet/>
			</div>
		</>
	)
}
