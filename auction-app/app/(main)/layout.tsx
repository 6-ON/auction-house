import type { Metadata } from 'next'
import { Nav } from '@/components/partial'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
	title: 'Auction House',
	description: 'a live auction platform for buying and selling goods.',
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await auth()

	return (
		<>
			<Nav session={session} />
			{children}
		</>
	)
}
