import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './styles/globals.css'
import { cn } from '@/lib/utils'
import { Nav } from '@/components/partial'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Auction House',
	icons: { icon: '/vercel.svg' },
	description: 'a live auction platform for buying and selling goods.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				{children}
			</body>
		</html>
	)
}
