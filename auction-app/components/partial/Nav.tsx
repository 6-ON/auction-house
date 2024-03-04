import React from 'react'
import { Logo } from '../common/Logo'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { AccountDropdown } from '../common/user-dropdown'
import { Session } from 'next-auth'
export async function Nav({ session }: { session: Session | null }) {
	return (
		<header className="px-4 lg:px-6 py-2.5 flex items-center border-b-2 border-black sticky top-0 bg-opacity-80 backdrop-blur-md w-full bg-white dark:bg-gray-900 z-10">
			<Link className="flex items-center justify-center" href="/" rel="ugc">
				<Logo />
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/auctions" rel="ugc">
					Auctions
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/about" rel="ugc">
					About
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact" rel="ugc">
					Contact
				</Link>
				{!session ? (
					<>
						<Link
							className="text-sm font-medium hover:underline underline-offset-4"
							href="/sign-in"
							rel="ugc"
						>
							Login
						</Link>
						<Link
							className="text-sm font-medium hover:underline underline-offset-4"
							href="/sign-up"
							rel="ugc"
						>
							Sign up
						</Link>
					</>
				) : (
					<AccountDropdown />
				)}
			</nav>
		</header>
	)
}
