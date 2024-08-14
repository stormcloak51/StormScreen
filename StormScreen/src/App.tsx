import * as React from 'react'

import './indexOutput.css'

import Header from './components/header'
import Home from './pages/home'
// import { Button } from './components/ui/button'


export function App() {
	return (
		<>
			<Header/>
			<div className='pl-[100px] pr-[24px]'>
				<Home />
			</div>
		</>
	)
}
