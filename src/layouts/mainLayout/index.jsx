import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import logo from 'assets/images/logo.JPG'

function MainLayout() {
	return (
		<div className="w-full">
			<Header logo={logo} />
		</div>
	);
}

export default MainLayout