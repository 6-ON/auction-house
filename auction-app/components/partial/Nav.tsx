import React from 'react'
import { Logo } from '../common/Logo'
import Link from 'next/link'

export const Nav = () => {
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center border-b-2 border-black sticky top-0 bg-opacity-80 backdrop-blur-md w-full bg-white dark:bg-gray-900 z-10">
			<a className="flex items-center justify-center" href="#" rel="ugc">
				<Logo />
			</a>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
					About
				</a>
				<a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
					Contact
				</a>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/signin" rel="ugc">
					Login
				</Link>
				<a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
					Sign up
				</a>
			</nav>
		</header>
	)
}
