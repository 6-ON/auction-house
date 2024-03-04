import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Nav } from '@/components/partial'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Auction House',
	description: 'a live auction platform for buying and selling goods.',
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await auth()
	
	return (
		<>
			<SessionProvider session={session}>
				<Nav session={session} />
				{children}
			</SessionProvider>
		</>
	)
}
