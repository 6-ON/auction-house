import { Logo } from '../common/Logo'
import Link from 'next/link'
import { AccountDropdown } from '../common/user-dropdown'
import { Session } from 'next-auth'
import { ModeToggle } from '../common/theme-toggle'
export async function Nav({ session }: { session: Session | null }) {
	return (
		<header className="px-4 lg:px-6 py-2.5 flex items-center border-b-2 border-primary sticky top-0 w-full bg-white dark:bg-slate-700 dark:bg-opacity-20 z-10 bg-opacity-60 backdrop-blur-md">
			<Link className="flex items-center justify-center" href="/" rel="ugc">
				<Logo />
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/auctions" rel="ugc">
					Auctions
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/about" rel="ugc">
					About us
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact" rel="ugc">
					Contact
				</Link>
				<ModeToggle />
				{!session ? (
					<>
						<Link
							className="text-sm font-medium hover:underline underline-offset-4"
							href="/sign-in"
							data-cy="login-link"
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
					<AccountDropdown user={session.user} />
				)}
			</nav>
		</header>
	)
}
